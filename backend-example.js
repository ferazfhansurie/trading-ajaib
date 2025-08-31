// Backend Integration Example for Trading Genie Landing Page
// This file shows how to integrate with Stripe and manage subscriptions

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database models (example with MongoDB)
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    telegramUsername: { type: String, required: true },
    telegramChatId: { type: String, required: true },
    subscription: {
        plan: { type: String, enum: ['starter', 'professional', 'enterprise'] },
        status: { type: String, enum: ['active', 'cancelled', 'expired'] },
        stripeCustomerId: String,
        stripeSubscriptionId: String,
        currentPeriodEnd: Date,
        createdAt: { type: Date, default: Date.now }
    },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Subscription Schema
const subscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    plan: { type: String, required: true },
    status: { type: String, required: true },
    stripeSubscriptionId: { type: String, required: true },
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    cancelAtPeriodEnd: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

// Routes

// Create Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { plan, email, telegramUsername, telegramChatId } = req.body;

        // Plan configurations
        const plans = {
            starter: {
                priceId: 'price_starter_monthly', // Your Stripe price ID
                name: 'Starter Plan'
            },
            professional: {
                priceId: 'price_professional_monthly',
                name: 'Professional Plan'
            },
            enterprise: {
                priceId: 'price_enterprise_monthly',
                name: 'Enterprise Plan'
            }
        };

        const selectedPlan = plans[plan];
        if (!selectedPlan) {
            return res.status(400).json({ error: 'Invalid plan selected' });
        }

        // Create or get user
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                email,
                telegramUsername,
                telegramChatId
            });
            await user.save();
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: selectedPlan.priceId,
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/pricing`,
            customer_email: email,
            metadata: {
                userId: user._id.toString(),
                plan: plan,
                telegramUsername: telegramUsername,
                telegramChatId: telegramChatId
            }
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

// Stripe Webhook Handler
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutCompleted(event.data.object);
                break;
            
            case 'customer.subscription.updated':
                await handleSubscriptionUpdated(event.data.object);
                break;
            
            case 'customer.subscription.deleted':
                await handleSubscriptionDeleted(event.data.object);
                break;
            
            case 'invoice.payment_failed':
                await handlePaymentFailed(event.data.object);
                break;
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Webhook handler error:', error);
        res.status(500).json({ error: 'Webhook handler failed' });
    }
});

// Webhook Handlers
async function handleCheckoutCompleted(session) {
    const { userId, plan, telegramUsername, telegramChatId } = session.metadata;
    
    try {
        // Get subscription details from Stripe
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        
        // Update user subscription
        await User.findByIdAndUpdate(userId, {
            'subscription.plan': plan,
            'subscription.status': 'active',
            'subscription.stripeCustomerId': session.customer,
            'subscription.stripeSubscriptionId': session.subscription,
            'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000)
        });

        // Create subscription record
        await Subscription.create({
            userId: userId,
            plan: plan,
            status: 'active',
            stripeSubscriptionId: session.subscription,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000)
        });

        // Send welcome message to Telegram
        await sendTelegramMessage(telegramChatId, 
            `🎉 Welcome to Trading Genie ${plan.toUpperCase()} Plan!\n\n` +
            `Your subscription is now active. You'll start receiving trading signals immediately.\n\n` +
            `📊 Plan Features:\n` +
            getPlanFeatures(plan)
        );

        console.log(`User ${telegramUsername} subscribed to ${plan} plan`);
    } catch (error) {
        console.error('Error handling checkout completed:', error);
    }
}

async function handleSubscriptionUpdated(subscription) {
    try {
        const user = await User.findOne({ 
            'subscription.stripeSubscriptionId': subscription.id 
        });
        
        if (user) {
            await User.findByIdAndUpdate(user._id, {
                'subscription.status': subscription.status,
                'subscription.currentPeriodEnd': new Date(subscription.current_period_end * 1000)
            });

            await Subscription.findOneAndUpdate(
                { stripeSubscriptionId: subscription.id },
                {
                    status: subscription.status,
                    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    cancelAtPeriodEnd: subscription.cancel_at_period_end
                }
            );
        }
    } catch (error) {
        console.error('Error handling subscription updated:', error);
    }
}

async function handleSubscriptionDeleted(subscription) {
    try {
        const user = await User.findOne({ 
            'subscription.stripeSubscriptionId': subscription.id 
        });
        
        if (user) {
            await User.findByIdAndUpdate(user._id, {
                'subscription.status': 'cancelled'
            });

            await Subscription.findOneAndUpdate(
                { stripeSubscriptionId: subscription.id },
                { status: 'cancelled' }
            );

            // Send cancellation message to Telegram
            await sendTelegramMessage(user.telegramChatId,
                `❌ Your Trading Genie subscription has been cancelled.\n\n` +
                `You can resubscribe anytime to continue receiving trading signals.`
            );
        }
    } catch (error) {
        console.error('Error handling subscription deleted:', error);
    }
}

async function handlePaymentFailed(invoice) {
    try {
        const user = await User.findOne({ 
            'subscription.stripeSubscriptionId': invoice.subscription 
        });
        
        if (user) {
            await sendTelegramMessage(user.telegramChatId,
                `⚠️ Payment Failed\n\n` +
                `Your Trading Genie subscription payment has failed. ` +
                `Please update your payment method to continue receiving signals.`
            );
        }
    } catch (error) {
        console.error('Error handling payment failed:', error);
    }
}

// Helper Functions
function getPlanFeatures(plan) {
    const features = {
        starter: [
            '• Gold (XAUUSD) Analysis',
            '• 3 Timeframes (M15, H1, H4)',
            '• Daily Signals',
            '• Basic Support'
        ],
        professional: [
            '• Gold + Forex Analysis',
            '• All 9 Timeframes',
            '• Hourly Signals',
            '• Priority Support',
            '• Advanced Indicators'
        ],
        enterprise: [
            '• Everything in Professional',
            '• Custom Timeframes',
            '• API Access',
            '• Dedicated Support',
            '• White-label Options'
        ]
    };
    
    return features[plan]?.join('\n') || '';
}

// Telegram Integration
async function sendTelegramMessage(chatId, message) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        if (!response.ok) {
            throw new Error(`Telegram API error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error sending Telegram message:', error);
    }
}

// Admin Routes
app.get('/api/admin/subscribers', async (req, res) => {
    try {
        const users = await User.find({ 'subscription.status': 'active' })
            .select('email telegramUsername subscription createdAt')
            .sort('-createdAt');

        const stats = {
            totalSubscribers: users.length,
            planBreakdown: {
                starter: users.filter(u => u.subscription.plan === 'starter').length,
                professional: users.filter(u => u.subscription.plan === 'professional').length,
                enterprise: users.filter(u => u.subscription.plan === 'enterprise').length
            }
        };

        res.json({ users, stats });
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ error: 'Failed to fetch subscribers' });
    }
});

app.get('/api/admin/subscription/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const subscriptions = await Subscription.find({ userId: user._id })
            .sort('-createdAt');

        res.json({ user, subscriptions });
    } catch (error) {
        console.error('Error fetching user subscription:', error);
        res.status(500).json({ error: 'Failed to fetch user subscription' });
    }
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Error Handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Trading Genie Backend running on port ${PORT}`);
});

module.exports = app;

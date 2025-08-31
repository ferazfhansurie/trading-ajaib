// Main App Component
import React, { useState, useEffect, useRef } from 'react';

// Free Trial Configuration (No Stripe needed initially)
const FREE_TRIAL_DAYS = 7;

// Main App
function App() {
    const [currentSection, setCurrentSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pricingPlan, setPricingPlan] = useState('monthly');

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setCurrentSection(sectionId);
        setIsMenuOpen(false);
    };

    const handleSubscribe = async (plan) => {
        // Redirect directly to Telegram bot instead of showing modal
        window.open('https://web.telegram.org/k/#@trading_ajaib_bot', '_blank');
    };



    return (
        <div className="app">
            {/* Navigation */}
            <Navigation 
                currentSection={currentSection}
                onSectionChange={scrollToSection}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
            />

            {/* Hero Section */}
            <HeroSection onGetStarted={() => scrollToSection('pricing')} />

            {/* Features Section */}
            <FeaturesSection />

            {/* How It Works */}
            <HowItWorksSection />


            {/* Pricing Section */}
            <PricingSection 
                pricingPlan={pricingPlan}
                setPricingPlan={setPricingPlan}
                onSubscribe={handleSubscribe}
            />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* Footer */}
            <Footer />




        </div>
    );
}

// Navigation Component
function Navigation({ currentSection, onSectionChange, isMenuOpen, setIsMenuOpen }) {
    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'features', label: 'Features' },
        { id: 'how-it-works', label: 'How It Works' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'faq', label: 'FAQ' }
    ];

    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-logo" onClick={() => onSectionChange('home')}>
                    <img src="logo.jpeg" alt="Trading Genie Logo" className="nav-logo-img" />
                    <span>Trading Genie</span>
                </div>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${currentSection === item.id ? 'active' : ''}`}
                            onClick={() => onSectionChange(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="nav-actions">
                    <button className="btn-secondary" onClick={() => onSectionChange('pricing')}>
                        Get Started
                    </button>
                    <button 
                        className="nav-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

// Hero Section
function HeroSection({ onGetStarted }) {
    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="hero-grid"></div>
                <div className="hero-particles"></div>
            </div>
            
            <div className="hero-content">
                <div className="hero-text">
              
                    <h1 className="hero-title">
                        <span className="gradient-text">Trading Genie</span>
                        <br />
                        Your AI-Powered Trading Companion
                    </h1>
                    <p className="hero-subtitle">
                        Professional-grade trading analysis for Gold and Forex markets. 
                        Get real-time signals, advanced chart analysis, and market insights 
                        powered by cutting-edge AI technology.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={onGetStarted}>
                            <i className="fas fa-rocket"></i>
                            Start Free Trial
                        </button>
                     
                    </div>
                 
                    
                </div>
                
                <div className="hero-visual">
                    <div className="trading-dashboard">
                        <div className="dashboard-header">
                            <div className="dashboard-tabs">
                                <span className="tab active">XAUUSD</span>
                                <span className="tab">EUR/USD</span>
                                <span className="tab">GBP/USD</span>
                            </div>
                        </div>
                        <div className="chart-container">
                            <div className="chart-line"></div>
                            <div className="chart-line"></div>
                            <div className="chart-line"></div>
                        </div>
                        <div className="dashboard-stats">
                            <div className="stat">
                                <span className="stat-label">Signal</span>
                                <span className="stat-value buy">BUY</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Confidence</span>
                                <span className="stat-value">87%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Features Section
function FeaturesSection() {
    const features = [
        {
            icon: 'fas fa-chart-line',
            title: 'Advanced Chart Analysis',
            description: 'Professional TradingView integration with 9 different timeframes from M1 to Monthly.'
        },
        {
            icon: 'fas fa-robot',
            title: 'AI-Powered Signals',
            description: 'Machine learning algorithms analyze market patterns and generate high-confidence trading signals.'
        },
        {
            icon: 'fas fa-gem',
            title: 'Multi-Asset Coverage',
            description: 'Trade Gold (XAUUSD) and major Forex pairs with comprehensive analysis for each market.'
        },
        {
            icon: 'fas fa-bell',
            title: 'Real-Time Alerts',
            description: 'Get instant notifications for market opportunities, session changes, and signal updates.'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Risk Management',
            description: 'Professional entry, stop-loss, and take-profit levels with risk/reward analysis.'
        },
        {
            icon: 'fas fa-clock',
            title: '24/5 Market Coverage',
            description: 'Continuous monitoring across Asian, London, and New York trading sessions.'
        }
    ];

    return (
        <section id="features" className="features">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="gradient-text">Powerful Features</span>
                        <br />
                        That Give You The Edge
                    </h2>
                    <p className="section-subtitle">
                        Experience professional-grade trading tools designed for serious traders
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">
                                <i className={feature.icon}></i>
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Bot Access Section
function BotAccessSection() {
    return (
        <section className="bot-access">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="gradient-text">Start Trading</span>
                        <br />
                        Right Now
                    </h2>
                    <p className="section-subtitle">
                        No waiting, no setup - connect to Trading Genie instantly via Telegram
                    </p>
                </div>

                <div className="bot-access-content">
                    <div className="bot-info">
                        <div className="bot-icon">
                            <i className="fab fa-telegram"></i>
                        </div>
                        <h3>@trading_ajaib_bot</h3>
                        <p>Your AI-powered trading companion is ready 24/7 on Telegram</p>
                        
                        <div className="bot-features">
                            <div className="bot-feature">
                                <i className="fas fa-bolt"></i>
                                <span>Instant Access</span>
                            </div>
                            <div className="bot-feature">
                                <i className="fas fa-mobile-alt"></i>
                                <span>Mobile Optimized</span>
                            </div>
                            <div className="bot-feature">
                                <i className="fas fa-shield-alt"></i>
                                <span>Secure & Private</span>
                            </div>
                        </div>

                        <button 
                            className="btn-primary btn-large"
                            onClick={() => window.open('https://web.telegram.org/k/#@trading_ajaib_bot', '_blank')}
                        >
                            <i className="fab fa-telegram"></i>
                            Start Trading Now
                        </button>
                    </div>

                    <div className="bot-preview">
                        <div className="preview-message">
                            <div className="message-header">
                                <span className="bot-name">Trading Genie</span>
                                <span className="bot-status">🟢 Online</span>
                            </div>
                            <div className="message-content">
                                <p>🧞‍♂️ Welcome to Trading Genie!</p>
                                <p>I'm your AI-powered trading companion. Choose an option to get started:</p>
                                <div className="preview-buttons">
                                    <span className="preview-btn">📊 Market Analysis</span>
                                    <span className="preview-btn">📈 Chart Analysis</span>
                                    <span className="preview-btn">🔔 Signal Subscription</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// How It Works Section
function HowItWorksSection() {
    const steps = [
        {
            number: '01',
            title: 'Subscribe',
            description: 'Choose your plan and get instant access to Trading Genie',
            icon: 'fas fa-user-plus'
        },
        {
            number: '02',
            title: 'Connect',
            description: 'Link your Telegram account and start receiving signals',
            icon: 'fas fa-link'
        },
        {
            number: '03',
            title: 'Trade',
            description: 'Get real-time analysis and execute profitable trades',
            icon: 'fas fa-chart-line'
        },
        {
            number: '04',
            title: 'Connect to Bot',
            description: 'Use @trading_ajaib_bot on Telegram for instant access',
            icon: 'fab fa-telegram'
        }
    ];

    return (
        <section id="how-it-works" className="how-it-works">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        Get Started in
                        <span className="gradient-text"> 3 Simple Steps</span>
                    </h2>
                </div>

                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div key={index} className="step-card">
                            <div className="step-number">{step.number}</div>
                            <div className="step-icon">
                                <i className={step.icon}></i>
                            </div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-description">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Pricing Section
function PricingSection({ pricingPlan, setPricingPlan, onSubscribe }) {
    const plans = {
        monthly: [
            {
                name: 'Starter',
                price: 29,
                features: [
                    'Gold (XAUUSD) Analysis',
                    '3 Timeframes (M15, H1, H4)',
                    'Daily Signals',
                    'Basic Support',
                    'Telegram Access'
                ],
                popular: false
            },
            {
                name: 'Professional',
                price: 79,
                features: [
                    'Gold + Forex Analysis',
                    'All 9 Timeframes',
                    'Hourly Signals',
                    'Priority Support',
                    'Advanced Indicators',
                    'Pattern Recognition'
                ],
                popular: true
            },
            {
                name: 'Enterprise',
                price: 199,
                features: [
                    'Everything in Professional',
                    'Custom Timeframes',
                    'API Access',
                    'Dedicated Support',
                    'White-label Options',
                    'Advanced Analytics'
                ],
                popular: false
            }
        ],
        yearly: [
            {
                name: 'Starter',
                price: 290,
                features: [
                    'Gold (XAUUSD) Analysis',
                    '3 Timeframes (M15, H1, H4)',
                    'Daily Signals',
                    'Basic Support',
                    'Telegram Access'
                ],
                popular: false
            },
            {
                name: 'Professional',
                price: 790,
                features: [
                    'Gold + Forex Analysis',
                    'All 9 Timeframes',
                    'Hourly Signals',
                    'Priority Support',
                    'Advanced Indicators',
                    'Pattern Recognition'
                ],
                popular: true
            },
            {
                name: 'Enterprise',
                price: 1990,
                features: [
                    'Everything in Professional',
                    'Custom Timeframes',
                    'API Access',
                    'Dedicated Support',
                    'White-label Options',
                    'Advanced Analytics'
                ],
                popular: false
            }
        ]
    };

    return (
        <section id="pricing" className="pricing">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        Start Your
                        <span className="gradient-text"> Free Trial</span>
                    </h2>
                    <p className="section-subtitle">
                        Try any plan free for {FREE_TRIAL_DAYS} days, no credit card required
                    </p>
                </div>

                <div className="pricing-toggle">
                    <span className={pricingPlan === 'monthly' ? 'active' : ''}>Monthly</span>
                    <button 
                        className={`toggle-switch ${pricingPlan === 'yearly' ? 'active' : ''}`}
                        onClick={() => setPricingPlan(pricingPlan === 'monthly' ? 'yearly' : 'monthly')}
                    >
                        <div className="toggle-slider"></div>
                    </button>
                    <span className={pricingPlan === 'yearly' ? 'active' : ''}>
                        Yearly
                        <span className="discount">Save 20%</span>
                    </span>
                </div>

                <div className="pricing-grid">
                    {plans[pricingPlan].map((plan, index) => (
                        <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                            {plan.popular && <div className="popular-badge">Most Popular</div>}
                            
                            <div className="plan-header">
                                <h3 className="plan-name">{plan.name}</h3>
                                <div className="plan-price">
                                    <span className="currency">$</span>
                                    <span className="amount">{plan.price}</span>
                                    <span className="period">/{pricingPlan === 'monthly' ? 'mo' : 'year'}</span>
                                </div>
                                <div className="free-trial-label">
                                    🎁 Free for {FREE_TRIAL_DAYS} days
                                </div>
                            </div>

                            <ul className="plan-features">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex}>
                                        <i className="fas fa-check"></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button 
                                className={`btn-primary ${plan.popular ? 'btn-popular' : ''}`}
                                onClick={() => onSubscribe(plan)}
                            >
                                Start Free Trial
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Testimonials Section
function TestimonialsSection() {
    const testimonials = [
        {
            name: 'Alex Chen',
            role: 'Professional Trader',
            avatar: '👨‍💼',
            text: 'Trading Genie has transformed my trading strategy. The AI signals are incredibly accurate and the chart analysis is professional-grade.',
            rating: 5
        },
        {
            name: 'Sarah Johnson',
            role: 'Forex Investor',
            avatar: '👩‍💼',
            text: 'I love how easy it is to get started. The bot provides clear signals and helps me make informed trading decisions.',
            rating: 5
        },
        {
            name: 'Mike Rodriguez',
            role: 'Gold Trader',
            avatar: '👨‍💻',
            text: 'The gold analysis is spot-on. I\'ve seen a significant improvement in my trading performance since using Trading Genie.',
            rating: 5
        }
    ];

    return (
        <section className="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        What Our
                        <span className="gradient-text"> Traders Say</span>
                    </h2>
                </div>

                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-rating">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <i key={i} className="fas fa-star"></i>
                                ))}
                            </div>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">{testimonial.avatar}</div>
                                <div className="author-info">
                                    <h4 className="author-name">{testimonial.name}</h4>
                                    <p className="author-role">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// FAQ Section
function FAQSection() {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            question: 'How accurate are the trading signals?',
            answer: 'Our AI algorithms analyze multiple technical indicators and market patterns to generate high-confidence signals. While no system is 100% accurate, our signals have shown consistent performance across different market conditions.'
        },
        {
            question: 'Can I use Trading Genie on mobile?',
            answer: 'Yes! Trading Genie works seamlessly on all devices through Telegram. Simply search for @trading_ajaib_bot on Telegram to start using it immediately on any device.'
        },
        {
            question: 'What markets do you cover?',
            answer: 'We currently cover Gold (XAUUSD) and major Forex pairs including EUR/USD, GBP/USD, USD/JPY, and more. We\'re constantly expanding our market coverage.'
        },
        {
            question: 'Is there a free trial?',
            answer: `Yes! We offer a ${FREE_TRIAL_DAYS}-day free trial for all plans with no credit card required. Experience the full power of Trading Genie before making any commitment.`
        },
        {
            question: 'How do I cancel my subscription?',
            answer: 'You can cancel your subscription at any time through your account dashboard or by contacting our support team. No long-term contracts or hidden fees. Your free trial will automatically end after the trial period.'
        }
    ];

    return (
        <section id="faq" className="faq">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        Frequently Asked
                        <span className="gradient-text"> Questions</span>
                    </h2>
                </div>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button 
                                className={`faq-question ${openFAQ === index ? 'active' : ''}`}
                                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                            >
                                {faq.question}
                                <i className={`fas fa-chevron-${openFAQ === index ? 'up' : 'down'}`}></i>
                            </button>
                            <div className={`faq-answer ${openFAQ === index ? 'active' : ''}`}>
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Footer
function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                  
                    
                    <div className="footer-links">
                        <div className="footer-section">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#pricing">Pricing</a></li>
                                <li><a href="#how-it-works">How It Works</a></li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h4>Support</h4>
                            <ul>
                                <li><a href="#faq">FAQ</a></li>
                                <li><a href="#">Documentation</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                        
                        <div className="footer-section">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Risk Disclosure</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; 2024 Trading Genie. All rights reserved.</p>
                    <div className="footer-social">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-telegram"></i></a>
                        <a href="#"><i className="fab fa-discord"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}





// Export the App component
export default App;

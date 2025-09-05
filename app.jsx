// Main App Component
import React, { useState, useEffect, useRef } from 'react';

// Free Trial Configuration (No Stripe needed initially)
const FREE_TRIAL_DAYS = 7;

// Main App
function App() {
    const [currentSection, setCurrentSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pricingPlan, setPricingPlan] = useState('monthly');
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.nav-container')) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 80; // Adjust this value based on your navigation height
            const elementPosition = element.offsetTop - navHeight;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
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
                isMobile={isMobile}
            />

            {/* Hero Section */}
            <HeroSection onGetStarted={() => scrollToSection('pricing')} isMobile={isMobile} />

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
function Navigation({ currentSection, onSectionChange, isMenuOpen, setIsMenuOpen, isMobile }) {
    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'features', label: 'Features' },
        { id: 'how-it-works', label: 'How It Works' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'faq', label: 'FAQ' }
    ];

    const handleMenuToggle = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavItemClick = (sectionId) => {
        onSectionChange(sectionId);
        // Add a small delay for mobile to ensure smooth transition
        if (isMobile) {
            setTimeout(() => setIsMenuOpen(false), 100);
        }
    };

    return (
        <nav className="navigation">
            <div className="nav-container">
                <div className="nav-logo" onClick={() => onSectionChange('home')}>
                    <img src="logo.png" alt="PRIMUSGPT.AI Logo" className="nav-logo-img" />
                    <span>PRIMUSGPT.AI</span>
                </div>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${currentSection === item.id ? 'active' : ''}`}
                            onClick={() => handleNavItemClick(item.id)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="nav-actions">
                    {!isMobile && (
                        <button className="btn-secondary" onClick={() => onSectionChange('pricing')}>
                            Get Started
                        </button>
                    )}
                    <button 
                        className="nav-toggle"
                        onClick={handleMenuToggle}
                        aria-label="Toggle navigation menu"
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
function HeroSection({ onGetStarted, isMobile }) {
    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="hero-grid"></div>
                <div className="hero-particles"></div>
            </div>
            
            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="hero-title">
                        <span className="gradient-text">PRIMUSGPT.AI</span>
                        <br />
                        Your AI-Powered Trading Companion
                    </h1>
                    <p className="hero-subtitle">
                        Professional-grade trading analysis for Gold and Forex markets. 
                        Get real-time signals, advanced chart analysis, and market insights 
                        powered by cutting-edge AI technology.
                    </p>
                    <div className="hero-actions">
                        <button 
                            className="btn-primary" 
                            onClick={onGetStarted}
                            style={{ touchAction: 'manipulation' }}
                        >
                            <i className="fas fa-rocket"></i>
                            Start Trading Now
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
            title: 'Real-Time Market Analysis',
            description: 'Get instant professional analysis of Gold and Forex markets with AI-powered insights.'
        },
        {
            icon: 'fas fa-robot',
            title: 'Professional Trading Signals',
            description: 'Receive high-confidence trading signals generated by advanced AI algorithms.'
        },
        {
            icon: 'fas fa-gem',
            title: 'Gold & Forex Charts',
            description: 'Analyze comprehensive charts for Gold (XAUUSD) and major currency pairs.'
        },
        {
            icon: 'fas fa-star',
            title: 'Premium Features Access',
            description: 'Unlock all professional features including advanced indicators and pattern recognition.'
        },
        {
            icon: 'fas fa-clock',
            title: 'Multi-Timeframe Analysis',
            description: 'Access analysis from M1 to Monthly timeframes for comprehensive market view.'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Risk Management Guidance',
            description: 'Get professional entry, stop-loss, and take-profit recommendations.'
        }
    ];

    return (
        <section id="features" className="features">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="gradient-text">PRIMUSGPT.AI</span>
                        <br />
                        Professional Trading Features
                    </h2>
                    <p className="section-subtitle">
                        Access all premium features with your Professional (Demo) plan
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
            title: 'Start Free Trial',
            description: 'Get 7 days of full access to all PRIMUSGPT.AI features',
            icon: 'fas fa-rocket'
        },
        {
            number: '02',
            title: 'Connect to Bot',
            description: 'Message @trading_ajaib_bot on Telegram to activate your trial',
            icon: 'fab fa-telegram'
        },
        {
            number: '03',
            title: 'Start Trading',
            description: 'Choose Gold or Forex analysis and get AI-powered trading signals',
            icon: 'fas fa-chart-line'
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

                <div className="steps-grid">
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
    const [selectedPlan, setSelectedPlan] = useState('quarterly');
    
    const plans = [
        {
            id: 'monthly',
            name: 'Monthly',
            price: 29.90,
            originalPrice: 29.90,
            discount: 0,
            savings: 0,
            monthlyCost: 29.90,
            features: [
                'Gold + Forex Analysis',
                'All 9 Timeframes',
                'Real-time Signals',
                'Priority Support',
                'Advanced Indicators',
                'Pattern Recognition'
            ],
            popular: false
        },
        {
            id: 'quarterly',
            name: 'Quarterly',
            price: 80.70,
            originalPrice: 89.70,
            discount: 10,
            savings: 9.00,
            monthlyCost: 26.90,
            features: [
                'Gold + Forex Analysis',
                'All 9 Timeframes',
                'Real-time Signals',
                'Priority Support',
                'Advanced Indicators',
                'Pattern Recognition'
            ],
            popular: true
        },
        {
            id: '6months',
            name: '6-Months',
            price: 152.50,
            originalPrice: 179.40,
            discount: 15,
            savings: 26.90,
            monthlyCost: 25.40,
            features: [
                'Gold + Forex Analysis',
                'All 9 Timeframes',
                'Real-time Signals',
                'Priority Support',
                'Advanced Indicators',
                'Pattern Recognition'
            ],
            popular: false
        },
        {
            id: 'annual',
            name: 'Annual',
            price: 287.00,
            originalPrice: 358.80,
            discount: 20,
            savings: 71.80,
            monthlyCost: 23.90,
            features: [
                'Gold + Forex Analysis',
                'All 9 Timeframes',
                'Real-time Signals',
                'Priority Support',
                'Advanced Indicators',
                'Pattern Recognition'
            ],
            popular: false
        }
    ];

    const currentPlan = plans.find(plan => plan.id === selectedPlan) || plans[1];

    return (
        <section id="pricing" className="pricing">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        Choose Your
                        <span className="gradient-text"> PRIMUSGPT.AI</span>
                        <br />
                        Subscription Plan
                    </h2>
                    <p className="section-subtitle">
                        Start with a {FREE_TRIAL_DAYS}-day free trial, then choose your preferred billing cycle
                    </p>
                </div>

                <div className="pricing-tabs">
                    {plans.map((plan) => (
                        <button
                            key={plan.id}
                            className={`pricing-tab ${selectedPlan === plan.id ? 'active' : ''}`}
                            onClick={() => setSelectedPlan(plan.id)}
                        >
                            {plan.name}
                            {plan.popular }
                        </button>
                    ))}
                </div>

                <div className="pricing-card-container">
                    <div className={`pricing-card ${currentPlan.popular ? 'popular' : ''}`}>
                        {currentPlan.popular && <div className="popular-badge">Most Popular</div>}
                        
                        <div className="plan-header">
                            <h3 className="plan-name">{currentPlan.name}</h3>
                            <div className="plan-price">
                                <span className="currency">$</span>
                                <span className="amount">{currentPlan.price.toFixed(2)}</span>
                                <span className="period">USD</span>
                            </div>
                            {currentPlan.discount > 0 && (
                                <div className="discount-info">
                                    <div className="discount-badge">{currentPlan.discount}% off</div>
                                    <div className="monthly-cost">≈ ${currentPlan.monthlyCost.toFixed(2)}/month</div>
                                    <div className="savings">Save: ${currentPlan.savings.toFixed(2)}</div>
                                </div>
                            )}
                            <div className="free-trial-label">
                                🎁 Free for {FREE_TRIAL_DAYS} days
                            </div>
                        </div>

                        <ul className="plan-features">
                            {currentPlan.features.map((feature, featureIndex) => (
                                <li key={featureIndex}>
                                    <i className="fas fa-check"></i>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button 
                            className={`btn-primary ${currentPlan.popular ? 'btn-popular' : ''}`}
                            onClick={() => onSubscribe(currentPlan)}
                            style={{ touchAction: 'manipulation' }}
                        >
                            Start Free Trial
                        </button>
                    </div>
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
            text: 'PRIMUSGPT.AI has revolutionized my trading approach. The AI-powered analysis is incredibly precise and the professional signals have significantly improved my success rate.',
            rating: 5
        },
        {
            name: 'Sarah Johnson',
            role: 'Forex Investor',
            avatar: '👩‍💼',
            text: 'The Professional (Demo) plan gives me access to everything I need. The real-time market analysis and multi-timeframe insights are game-changing.',
            rating: 5
        },
        {
            name: 'Mike Rodriguez',
            role: 'Gold Trader',
            avatar: '👨‍💻',
            text: 'The Gold and Forex analysis from PRIMUSGPT.AI is exceptional. The risk management guidance has helped me minimize losses and maximize profits.',
            rating: 5
        }
    ];

    return (
        <section className="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        What Our
                        <span className="gradient-text"> PRIMUSGPT.AI Users Say</span>
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
            question: 'How accurate are the PRIMUSGPT.AI trading signals?',
            answer: 'PRIMUSGPT.AI uses advanced AI algorithms to analyze multiple technical indicators and market patterns, generating high-confidence professional signals. While no system is 100% accurate, our signals have shown consistent performance across different market conditions.'
        },
        {
            question: 'Can I use PRIMUSGPT.AI on mobile?',
            answer: 'Yes! PRIMUSGPT.AI works seamlessly on all devices through Telegram. Simply search for @trading_ajaib_bot on Telegram to start using it immediately on any device with your Professional (Demo) plan.'
        },
        {
            question: 'What markets does PRIMUSGPT.AI cover?',
            answer: 'PRIMUSGPT.AI currently covers Gold (XAUUSD) and major Forex pairs including EUR/USD, GBP/USD, USD/JPY, and more. The Professional (Demo) plan gives you access to all supported markets.'
        },
        {
            question: 'What is the Professional (Demo) plan?',
            answer: `The Professional (Demo) plan gives you full access to all PRIMUSGPT.AI features for ${FREE_TRIAL_DAYS} days. This includes real-time market analysis, professional trading signals, multi-timeframe analysis, and all premium features without any cost.`
        },
        {
            question: 'How do I get started with PRIMUSGPT.AI?',
            answer: 'Simply click "Start Trading Now" to access the Telegram bot. You can start by typing "Hello" to get started, "Help" to see all features, or ask for specific analysis like "Gold analysis" or "Forex trading".'
        }
    ];

    const handleFAQToggle = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <section id="faq" className="faq">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        PRIMUSGPT.AI
                        <span className="gradient-text"> FAQ</span>
                    </h2>
                </div>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button 
                                className={`faq-question ${openFAQ === index ? 'active' : ''}`}
                                onClick={() => handleFAQToggle(index)}
                                aria-expanded={openFAQ === index}
                                aria-controls={`faq-answer-${index}`}
                                style={{ touchAction: 'manipulation' }}
                            >
                                {faq.question}
                                <i className={`fas fa-chevron-${openFAQ === index ? 'up' : 'down'}`}></i>
                            </button>
                            <div 
                                className={`faq-answer ${openFAQ === index ? 'active' : ''}`}
                                id={`faq-answer-${index}`}
                            >
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
                    <p>&copy; 2024 PRIMUSGPT.AI. All rights reserved.</p>
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

import { useEffect, useState, useRef } from "react";
import "@/App.css";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { 
  Target, 
  ChartLineUp, 
  Heart, 
  Buildings, 
  Cpu, 
  UsersThree,
  Phone,
  Envelope,
  LinkedinLogo,
  InstagramLogo,
  ArrowRight,
  MusicNote
} from "@phosphor-icons/react";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// Animated section wrapper
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      data-testid="navigation"
      className={`fixed top-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300 nav-glass ${scrolled ? 'nav-scrolled' : ''}`}
    >
      <a href="#hero" data-testid="nav-logo" className="text-charcoal font-accent text-sm tracking-[0.2em] uppercase font-semibold">
        George Toscano
      </a>
      
      <div className="hidden md:flex items-center gap-8">
        {[
          { id: 'hero', label: 'Home' },
          { id: 'why-me', label: 'Why Me' },
          { id: 'about', label: 'About' },
          { id: 'insights', label: 'Insights' },
          { id: 'connect', label: 'Connect' }
        ].map((item) => (
          <button
            key={item.id}
            data-testid={`nav-${item.id}`}
            onClick={() => scrollToSection(item.id)}
            className="text-charcoal text-sm font-sans hover:text-taupe transition-colors duration-300 underline-animation"
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <button 
        data-testid="nav-cta"
        onClick={() => scrollToSection('connect')}
        className="bg-charcoal text-cream px-6 py-2.5 text-xs uppercase tracking-widest font-accent font-medium hover:bg-taupe transition-colors duration-300"
      >
        Let's Talk
      </button>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="hero" data-testid="hero-section" className="min-h-screen bg-cream pt-20">
      <div className="grid md:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-0">
          <AnimatedSection>
            <span className="section-label mb-6">Realtor · Technologist · Musician</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight font-serif text-charcoal leading-[0.95] mb-8">
              Your Home.<br />
              Your Future.<br />
              <span className="italic text-taupe">Handled With Care.</span>
            </h1>
            <p className="body-text max-w-lg mb-10">
              I'm George Toscano — a Bay Area real estate professional who treats every client like family, every transaction like it matters, because it does. With roots in technology, music, and service, I bring a rare combination of precision, passion, and heart to every deal.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <a 
                href="#connect" 
                data-testid="hero-cta-primary"
                className="btn-primary inline-flex items-center gap-2"
              >
                Work With Me <ArrowRight size={16} />
              </a>
              <a 
                href="#about" 
                data-testid="hero-cta-secondary"
                className="btn-secondary"
              >
                My Story
              </a>
            </div>
            
            <div className="trust-bar">
              <span>Bay Area</span>
              <span>Stanford</span>
              <span>25+ Years in Music</span>
              <span>StarTex Venture Partner</span>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Right Image */}
        <div className="relative h-[50vh] md:h-auto overflow-hidden hero-image-overlay">
          <img 
            src="https://images.unsplash.com/photo-1682184805271-11671b7ecf4c?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
            alt="Modern Luxury Living Room"
            data-testid="hero-image"
            className="w-full h-full object-cover image-hover-color"
          />
          <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-sm p-6 max-w-xs hidden lg:block">
            <p className="text-sm text-charcoal-light italic font-serif">
              "Dedicated to every client. As if you were a patient."
            </p>
          </div>
        </div>
      </div>
      
      {/* Marquee */}
      <div className="bg-charcoal py-4 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            {Array(3).fill([
              'Growth Strategy', 'Customer Success', 'Revenue Operations', 
              'Real Estate', 'Technology', 'Music Production'
            ]).flat().map((item, i) => (
              <span key={i} className="text-cream/70 text-sm uppercase tracking-widest mx-8 font-accent">
                {item} •
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Why Me Section
const WhyMeSection = () => {
  const cards = [
    {
      icon: Target,
      title: "Urgency & Precision",
      description: "Every opportunity has a window. I operate with the focus and intensity of someone who understands that timing is everything."
    },
    {
      icon: ChartLineUp,
      title: "Facts Over Hype",
      description: "I don't say things I don't know about. Every recommendation is backed by research, data, and real-world experience. No fluff."
    },
    {
      icon: Heart,
      title: "Heart-First Service",
      description: "Dedicated to every client as if you were a patient. That's not a tagline — that's my operating system."
    }
  ];

  return (
    <section id="why-me" data-testid="why-me-section" className="py-24 md:py-32 bg-warm-grey">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Why Choose Me</span>
          <h2 className="section-heading mb-8">
            Because I Treat Every Client<br />
            <span className="italic text-taupe">Like a Patient.</span>
          </h2>
          <p className="body-text max-w-2xl mb-16">
            I didn't come from a silver spoon. Everything I have, I earned through relentless consistency and an unwavering commitment to people. My background in healthcare taught me what it means to truly care — to operate with urgency, precision, and compassion. I bring that same mindset to real estate. When you work with me, you're not a transaction. You're a person whose future matters.
          </p>
        </AnimatedSection>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              data-testid={`value-card-${index}`}
              className="card-editorial card-lift"
            >
              <div className="icon-container">
                <card.icon size={24} weight="thin" className="text-charcoal" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-normal text-charcoal mb-4">{card.title}</h3>
              <p className="text-charcoal-light leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const stats = [
    { value: "$100M+", label: "Revenue Scaled" },
    { value: "25+", label: "Years Performing" },
    { value: "1000+", label: "Clients Served" }
  ];

  return (
    <section id="about" data-testid="about-section" className="py-24 md:py-32 bg-cream">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <AnimatedSection className="order-2 md:order-1">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1769628027250-d2a7a5a4eb64?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                alt="George Toscano Portrait"
                data-testid="about-image"
                className="w-full aspect-[4/5] object-cover image-hover-color"
              />
              <div className="absolute -bottom-6 -right-6 bg-charcoal text-cream p-8 hidden lg:block">
                <div className="flex gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-serif">{stat.value}</p>
                      <p className="text-xs uppercase tracking-widest text-cream/70 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Content */}
          <AnimatedSection className="order-1 md:order-2">
            <span className="section-label mb-4 block">My Story</span>
            <h2 className="section-heading mb-8">
              Built From Nothing.<br />
              <span className="italic text-taupe">Driven By Everything.</span>
            </h2>
            
            <div className="space-y-6 body-text">
              <p>
                I grew up without shortcuts. No silver spoon, no safety net — just a deep belief that consistency and hard work would open doors. And they did.
              </p>
              <p>
                I've spent over 25 years as a professional musician across the Bay Area — performing, leading, serving communities through music. That discipline shaped me. Music taught me to listen, to feel the room, to know when to lead and when to follow.
              </p>
              <p>
                My career in technology brought me to Stanford, where I developed a technologist's mind for systems, data, and problem-solving. My time in healthcare gave me something even more valuable — true compassion. I learned what it takes to save a life, and I've applied that urgency and care to everything I do.
              </p>
              <p>
                Today, as a realtor and venture partner with StarTex, I combine all of these worlds. Technology. Heart. Hustle. Education. I'm not just helping you buy or sell a home — I'm helping you build a future.
              </p>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Mobile Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 md:hidden">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 bg-warm-grey">
              <p className="text-2xl font-serif text-charcoal">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-charcoal-light mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Expertise Section (Dark)
const ExpertiseSection = () => {
  const expertise = [
    {
      icon: Buildings,
      title: "Real Estate",
      description: "Bay Area residential and investment properties. Whether you're a first-time buyer, scaling your portfolio, or selling at the right moment — I bring the research, the strategy, and the relentless follow-through."
    },
    {
      icon: Cpu,
      title: "Technology & Innovation",
      description: "Stanford-trained technologist who leverages data, market analytics, and modern tools to give you an edge. In a market this competitive, information is power."
    },
    {
      icon: UsersThree,
      title: "Mentorship & Community",
      description: "Through GT Real and our partnership with Apotimo, I'm dedicated to finding and developing the next generation. Young men and women who have a dream — I want to help them get where I got, without the mistakes."
    }
  ];

  return (
    <section id="expertise" data-testid="expertise-section" className="dark-section py-24 md:py-32">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Expertise</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight font-serif text-cream mb-16">
            Real Estate. Technology.<br />
            <span className="italic text-taupe">Mentorship.</span>
          </h2>
        </AnimatedSection>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 md:gap-12"
        >
          {expertise.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              data-testid={`expertise-card-${index}`}
              className="border-t border-taupe/30 pt-8"
            >
              <item.icon size={32} weight="thin" className="text-taupe mb-6" />
              <h3 className="text-xl md:text-2xl font-serif text-cream mb-4">{item.title}</h3>
              <p className="text-cream/70 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Insights Section
const InsightsSection = () => {
  const insights = [
    {
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
      title: "First-Time Buyers: 5 Things Nobody Tells You",
      excerpt: "The real estate market can be overwhelming. Here's what you actually need to know before making your first purchase."
    },
    {
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
      title: "Bay Area Market Update: What Smart Investors Are Watching",
      excerpt: "Market trends, pricing insights, and what the data really tells us about where the Bay Area is heading."
    },
    {
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
      title: "The Power of Consistency: Why Your Work Ethic Is Your Biggest Asset",
      excerpt: "In real estate and in life, success isn't about luck — it's about showing up every single day."
    }
  ];

  return (
    <section id="insights" data-testid="insights-section" className="py-24 md:py-32 bg-cream">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Insights</span>
          <h2 className="section-heading mb-4">
            Knowledge That<br />
            <span className="italic text-taupe">Builds Wealth.</span>
          </h2>
          <p className="body-text max-w-2xl mb-16">
            Every line on this site is a bullet point of education. Real estate wisdom, investment fundamentals, and market intelligence — delivered with facts, not opinions.
          </p>
        </AnimatedSection>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {insights.map((item, index) => (
            <motion.article
              key={index}
              variants={fadeUp}
              data-testid={`insight-card-${index}`}
              className="blog-card group cursor-pointer"
            >
              <div className="blog-card-image mb-6 overflow-hidden">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-charcoal mb-3 group-hover:text-taupe transition-colors">
                {item.title}
              </h3>
              <p className="text-charcoal-light text-sm leading-relaxed mb-4">
                {item.excerpt}
              </p>
              <span className="text-xs uppercase tracking-widest text-taupe font-accent inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Read More <ArrowRight size={14} />
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Vision Section
const VisionSection = () => {
  return (
    <section id="vision" data-testid="vision-section" className="py-24 md:py-40 bg-warm-grey relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1608502993651-6f3792f6c0a2?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
          alt="San Francisco Skyline"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <span className="section-label mb-6 block">The Vision</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight font-serif text-charcoal mb-8">
            I Want to Believe in a<br />
            <span className="italic text-taupe">Younger George Out There.</span>
          </h2>
          <p className="text-lg md:text-xl text-charcoal-light leading-relaxed max-w-2xl mx-auto">
            My true heart is to coach and mentor. To find young men and women who feel like they can't conquer — and show them what good consistency looks like. Through GT Real's partnership with Apotimo and the StarTex community, we're committed to giving back. To the community. To the widow. To families in need. Because success means nothing if you can't pull someone else up behind you.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Connect Section
const ConnectSection = () => {
  return (
    <section id="connect" data-testid="connect-section" className="py-24 md:py-32 bg-cream">
      <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label mb-4 block">Let's Connect</span>
          <h2 className="section-heading mb-4">
            Ready to Make<br />
            <span className="italic text-taupe">Your Move?</span>
          </h2>
          <p className="body-text max-w-xl mx-auto">
            Whether you're buying, selling, investing, or just want to have an honest conversation about your future — I'm here.
          </p>
        </AnimatedSection>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <motion.a
            href="tel:+1XXXXXXXXXX"
            variants={fadeUp}
            data-testid="contact-phone"
            className="contact-card flex flex-col items-center gap-4"
          >
            <Phone size={32} weight="thin" className="text-charcoal" />
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal-light mb-2">Call or Text Me</p>
              <p className="text-xl font-serif text-charcoal">[INSERT PHONE]</p>
            </div>
          </motion.a>
          
          <motion.a
            href="mailto:george@gtreal.io"
            variants={fadeUp}
            data-testid="contact-email"
            className="contact-card flex flex-col items-center gap-4"
          >
            <Envelope size={32} weight="thin" className="text-charcoal" />
            <div>
              <p className="text-xs uppercase tracking-widest text-charcoal-light mb-2">Email Me</p>
              <p className="text-xl font-serif text-charcoal">[INSERT EMAIL]</p>
            </div>
          </motion.a>
        </motion.div>
        
        {/* Social Links */}
        <div className="flex justify-center gap-6">
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="social-linkedin"
            className="w-12 h-12 border border-warm-grey flex items-center justify-center hover:border-taupe hover:text-taupe transition-colors"
          >
            <LinkedinLogo size={20} weight="regular" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="social-instagram"
            className="w-12 h-12 border border-warm-grey flex items-center justify-center hover:border-taupe hover:text-taupe transition-colors"
          >
            <InstagramLogo size={20} weight="regular" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-charcoal py-16">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-cream font-accent text-lg tracking-[0.15em] uppercase">GT Real</span>
            <MusicNote size={16} weight="thin" className="text-taupe" />
          </div>
          
          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {['Home', 'Why Me', 'About', 'Insights', 'Connect'].map((link) => (
              <a 
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-cream/60 hover:text-cream transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        
        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/40">
          <p>© 2025 George Toscano. All rights reserved.</p>
          <p>DRE License: [INSERT DRE #]</p>
          <p>Built by Charlotte Software Engineering</p>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  return (
    <div className="App bg-cream">
      <Navigation />
      <main>
        <HeroSection />
        <WhyMeSection />
        <AboutSection />
        <ExpertiseSection />
        <InsightsSection />
        <VisionSection />
        <ConnectSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

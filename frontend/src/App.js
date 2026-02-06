import { useEffect, useState, useRef } from "react";
import "@/App.css";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  MusicNote,
  Play,
  Pause,
  X
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

// Music Player Component
const MusicPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleExpand = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const closePlayer = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
    setIsPlaying(false);
  };

  return (
    <div 
      data-testid="music-player"
      className={`music-player-float ${isExpanded ? 'music-player-expanded' : 'music-player-collapsed'}`}
      onClick={!isExpanded ? toggleExpand : undefined}
    >
      {!isExpanded ? (
        <div className="flex items-center justify-center w-full h-full">
          <MusicNote size={24} weight="fill" className="text-gold animate-pulse" />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MusicNote size={16} weight="fill" className="text-gold" />
              <span className="text-xs uppercase tracking-widest text-gold font-accent">Now Playing</span>
            </div>
            <button 
              onClick={closePlayer}
              data-testid="music-player-close"
              className="text-slate hover:text-ivory transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="aspect-video bg-navy rounded overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/FRV18ivjjN4?autoplay=0&rel=0"
              title="Zildjian Vault Performance - Sean Wright"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-xs text-slate mt-3 text-center">Zildjian Vault Performance</p>
        </div>
      )}
    </div>
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
      <a href="#hero" data-testid="nav-logo" className="text-gold font-accent text-sm tracking-[0.2em] uppercase font-semibold">
        GT Real
      </a>
      
      <div className="hidden md:flex items-center gap-8">
        {[
          { id: 'hero', label: 'Home' },
          { id: 'why-me', label: 'Why Me' },
          { id: 'about', label: 'About' },
          { id: 'expertise', label: 'Expertise' },
          { id: 'connect', label: 'Connect' }
        ].map((item) => (
          <button
            key={item.id}
            data-testid={`nav-${item.id}`}
            onClick={() => scrollToSection(item.id)}
            className="text-ivory/80 text-sm font-sans hover:text-gold transition-colors duration-300 underline-animation"
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <button 
        data-testid="nav-cta"
        onClick={() => scrollToSection('connect')}
        className="bg-gold text-navy px-6 py-2.5 text-xs uppercase tracking-widest font-accent font-medium hover:bg-gold-light transition-colors duration-300"
      >
        Let's Talk
      </button>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="hero" data-testid="hero-section" className="min-h-screen bg-navy pt-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy opacity-50" />
      
      <div className="relative grid md:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-0">
          <AnimatedSection>
            <span className="section-label mb-6">Realtor · Technologist · Musician</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight font-serif text-ivory leading-[0.95] mb-8">
              Your Home.<br />
              Your Future.<br />
              <span className="italic text-gold">Handled With Care.</span>
            </h1>
            <p className="body-text max-w-lg mb-10">
              I'm George Toscano — a Bay Area real estate professional with deep roots in healthcare technology and over 25 years as a professional musician. I bring precision, passion, and heart to every transaction.
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
              <span>Stanford Health</span>
              <span>25+ Years Music</span>
              <span>Kollab Real Estate</span>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Right Image */}
        <div className="relative h-[50vh] md:h-auto overflow-hidden hero-image-overlay">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200"
            alt="Luxury Bay Area Home"
            data-testid="hero-image"
            className="w-full h-full object-cover image-hover-color"
          />
          <div className="absolute bottom-8 right-8 bg-navy/90 backdrop-blur-sm p-6 max-w-xs hidden lg:block border border-gold/20">
            <p className="text-sm text-slate italic font-serif">
              "Dedicated to every client. As if you were a patient."
            </p>
          </div>
        </div>
      </div>
      
      {/* Marquee */}
      <div className="bg-navy-light py-4 overflow-hidden border-y border-gold/10">
        <div className="marquee-container">
          <div className="marquee-content">
            {Array(3).fill([
              'Real Estate', 'Healthcare Technology', 'Stanford Health', 
              'Music Production', 'Bay Area Expert', 'Startup Investor'
            ]).flat().map((item, i) => (
              <span key={i} className="text-gold/60 text-sm uppercase tracking-widest mx-8 font-accent">
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
      title: "Precision & Excellence",
      description: "From Stanford Children's Health to your home purchase — I operate with the same precision and attention to detail that saves lives."
    },
    {
      icon: ChartLineUp,
      title: "Data-Driven Decisions",
      description: "20+ years in technology taught me to leverage data, analytics, and market intelligence to give you a competitive edge."
    },
    {
      icon: Heart,
      title: "Heart-First Service",
      description: "Dedicated to every client as if you were a patient. That's not a tagline — that's my operating system."
    }
  ];

  return (
    <section id="why-me" data-testid="why-me-section" className="py-24 md:py-32 bg-navy-light">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Why Choose Me</span>
          <h2 className="section-heading mb-8">
            Where Healthcare Precision<br />
            <span className="italic text-gold">Meets Real Estate Excellence.</span>
          </h2>
          <p className="body-text max-w-2xl mb-16">
            Everything I have, I earned through relentless consistency and an unwavering commitment to people. My background in healthcare technology at Stanford taught me what it means to truly care — to operate with urgency, precision, and compassion.
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
                <card.icon size={28} weight="thin" className="text-gold" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-normal text-ivory mb-4">{card.title}</h3>
              <p className="text-slate leading-relaxed">{card.description}</p>
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
    { value: "20+", label: "Years Tech" },
    { value: "25+", label: "Years Music" },
    { value: "100%", label: "Commitment" }
  ];

  return (
    <section id="about" data-testid="about-section" className="py-24 md:py-32 bg-navy">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <AnimatedSection className="order-2 md:order-1">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                alt="George Toscano"
                data-testid="about-image"
                className="w-full aspect-[4/5] object-cover image-hover-color"
              />
              <div className="absolute -bottom-6 -right-6 bg-gold text-navy p-8 hidden lg:block">
                <div className="flex gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-serif font-semibold">{stat.value}</p>
                      <p className="text-xs uppercase tracking-widest text-navy/70 mt-1">{stat.label}</p>
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
              Built Through<br />
              <span className="italic text-gold">Discipline & Heart.</span>
            </h2>
            
            <div className="space-y-6 body-text">
              <p>
                I've spent over 25 years as a professional musician across the Bay Area — performing, leading, serving communities through music. That discipline shaped me. Music taught me to listen, to feel the room, to know when to lead and when to follow.
              </p>
              <p>
                My career in healthcare technology brought me to Stanford Children's Health and Sutter Health, where I developed a technologist's mind for systems, data, and problem-solving while supporting critical medical environments.
              </p>
              <p>
                Now as a Licensed Real Estate Professional with Kollab Real Estate, I combine all of these worlds — technology, heart, hustle. I'm not just helping you buy or sell a home — I'm helping you build a future.
              </p>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Mobile Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 md:hidden">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <p className="text-2xl font-serif text-gold">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-slate mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Expertise Section
const ExpertiseSection = () => {
  const expertise = [
    {
      icon: Buildings,
      title: "Real Estate",
      description: "Bay Area residential and investment properties. Licensed professional with Kollab Real Estate, bringing healthcare-level precision to every transaction."
    },
    {
      icon: Cpu,
      title: "Technology",
      description: "20+ years in healthcare tech at Stanford Children's Health, Sutter Health, and Kaiser Permanente. I leverage data and modern tools to give you an edge."
    },
    {
      icon: UsersThree,
      title: "Startup Investor",
      description: "Active investor in Bay Area startups. Understanding market dynamics, valuations, and growth potential — insights I bring to your real estate decisions."
    }
  ];

  return (
    <section id="expertise" data-testid="expertise-section" className="gold-section py-24 md:py-32">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Expertise</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight font-serif text-ivory mb-16">
            Real Estate. Technology.<br />
            <span className="italic text-gold">Investment.</span>
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
              className="border-t border-gold/30 pt-8"
            >
              <item.icon size={36} weight="thin" className="text-gold mb-6" />
              <h3 className="text-xl md:text-2xl font-serif text-ivory mb-4">{item.title}</h3>
              <p className="text-slate leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const experiences = [
    {
      company: "Kollab Real Estate",
      role: "Licensed Real Estate Professional",
      period: "2025 - Present",
      location: "San Francisco Bay Area"
    },
    {
      company: "Stanford Children's Health",
      role: "Technology",
      period: "2023 - Present",
      location: "Stanford, CA"
    },
    {
      company: "Sutter Health",
      role: "Technology",
      period: "2017 - 2022",
      location: "San Francisco Bay Area"
    },
    {
      company: "Vudu - Movies & TV",
      role: "QA Team Lead",
      period: "2005 - 2010",
      location: "Santa Clara, CA"
    }
  ];

  return (
    <section id="experience" data-testid="experience-section" className="py-24 md:py-32 bg-navy">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Experience</span>
          <h2 className="section-heading mb-16">
            A Career Built On<br />
            <span className="italic text-gold">Excellence.</span>
          </h2>
        </AnimatedSection>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-0"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              data-testid={`experience-${index}`}
              className="py-8 border-b border-navy-lighter group hover:bg-navy-light/50 transition-colors px-4 -mx-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-ivory group-hover:text-gold transition-colors">{exp.company}</h3>
                  <p className="text-slate mt-1">{exp.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-gold font-accent text-sm tracking-wider">{exp.period}</p>
                  <p className="text-slate-dark text-sm">{exp.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Vision Section
const VisionSection = () => {
  return (
    <section id="vision" data-testid="vision-section" className="py-24 md:py-40 bg-navy-light relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
          alt="San Francisco Bay"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-light via-navy-light/80 to-navy-light" />
      
      <div className="relative px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <span className="section-label mb-6 block">The Vision</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight font-serif text-ivory mb-8">
            Building Futures,<br />
            <span className="italic text-gold">One Home at a Time.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate leading-relaxed max-w-2xl mx-auto">
            Whether you're buying your first home, investing in property, or making a strategic move — I bring the same dedication that guided me through 20+ years in healthcare technology. Your future matters, and I treat it that way.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Connect Section
const ConnectSection = () => {
  return (
    <section id="connect" data-testid="connect-section" className="py-24 md:py-32 bg-navy">
      <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label mb-4 block">Let's Connect</span>
          <h2 className="section-heading mb-4">
            Ready to Make<br />
            <span className="italic text-gold">Your Move?</span>
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
            href="tel:4086036603"
            variants={fadeUp}
            data-testid="contact-phone"
            className="contact-card flex flex-col items-center gap-4"
          >
            <Phone size={32} weight="thin" className="text-gold" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate mb-2">Call or Text Me</p>
              <p className="text-xl font-serif text-ivory">(408) 603-6603</p>
            </div>
          </motion.a>
          
          <motion.a
            href="mailto:gtdrums@gmail.com"
            variants={fadeUp}
            data-testid="contact-email"
            className="contact-card flex flex-col items-center gap-4"
          >
            <Envelope size={32} weight="thin" className="text-gold" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate mb-2">Email Me</p>
              <p className="text-xl font-serif text-ivory">gtdrums@gmail.com</p>
            </div>
          </motion.a>
        </motion.div>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <a 
            href="https://www.linkedin.com/in/george-toscano-6b979821" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="social-linkedin"
            className="social-btn"
          >
            <LinkedinLogo size={22} weight="regular" />
          </a>
          <a 
            href="https://instagram.com/gtreal.io" 
            target="_blank" 
            rel="noopener noreferrer"
            data-testid="social-instagram"
            className="social-btn"
          >
            <InstagramLogo size={22} weight="regular" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-navy-light py-16 border-t border-gold/10">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-gold font-accent text-lg tracking-[0.15em] uppercase font-semibold">GT Real</span>
            <MusicNote size={16} weight="thin" className="text-gold/50" />
          </div>
          
          {/* Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {['Home', 'Why Me', 'About', 'Expertise', 'Connect'].map((link) => (
              <a 
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-slate hover:text-gold transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        
        {/* Divider */}
        <div className="gold-divider my-8" />
        
        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-dark">
          <p>© 2025 George Toscano. All rights reserved.</p>
          <p>DRE License: [Pending]</p>
          <p>Kollab Real Estate · San Francisco Bay Area</p>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  return (
    <div className="App bg-navy">
      <Navigation />
      <main>
        <HeroSection />
        <WhyMeSection />
        <AboutSection />
        <ExpertiseSection />
        <ExperienceSection />
        <VisionSection />
        <ConnectSection />
      </main>
      <Footer />
      <MusicPlayer />
    </div>
  );
}

export default App;

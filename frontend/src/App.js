import { useEffect, useState, useRef } from "react";
import "@/App.css";
import { motion, useInView } from "framer-motion";
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

  const toggleExpand = () => {
    if (!isExpanded) setIsExpanded(true);
  };

  const closePlayer = (e) => {
    e.stopPropagation();
    setIsExpanded(false);
  };

  return (
    <div 
      data-testid="music-player"
      className={`music-player-float ${isExpanded ? 'music-player-expanded' : 'music-player-collapsed animate-pulse-green'}`}
      onClick={!isExpanded ? toggleExpand : undefined}
    >
      {!isExpanded ? (
        <div className="flex items-center justify-center w-full h-full">
          <MusicNote size={28} weight="fill" className="text-monster-green" />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MusicNote size={18} weight="fill" className="text-monster-green" />
              <span className="text-xs uppercase tracking-widest text-monster-green font-accent font-bold">Now Playing</span>
            </div>
            <button 
              onClick={closePlayer}
              data-testid="music-player-close"
              className="text-monster-silver hover:text-monster-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="aspect-video bg-monster-black rounded overflow-hidden border border-monster-green/30">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/FRV18ivjjN4?rel=0"
              title="Zildjian Vault Performance - Sean Wright"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <p className="text-xs text-monster-silver mt-3 text-center">Zildjian Vault Performance</p>
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
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav 
      data-testid="navigation"
      className={`fixed top-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300 nav-glass ${scrolled ? 'nav-scrolled' : ''}`}
    >
      <a href="#hero" data-testid="nav-logo" className="text-monster-green font-accent text-sm tracking-[0.25em] uppercase font-bold text-glow">
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
            className="text-monster-white/80 text-sm font-sans hover:text-monster-green transition-colors duration-300 underline-animation"
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <button 
        data-testid="nav-cta"
        onClick={() => scrollToSection('connect')}
        className="bg-monster-green text-monster-black px-6 py-2.5 text-xs uppercase tracking-widest font-accent font-bold hover:bg-monster-green-light hover:shadow-[0_0_20px_rgba(149,214,0,0.4)] transition-all duration-300"
      >
        Let's Talk
      </button>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="hero" data-testid="hero-section" className="min-h-screen bg-monster-black pt-20 relative overflow-hidden drum-pattern">
      <div className="relative grid md:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-0">
          <AnimatedSection>
            <span className="section-label mb-6">Realtor · Technologist · Drummer</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight font-serif text-monster-white leading-[0.95] mb-8">
              Your Home.<br />
              Your Future.<br />
              <span className="italic text-monster-green text-glow-animate">Unleash The Beast.</span>
            </h1>
            <p className="body-text max-w-lg mb-10">
              I'm George Toscano — a Bay Area real estate professional with deep roots in healthcare technology and 25+ years behind the drums. Precision. Passion. Power. I bring it all to every deal.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <a 
                href="#connect" 
                data-testid="hero-cta-primary"
                className="btn-primary inline-flex items-center gap-2"
              >
                Work With Me <ArrowRight size={16} weight="bold" />
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
              <span>25+ Years Drumming</span>
              <span>Tama · Zildjian · Vater</span>
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
          <div className="absolute bottom-8 right-8 bg-monster-black/95 backdrop-blur-sm p-6 max-w-xs hidden lg:block border-2 border-monster-green/30">
            <p className="text-sm text-monster-silver italic font-serif">
              "Dedicated to every client. As if you were a patient."
            </p>
          </div>
        </div>
      </div>
      
      {/* Marquee */}
      <div className="bg-monster-dark py-4 overflow-hidden border-y-2 border-monster-green/20">
        <div className="marquee-container">
          <div className="marquee-content">
            {Array(3).fill([
              'Real Estate', 'Healthcare Tech', 'Tama Drums', 
              'Zildjian Cymbals', 'Vater Sticks', 'Bay Area Expert', 'Startup Investor'
            ]).flat().map((item, i) => (
              <span key={i} className="text-monster-green/70 text-sm uppercase tracking-widest mx-8 font-accent font-bold">
                {item} ⚡
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
      title: "Precision & Power",
      description: "From Stanford Children's Health to the drum kit to your home purchase — I operate with the same precision and intensity that makes the difference."
    },
    {
      icon: ChartLineUp,
      title: "Data-Driven Decisions",
      description: "20+ years in technology taught me to leverage data, analytics, and market intelligence. Information is power. I give you the edge."
    },
    {
      icon: Heart,
      title: "Heart-First Service",
      description: "Dedicated to every client as if you were a patient. That's not marketing — that's my operating system. Period."
    }
  ];

  return (
    <section id="why-me" data-testid="why-me-section" className="py-24 md:py-32 bg-monster-dark green-accent-section">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Why Choose Me</span>
          <h2 className="section-heading mb-8">
            Where Healthcare Precision<br />
            <span className="italic text-monster-green text-glow">Meets Raw Energy.</span>
          </h2>
          <p className="body-text max-w-2xl mb-16">
            Everything I have, I earned through relentless consistency. 25+ years behind the kit taught me discipline. Healthcare tech taught me precision. Real estate is where I bring it all together.
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
                <card.icon size={30} weight="bold" className="text-monster-green" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-normal text-monster-white mb-4">{card.title}</h3>
              <p className="text-monster-silver leading-relaxed">{card.description}</p>
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
    { value: "25+", label: "Years Drums" },
    { value: "100%", label: "Commitment" }
  ];

  return (
    <section id="about" data-testid="about-section" className="py-24 md:py-32 bg-monster-black">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image */}
          <AnimatedSection className="order-2 md:order-1">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                alt="George Toscano"
                data-testid="about-image"
                className="w-full aspect-[4/5] object-cover image-hover-color border-2 border-monster-gray"
              />
              <div className="absolute -bottom-6 -right-6 bg-monster-green text-monster-black p-8 hidden lg:block">
                <div className="flex gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-serif font-bold">{stat.value}</p>
                      <p className="text-xs uppercase tracking-widest text-monster-black/70 mt-1 font-bold">{stat.label}</p>
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
              <span className="italic text-monster-green text-glow">Discipline & Energy.</span>
            </h2>
            
            <div className="space-y-6 body-text">
              <p>
                I've spent over 25 years as a professional drummer across the Bay Area — Tama drums, Zildjian cymbals, Vater sticks. That discipline shaped me. Music taught me timing, feel, and when to drive hard.
              </p>
              <p>
                My career in healthcare technology brought me to Stanford Children's Health and Sutter Health, where I developed a technologist's mind for systems, data, and critical problem-solving.
              </p>
              <p>
                Now as a Licensed Real Estate Professional with Kollab Real Estate, I combine all of these worlds. Technology. Heart. Raw energy. I'm not just helping you buy or sell a home — I'm helping you unleash your future.
              </p>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Mobile Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 md:hidden">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <p className="text-2xl font-serif text-monster-green font-bold">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-monster-silver mt-1">{stat.label}</p>
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
      description: "Bay Area residential and investment properties. Licensed professional with Kollab Real Estate, bringing healthcare-level precision and drummer's intensity to every transaction."
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
    <section id="expertise" data-testid="expertise-section" className="green-accent-section py-24 md:py-32">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Expertise</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight font-serif text-monster-white mb-16">
            Real Estate. Technology.<br />
            <span className="italic text-monster-green text-glow">Investment.</span>
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
              className="border-t-2 border-monster-green/40 pt-8"
            >
              <item.icon size={40} weight="bold" className="text-monster-green mb-6" />
              <h3 className="text-xl md:text-2xl font-serif text-monster-white mb-4">{item.title}</h3>
              <p className="text-monster-silver leading-relaxed">{item.description}</p>
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
    { company: "Kollab Real Estate", role: "Licensed Real Estate Professional", period: "2025 - Present", location: "San Francisco Bay Area" },
    { company: "Stanford Children's Health", role: "Technology", period: "2023 - Present", location: "Stanford, CA" },
    { company: "Sutter Health", role: "Technology", period: "2017 - 2022", location: "San Francisco Bay Area" },
    { company: "Vudu - Movies & TV", role: "QA Team Lead", period: "2005 - 2010", location: "Santa Clara, CA" }
  ];

  return (
    <section id="experience" data-testid="experience-section" className="py-24 md:py-32 bg-monster-black">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Experience</span>
          <h2 className="section-heading mb-16">
            A Career Built On<br />
            <span className="italic text-monster-green text-glow">Excellence.</span>
          </h2>
        </AnimatedSection>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              data-testid={`experience-${index}`}
              className="py-8 border-b border-monster-gray group hover:bg-monster-dark/50 transition-colors px-4 -mx-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-monster-white group-hover:text-monster-green transition-colors">{exp.company}</h3>
                  <p className="text-monster-silver mt-1">{exp.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-monster-green font-accent text-sm tracking-wider font-bold">{exp.period}</p>
                  <p className="text-monster-silver/60 text-sm">{exp.location}</p>
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
    <section id="vision" data-testid="vision-section" className="py-24 md:py-40 bg-monster-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920" alt="San Francisco Bay" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-monster-dark via-monster-dark/90 to-monster-dark" />
      
      <div className="relative px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <span className="section-label mb-6 block">The Vision</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight font-serif text-monster-white mb-8">
            Building Futures,<br />
            <span className="italic text-monster-green text-glow-animate">One Home at a Time.</span>
          </h2>
          <p className="text-lg md:text-xl text-monster-silver leading-relaxed max-w-2xl mx-auto">
            Whether you're buying your first home, investing in property, or making a strategic move — I bring the same energy that's driven me through 25+ years behind the kit. Your future matters, and I attack it with everything I've got.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Connect Section
const ConnectSection = () => {
  return (
    <section id="connect" data-testid="connect-section" className="py-24 md:py-32 bg-monster-black">
      <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <span className="section-label mb-4 block">Let's Connect</span>
          <h2 className="section-heading mb-4">
            Ready to Make<br />
            <span className="italic text-monster-green text-glow">Your Move?</span>
          </h2>
          <p className="body-text max-w-xl mx-auto">
            Whether you're buying, selling, investing, or just want to talk drums and real estate — I'm here. Let's unleash your future.
          </p>
        </AnimatedSection>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.a href="tel:4086036603" variants={fadeUp} data-testid="contact-phone" className="contact-card flex flex-col items-center gap-4">
            <Phone size={36} weight="bold" className="text-monster-green" />
            <div>
              <p className="text-xs uppercase tracking-widest text-monster-silver mb-2 font-bold">Call or Text Me</p>
              <p className="text-xl font-serif text-monster-white">(408) 603-6603</p>
            </div>
          </motion.a>
          
          <motion.a href="mailto:gtdrums@gmail.com" variants={fadeUp} data-testid="contact-email" className="contact-card flex flex-col items-center gap-4">
            <Envelope size={36} weight="bold" className="text-monster-green" />
            <div>
              <p className="text-xs uppercase tracking-widest text-monster-silver mb-2 font-bold">Email Me</p>
              <p className="text-xl font-serif text-monster-white">gtdrums@gmail.com</p>
            </div>
          </motion.a>
        </motion.div>
        
        <div className="flex justify-center gap-4">
          <a href="https://www.linkedin.com/in/george-toscano-6b979821" target="_blank" rel="noopener noreferrer" data-testid="social-linkedin" className="social-btn">
            <LinkedinLogo size={24} weight="bold" />
          </a>
          <a href="https://instagram.com/gtreal.io" target="_blank" rel="noopener noreferrer" data-testid="social-instagram" className="social-btn">
            <InstagramLogo size={24} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-monster-darker py-16 border-t-2 border-monster-green/20">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-monster-green font-accent text-lg tracking-[0.2em] uppercase font-bold text-glow">GT Real</span>
            <MusicNote size={18} weight="fill" className="text-monster-green/60" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {['Home', 'Why Me', 'About', 'Expertise', 'Connect'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-monster-silver hover:text-monster-green transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
        
        <div className="green-divider my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-monster-silver/60">
          <p>© 2025 George Toscano. All rights reserved.</p>
          <p className="text-monster-green/60">Powered by Tama · Zildjian · Vater · Monster Energy</p>
          <p>Kollab Real Estate · San Francisco Bay Area</p>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  return (
    <div className="App bg-monster-black">
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

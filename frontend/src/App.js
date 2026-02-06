import { useEffect, useState, useRef, createContext, useContext } from "react";
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
  X,
  Play,
  Pause,
  Sun,
  Moon
} from "@phosphor-icons/react";

// Theme Context
const ThemeContext = createContext();

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  
  const toggleTheme = () => setIsDark(!isDark);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'theme-dark' : 'theme-light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

// Animated section wrapper
const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
};

// Audio Player Component (Audio-only style with working YouTube)
const AudioPlayer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const playerContainerRef = useRef(null);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Initialize player when expanded
  useEffect(() => {
    if (isExpanded && !player && window.YT && window.YT.Player) {
      const newPlayer = new window.YT.Player('yt-player', {
        height: '1',
        width: '1',
        videoId: 'FRV18ivjjN4',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => setPlayer(newPlayer),
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            }
          }
        }
      });
    } else if (isExpanded && !player) {
      // If YT API not ready yet, wait and retry
      window.onYouTubeIframeAPIReady = () => {
        const newPlayer = new window.YT.Player('yt-player', {
          height: '1',
          width: '1',
          videoId: 'FRV18ivjjN4',
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: () => setPlayer(newPlayer),
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
              }
            }
          }
        });
      };
    }
  }, [isExpanded, player]);

  const togglePlay = () => {
    if (player && player.playVideo && player.pauseVideo) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const closePlayer = (e) => {
    e.stopPropagation();
    if (player && player.pauseVideo) {
      player.pauseVideo();
    }
    setIsPlaying(false);
    setIsExpanded(false);
  };

  return (
    <div 
      data-testid="music-player"
      className={`music-player-float ${isExpanded ? 'music-player-expanded-audio' : 'music-player-collapsed'}`}
      onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
    >
      {!isExpanded ? (
        <div className="flex items-center justify-center w-full h-full animate-pulse-green cursor-pointer">
          <MusicNote size={28} weight="fill" className="text-monster-green" />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MusicNote size={18} weight="fill" className="text-monster-green" />
              <span className="text-xs uppercase tracking-widest text-monster-green font-accent font-bold">
                {isPlaying ? 'Now Playing' : 'Music'}
              </span>
            </div>
            <button onClick={closePlayer} data-testid="music-player-close" className="text-current opacity-60 hover:opacity-100 transition-opacity">
              <X size={20} />
            </button>
          </div>
          
          {/* Audio-only style player */}
          <div className="flex items-center gap-4 p-4 bg-monster-green/5 rounded-lg border border-monster-green/30">
            <button 
              onClick={togglePlay}
              data-testid="audio-play-btn"
              className={`w-14 h-14 flex items-center justify-center bg-monster-green text-monster-black rounded-full hover:bg-monster-green-light transition-all ${isPlaying ? 'animate-pulse shadow-[0_0_20px_rgba(149,214,0,0.5)]' : ''}`}
            >
              {isPlaying ? <Pause size={24} weight="fill" /> : <Play size={24} weight="fill" className="ml-1" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">Zildjian Vault Performance</p>
              <p className="text-xs opacity-60">Sean Wright</p>
              {isPlaying && (
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-monster-green rounded-full animate-pulse"
                      style={{ 
                        height: `${Math.random() * 12 + 8}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Hidden YouTube player container */}
          <div className="absolute -left-[9999px]" ref={playerContainerRef}>
            <div id="yt-player"></div>
          </div>
          
          <p className="text-xs opacity-50 mt-3 text-center">🥁 George's favorite drum performance</p>
        </div>
      )}
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <button
      data-testid="theme-toggle"
      onClick={toggleTheme}
      className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-monster-green/30 hover:border-monster-green hover:bg-monster-green/10 transition-all"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} className="text-monster-green" /> : <Moon size={18} className="text-monster-green" />}
    </button>
  );
};

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isDark } = useTheme();
  
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
            className="nav-link text-sm font-sans hover:text-monster-green transition-colors duration-300 underline-animation"
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button 
          data-testid="nav-cta"
          onClick={() => scrollToSection('connect')}
          className="bg-monster-green text-monster-black px-6 py-2.5 text-xs uppercase tracking-widest font-accent font-bold hover:bg-monster-green-light hover:shadow-[0_0_20px_rgba(149,214,0,0.4)] transition-all duration-300"
        >
          Let's Talk
        </button>
      </div>
    </nav>
  );
};

// Quick Contact Bar
const QuickContactBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-monster-black/95 backdrop-blur-md border-t-2 border-monster-green/30 p-4">
      <div className="flex items-center justify-center gap-4">
        <a href="tel:4086036603" className="flex-1 btn-primary text-center text-xs py-3">
          <Phone size={16} className="inline mr-2" /> Call Now
        </a>
        <a href="sms:4086036603" className="flex-1 btn-secondary text-center text-xs py-3">
          Text Me
        </a>
      </div>
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="hero" data-testid="hero-section" className="min-h-screen section-bg pt-20 relative overflow-hidden drum-pattern">
      <div className="relative grid md:grid-cols-2 min-h-[calc(100vh-5rem)]">
        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 md:py-0">
          <AnimatedSection>
            <span className="section-label mb-6">Realtor · Technologist · Drummer</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight font-serif heading-color leading-[0.95] mb-8">
              Your Home.<br />
              Your Future.<br />
              <span className="italic text-monster-green text-glow-animate">Unleash The Beast.</span>
            </h1>
            <p className="body-text max-w-lg mb-8">
              I'm George Toscano — a Bay Area real estate professional with deep roots in healthcare technology and 25+ years behind the drums. Precision. Passion. Power. I bring it all to every deal.
            </p>
            
            {/* Contact CTA - More prominent */}
            <div className="bg-monster-green/10 border-2 border-monster-green/40 p-6 mb-8 max-w-md">
              <p className="text-monster-green font-bold text-lg mb-2">Ready to make your move?</p>
              <p className="text-sm mb-4 body-text">DM me, text me, or shoot me an email — let's chat about your future.</p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:4086036603" className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-2">
                  <Phone size={14} weight="bold" /> (408) 603-6603
                </a>
                <a href="mailto:gtdrums@gmail.com" className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-2">
                  <Envelope size={14} weight="bold" /> Email
                </a>
                <a href="https://www.linkedin.com/in/george-toscano-6b979821" target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-2">
                  <LinkedinLogo size={14} weight="bold" /> LinkedIn
                </a>
              </div>
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
          <div className="absolute bottom-8 right-8 card-bg backdrop-blur-sm p-6 max-w-xs hidden lg:block border-2 border-monster-green/30">
            <p className="text-sm body-text italic font-serif">
              "Dedicated to every client. As if you were a patient."
            </p>
          </div>
        </div>
      </div>
      
      {/* Marquee */}
      <div className="marquee-bg py-4 overflow-hidden border-y-2 border-monster-green/20">
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
    <section id="why-me" data-testid="why-me-section" className="py-24 md:py-32 section-bg-alt green-accent-section">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Why Choose Me</span>
          <h2 className="section-heading heading-color mb-8">
            Where Healthcare Precision<br />
            <span className="italic text-monster-green text-glow">Meets Raw Energy.</span>
          </h2>
          <p className="body-text max-w-2xl mb-16">
            Everything I have, I earned through relentless consistency. 25+ years behind the kit taught me discipline. Healthcare tech taught me precision. Real estate is where I bring it all together.
          </p>
        </AnimatedSection>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div key={index} variants={fadeUp} data-testid={`value-card-${index}`} className="card-editorial card-lift">
              <div className="icon-container">
                <card.icon size={30} weight="bold" className="text-monster-green" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-normal heading-color mb-4">{card.title}</h3>
              <p className="body-text leading-relaxed">{card.description}</p>
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
    <section id="about" data-testid="about-section" className="py-24 md:py-32 section-bg">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <AnimatedSection className="order-2 md:order-1">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                alt="George Toscano"
                data-testid="about-image"
                className="w-full aspect-[4/5] object-cover image-hover-color border-2 border-monster-green/20"
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
          
          <AnimatedSection className="order-1 md:order-2">
            <span className="section-label mb-4 block">My Story</span>
            <h2 className="section-heading heading-color mb-8">
              Built Through<br />
              <span className="italic text-monster-green text-glow">Discipline & Energy.</span>
            </h2>
            
            <div className="space-y-6 body-text">
              <p>I've spent over 25 years as a professional drummer across the Bay Area — Tama drums, Zildjian cymbals, Vater sticks. That discipline shaped me.</p>
              <p>My career in healthcare technology brought me to Stanford Children's Health and Sutter Health, where I developed a technologist's mind for systems and critical problem-solving.</p>
              <p>Now as a Licensed Real Estate Professional with Kollab Real Estate, I combine all of these worlds. Technology. Heart. Raw energy.</p>
            </div>
            
            {/* Contact CTA in About */}
            <div className="mt-8 p-4 border-l-4 border-monster-green bg-monster-green/5">
              <p className="font-bold text-monster-green mb-2">Let's connect!</p>
              <p className="text-sm body-text mb-3">Text me at <a href="sms:4086036603" className="text-monster-green hover:underline font-bold">(408) 603-6603</a> or email <a href="mailto:gtdrums@gmail.com" className="text-monster-green hover:underline font-bold">gtdrums@gmail.com</a></p>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Mobile Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12 md:hidden">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <p className="text-2xl font-serif text-monster-green font-bold">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest body-text mt-1">{stat.label}</p>
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
    { icon: Buildings, title: "Real Estate", description: "Bay Area residential and investment properties. Licensed professional with Kollab Real Estate, bringing healthcare-level precision to every transaction." },
    { icon: Cpu, title: "Technology", description: "20+ years in healthcare tech at Stanford Children's Health, Sutter Health, and Kaiser Permanente. I leverage data and modern tools to give you an edge." },
    { icon: UsersThree, title: "Startup Investor", description: "Active investor in Bay Area startups. Understanding market dynamics, valuations, and growth potential — insights I bring to your real estate decisions." }
  ];

  return (
    <section id="expertise" data-testid="expertise-section" className="green-accent-section py-24 md:py-32 section-bg-alt">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Expertise</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight font-serif heading-color mb-16">
            Real Estate. Technology.<br />
            <span className="italic text-monster-green text-glow">Investment.</span>
          </h2>
        </AnimatedSection>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-8 md:gap-12">
          {expertise.map((item, index) => (
            <motion.div key={index} variants={fadeUp} data-testid={`expertise-card-${index}`} className="border-t-2 border-monster-green/40 pt-8">
              <item.icon size={40} weight="bold" className="text-monster-green mb-6" />
              <h3 className="text-xl md:text-2xl font-serif heading-color mb-4">{item.title}</h3>
              <p className="body-text leading-relaxed">{item.description}</p>
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
    <section id="experience" data-testid="experience-section" className="py-24 md:py-32 section-bg">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="section-label mb-4 block">Experience</span>
          <h2 className="section-heading heading-color mb-16">
            A Career Built On<br />
            <span className="italic text-monster-green text-glow">Excellence.</span>
          </h2>
        </AnimatedSection>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.div key={index} variants={fadeUp} data-testid={`experience-${index}`} className="py-8 border-b border-current/10 group hover:bg-monster-green/5 transition-colors px-4 -mx-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif heading-color group-hover:text-monster-green transition-colors">{exp.company}</h3>
                  <p className="body-text mt-1">{exp.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-monster-green font-accent text-sm tracking-wider font-bold">{exp.period}</p>
                  <p className="body-text text-sm opacity-60">{exp.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Connect Section
const ConnectSection = () => {
  return (
    <section id="connect" data-testid="connect-section" className="py-24 md:py-32 section-bg pb-32 md:pb-24">
      <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <span className="section-label mb-4 block">Let's Connect</span>
          <h2 className="section-heading heading-color mb-4">
            Ready to Make<br />
            <span className="italic text-monster-green text-glow">Your Move?</span>
          </h2>
          <p className="body-text max-w-xl mx-auto mb-6">
            Whether you're buying, selling, investing, or just want to talk drums and real estate — I'm here.
          </p>
          <p className="text-2xl md:text-3xl font-serif text-monster-green text-glow font-semibold">
            Text me today! <a href="sms:4086036603" className="hover:underline">(408) 603-6603</a>
          </p>
        </AnimatedSection>
        
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid md:grid-cols-3 gap-4 mb-12">
          <motion.a href="tel:4086036603" variants={fadeUp} data-testid="contact-phone" className="contact-card flex flex-col items-center gap-3 py-8">
            <Phone size={32} weight="bold" className="text-monster-green" />
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest body-text mb-1 font-bold">Call Me</p>
              <p className="text-lg font-serif heading-color">(408) 603-6603</p>
            </div>
          </motion.a>
          
          <motion.a href="mailto:gtdrums@gmail.com" variants={fadeUp} data-testid="contact-email" className="contact-card flex flex-col items-center gap-3 py-8">
            <Envelope size={32} weight="bold" className="text-monster-green" />
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest body-text mb-1 font-bold">Email Me</p>
              <p className="text-lg font-serif heading-color">gtdrums@gmail.com</p>
            </div>
          </motion.a>
          
          <motion.a href="https://www.linkedin.com/in/george-toscano-6b979821" target="_blank" rel="noopener noreferrer" variants={fadeUp} data-testid="contact-linkedin" className="contact-card flex flex-col items-center gap-3 py-8">
            <LinkedinLogo size={32} weight="bold" className="text-monster-green" />
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest body-text mb-1 font-bold">Connect</p>
              <p className="text-lg font-serif heading-color">LinkedIn</p>
            </div>
          </motion.a>
        </motion.div>
        
        <div className="text-center">
          <p className="body-text text-sm mb-4">Or find me on social:</p>
          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/george-toscano-6b979821" target="_blank" rel="noopener noreferrer" data-testid="social-linkedin" className="social-btn">
              <LinkedinLogo size={24} weight="bold" />
            </a>
            <a href="https://instagram.com/gtreal.io" target="_blank" rel="noopener noreferrer" data-testid="social-instagram" className="social-btn">
              <InstagramLogo size={24} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer data-testid="footer" className="footer-bg py-16 border-t-2 border-monster-green/20">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="text-monster-green font-accent text-lg tracking-[0.2em] uppercase font-bold text-glow">GT Real</span>
            <MusicNote size={18} weight="fill" className="text-monster-green/60" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {['Home', 'Why Me', 'About', 'Expertise', 'Connect'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} className="body-text hover:text-monster-green transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
        
        <div className="green-divider my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs body-text opacity-60">
          <p>© 2025 George Toscano. All rights reserved.</p>
          <p className="text-monster-green/80">Powered by Tama · Zildjian · Vater · Monster Energy</p>
          <p>Kollab Real Estate · San Francisco Bay Area</p>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navigation />
        <main>
          <HeroSection />
          <WhyMeSection />
          <AboutSection />
          <ExpertiseSection />
          <ExperienceSection />
          <ConnectSection />
        </main>
        <Footer />
        <AudioPlayer />
        <QuickContactBar />
      </div>
    </ThemeProvider>
  );
}

export default App;

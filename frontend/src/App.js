import { useEffect, useState, useRef, createContext, useContext } from "react";
import "@/App.css";
import { motion, useInView } from "framer-motion";
import { 
  House,
  ChartLineUp,
  Handshake,
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
  Moon,
  MapPin,
  Target,
  Heart
} from "@phosphor-icons/react";

// Theme Context
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const AnimatedSection = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
};

// Audio Player - New music: JfY9owmt1eQ
const AudioPlayer = () => {
  const { isDark } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  }, []);

  useEffect(() => {
    if (isExpanded && !player) {
      const initPlayer = () => {
        if (window.YT?.Player) {
          const newPlayer = new window.YT.Player('yt-player', {
            height: '1', width: '1', videoId: 'JfY9owmt1eQ',
            playerVars: { autoplay: 0, controls: 0, rel: 0 },
            events: {
              onReady: () => setPlayer(newPlayer),
              onStateChange: (e) => { if (e.data === window.YT.PlayerState.ENDED) setIsPlaying(false); }
            }
          });
        }
      };
      if (window.YT?.Player) initPlayer();
      else window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, [isExpanded, player]);

  const togglePlay = () => {
    if (player?.playVideo && player?.pauseVideo) {
      isPlaying ? player.pauseVideo() : player.playVideo();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      data-testid="music-player" 
      className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${
        isDark 
          ? 'bg-monster-dark border-2 border-monster-green/40 rounded-lg' 
          : 'bg-white border border-gray-200 rounded-full shadow-lg'
      } ${isExpanded ? 'w-72 rounded-xl' : 'w-14 h-14 cursor-pointer'}`}
      onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
    >
      {!isExpanded ? (
        <div className="flex items-center justify-center w-full h-full">
          <MusicNote size={22} weight="fill" className={`${isDark ? 'text-monster-green animate-pulse' : 'text-black'}`} />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-monster-green' : 'text-black'}`}>
              {isPlaying ? '♪ Playing' : '♪ GT Vibes'}
            </span>
            <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); setIsPlaying(false); }} className="opacity-60 hover:opacity-100">
              <X size={18} />
            </button>
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            isDark ? 'bg-monster-green/10 border border-monster-green/30' : 'bg-gray-100'
          }`}>
            <button 
              onClick={togglePlay} 
              className={`w-11 h-11 flex items-center justify-center rounded-full transition-all ${
                isDark ? 'bg-monster-green text-monster-black' : 'bg-black text-white'
              } ${isPlaying ? 'animate-pulse shadow-lg' : ''}`}
            >
              {isPlaying ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" className="ml-0.5" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">GT Real Vibes</p>
              <p className="text-xs opacity-60">Bay Area Energy</p>
            </div>
          </div>
          <div className="absolute -left-[9999px]"><div id="yt-player"></div></div>
        </div>
      )}
    </div>
  );
};

// Theme Toggle
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      data-testid="theme-toggle"
      onClick={toggleTheme}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
        isDark 
          ? 'bg-monster-green/10 border-2 border-monster-green/50 hover:bg-monster-green hover:text-monster-black' 
          : 'bg-gray-100 hover:bg-black hover:text-white'
      }`}
      title={isDark ? 'Light Mode' : 'Monster Mode 🔥'}
    >
      {isDark ? <Sun size={18} className="text-monster-green" /> : <Moon size={18} />}
    </button>
  );
};

// Top Bar with DRE
const TopBar = () => {
  const { isDark } = useTheme();
  return (
    <div className={`fixed top-0 w-full z-50 py-2 px-6 lg:px-12 text-xs flex justify-between items-center ${
      isDark ? 'bg-monster-black border-b border-monster-green/20' : 'bg-black text-white'
    }`}>
      <div className="flex items-center gap-4">
        <span className={isDark ? 'text-monster-silver' : 'text-gray-400'}>George Toscano</span>
        <span className={isDark ? 'text-monster-green' : 'text-white'}>DRE# 02213878</span>
      </div>
      <a 
        href="https://kollabre.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        data-testid="kollab-link-top"
        className={`font-semibold uppercase tracking-wider hover:underline ${isDark ? 'text-monster-green' : 'text-white'}`}
      >
        Kollab Real Estate →
      </a>
    </div>
  );
};

// Navigation
const Navigation = () => {
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      data-testid="navigation" 
      className={`fixed top-8 w-full z-40 px-6 lg:px-12 py-4 flex justify-between items-center transition-all duration-300 ${
        isDark
          ? `${scrolled ? 'bg-monster-black/95 backdrop-blur-md' : 'bg-transparent'}`
          : `${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`
      }`}
    >
      <a href="#" data-testid="nav-logo" className={`font-display text-2xl tracking-wide ${isDark ? 'text-monster-green text-glow' : 'text-black'}`}>
        GT REAL
      </a>
      
      <div className="hidden md:flex items-center gap-10 text-sm font-medium">
        {['About', 'Services', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} 
            className={`hover-underline transition-colors ${isDark ? 'text-white/70 hover:text-monster-green' : 'text-gray-600 hover:text-black'}`}>
            {item}
          </a>
        ))}
        <a 
          href="https://kollabre.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          data-testid="kollab-link-nav"
          className={`px-4 py-2 border transition-all ${
            isDark 
              ? 'border-monster-green/50 text-monster-green hover:bg-monster-green hover:text-monster-black' 
              : 'border-black text-black hover:bg-black hover:text-white'
          }`}
        >
          Kollab RE
        </a>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <a href="tel:4086036603" data-testid="nav-cta" 
          className={`px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
            isDark 
              ? 'bg-monster-green text-monster-black hover:bg-monster-green-light' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}>
          Call Now
        </a>
      </div>
    </nav>
  );
};

// Hero Section - Eden-X style for light, Monster for dark
const HeroSection = () => {
  const { isDark } = useTheme();
  
  return (
    <section id="hero" data-testid="hero-section" className={`min-h-screen flex items-center pt-32 ${isDark ? 'bg-monster-black' : 'bg-white'}`}>
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection>
            {/* GT REAL - Big Bold Statement */}
            <h1 className={`font-display leading-none mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              {isDark ? (
                <span className="text-6xl md:text-7xl lg:text-8xl">
                  YOUR HOME.<br />YOUR FUTURE.<br />
                  <span className="text-monster-green text-glow-animate">UNLEASHED.</span>
                </span>
              ) : (
                <span className="text-6xl md:text-7xl lg:text-[6rem]">
                  GET<br />
                  <span className="italic">REAL.</span>
                </span>
              )}
            </h1>
            
            <p className={`text-lg md:text-xl mb-8 max-w-md leading-relaxed ${isDark ? 'text-monster-silver' : 'text-gray-600'}`}>
              {isDark 
                ? "Bay Area real estate. 20+ years tech. 25+ years drums. Precision. Passion. Power."
                : "Bay Area Real Estate. No games. No gimmicks. Just results. That's GT Real."
              }
            </p>
            
            {/* Phone CTA - Big and Bold */}
            <div className={`mb-8 ${isDark ? '' : 'border-l-4 border-black pl-6'}`}>
              <p className={`text-sm uppercase tracking-widest mb-2 ${isDark ? 'text-monster-green' : 'text-gray-500'}`}>
                Text or Call
              </p>
              <a href="tel:4086036603" className={`font-display text-4xl md:text-5xl hover:opacity-70 transition-opacity ${
                isDark ? 'text-monster-green text-glow' : 'text-black'
              }`}>
                408.603.6603
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="tel:4086036603" data-testid="hero-call" 
                className={`px-8 py-4 font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-all ${
                  isDark 
                    ? 'bg-monster-green text-monster-black hover:bg-monster-green-light' 
                    : 'bg-black text-white hover:bg-gray-800'
                }`}>
                <Phone size={20} weight="bold" /> Call GT
              </a>
              <a href="sms:4086036603" data-testid="hero-text" 
                className={`px-8 py-4 font-bold uppercase tracking-wider border-2 transition-all ${
                  isDark 
                    ? 'border-monster-green text-monster-green hover:bg-monster-green hover:text-monster-black' 
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}>
                Text Now
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className={`flex flex-wrap gap-6 mt-10 text-sm ${isDark ? 'text-monster-silver' : 'text-gray-500'}`}>
              <span className="flex items-center gap-2"><MapPin size={16} /> Bay Area</span>
              <span>Kollab RE</span>
              {isDark && <span>Tama · Zildjian · Vater</span>}
            </div>
          </AnimatedSection>

          <AnimatedSection className="relative">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=900&fit=crop"
                alt="Beautiful Bay Area Home"
                className={`w-full object-cover ${isDark ? 'opacity-80 rounded-lg' : ''}`}
                style={{ aspectRatio: isDark ? '4/5' : '3/4' }}
              />
              {!isDark && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <p className="text-white font-display text-3xl">GT REAL</p>
                  <p className="text-white/70 text-sm">George Toscano • Bay Area</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Why Section
const WhySection = () => {
  const { isDark } = useTheme();
  
  const lightReasons = [
    { icon: Phone, title: "I Answer", desc: "You call. I pick up. Simple." },
    { icon: ChartLineUp, title: "I Know Numbers", desc: "20 years in tech. Data is my language." },
    { icon: Handshake, title: "I Fight", desc: "Your corner. Your advocate. Period." }
  ];
  
  const darkReasons = [
    { icon: Target, title: "Precision", desc: "Stanford-level accuracy in every deal." },
    { icon: ChartLineUp, title: "Data", desc: "Tech mind. Market intelligence. Edge." },
    { icon: Heart, title: "Heart", desc: "Every client like a patient. Always." }
  ];
  
  const reasons = isDark ? darkReasons : lightReasons;

  return (
    <section id="about" data-testid="why-section" className={`py-24 lg:py-32 ${isDark ? 'bg-monster-dark' : 'bg-gray-50'}`}>
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <AnimatedSection className="mb-16">
          <p className={`text-sm uppercase tracking-widest mb-4 ${isDark ? 'text-monster-green' : 'text-gray-500'}`}>
            Why GT Real
          </p>
          <h2 className={`font-display text-5xl md:text-6xl lg:text-7xl ${isDark ? 'text-white' : 'text-black'}`}>
            {isDark ? (
              <>PRECISION.<br /><span className="text-monster-green text-glow">PASSION.</span><br />POWER.</>
            ) : (
              <>REAL<br />RESULTS.</>
            )}
          </h2>
        </AnimatedSection>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {reasons.map((item, i) => (
            <motion.div key={i} variants={fadeUp} data-testid={`why-card-${i}`} 
              className={`p-8 transition-all ${
                isDark 
                  ? 'bg-monster-black border border-monster-gray hover:border-monster-green/50' 
                  : 'bg-white hover:shadow-xl'
              }`}>
              <item.icon size={32} className={`mb-6 ${isDark ? 'text-monster-green' : 'text-black'}`} weight="bold" />
              <h3 className={`font-display text-2xl mb-3 ${isDark ? 'text-white' : 'text-black'}`}>{item.title}</h3>
              <p className={isDark ? 'text-monster-silver' : 'text-gray-600'}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const { isDark } = useTheme();
  const services = [
    { title: "Buy", desc: "Find your home. Right price. Right time.", cta: "Let's Find It" },
    { title: "Sell", desc: "Top dollar. Strategic. Relentless.", cta: "Get Your Value" },
    { title: "Invest", desc: "Build wealth. Bay Area opportunities.", cta: "Let's Talk" }
  ];

  return (
    <section id="services" data-testid="services-section" className={`py-24 lg:py-32 ${isDark ? 'bg-monster-black' : 'bg-white'}`}>
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className={`font-display text-5xl md:text-6xl ${isDark ? 'text-white' : 'text-black'}`}>
            WHAT DO YOU<br />
            <span className={isDark ? 'text-monster-green text-glow' : 'italic'}>NEED?</span>
          </h2>
        </AnimatedSection>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
          {services.map((item, i) => (
            <motion.a key={i} href="tel:4086036603" variants={fadeUp} data-testid={`service-card-${i}`} 
              className={`p-10 text-center transition-all group cursor-pointer ${
                isDark 
                  ? 'bg-monster-dark border border-monster-gray hover:border-monster-green' 
                  : 'bg-gray-50 hover:bg-black hover:text-white'
              }`}>
              <h3 className={`font-display text-4xl mb-4 ${
                isDark ? 'text-monster-green' : 'text-black group-hover:text-white'
              }`}>{item.title}</h3>
              <p className={`mb-6 ${isDark ? 'text-monster-silver' : 'text-gray-600 group-hover:text-gray-300'}`}>{item.desc}</p>
              <span className={`inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm ${
                isDark ? 'text-monster-green' : 'group-hover:text-white'
              }`}>
                {item.cta} <ArrowRight size={16} />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const { isDark } = useTheme();
  
  return (
    <section id="contact" data-testid="cta-section" className={`py-24 lg:py-32 ${isDark ? 'bg-monster-dark' : 'bg-black'} text-white`}>
      <div className="px-6 lg:px-12 max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-8">
            {isDark ? (
              <>LET'S<br /><span className="text-monster-green text-glow-animate">GO.</span></>
            ) : (
              <>GET<br /><span className="italic">MOVING.</span></>
            )}
          </h2>
          
          <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto">
            Bay Area market moves fast. You should too.
          </p>
          
          <div className="mb-10">
            <p className={`text-sm uppercase tracking-widest mb-3 ${isDark ? 'text-monster-green' : 'text-gray-500'}`}>
              Call or Text GT
            </p>
            <a href="tel:4086036603" className={`font-display text-5xl md:text-6xl lg:text-7xl hover:opacity-70 transition-opacity ${
              isDark ? 'text-monster-green text-glow' : 'text-white'
            }`}>
              408.603.6603
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a href="tel:4086036603" className={`px-10 py-4 font-bold uppercase tracking-wider transition-all ${
              isDark 
                ? 'bg-monster-green text-monster-black hover:bg-monster-green-light' 
                : 'bg-white text-black hover:bg-gray-100'
            }`}>
              <Phone size={20} weight="bold" className="inline mr-2" /> Call Now
            </a>
            <a href="mailto:gtdrums@gmail.com" className="px-10 py-4 font-bold uppercase tracking-wider border-2 border-white/30 hover:border-white transition-colors">
              <Envelope size={20} className="inline mr-2" /> Email
            </a>
          </div>
          
          <div className="flex justify-center gap-4">
            <a href="https://www.linkedin.com/in/george-toscano-6b979821" target="_blank" rel="noopener noreferrer" 
              className={`w-12 h-12 flex items-center justify-center transition-colors ${
                isDark ? 'bg-monster-green/10 hover:bg-monster-green text-monster-green hover:text-monster-black' : 'bg-white/10 hover:bg-white hover:text-black'
              }`}>
              <LinkedinLogo size={22} weight="bold" />
            </a>
            <a href="https://instagram.com/gtreal.io" target="_blank" rel="noopener noreferrer" 
              className={`w-12 h-12 flex items-center justify-center transition-colors ${
                isDark ? 'bg-monster-green/10 hover:bg-monster-green text-monster-green hover:text-monster-black' : 'bg-white/10 hover:bg-white hover:text-black'
              }`}>
              <InstagramLogo size={22} weight="bold" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { isDark } = useTheme();
  return (
    <footer data-testid="footer" className={`py-10 ${isDark ? 'bg-monster-black border-t border-monster-green/20' : 'bg-gray-950'} text-white`}>
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className={`font-display text-2xl ${isDark ? 'text-monster-green' : ''}`}>GT REAL</p>
            <p className="text-gray-500 text-sm">George Toscano • Kollab Real Estate</p>
            {isDark && <p className="text-monster-green/60 text-xs mt-1">Tama · Zildjian · Vater</p>}
          </div>
          <p className="text-gray-600 text-xs">© 2025 GT Real. Bay Area.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDark } = useTheme();
  return (
    <div className={`App ${isDark ? 'bg-monster-black text-white' : 'bg-white text-black'}`}>
      <Navigation />
      <main>
        <HeroSection />
        <WhySection />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
      <AudioPlayer />
    </div>
  );
}

export default App;

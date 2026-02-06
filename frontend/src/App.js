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
  Certificate,
  Clock,
  Target,
  Heart
} from "@phosphor-icons/react";

// Theme Context
const ThemeContext = createContext();
const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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

// Audio Player
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
            height: '1', width: '1', videoId: 'FRV18ivjjN4',
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
      className={`fixed bottom-6 left-6 z-50 rounded-xl shadow-2xl transition-all duration-300 ${
        isDark 
          ? 'bg-monster-dark border-2 border-monster-green/40' 
          : 'bg-white border border-gray-200'
      } ${isExpanded ? 'w-72' : 'w-14 h-14 cursor-pointer'}`}
      onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
    >
      {!isExpanded ? (
        <div className="flex items-center justify-center w-full h-full">
          <MusicNote size={24} weight="fill" className={`${isDark ? 'text-monster-green animate-pulse' : 'text-accent'}`} />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs uppercase tracking-widest font-bold ${isDark ? 'text-monster-green' : 'text-accent'}`}>
              {isPlaying ? '♪ Playing' : '♪ Music'}
            </span>
            <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); setIsPlaying(false); }} className="opacity-60 hover:opacity-100">
              <X size={18} />
            </button>
          </div>
          <div className={`flex items-center gap-3 p-3 rounded-lg border ${
            isDark ? 'bg-monster-green/10 border-monster-green/30' : 'bg-accent/5 border-accent/20'
          }`}>
            <button 
              onClick={togglePlay} 
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
                isDark ? 'bg-monster-green text-monster-black' : 'bg-accent text-white'
              } ${isPlaying ? 'animate-pulse shadow-lg' : ''}`}
            >
              {isPlaying ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" className="ml-0.5" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Zildjian Vault</p>
              <p className="text-xs opacity-60">Sean Wright</p>
              {isPlaying && (
                <div className="flex gap-1 mt-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`w-1 rounded-full animate-pulse ${isDark ? 'bg-monster-green' : 'bg-accent'}`} 
                      style={{ height: `${Math.random() * 10 + 6}px`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="absolute -left-[9999px]"><div id="yt-player"></div></div>
          <p className="text-xs opacity-50 mt-2 text-center">🥁 George's favorite</p>
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
      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all ${
        isDark 
          ? 'border-monster-green/50 hover:border-monster-green bg-monster-green/10' 
          : 'border-gray-300 hover:border-accent bg-gray-50'
      }`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Monster Mode 🔥'}
    >
      {isDark ? <Sun size={18} className="text-monster-green" /> : <Moon size={18} className="text-gray-600" />}
    </button>
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
      className={`fixed top-0 w-full z-50 px-6 lg:px-12 py-4 flex justify-between items-center transition-all duration-300 ${
        isDark
          ? `${scrolled ? 'bg-monster-black/95 backdrop-blur-md shadow-lg shadow-monster-green/5' : 'bg-transparent'}`
          : `${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`
      }`}
    >
      <a href="#" data-testid="nav-logo" className="font-bold text-lg tracking-tight">
        {isDark ? (
          <span className="text-monster-green text-glow">GT REAL</span>
        ) : (
          <><span className="text-gray-900">George</span> <span className="text-accent">Toscano</span></>
        )}
      </a>
      
      <div className="hidden md:flex items-center gap-8 text-sm">
        {['About', 'Services', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} 
            className={`transition-colors ${isDark ? 'text-white/70 hover:text-monster-green' : 'text-gray-600 hover:text-accent'}`}>
            {item}
          </a>
        ))}
      </div>
      
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <a href="tel:4086036603" data-testid="nav-cta" 
          className={`px-5 py-2.5 text-sm font-semibold transition-all ${
            isDark 
              ? 'bg-monster-green text-monster-black hover:bg-monster-green-light hover:shadow-[0_0_20px_rgba(149,214,0,0.3)]' 
              : 'bg-accent text-white hover:bg-accent-dark'
          }`}>
          Call Now
        </a>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const { isDark } = useTheme();
  
  return (
    <section id="hero" data-testid="hero-section" className={`min-h-screen flex items-center pt-20 ${
      isDark ? 'bg-monster-black' : 'bg-gradient-to-br from-gray-50 to-white'
    }`}>
      <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection>
            <p className={`font-semibold text-sm uppercase tracking-widest mb-4 ${isDark ? 'text-monster-green' : 'text-accent'}`}>
              {isDark ? 'Realtor · Technologist · Drummer' : 'Bay Area Real Estate'}
            </p>
            
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {isDark ? (
                <>Your Home.<br />Your Future.<br /><span className="text-monster-green text-glow-animate">Unleash The Beast.</span></>
              ) : (
                <>Your Home.<br /><span className="text-accent">Your Terms.</span><br />Your Future.</>
              )}
            </h1>
            
            <p className={`text-xl mb-8 leading-relaxed max-w-lg ${isDark ? 'text-monster-silver' : 'text-gray-600'}`}>
              {isDark 
                ? "I'm George Toscano — Bay Area real estate pro with 20+ years in tech and 25+ years behind the drums. Precision. Passion. Power."
                : <>I don't just sell houses. <strong>I help families find home.</strong> In the Bay Area, that means someone who fights for you.</>
              }
            </p>
            
            {/* Contact CTA Box */}
            <div className={`p-6 mb-8 ${
              isDark 
                ? 'bg-monster-green/10 border-2 border-monster-green/40' 
                : 'bg-accent/5 border-l-4 border-accent'
            }`}>
              <p className={`text-lg font-medium mb-2 ${isDark ? 'text-monster-green' : 'text-gray-900'}`}>
                Ready to make your move?
              </p>
              <p className={`mb-4 ${isDark ? 'text-monster-silver' : 'text-gray-600'}`}>
                {isDark ? 'DM me, text me, or shoot me an email.' : 'Text me. Call me. I answer.'}
              </p>
              <a href="tel:4086036603" className={`text-2xl font-bold hover:underline ${isDark ? 'text-monster-green' : 'text-accent'}`}>
                (408) 603-6603
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="tel:4086036603" data-testid="hero-call" 
                className={`px-8 py-4 font-semibold inline-flex items-center gap-2 transition-all ${
                  isDark 
                    ? 'bg-monster-green text-monster-black hover:bg-monster-green-light hover:shadow-[0_0_20px_rgba(149,214,0,0.3)]' 
                    : 'bg-accent text-white hover:bg-accent-dark'
                }`}>
                <Phone size={20} weight="bold" /> Call George
              </a>
              <a href="sms:4086036603" data-testid="hero-text" 
                className={`px-8 py-4 font-semibold border-2 transition-all ${
                  isDark 
                    ? 'border-monster-green text-monster-green hover:bg-monster-green hover:text-monster-black' 
                    : 'border-accent text-accent hover:bg-accent hover:text-white'
                }`}>
                Text Me Now
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection className="relative">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="Beautiful Bay Area Home"
                className={`w-full rounded-lg shadow-2xl ${isDark ? 'opacity-90' : ''}`}
              />
              <div className={`absolute -bottom-6 -left-6 p-6 shadow-xl rounded-lg max-w-xs ${
                isDark ? 'bg-monster-dark border-2 border-monster-green/30' : 'bg-white'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-monster-green/20' : 'bg-accent/10'
                  }`}>
                    <House size={28} className={isDark ? 'text-monster-green' : 'text-accent'} />
                  </div>
                  <div>
                    <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Kollab Real Estate</p>
                    <p className={`text-sm ${isDark ? 'text-monster-silver' : 'text-gray-500'}`}>Licensed Professional</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Trust Bar
const TrustBar = () => {
  const { isDark } = useTheme();
  return (
    <section className={`py-6 ${isDark ? 'bg-monster-dark border-y border-monster-green/20' : 'bg-gray-900'}`}>
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className={`flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm ${
          isDark ? 'text-monster-green/80' : 'text-white/80'
        }`}>
          <div className="flex items-center gap-2"><MapPin size={18} /> Bay Area</div>
          <div className="flex items-center gap-2"><Certificate size={18} /> Licensed</div>
          <div className="flex items-center gap-2"><Clock size={18} /> 20+ Yrs Tech</div>
          {isDark && <div className="flex items-center gap-2"><MusicNote size={18} /> 25+ Yrs Drums</div>}
        </div>
      </div>
    </section>
  );
};

// Why Section
const WhySection = () => {
  const { isDark } = useTheme();
  
  const lightReasons = [
    { icon: Phone, title: "I Pick Up The Phone", desc: "No voicemail maze. No waiting days. You call, I answer. It's that simple." },
    { icon: ChartLineUp, title: "I Know The Numbers", desc: "20 years in tech taught me data. I'll show you what homes are really worth." },
    { icon: Handshake, title: "I Fight For You", desc: "In this market, you need someone in your corner. I negotiate like your future depends on it." }
  ];
  
  const darkReasons = [
    { icon: Target, title: "Precision & Power", desc: "From Stanford Children's Health to your home purchase — same precision, same intensity." },
    { icon: ChartLineUp, title: "Data-Driven", desc: "20+ years in tech. I leverage data and market intelligence to give you the edge." },
    { icon: Heart, title: "Heart-First", desc: "Dedicated to every client as if you were a patient. That's my operating system." }
  ];
  
  const reasons = isDark ? darkReasons : lightReasons;

  return (
    <section id="about" data-testid="why-section" className={`py-20 lg:py-32 ${isDark ? 'bg-monster-dark' : 'bg-white'}`}>
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className={`font-semibold text-sm uppercase tracking-widest mb-4 ${isDark ? 'text-monster-green' : 'text-accent'}`}>
            Why Work With Me
          </p>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isDark ? (
              <>Where Precision<br /><span className="text-monster-green text-glow">Meets Raw Energy.</span></>
            ) : (
              <>You Deserve Better.<br /><span className="text-accent">Here's What You Get.</span></>
            )}
          </h2>
        </AnimatedSection>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {reasons.map((item, i) => (
            <motion.div key={i} variants={fadeUp} data-testid={`why-card-${i}`} 
              className={`p-8 transition-all hover:shadow-lg ${
                isDark 
                  ? 'bg-monster-black border border-monster-gray hover:border-monster-green/50' 
                  : 'bg-gray-50 border border-gray-100'
              }`}>
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 ${
                isDark ? 'bg-monster-green/10' : 'bg-accent/10'
              }`}>
                <item.icon size={28} className={isDark ? 'text-monster-green' : 'text-accent'} />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
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
    { title: "Buying A Home", desc: "First home or fifth—I'll find you the right one at the right price.", cta: "Let's Find Your Home" },
    { title: "Selling Your Home", desc: "Strategic pricing, professional marketing, tough negotiation. Top dollar.", cta: "Get Your Home's Value" },
    { title: "Investment Properties", desc: "Bay Area real estate builds wealth. Let me show you where smart money goes.", cta: "Explore Opportunities" }
  ];

  return (
    <section id="services" data-testid="services-section" className={`py-20 lg:py-32 ${isDark ? 'bg-monster-black' : 'bg-gray-50'}`}>
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className={`font-semibold text-sm uppercase tracking-widest mb-4 ${isDark ? 'text-monster-green' : 'text-accent'}`}>
            How I Help
          </p>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            What Do You Need?<br />
            <span className={isDark ? 'text-monster-green text-glow' : 'text-accent'}>I'm Ready.</span>
          </h2>
        </AnimatedSection>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {services.map((item, i) => (
            <motion.div key={i} variants={fadeUp} data-testid={`service-card-${i}`} 
              className={`p-8 transition-all group ${
                isDark 
                  ? 'bg-monster-dark border border-monster-gray hover:border-monster-green/50' 
                  : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'
              }`}>
              <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                isDark ? 'text-white group-hover:text-monster-green' : 'text-gray-900 group-hover:text-accent'
              }`}>{item.title}</h3>
              <p className={`mb-6 ${isDark ? 'text-monster-silver' : 'text-gray-600'}`}>{item.desc}</p>
              <a href="tel:4086036603" className={`font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all ${
                isDark ? 'text-monster-green' : 'text-accent'
              }`}>
                {item.cta} <ArrowRight size={18} />
              </a>
            </motion.div>
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
    <section id="contact" data-testid="cta-section" className={`py-20 lg:py-32 ${isDark ? 'bg-monster-dark' : 'bg-gray-900'} text-white`}>
      <div className="px-6 lg:px-12 max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {isDark ? (
              <>Ready to Make<br /><span className="text-monster-green text-glow-animate">Your Move?</span></>
            ) : (
              <>Stop Scrolling.<br /><span className="text-accent">Start Moving.</span></>
            )}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {isDark 
              ? "DM me, text me, or shoot me an email — let's make it happen."
              : <>The Bay Area market moves fast. <strong>And neither should you wait.</strong></>
            }
          </p>
          
          <div className={`p-8 rounded-lg mb-8 ${isDark ? 'bg-monster-black/50 border border-monster-green/30' : 'bg-white/10 backdrop-blur-sm'}`}>
            <p className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-monster-green' : 'text-accent'}`}>Text Me Today</p>
            <a href="tel:4086036603" className="text-3xl md:text-4xl font-bold hover:text-accent transition-colors">(408) 603-6603</a>
            <p className="text-gray-400 mt-4">Email: <a href="mailto:gtdrums@gmail.com" className="text-white hover:text-accent">gtdrums@gmail.com</a></p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:4086036603" className={`px-8 py-4 font-semibold inline-flex items-center gap-2 transition-all ${
              isDark 
                ? 'bg-monster-green text-monster-black hover:bg-monster-green-light' 
                : 'bg-accent text-white hover:bg-accent-dark'
            }`}>
              <Phone size={20} weight="bold" /> Call Now
            </a>
            <a href="sms:4086036603" className="bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-colors">
              Text George
            </a>
            <a href="https://www.linkedin.com/in/george-toscano-6b979821" target="_blank" rel="noopener noreferrer" 
              className="border-2 border-white/30 hover:border-white px-8 py-4 font-semibold inline-flex items-center gap-2 transition-colors">
              <LinkedinLogo size={20} /> Connect
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
    <footer data-testid="footer" className={`py-12 ${isDark ? 'bg-monster-black border-t border-monster-green/20' : 'bg-gray-950'} text-white`}>
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className={`font-bold text-lg ${isDark ? 'text-monster-green' : ''}`}>George Toscano</p>
            <p className="text-gray-400 text-sm">Kollab Real Estate • Bay Area</p>
            {isDark && <p className="text-monster-green/60 text-xs mt-1">Tama · Zildjian · Vater</p>}
          </div>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/george-toscano-6b979821" target="_blank" rel="noopener noreferrer" 
              className={`w-10 h-10 flex items-center justify-center transition-colors ${
                isDark ? 'bg-monster-green/10 hover:bg-monster-green hover:text-monster-black' : 'bg-white/10 hover:bg-accent'
              }`}>
              <LinkedinLogo size={20} />
            </a>
            <a href="https://instagram.com/gtreal.io" target="_blank" rel="noopener noreferrer" 
              className={`w-10 h-10 flex items-center justify-center transition-colors ${
                isDark ? 'bg-monster-green/10 hover:bg-monster-green hover:text-monster-black' : 'bg-white/10 hover:bg-accent'
              }`}>
              <InstagramLogo size={20} />
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>© 2025 George Toscano. All rights reserved.</p>
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
    <div className={`App ${isDark ? 'bg-monster-black text-white' : 'bg-white text-gray-900'}`}>
      <Navigation />
      <main>
        <HeroSection />
        <TrustBar />
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

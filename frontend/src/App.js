import { useEffect, useState, useRef } from "react";
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
  CheckCircle
} from "@phosphor-icons/react";

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

// Audio Player Component
const AudioPlayer = () => {
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
        if (window.YT && window.YT.Player) {
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
      if (window.YT && window.YT.Player) initPlayer();
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
    <div data-testid="music-player" className={`music-player-float ${isExpanded ? 'music-player-expanded-audio' : 'music-player-collapsed'}`} onClick={!isExpanded ? () => setIsExpanded(true) : undefined}>
      {!isExpanded ? (
        <div className="flex items-center justify-center w-full h-full cursor-pointer">
          <MusicNote size={24} weight="fill" className="text-accent animate-pulse" />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-widest text-accent font-bold">{isPlaying ? '♪ Playing' : '♪ Music'}</span>
            <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); setIsPlaying(false); }} className="opacity-60 hover:opacity-100"><X size={18} /></button>
          </div>
          <div className="flex items-center gap-3 p-3 bg-accent/10 rounded border border-accent/20">
            <button onClick={togglePlay} className={`w-10 h-10 flex items-center justify-center bg-accent text-white rounded-full ${isPlaying ? 'animate-pulse' : ''}`}>
              {isPlaying ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" className="ml-0.5" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Zildjian Vault</p>
              <p className="text-xs opacity-60">Sean Wright</p>
            </div>
          </div>
          <div className="absolute -left-[9999px]"><div id="yt-player"></div></div>
        </div>
      )}
    </div>
  );
};

// Navigation
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav data-testid="navigation" className={`fixed top-0 w-full z-50 px-6 lg:px-12 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`} style={{ background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(10px)' : 'none' }}>
      <a href="#" data-testid="nav-logo" className="font-bold text-lg tracking-tight">
        <span className="text-gray-900">George</span> <span className="text-accent">Toscano</span>
      </a>
      <div className="hidden md:flex items-center gap-8 text-sm">
        {['About', 'Services', 'Contact'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-600 hover:text-accent transition-colors">{item}</a>
        ))}
      </div>
      <a href="tel:4086036603" data-testid="nav-cta" className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 text-sm font-semibold transition-colors">
        Call Now
      </a>
    </nav>
  );
};

// Hero - Frank Luntz Style: Simple, Direct, Aspirational
const HeroSection = () => (
  <section id="hero" data-testid="hero-section" className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white pt-20">
    <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <AnimatedSection>
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">Bay Area Real Estate</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Your Home.<br />
            <span className="text-accent">Your Terms.</span><br />
            Your Future.
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
            I don't just sell houses. <strong>I help families find home.</strong> In the Bay Area, that means someone who fights for you. Someone who knows every neighborhood. Someone who picks up the phone.
          </p>
          
          {/* Frank Luntz: Lead with the benefit, make it personal */}
          <div className="bg-accent/5 border-l-4 border-accent p-6 mb-8">
            <p className="text-lg font-medium text-gray-900 mb-2">Ready to make your move?</p>
            <p className="text-gray-600 mb-4">Text me. Call me. I answer.</p>
            <a href="tel:4086036603" className="text-2xl font-bold text-accent hover:underline">(408) 603-6603</a>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="tel:4086036603" data-testid="hero-call" className="bg-accent hover:bg-accent-dark text-white px-8 py-4 font-semibold inline-flex items-center gap-2 transition-colors">
              <Phone size={20} weight="bold" /> Call George
            </a>
            <a href="sms:4086036603" data-testid="hero-text" className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-4 font-semibold transition-colors">
              Text Me Now
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection className="relative">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
              alt="Beautiful Bay Area Home"
              className="w-full rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl rounded-lg max-w-xs">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <House size={32} className="text-accent" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Kollab Real Estate</p>
                  <p className="text-sm text-gray-500">Licensed Professional</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

// Trust Bar - Simple social proof
const TrustBar = () => (
  <section className="py-8 bg-gray-900">
    <div className="px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-white/80 text-sm">
        <div className="flex items-center gap-2"><MapPin size={18} /> Bay Area Native</div>
        <div className="flex items-center gap-2"><Certificate size={18} /> Licensed Agent</div>
        <div className="flex items-center gap-2"><Clock size={18} /> 20+ Years Tech</div>
        <div className="flex items-center gap-2"><MusicNote size={18} /> 25+ Years Drummer</div>
      </div>
    </div>
  </section>
);

// Why George - Frank Luntz: Benefits, not features. Make it about THEM.
const WhySection = () => {
  const reasons = [
    {
      icon: Phone,
      title: "I Pick Up The Phone",
      desc: "No voicemail maze. No waiting days. You call, I answer. It's that simple."
    },
    {
      icon: ChartLineUp,
      title: "I Know The Numbers",
      desc: "20 years in tech taught me data. I'll show you what homes are really worth—not what sellers wish they were worth."
    },
    {
      icon: Handshake,
      title: "I Fight For You",
      desc: "In this market, you need someone in your corner. I negotiate like your future depends on it. Because it does."
    }
  ];

  return (
    <section id="about" data-testid="why-section" className="py-20 lg:py-32 bg-white">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">Why Work With Me</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            You Deserve Better.<br />
            <span className="text-accent">Here's What You Get.</span>
          </h2>
        </AnimatedSection>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {reasons.map((item, i) => (
            <motion.div key={i} variants={fadeUp} data-testid={`why-card-${i}`} className="bg-gray-50 p-8 hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <item.icon size={28} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Services - Clear, simple, action-oriented
const ServicesSection = () => {
  const services = [
    { title: "Buying A Home", desc: "First home or fifth—I'll find you the right one at the right price. No pressure, just guidance.", cta: "Let's Find Your Home" },
    { title: "Selling Your Home", desc: "I'll get you top dollar. Strategic pricing, professional marketing, tough negotiation. That's the formula.", cta: "Get Your Home's Value" },
    { title: "Investment Properties", desc: "Bay Area real estate builds wealth. Let me show you where the smart money is going.", cta: "Explore Opportunities" }
  ];

  return (
    <section id="services" data-testid="services-section" className="py-20 lg:py-32 bg-gray-50">
      <div className="px-6 lg:px-12 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">How I Help</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Do You Need?<br />
            <span className="text-accent">I'm Ready.</span>
          </h2>
        </AnimatedSection>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8">
          {services.map((item, i) => (
            <motion.div key={i} variants={fadeUp} data-testid={`service-card-${i}`} className="bg-white p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-accent transition-colors">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{item.desc}</p>
              <a href="tel:4086036603" className="text-accent font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                {item.cta} <ArrowRight size={18} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// About George - Personal, relatable, trustworthy
const AboutSection = () => (
  <section className="py-20 lg:py-32 bg-white">
    <div className="px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <AnimatedSection>
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop"
            alt="George Toscano"
            className="w-full rounded-lg shadow-xl"
          />
        </AnimatedSection>

        <AnimatedSection>
          <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-4">Meet George</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Tech Guy. Drummer.<br />
            <span className="text-accent">Your Real Estate Agent.</span>
          </h2>
          
          <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
            <p><strong>Here's the truth:</strong> I spent 20+ years in healthcare technology—Stanford Children's Health, Sutter Health—solving problems, managing teams, making things work.</p>
            <p>I've also been a drummer for 25 years. Tama drums. Zildjian cymbals. Vater sticks. That discipline? It carries over.</p>
            <p><strong>Why real estate?</strong> Because I believe everyone deserves someone who actually cares about getting them into the right home. Not just any home. <em>The right one.</em></p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[{ num: "20+", label: "Years in Tech" }, { num: "25+", label: "Years Drumming" }, { num: "100%", label: "Commitment" }].map((stat, i) => (
              <div key={i} className="text-center p-4 bg-gray-50 border border-gray-100">
                <p className="text-2xl font-bold text-accent">{stat.num}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          <a href="tel:4086036603" className="bg-accent hover:bg-accent-dark text-white px-8 py-4 font-semibold inline-flex items-center gap-2 transition-colors">
            <Phone size={20} /> Let's Talk
          </a>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

// CTA Section - Frank Luntz: Clear call to action, urgency, simplicity
const CTASection = () => (
  <section id="contact" data-testid="cta-section" className="py-20 lg:py-32 bg-gray-900 text-white">
    <div className="px-6 lg:px-12 max-w-4xl mx-auto text-center">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Stop Scrolling.<br />
          <span className="text-accent">Start Moving.</span>
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          The Bay Area market moves fast. The best homes don't wait. <strong>And neither should you.</strong>
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg mb-8">
          <p className="text-2xl md:text-3xl font-bold text-accent mb-2">Text Me Today</p>
          <a href="tel:4086036603" className="text-3xl md:text-4xl font-bold hover:text-accent transition-colors">(408) 603-6603</a>
          <p className="text-gray-400 mt-4">Or email: <a href="mailto:gtdrums@gmail.com" className="text-white hover:text-accent">gtdrums@gmail.com</a></p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:4086036603" className="bg-accent hover:bg-accent-dark text-white px-8 py-4 font-semibold inline-flex items-center gap-2 transition-colors">
            <Phone size={20} weight="bold" /> Call Now
          </a>
          <a href="sms:4086036603" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 font-semibold inline-flex items-center gap-2 transition-colors">
            Text George
          </a>
          <a href="https://www.linkedin.com/in/george-toscano-6b979821" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 hover:border-white text-white px-8 py-4 font-semibold inline-flex items-center gap-2 transition-colors">
            <LinkedinLogo size={20} /> Connect
          </a>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

// Footer - Simple, professional
const Footer = () => (
  <footer data-testid="footer" className="py-12 bg-gray-950 text-white">
    <div className="px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="font-bold text-lg">George Toscano</p>
          <p className="text-gray-400 text-sm">Kollab Real Estate • Bay Area</p>
        </div>
        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/george-toscano-6b979821" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
            <LinkedinLogo size={20} />
          </a>
          <a href="https://instagram.com/gtreal.io" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-accent flex items-center justify-center transition-colors">
            <InstagramLogo size={20} />
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
        <p>© 2025 George Toscano. All rights reserved. DRE# [Pending]</p>
      </div>
    </div>
  </footer>
);

// Main App
function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <HeroSection />
        <TrustBar />
        <WhySection />
        <ServicesSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
      <AudioPlayer />
    </div>
  );
}

export default App;

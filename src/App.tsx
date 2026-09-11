import { useState, FormEvent, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageCircle, Maximize, Sparkles, Moon, Star, Video, ShoppingBag, Smartphone, Hand, Home, ChevronDown, ChevronUp, Users, Award, Quote, ChevronRight, CheckCircle, Calendar, Youtube, PlayCircle, ArrowLeft, HelpCircle } from 'lucide-react';
import { tarotDeck, getRandomCard, TarotCard, products, Product, ProductTier, testimonials, Testimonial, readingSpreads, ReadingSpread, ReadingCategory, subscriptionPlans, SubscriptionPlan } from './data';
import { AskQuestionView } from './components/AskQuestionView';

// --- Shared Components ---

const Button = ({ children, onClick, type = 'button', className = '' }: any) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-semibold py-3 px-6 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2 ${className}`}
  >
    {children}
  </button>
);

const TarotCardVisual = ({ card, isReversed, isFlipped, className = 'w-64 h-96' }: { card?: TarotCard; isReversed?: boolean; isFlipped: boolean; className?: string }) => {
  return (
    <motion.div
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      className={`relative mx-auto preserve-3d cursor-pointer ${className}`}
    >
      {/* Front (Card Back design) */}
      <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-900 to-purple-950 rounded-2xl border-2 border-amber-400/50 shadow-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-1 border border-amber-400/30 rounded-xl m-2" />
        <div className="flex flex-col items-center justify-center opacity-70">
          <Star className="w-8 h-8 text-amber-400 mb-4" />
          <Moon className="w-12 h-12 text-amber-400" />
          <Star className="w-8 h-8 text-amber-400 mt-4" />
        </div>
      </div>

      {/* Back (Card Face) */}
      <div className="absolute inset-0 backface-hidden rotate-y-180 bg-black rounded-2xl border-2 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.3)] flex flex-col overflow-hidden">
        {card && (
          <div className={`h-full w-full flex flex-col relative ${isReversed ? 'rotate-180' : ''}`}>
             <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url(${card.imageUrl})` }} />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
             <div className="relative z-10 flex flex-col h-full items-center justify-end p-6 text-center">
                <h3 className="font-serif text-2xl text-amber-400 mb-2 drop-shadow-md">{card.name}</h3>
                <p className="text-xs text-amber-200/70 uppercase tracking-widest mb-2 font-semibold">
                  {isReversed ? 'Reversed' : 'Upright'}
                </p>
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Views ---

const FadeIn = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Starfield = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-amber-200 animate-twinkle"
        style={{
          width: Math.random() * 3 + 1 + 'px',
          height: Math.random() * 3 + 1 + 'px',
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 3 + 's',
          animationDuration: Math.random() * 3 + 2 + 's'
        }}
      />
    ))}
  </div>
);

const PreviewCard = ({ card }: { card: TarotCard }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onClick={() => setFlipped(!flipped)} className="snap-center shrink-0 mx-2">
      <TarotCardVisual card={card} isFlipped={flipped} className="w-48 h-72 md:w-56 md:h-80" />
    </div>
  );
};

const HomeView = ({ setView }: { setView: (v: string) => void }) => {
  const featuredCards = tarotDeck.filter(c => ['The Star', 'The Sun', 'The Moon', 'Wheel of Fortune'].includes(c.name)).slice(0, 4);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      {/* YouTube Section */}
      <section className="w-full bg-gradient-to-b from-purple-950/20 to-black py-24 border-y border-purple-500/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center space-y-6 mb-16 flex flex-col items-center">
            <a 
              href="https://youtube.com/@tarotbynibedita"
              target="_blank"
              rel="noreferrer"
              className="relative inline-block mb-6 group cursor-pointer"
            >
              {/* Outer pulsing mystical glow */}
              <div className="absolute inset-0 bg-amber-400 rounded-full blur-[20px] opacity-30 group-hover:opacity-60 group-hover:blur-[40px] transition-all duration-700 animate-pulse" style={{ animationDuration: '3s' }} />
              
              {/* Gold ring frame & image */}
              <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-full p-[3px] bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-700 shadow-[0_0_30px_rgba(251,191,36,0.4)] group-hover:shadow-[0_0_60px_rgba(251,191,36,0.8)] group-hover:scale-105 transition-all duration-500 z-10">
                <div className="w-full h-full rounded-full overflow-hidden bg-black/50">
                  <img 
                    src="/yt-logo.webp" 
                    alt="Nibedita Mystic Insights Channel Logo" 
                    loading="lazy" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </a>
            <h2 className="font-serif text-3xl md:text-5xl text-amber-400">Nibedita Mystic Insights</h2>
            <p className="text-purple-200/80 max-w-2xl mx-auto text-lg leading-relaxed">
              Explore tarot pick-a-card readings, love & relationship insights, career guidance, and weekly zodiac forecasts on YouTube.
            </p>
            <a 
              href="https://youtube.com/@tarotbynibedita" 
              target="_blank" 
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] hover:-translate-y-0.5 transition-all"
            >
              <Youtube className="w-5 h-5" />
              Subscribe on YouTube
            </a>
          </FadeIn>
          
          {/* Video Thumbnails Carousel */}
          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0">
            {[
              { id: 'v1', title: "Pick a Card: What's coming next in love?", img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600' },
              { id: 'v2', title: "Weekly Zodiac Forecast", img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600' },
              { id: 'v3', title: "Career Guidance Reading", img: 'https://images.unsplash.com/photo-1618588507085-c79565432917?auto=format&fit=crop&q=80&w=600' },
            ].map((video, i) => (
              <FadeIn key={video.id} delay={i * 0.2} className="snap-center shrink-0 w-[85vw] md:w-auto">
                <a 
                  href="https://youtube.com/@tarotbynibedita" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block relative p-4 rounded-2xl bg-purple-950/30 backdrop-blur-md border border-purple-500/30 shadow-[0_0_20px_rgba(251,191,36,0.05)] group hover:border-red-500/50 transition-all h-full"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-black/60 shadow-inner group-hover:shadow-[0_0_15px_rgba(220,38,38,0.2)] transition-shadow">
                    <img 
                      src={video.img} 
                      alt={video.title} 
                      loading="lazy" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-red-500 group-hover:scale-110 transition-all drop-shadow-lg" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-serif text-lg text-amber-50 group-hover:text-red-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full bg-black py-24 border-y border-purple-500/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Image Column */}
            <FadeIn delay={0.2} className="w-full md:w-1/2 flex justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-amber-500/20 blur-[60px] rounded-full" />
              <div className="relative w-64 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden border border-amber-500/40 shadow-[0_0_30px_rgba(251,191,36,0.15)] group">
                <img 
                  src="/nibedita.jpg" 
                  alt="Nibedita" 
                  loading="lazy" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 border border-amber-300/20 rounded-2xl pointer-events-none" />
              </div>
            </FadeIn>
            
            {/* Text Column */}
            <FadeIn delay={0.4} className="w-full md:w-1/2 space-y-8 text-center md:text-left">
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-amber-400">Meet Nibedita</h2>
                <p className="text-purple-200/80 text-lg leading-relaxed">
                  With years of experience guiding souls through life's complex transitions, I combine the ancient wisdom of tarot and numerology with deep intuitive empathy. My readings provide clarity, unveil hidden energies, and empower you to walk your true path with confidence.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="p-2 rounded-full bg-purple-900/50 border border-amber-500/30">
                    <Users className="text-amber-400 w-5 h-5" />
                  </div>
                  <span className="text-purple-100 font-medium">500+ Readings Given</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="p-2 rounded-full bg-purple-900/50 border border-amber-500/30">
                    <Award className="text-amber-400 w-5 h-5" />
                  </div>
                  <span className="text-purple-100 font-medium">Verified Numerologist</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="p-2 rounded-full bg-purple-900/50 border border-amber-500/30">
                    <Sparkles className="text-amber-400 w-5 h-5" />
                  </div>
                  <span className="text-purple-100 font-medium">Personalized Guidance</span>
                </div>
              </div>
              
              <div className="pt-4 flex justify-center md:justify-start">
                <button onClick={() => { setView('booking'); window.scrollTo(0,0); }} className="px-8 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] transition-all flex items-center gap-2">
                  Book a Reading <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 1. Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 py-20 overflow-hidden">
        <Starfield />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black -z-10" />
        
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center md:text-left space-y-8">
            <div className="inline-flex items-center justify-center p-3 bg-purple-900/30 rounded-full ring-1 ring-purple-500/50 animate-float-delayed">
              <Moon className="text-amber-400 w-6 h-6 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 drop-shadow-sm">
              Seek Clarity.<br/>Find Purpose.
            </h1>
            <p className="text-purple-200/90 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto md:mx-0">
              Welcome to Nibedita Mystic Insights. Discover the hidden forces shaping your destiny through intuitive, personalized tarot readings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center md:justify-start">
              <Button onClick={() => setView('daily')} className="w-full sm:w-auto">
                Pull Daily Card
              </Button>
              <button onClick={() => { setView('booking'); window.scrollTo(0,0); }} className="w-full sm:w-auto px-6 py-3 rounded-full border border-amber-500/50 text-amber-400 font-semibold hover:bg-amber-500/10 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all">
                Book a Reading
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative flex justify-center animate-float mt-8 md:mt-0">
            <div className="absolute inset-0 bg-purple-600/20 blur-[80px] rounded-full" />
            <TarotCardVisual isFlipped={false} className="w-64 h-96 md:w-72 md:h-[28rem] drop-shadow-[0_0_30px_rgba(109,40,217,0.4)]" />
          </motion.div>
        </div>
      </section>



      {/* 6. Trust Strip */}
      <div className="w-full bg-purple-950/40 border-y border-purple-500/20 backdrop-blur-sm py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center md:justify-around gap-6 md:gap-8">
          <div className="flex items-center gap-3"><Users className="text-amber-400 w-6 h-6" /><span className="text-purple-100 font-medium">500+ Readings Given</span></div>
          <div className="flex items-center gap-3"><Award className="text-amber-400 w-6 h-6" /><span className="text-purple-100 font-medium">Verified Numerologist</span></div>
          <div className="flex items-center gap-3"><MessageCircle className="text-amber-400 w-6 h-6" /><span className="text-purple-100 font-medium">Instant WhatsApp Support</span></div>
        </div>
      </div>

      {/* 5. Services Snapshot */}
      <section className="w-full max-w-6xl mx-auto px-4 py-24 space-y-12">
        <FadeIn className="text-center space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl text-amber-400">Discover Our Services</h2>
          <p className="text-purple-200/70 max-w-xl mx-auto">Choose a path that resonates with your current journey.</p>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { id: 'daily', icon: Sparkles, title: 'Daily Card', desc: 'Draw a single card for daily guidance and energy.', w: 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]' },
            { id: 'ask', icon: HelpCircle, title: 'Ask a Question', desc: 'Focus on your inquiry and pick your cards.', w: 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]' },
            { id: 'yesno', icon: CheckCircle, title: 'Yes/No Oracle', desc: 'Get quick clarity on a pressing question.', w: 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]' },
            { id: 'booking', icon: Calendar, title: 'Book Reading', desc: 'Deep-dive personalized session with Nibedita.', w: 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]' },
            { id: 'subscriptions', icon: Star, title: 'Subscriptions', desc: 'Monthly Tarot guidance and exclusive plans.', w: 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]' },
            { id: 'shop', icon: ShoppingBag, title: 'Mystical Shop', desc: 'Numerology & specialized premium reports.', w: 'w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]' }
          ].map((svc, i) => (
            <FadeIn key={svc.id} delay={i * 0.1} className={svc.w}>
              <div onClick={() => {
                setView(svc.id);
                window.scrollTo(0,0);
              }} className="bg-purple-950/30 border border-purple-500/30 hover:border-amber-400/50 p-6 rounded-2xl cursor-pointer group transition-all hover:-translate-y-1 hover:bg-purple-900/40 hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)] h-full flex flex-col">
                <svc.icon className="w-8 h-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-serif text-xl text-amber-50 mb-2">{svc.title}</h3>
                <p className="text-purple-200/80 text-sm mb-6 flex-1">{svc.desc}</p>
                <div className="mt-auto flex items-center text-amber-400 text-sm font-medium">
                  Explore <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Mid-Page Banner */}
      <section className="relative w-full py-24 overflow-hidden border-y border-purple-500/20 bg-black">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'url(/nibedita.jpg)',
            backgroundPosition: 'center 25%',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Gradient Overlays for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/60 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center flex flex-col items-center">
          <FadeIn>
            <Quote className="w-12 h-12 text-amber-400/50 mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-5xl text-amber-100 mb-8 leading-tight drop-shadow-lg">
              Every card has a story. <br className="hidden md:block"/> Let's read yours together.
            </h2>
            <button onClick={() => { setView('booking'); window.scrollTo(0,0); }} className="px-8 py-4 rounded-full border border-amber-500/50 bg-purple-950/50 backdrop-blur-md text-amber-400 font-bold shadow-[0_0_20px_rgba(251,191,36,0.15)] hover:bg-amber-500 hover:text-black hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all">
              Book Your Reading
            </button>
          </FadeIn>
        </div>
      </section>

      {/* 2. How It Works */}
      <section className="w-full bg-gradient-to-b from-black to-purple-950/20 py-24 border-t border-purple-500/10">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center space-y-4 mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-amber-400">How It Works</h2>
            <p className="text-purple-200/70 max-w-xl mx-auto">Three simple steps to unlock cosmic guidance.</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent border-dashed border-t border-amber-500/30" />
            {[
              { step: '01', icon: MessageCircle, title: 'Ask Your Question', desc: 'Focus your mind on a specific situation or seek general guidance.' },
              { step: '02', icon: Star, title: 'Draw Your Card', desc: 'Tap into your intuition and reveal the cards drawn just for you.' },
              { step: '03', icon: Sparkles, title: 'Get Clarity', desc: 'Read the detailed interpretation and apply the wisdom to your life.' }
            ].map((item, i) => (
              <FadeIn key={item.step} delay={i * 0.2} className="relative z-10 flex flex-col items-center text-center p-6 group">
                <div className="w-20 h-20 bg-black border-2 border-purple-500/50 rounded-full flex items-center justify-center mb-6 group-hover:border-amber-400 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-amber-500 text-black font-bold rounded-full flex items-center justify-center text-sm">{item.step}</div>
                  <item.icon className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="font-serif text-xl text-amber-50 mb-3">{item.title}</h3>
                <p className="text-purple-200/70 text-sm leading-relaxed">{item.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Cards Preview */}
      <section className="w-full max-w-6xl mx-auto px-4 py-24 overflow-hidden">
        <FadeIn className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-amber-400">The Major Arcana</h2>
          <p className="text-purple-200/70 max-w-xl mx-auto">Tap a card below to reveal its energy.</p>
        </FadeIn>
        <FadeIn delay={0.2} className="w-full overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          <div className="flex gap-6 md:justify-center px-4 w-max md:w-full mx-auto">
            {featuredCards.map(card => (
              <PreviewCard key={card.id} card={card} />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 4. Testimonials */}
      <section className="w-full bg-purple-950/20 py-24 border-y border-purple-500/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <FadeIn className="text-center space-y-4 mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-amber-400">What Our Clients Say</h2>
            <p className="text-purple-200/70 max-w-xl mx-auto">Real conversations, real results.</p>
          </FadeIn>
          
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 md:mx-0 md:px-0">
            {testimonials.map((review, i) => (
              <FadeIn key={review.id} delay={i * 0.2} className="snap-center shrink-0 w-[85vw] md:w-[320px]">
                <div 
                  onClick={() => setSelectedTestimonial(review)}
                  className="relative p-5 rounded-2xl bg-purple-950/30 backdrop-blur-md border border-purple-500/30 shadow-[0_0_20px_rgba(251,191,36,0.05)] flex flex-col h-full group hover:border-amber-400/40 transition-all cursor-pointer hover:-translate-y-1"
                >
                  
                  {/* WhatsApp Badge */}
                  <div className="absolute -top-3 -right-3 bg-[#25D366] p-2.5 rounded-full shadow-lg z-10 border-2 border-black">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Image Container */}
                  <div className="relative rounded-xl overflow-hidden border border-amber-500/40 mb-5 aspect-[4/5] bg-black/60 shadow-inner group-hover:shadow-[0_0_15px_rgba(251,191,36,0.15)] transition-shadow">
                    <img 
                      src={review.image} 
                      alt="WhatsApp Chat Screenshot" 
                      loading="lazy" 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1614036417651-1d451bfe473e?q=80&w=400&auto=format&fit=crop";
                      }}
                    />
                  </div>
                  
                  {/* Rating and Verification */}
                  <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#25D366] font-medium bg-[#25D366]/10 px-2.5 py-1 rounded-full border border-[#25D366]/30 uppercase tracking-wide">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Verified Client</span>
                      </div>
                    </div>
                    {review.caption && (
                      <p className="text-purple-200/80 text-sm font-medium border-t border-purple-500/20 pt-3 mt-1">
                        {review.caption}
                      </p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="w-full relative py-24 px-4 border-b border-purple-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-black -z-10" />
        <FadeIn className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl text-amber-300 drop-shadow-md">
            Ready to discover what the cards hold for you?
          </h2>
          <p className="text-purple-200 text-lg">
            Step into the light and embrace the wisdom of the universe.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button onClick={() => setView('daily')} className="w-full sm:w-auto px-8">
              Pull Daily Card
            </Button>
            <button onClick={() => { setView('booking'); window.scrollTo(0,0); }} className="w-full sm:w-auto px-8 py-3 rounded-full border-2 border-amber-500 text-amber-400 font-semibold hover:bg-amber-500 hover:text-black transition-all shadow-[0_0_15px_rgba(251,191,36,0.2)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)]">
              Book a Reading
            </button>
          </div>
        </FadeIn>
      </section>

      {/* Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full bg-purple-950/80 border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-amber-500/20 rounded-full text-white/80 hover:text-amber-400 backdrop-blur-md transition-all z-10 border border-transparent hover:border-amber-500/50"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex-1 overflow-y-auto hide-scrollbar p-6 sm:p-8 space-y-8">
                <div className="w-full flex justify-center">
                   <img 
                      src={selectedTestimonial.image} 
                      alt="Full resolution client review"
                      className="max-h-[60vh] object-contain rounded-2xl border border-purple-500/40 shadow-[0_0_30px_rgba(109,40,217,0.3)]"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1614036417651-1d451bfe473e?q=80&w=600&auto=format&fit=crop";
                      }}
                   />
                </div>
                
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-1.5">
                     {[...Array(selectedTestimonial.rating)].map((_, j) => <Star key={j} className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />)}
                  </div>
                  {selectedTestimonial.caption && (
                     <p className="text-amber-50 text-xl md:text-2xl font-medium leading-relaxed font-serif max-w-xl mx-auto">
                       "{selectedTestimonial.caption}"
                     </p>
                  )}
                  <div className="pt-2">
                    <div className="inline-flex items-center justify-center gap-1.5 text-sm text-[#25D366] font-medium bg-[#25D366]/10 px-4 py-2 rounded-full border border-[#25D366]/30 uppercase tracking-wide">
                       <CheckCircle className="w-4 h-4" />
                       <span>Verified WhatsApp Client</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DailyCardView = () => {
  const [result, setResult] = useState<{ card: TarotCard, isReversed: boolean } | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const drawCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setResult(getRandomCard());
      setIsFlipped(true);
    }, 400);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center px-4 py-8 max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl text-amber-400">Your Daily Guidance</h2>
        <p className="text-purple-200/70 max-w-md mx-auto">Focus on your energy for today and draw a card to reveal its message.</p>
      </div>

      <div onClick={!isFlipped ? drawCard : undefined}>
        <TarotCardVisual card={result?.card} isReversed={result?.isReversed} isFlipped={isFlipped} />
      </div>

      {!isFlipped ? (
        <Button onClick={drawCard}>
          <Sparkles className="w-5 h-5" /> Draw a Card
        </Button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-purple-950/50 border border-purple-500/30 p-6 md:p-8 rounded-2xl max-w-xl w-full text-center space-y-4 shadow-xl">
          <h3 className="font-serif text-2xl text-amber-300">
            {result?.card.name} {result?.isReversed ? '(Reversed)' : ''}
          </h3>
          <p className="text-amber-100/90 leading-relaxed text-lg">
            {result?.isReversed ? result?.card.reversed : result?.card.upright}
          </p>
          <button onClick={() => setIsFlipped(false)} className="mt-6 text-sm text-purple-300 hover:text-amber-400 underline underline-offset-4 transition-colors">
            Draw another card
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

const YesNoView = () => {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<{ card: TarotCard, isReversed: boolean } | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const getAnswer = (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsFlipped(false);
    setTimeout(() => {
      setResult(getRandomCard());
      setIsFlipped(true);
    }, 400);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center px-4 py-8 max-w-3xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl text-amber-400">Yes or No Oracle</h2>
        <p className="text-purple-200/70 max-w-md mx-auto">Ask a clear Yes or No question, and let the cards reveal the path.</p>
      </div>

      {!isFlipped ? (
        <form onSubmit={getAnswer} className="w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="E.g., Will I get the job?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full bg-purple-950/40 border border-purple-500/40 text-amber-50 px-5 py-4 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 placeholder:text-purple-300/50 transition-all"
            required
          />
          <Button type="submit" className="w-full">Reveal Answer</Button>
        </form>
      ) : (
        <div className="w-full flex flex-col items-center space-y-8">
          <TarotCardVisual card={result?.card} isReversed={result?.isReversed} isFlipped={isFlipped} />
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-purple-950/50 border border-purple-500/30 p-6 md:p-8 rounded-2xl max-w-xl w-full text-center space-y-4 shadow-xl">
            <div className="inline-block px-4 py-1 rounded-full border border-amber-400/50 text-amber-400 font-serif text-xl mb-2 bg-amber-400/10">
              {result?.isReversed ? (result.card.yesNo === 'Yes' ? 'Maybe / No' : result.card.yesNo === 'No' ? 'Yes / Maybe' : 'Maybe') : result?.card.yesNo}
            </div>
            <h3 className="font-serif text-xl text-amber-300">
              {result?.card.name} {result?.isReversed ? '(Reversed)' : ''}
            </h3>
            <p className="text-amber-100/90 leading-relaxed text-sm md:text-base">
              {result?.isReversed ? result?.card.reversed : result?.card.upright}
            </p>
            <button onClick={() => { setIsFlipped(false); setQuestion(''); }} className="mt-6 text-sm text-purple-300 hover:text-amber-400 underline underline-offset-4 transition-colors">
              Ask another question
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

const BookingView = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    spreadId: readingSpreads[0].id,
    notes: ''
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedSpread = readingSpreads.find(s => s.id === formData.spreadId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSpread) return;

    const text = `Hi Nibedita, I'd like to book an appointment!\n\n*Name:* ${formData.name}\n*DOB:* ${formData.dob}\n*Reading Type:* ${selectedSpread.name} — ₹${selectedSpread.price}\n*Notes:* ${formData.notes || 'None'}`;
    
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919736973155?text=${encoded}`, '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-12 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-10 space-y-3 max-w-2xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-amber-400 mb-4">
          <span className="inline-block text-2xl mr-2">🌸</span> Welcome to Nibedita Mystic Insights! <span className="inline-block text-2xl ml-2">🌸</span>
        </h2>
        <p className="text-purple-100/90 text-lg">Thank you for reaching out. 🙏✨</p>
        <p className="text-purple-200/80">We offer Tarot Reading, Numerology, Mobile Numerology, Candle Spells, Jar Spells & Spiritual Guidance.</p>
        <div className="bg-purple-900/30 border border-purple-500/20 rounded-xl p-4 mt-4 inline-block text-left mx-auto">
          <p className="text-amber-200 text-sm font-medium mb-2">Please provide:</p>
          <ul className="text-purple-100 text-sm space-y-1 list-disc list-inside">
            <li>Your Name</li>
            <li>Your Question</li>
            <li>(If required) Your Date of Birth</li>
          </ul>
        </div>
        <p className="text-purple-200/80 pt-2 italic">
          I will get back to you as soon as possible. Thank you for your patience and trust. 💖✨
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-purple-950/40 backdrop-blur-md border border-purple-500/30 p-6 md:p-8 rounded-3xl shadow-xl space-y-6">
        <div>
          <label className="block text-amber-50 mb-2 font-medium">Full Name</label>
          <input 
            type="text" 
            required 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-black/40 border border-purple-500/40 rounded-xl p-4 text-amber-50 placeholder:text-purple-300/40 focus:outline-none focus:border-amber-400 transition-all"
            placeholder="Enter your name"
          />
        </div>
        
        <div>
          <label className="block text-amber-50 mb-2 font-medium">Date of Birth</label>
          <input 
            type="date" 
            required 
            value={formData.dob}
            onChange={e => setFormData({...formData, dob: e.target.value})}
            className="w-full bg-black/40 border border-purple-500/40 rounded-xl p-4 text-amber-50 placeholder:text-purple-300/40 focus:outline-none focus:border-amber-400 transition-all"
          />
        </div>

        <div className="relative z-20">
          <label className="block text-amber-50 mb-2 font-medium">Select Reading Type</label>
          
          {/* Backdrop for closing */}
          {isDropdownOpen && (
            <div 
              className="fixed inset-0 z-30" 
              onClick={() => setIsDropdownOpen(false)}
            />
          )}

          <div className="relative z-40">
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-black/40 border border-purple-500/40 hover:border-amber-400/70 rounded-xl p-4 text-amber-50 focus:outline-none transition-all cursor-pointer flex justify-between items-center select-none"
            >
              <span className="font-medium">{selectedSpread ? `${selectedSpread.name} — ₹${selectedSpread.price}` : 'Choose a reading...'}</span>
              <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute w-full mt-2 bg-purple-950/95 backdrop-blur-xl border border-purple-500/50 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden max-h-64 overflow-y-auto hide-scrollbar z-50"
                >
                  {readingSpreads.map(spread => (
                    <div 
                      key={spread.id}
                      onClick={() => {
                        setFormData({...formData, spreadId: spread.id});
                        setIsDropdownOpen(false);
                      }}
                      className={`p-4 cursor-pointer hover:bg-purple-800/80 transition-colors border-b border-purple-500/20 last:border-b-0 flex justify-between items-center group ${formData.spreadId === spread.id ? 'bg-amber-500/10 border-l-4 border-l-amber-500 pl-3' : 'pl-4'}`}
                    >
                      <div>
                        <div className={`font-medium transition-colors ${formData.spreadId === spread.id ? 'text-amber-400' : 'text-amber-50 group-hover:text-amber-200'}`}>
                          {spread.name}
                        </div>
                        {spread.category && (
                          <div className="text-xs text-purple-300/60 mt-1 uppercase tracking-wider">{spread.category}</div>
                        )}
                      </div>
                      <div className="text-amber-400 font-serif ml-4 text-lg">₹{spread.price}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <label className="block text-amber-50 mb-2 font-medium">Specific Questions or Focus (Optional)</label>
          <textarea 
            value={formData.notes}
            onChange={e => setFormData({...formData, notes: e.target.value})}
            className="w-full bg-black/40 border border-purple-500/40 rounded-xl p-4 text-amber-50 placeholder:text-purple-300/40 focus:outline-none focus:border-amber-400 transition-all resize-none h-24"
            placeholder="Any specific area you want to focus on?"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 text-black font-bold py-4 px-8 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:bg-amber-400 transition-all text-lg flex items-center justify-center gap-2 mt-4"
        >
          <MessageCircle className="w-6 h-6" />
          Book via WhatsApp
        </button>
      </form>
    </div>
  );
};

const AboutView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center px-4 py-8 max-w-3xl mx-auto space-y-10">
    <div className="text-center space-y-4">
      <h2 className="font-serif text-3xl md:text-4xl text-amber-400">About Nibedita</h2>
    </div>
    
    <div className="bg-purple-950/30 p-8 rounded-2xl border border-purple-500/30 shadow-2xl space-y-6 text-purple-100/90 leading-relaxed text-lg">
      <p>
        Welcome to Nibedita Mystic Insights. I am Nibedita Raulo, an intuitive tarot reader dedicated to helping you navigate life's complexities through the ancient wisdom of the cards.
      </p>
      <p>
        My journey into the mystic arts began years ago, guided by a deep calling to understand the unseen energies that shape our daily experiences. Whether you are seeking clarity on a specific situation, looking for guidance in love and career, or simply needing a daily reflection, my readings are designed to empower and illuminate.
      </p>
      <p>
        I believe the tarot is not just a tool for fortune-telling, but a profound mirror reflecting our inner truths and hidden potentials. My reading style is compassionate, direct, and deeply rooted in practical spirituality.
      </p>
      <div className="pt-6 border-t border-purple-500/30 flex items-center justify-center space-x-2 text-amber-400">
        <Sparkles className="w-5 h-5" />
        <span className="font-serif text-xl">Let the cards guide you.</span>
        <Sparkles className="w-5 h-5" />
      </div>
    </div>
  </motion.div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const [expanded, setExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getIcon = () => {
    switch (product.iconType) {
      case 'smartphone': return <Smartphone className="w-6 h-6 text-amber-400" />;
      case 'palm': return <Hand className="w-6 h-6 text-amber-400" />;
      case 'home': return <Home className="w-6 h-6 text-amber-400" />;
      default: return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  const handleBuy = (tier: ProductTier) => {
    if (tier.catalogLink) {
      window.open(tier.catalogLink, '_blank');
    } else {
      const priceText = tier.price !== undefined ? ` (₹${tier.price})` : '';
      const text = `Hi Nibedita, I'd like to order: ${product.name} — ${tier.name} Plan${priceText}.\n\n${product.whatsappPrompt}`;
      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/919736973155?text=${encoded}`, '_blank');
    }
  };

  return (
    <div className="bg-purple-950/30 border border-purple-500/30 rounded-2xl shadow-xl flex flex-col h-full backdrop-blur-sm overflow-hidden group">
      {product.imageUrl && (
        <>
          <div 
            className="w-full h-48 border-b border-purple-500/30 overflow-hidden relative shrink-0 cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          >
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-md flex items-center gap-2 shadow-xl border border-white/10 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <Maximize className="w-4 h-4" /> View Full Photo
              </span>
            </div>
          </div>

          <AnimatePresence>
            {isFullscreen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFullscreen(false)}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
              >
                <button
                  onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
                  className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-[101]"
                >
                  <X className="w-6 h-6" />
                </button>
                <motion.img
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
            {getIcon()}
          </div>
          <div>
            <span className="text-xs text-amber-400/80 uppercase tracking-wider font-semibold">{product.category}</span>
            <h3 className="font-serif text-2xl text-amber-50 leading-tight">{product.name}</h3>
          </div>
        </div>
        <p className="text-sm text-purple-200/80 mb-6 leading-relaxed flex-1">
          {product.description}
        </p>
        
        <div className="border-t border-purple-500/20 pt-4 mt-auto">
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="flex items-center justify-between w-full text-amber-400 font-medium hover:text-amber-300 transition-colors py-2"
          >
            <span>View Pricing Plans</span>
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          <AnimatePresence>
            {expanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: 'auto', opacity: 1 }} 
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3 pt-4">
                  {product.tiers.map((tier, i) => (
                    <div key={i} className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors ${tier.isPopular ? 'bg-amber-500/10 border-amber-500/50' : 'bg-purple-900/20 border-purple-500/20'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-amber-50">{tier.name}</h4>
                            {tier.isPopular && <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Popular</span>}
                          </div>
                          <p className="text-xs text-purple-200/60 mt-1">{tier.description}</p>
                        </div>
                        <div className="text-right">
                          {tier.price !== undefined && (
                            <div className="text-lg font-serif text-amber-400 font-bold">₹{tier.price}</div>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleBuy(tier)}
                        className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${tier.isPopular ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]' : 'bg-purple-800/50 hover:bg-amber-500 hover:text-black border border-purple-500/30'}`}
                      >
                        <MessageCircle className="w-4 h-4" /> Book Now
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ShopView = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center px-4 py-8 max-w-6xl mx-auto w-full">
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-purple-900/30 rounded-full mb-2 ring-1 ring-purple-500/50">
          <ShoppingBag className="text-amber-400 w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-amber-400">Mystical Services Shop</h2>
        <p className="text-purple-200/70">Explore personalized consultations and deep insights.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </motion.div>
  );
};


// --- Subscriptions View ---

const SubscriptionsView = () => {
  const handleSubscribe = (plan: SubscriptionPlan) => {
    const text = `Hi Nibedita, I'd like to subscribe to: ${plan.name} — ₹${plan.price}/month`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919736973155?text=${encoded}`, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center px-4 py-8 md:py-16 max-w-7xl mx-auto w-full">
      <div className="text-center space-y-4 mb-12 md:mb-16 max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center p-3 bg-purple-900/30 rounded-full mb-2 ring-1 ring-purple-500/50">
          <Star className="text-amber-400 w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl md:text-5xl text-amber-400">🔮 Monthly Tarot Subscription Plans</h2>
        <p className="text-purple-200/70 text-lg">Choose Your Plan & Begin Your Journey</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 w-full items-start">
        {subscriptionPlans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            className={`relative flex flex-col h-full rounded-3xl p-6 md:p-8 backdrop-blur-md transition-all shadow-xl ${
              plan.popular 
                ? 'bg-gradient-to-b from-amber-500/10 to-purple-900/40 border border-amber-500/50 xl:scale-105 xl:-translate-y-2 z-10 shadow-[0_0_30px_rgba(251,191,36,0.15)]' 
                : 'bg-purple-950/30 border border-purple-500/30 hover:border-purple-400/50'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-amber-400 text-black text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.4)] whitespace-nowrap">
                Most Popular
              </div>
            )}
            
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">{plan.icon}</div>
              <h3 className={`text-xl font-serif mb-2 ${plan.popular ? 'text-amber-400' : 'text-amber-100'}`}>{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-3xl font-bold ${plan.popular ? 'text-amber-500' : 'text-white'}`}>₹{plan.price}</span>
                <span className="text-purple-200/50 text-sm">/month</span>
              </div>
            </div>

            <div className="flex-1 w-full flex flex-col gap-4 mb-8">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? 'text-amber-400' : 'text-purple-400'}`} />
                  <span className="text-sm text-purple-100/80 leading-snug">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-auto ${
                plan.popular 
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:-translate-y-0.5' 
                  : 'bg-purple-800/50 text-amber-50 border border-purple-500/30 hover:bg-purple-700/60 hover:border-purple-400/50'
              }`}
            >
              Subscribe Now
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- Main App Layout ---

export default function App() {
  const [view, setView] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'daily', label: 'Daily Card' },
    { id: 'ask', label: 'Ask a Question' },
    { id: 'yesno', label: 'Yes/No Reading' },
    { id: 'booking', label: 'Book Appointment' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' }
  ];

  const handleNav = (id: string) => {
    setView(id);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-amber-50 font-sans selection:bg-amber-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('home')}>
            <Moon className="w-8 h-8 text-amber-400" />
            <span className="font-serif text-xl md:text-2xl font-semibold tracking-wide text-amber-50">
              Nibedita <span className="text-amber-400">Mystic Insights</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-sm tracking-widest uppercase transition-colors hover:text-amber-400 ${view === item.id ? 'text-amber-400 font-semibold' : 'text-purple-200/70'}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="w-px h-6 bg-purple-500/30" />
            <a 
              href="https://youtube.com/@tarotbynibedita" 
              target="_blank" 
              rel="noreferrer"
              className="text-purple-200/70 hover:text-red-500 hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(220,38,38,0)] hover:drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <a 
              href="https://youtube.com/@tarotbynibedita" 
              target="_blank" 
              rel="noreferrer"
              className="text-purple-200 hover:text-red-500 transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <button className="p-2 text-purple-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-purple-500/20 bg-indigo-950/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="flex flex-col px-4 py-6 space-y-6">
                {/* YouTube Link in Mobile Menu */}
                <a 
                  href="https://youtube.com/@tarotbynibedita" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-black/40 border border-purple-500/20 hover:border-red-500/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)] shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&q=80&w=100&h=100" 
                      alt="Channel Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-serif text-lg text-amber-400">Nibedita Mystic Insights</div>
                    <div className="text-red-400 text-sm flex items-center gap-1 mt-0.5 font-medium">
                      <Youtube className="w-4 h-4" /> Subscribe
                    </div>
                  </div>
                </a>

                <div className="w-full h-px bg-purple-500/20" />

                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`text-left text-lg tracking-widest uppercase ${view === item.id ? 'text-amber-400 font-semibold' : 'text-purple-200'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full relative">
        <AnimatePresence>
          {view !== 'home' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto w-full px-4 pt-6 md:pt-8 relative z-20 flex"
            >
              <button 
                onClick={() => setView('home')}
                className="inline-flex items-center gap-2 text-purple-200 hover:text-amber-400 group transition-colors px-4 py-2 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 rounded-full text-sm font-medium backdrop-blur-md shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {view === 'home' && <HomeView setView={setView} />}
        {view === 'daily' && <DailyCardView />}
        {view === 'ask' && <AskQuestionView />}
        {view === 'yesno' && <YesNoView />}
        {view === 'booking' && <BookingView />}
        {view === 'subscriptions' && <SubscriptionsView />}
        {view === 'shop' && <ShopView />}
        {view === 'about' && <AboutView />}
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919736973155"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-105 transition-transform flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-black/80 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with Nibedita
        </span>
      </a>
      
      {/* Simple Footer */}
      <footer className="border-t border-purple-500/20 py-12 text-center text-purple-300/50 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex items-center gap-6">
            <a 
              href="https://youtube.com/@tarotbynibedita" 
              target="_blank" 
              rel="noreferrer"
              className="text-purple-300/70 hover:text-red-500 hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(220,38,38,0)] hover:drop-shadow-[0_0_12px_rgba(220,38,38,0.5)]"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a 
              href="https://wa.me/919736973155" 
              target="_blank" 
              rel="noreferrer"
              className="text-purple-300/70 hover:text-[#25D366] hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(37,211,102,0)] hover:drop-shadow-[0_0_12px_rgba(37,211,102,0.5)]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Nibedita Mystic Insights. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


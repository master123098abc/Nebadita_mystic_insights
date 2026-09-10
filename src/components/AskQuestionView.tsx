import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MessageCircle, Sparkles, Send } from 'lucide-react';
import { readingSpreads, ReadingSpread, tarotDeck, TarotCard, getRandomCard } from '../data';

// A visual for the card back
const CardBack = () => (
  <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl border-2 border-amber-500/50 flex items-center justify-center shadow-lg relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
    <div className="w-12 h-12 rounded-full border border-amber-400/50 flex items-center justify-center">
      <Sparkles className="w-6 h-6 text-amber-400" />
    </div>
  </div>
);

// A visual for the front of the card
const CardFront = ({ card, position }: { card: TarotCard; position?: string }) => (
  <div className="flex flex-col items-center w-32 md:w-40 shrink-0">
    {position && <div className="text-amber-400 font-serif text-sm mb-2 h-10 flex items-end justify-center text-center leading-tight">{position}</div>}
    <div className="w-full aspect-[2/3] rounded-xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.2)] bg-black relative">
      <img src={card.image} alt={card.name} className="w-full h-full object-cover opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
        <span className="text-amber-50 font-serif text-xs md:text-sm text-center w-full drop-shadow-md">{card.name}</span>
      </div>
    </div>
  </div>
);

export const AskQuestionView = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [question, setQuestion] = useState("");
  const [selectedSpread, setSelectedSpread] = useState<ReadingSpread | null>(null);
  const [drawnCards, setDrawnCards] = useState<TarotCard[]>([]);
  
  // 78 face down cards to pick from
  const deckCards = Array.from({ length: 78 }).map((_, i) => i);

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim().length > 0) setStep(2);
  };

  const handleSelectSpread = (spread: ReadingSpread) => {
    setSelectedSpread(spread);
    setDrawnCards([]); // reset drawn
    setStep(3);
  };

  const handlePickCard = () => {
    if (!selectedSpread || !selectedSpread.positions) return;
    
    if (drawnCards.length < selectedSpread.positions.length) {
      let newCard: TarotCard;
      do {
        newCard = getRandomCard();
      } while (drawnCards.some(c => c.name === newCard.name));
      
      const newDrawn = [...drawnCards, newCard];
      setDrawnCards(newDrawn);
      
      if (newDrawn.length === selectedSpread.positions.length) {
        setTimeout(() => setStep(4), 800);
      }
    }
  };

  const getWhatsAppLink = () => {
    if (!selectedSpread || !selectedSpread.positions) return "";
    
    let text = `Hi Nibedita, I'd like a reading!\n\n*Question:* "${question}"\n*Spread:* ${selectedSpread.name} (₹${selectedSpread.price})\n\n*Cards Drawn:*`;
    drawnCards.forEach((card, index) => {
      text += `\n- ${selectedSpread.positions![index]}: ${card.name}`;
    });
    
    return `https://wa.me/919736973155?text=${encodeURIComponent(text)}`;
  };

  const exampleQuestions = [
    "Should I take this job?",
    "Is this relationship right for me?",
    "What is coming towards me?",
    "How can I improve my finances?"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 pb-24 min-h-[80vh] flex flex-col">
      <div className="mb-8">
        <h2 className="font-serif text-3xl md:text-4xl text-amber-400 mb-2">Ask a Question</h2>
        <p className="text-purple-200/70">Focus on your inquiry and let the cards guide you.</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full"
          >
            <form onSubmit={handleQuestionSubmit} className="bg-purple-950/40 backdrop-blur-md border border-purple-500/30 p-6 md:p-8 rounded-3xl shadow-xl">
              <label className="block font-serif text-xl text-amber-50 mb-4">What is on your mind?</label>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {exampleQuestions.map(q => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuestion(q)}
                    className="text-xs md:text-sm bg-purple-900/50 hover:bg-purple-800 text-purple-200 py-1.5 px-3 rounded-full transition-colors border border-purple-500/30"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={500}
                placeholder="Type your question here (maximum 500 characters)..."
                className="w-full bg-black/40 border border-purple-500/40 rounded-xl p-4 text-amber-50 placeholder:text-purple-300/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none h-32 mb-4"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-purple-300/50">{question.length}/500</span>
                <button
                  type="submit"
                  disabled={question.trim().length === 0}
                  className="bg-amber-500 text-black font-bold py-3 px-8 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:bg-amber-400 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                >
                  Continue <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full space-y-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setStep(1)} className="p-2 rounded-full hover:bg-purple-900/50 text-amber-400 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h3 className="font-serif text-2xl text-amber-50">Choose Your Spread</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {readingSpreads.filter(s => s.positions && s.positions.length > 0).map(spread => (
                <button
                  key={spread.id}
                  onClick={() => handleSelectSpread(spread)}
                  className="bg-purple-950/30 backdrop-blur-sm border border-purple-500/30 p-5 rounded-2xl hover:border-amber-400/60 hover:bg-purple-900/40 transition-all text-left flex justify-between items-center group"
                >
                  <div>
                    <div className="font-serif text-lg text-amber-50 group-hover:text-amber-200">{spread.name}</div>
                    <div className="text-sm text-purple-200/70">{spread.positions?.length} Card{spread.positions?.length !== 1 ? 's' : ''} • ₹{spread.price}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black text-amber-500 transition-all">
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && selectedSpread && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col h-full"
          >
            <div className="text-center mb-8">
              <h3 className="font-serif text-2xl text-amber-400 mb-2">Pick Your Cards</h3>
              <p className="text-purple-200/80">
                You still have to pick <strong className="text-amber-50 text-xl">{selectedSpread.positions!.length - drawnCards.length}</strong> card(s)
              </p>
              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto h-2 bg-black/50 rounded-full mt-4 overflow-hidden border border-purple-500/30">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${(drawnCards.length / selectedSpread.positions!.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Deck of face down cards (Scrollable horizontal) */}
            <div className="w-full overflow-x-auto hide-scrollbar py-8 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex gap-[-40px] px-10">
                {deckCards.map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -20 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePickCard}
                    className="w-24 md:w-32 aspect-[2/3] shrink-0 -ml-12 md:-ml-16 shadow-2xl cursor-pointer first:ml-0"
                  >
                    <CardBack />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Area showing drawn cards so far */}
            <div className="mt-auto pt-10 min-h-[200px]">
              <div className="flex flex-wrap justify-center gap-4">
                <AnimatePresence>
                  {drawnCards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, opacity: 0, y: 50 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      className="w-16 md:w-20 aspect-[2/3] rounded-md overflow-hidden border border-amber-400/50 opacity-50"
                    >
                      <CardBack />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && selectedSpread && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full flex flex-col items-center space-y-12"
          >
            <div className="text-center space-y-2">
              <h3 className="font-serif text-3xl md:text-4xl text-amber-400">Your Cards Are Drawn</h3>
              <p className="text-purple-200/80">Question: <span className="italic text-amber-50">"{question}"</span></p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {drawnCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  style={{ perspective: 1000 }}
                >
                  <CardFront card={card} position={selectedSpread.positions![idx]} />
                </motion.div>
              ))}
            </div>

            <div className="bg-purple-950/40 backdrop-blur-md border border-purple-500/30 p-8 rounded-3xl text-center max-w-xl mx-auto w-full shadow-2xl">
              <h4 className="font-serif text-2xl text-amber-50 mb-4">Get Your Reading</h4>
              <p className="text-purple-200/80 mb-6 text-sm md:text-base leading-relaxed">
                Send these cards to Nibedita to receive your detailed, personalized reading via WhatsApp.
              </p>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] transition-all hover:-translate-y-1 text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Get Full Reading on WhatsApp
              </a>
              <p className="mt-4 text-xs text-purple-300/50 uppercase tracking-widest font-semibold">
                Spread Cost: ₹{selectedSpread.price}
              </p>
            </div>
            
            <button 
              onClick={() => { setStep(1); setQuestion(""); setDrawnCards([]); }}
              className="text-purple-300/60 hover:text-amber-400 text-sm transition-colors"
            >
              Ask another question
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

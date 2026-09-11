export type TarotCard = {
  id: string;
  name: string;
  imageUrl: string;
  upright: string;
  reversed: string;
  yesNo: 'Yes' | 'No' | 'Maybe';
};

export type ProductTier = {
  name: string;
  price?: number;
  description: string;
  isPopular?: boolean;
  catalogLink?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  iconType: 'smartphone' | 'palm' | 'home' | 'sparkles';
  whatsappPrompt: string;
  tiers: ProductTier[];
  imageUrl?: string;
};

export type Testimonial = {
  id: string;
  image: string;
  rating: number;
  caption?: string;
};

// Array of mystical, tarot-themed placeholder images for variety
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1632386187893-78401309f485?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=600&auto=format&fit=crop", // moon/celestial
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop", // mystic pattern
  "https://images.unsplash.com/photo-1618588507085-c79565432917?q=80&w=600&auto=format&fit=crop", // nature/earth magic
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop", // esoteric/stars
  "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=600&auto=format&fit=crop"  // aesthetic dark magic
];

// Helper to get a deterministic pseudo-random image for a given card name
const getCardImage = (name: string, index: number) => {
  return PLACEHOLDER_IMAGES[index % PLACEHOLDER_IMAGES.length];
};

export const testimonials: Testimonial[] = [
  { id: "t1", image: "/testimonials/IMG_20260907_154040.jpg", rating: 5, caption: "Career Guidance Reading" },
  { id: "t2", image: "/testimonials/IMG_20260907_154135.jpg", rating: 5, caption: "Love & Relationship Insight" },
  { id: "t3", image: "/testimonials/IMG_20260907_154237.jpg", rating: 5, caption: "Numerology Report" },
  { id: "t4", image: "/testimonials/IMG_20260907_154613.jpg", rating: 5, caption: "Mobile Number Analysis" },
  { id: "t5", image: "/testimonials/IMG_20260908_225336.jpg", rating: 5, caption: "Client Feedback" }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Mobile Number Analysis",
    description: "Discover if your mobile number's vibrations align with your personal energy and life goals. Numerology-based analysis of your number's overall vibration, personality impact, career & business suitability, money & success energy, relationship compatibility, and personalised guidance for choosing supportive numbers.",
    category: "Numerology",
    iconType: "smartphone",
    imageUrl: "/mobile-number.webp",
    whatsappPrompt: "My mobile number for analysis: ",
    tiers: [
      {
        name: "Detailed Analysis",
        price: 999,
        description: "Complete analysis + personalised guidance",
        isPopular: true,
        catalogLink: "https://wa.me/p/28335724959384521/919736973155"
      }
    ]
  },
  {
    id: "p2",
    name: "Numerology Reading",
    description: "Unlock the secrets of your life path, destiny, and personality through a deep analysis of your birth date and name vibrations.",
    category: "Numerology",
    iconType: "sparkles",
    imageUrl: "/numerology.webp",
    whatsappPrompt: "I want a Numerology Reading.",
    tiers: [
      {
        name: "Full Reading",
        price: 555,
        description: "Detailed numerology analysis",
        isPopular: true,
        catalogLink: "https://wa.me/p/38845051908427475/919736973155"
      }
    ]
  },
  {
    id: "p3",
    name: "Candle Spells",
    description: "Personalized candle rituals crafted to clear blockages, manifest intentions, and draw positive energy into your life.",
    category: "Spells & Rituals",
    iconType: "sparkles",
    imageUrl: "/candle-spell.webp",
    whatsappPrompt: "I am interested in a Candle Spell.",
    tiers: [
      {
        name: "Custom Spell",
        price: 599,
        description: "Personalized candle ritual",
        catalogLink: "https://wa.me/p/28980322501555797/919736973155"
      }
    ]
  },
  {
    id: "p4",
    name: "Jar Spells",
    description: "Custom-made spell jars for protection, love, prosperity, and spiritual grounding. Charged with specific intentions.",
    category: "Spells & Rituals",
    iconType: "sparkles",
    imageUrl: "/jar-spell.webp",
    whatsappPrompt: "I am interested in a Jar Spell.",
    tiers: [
      {
        name: "Custom Jar",
        price: 499,
        description: "Hand-crafted spell jar",
        catalogLink: "https://wa.me/p/27832483079708020/919736973155"
      }
    ]
  },
  {
    id: "p5",
    name: "Tarot Reading",
    description: "Intuitive tarot reading providing clarity, guidance, and empowerment for your life's journey.",
    category: "Tarot",
    iconType: "sparkles",
    imageUrl: "/spiritual-guidance.webp",
    whatsappPrompt: "I would like to book a Tarot Reading.",
    tiers: [
      {
        name: "Tarot Reading",
        description: "Tarot Reading by Nibedita",
        catalogLink: "https://wa.me/p/28135106719474955/919736973155"
      }
    ]
  }
];

const PLACEHOLDER_IMG = PLACEHOLDER_IMAGES[0];

const rawTarotDeck: TarotCard[] = [
  // MAJOR ARCANA
  { id: "m0", name: "The Fool", imageUrl: PLACEHOLDER_IMG, upright: "New beginnings, innocence, spontaneity, a free spirit.", reversed: "Holding back, recklessness, risk-taking.", yesNo: "Yes" },
  { id: "m1", name: "The Magician", imageUrl: PLACEHOLDER_IMG, upright: "Manifestation, resourcefulness, power, inspired action.", reversed: "Manipulation, poor planning, untapped talents.", yesNo: "Yes" },
  { id: "m2", name: "The High Priestess", imageUrl: PLACEHOLDER_IMG, upright: "Intuition, sacred knowledge, divine feminine, the subconscious mind.", reversed: "Secrets, disconnected from intuition, withdrawal and silence.", yesNo: "Maybe" },
  { id: "m3", name: "The Empress", imageUrl: PLACEHOLDER_IMG, upright: "Femininity, beauty, nature, nurturing, abundance.", reversed: "Creative block, dependence on others.", yesNo: "Yes" },
  { id: "m4", name: "The Emperor", imageUrl: PLACEHOLDER_IMG, upright: "Authority, establishment, structure, a father figure.", reversed: "Domination, excessive control, lack of discipline, inflexibility.", yesNo: "Yes" },
  { id: "m5", name: "The Hierophant", imageUrl: PLACEHOLDER_IMG, upright: "Spiritual wisdom, religious beliefs, conformity, tradition, institutions.", reversed: "Personal beliefs, freedom, challenging the status quo.", yesNo: "Maybe" },
  { id: "m6", name: "The Lovers", imageUrl: PLACEHOLDER_IMG, upright: "Love, harmony, relationships, values alignment, choices.", reversed: "Self-love, disharmony, imbalance, misalignment of values.", yesNo: "Yes" },
  { id: "m7", name: "The Chariot", imageUrl: PLACEHOLDER_IMG, upright: "Control, willpower, success, action, determination.", reversed: "Self-discipline, opposition, lack of direction.", yesNo: "Yes" },
  { id: "m8", name: "Strength", imageUrl: PLACEHOLDER_IMG, upright: "Strength, courage, persuasion, influence, compassion.", reversed: "Inner strength, self-doubt, low energy, raw emotion.", yesNo: "Yes" },
  { id: "m9", name: "The Hermit", imageUrl: PLACEHOLDER_IMG, upright: "Soul-searching, introspection, being alone, inner guidance.", reversed: "Isolation, loneliness, withdrawal.", yesNo: "Maybe" },
  { id: "m10", name: "Wheel of Fortune", imageUrl: PLACEHOLDER_IMG, upright: "Good luck, karma, life cycles, destiny, a turning point.", reversed: "Bad luck, resistance to change, breaking cycles.", yesNo: "Yes" },
  { id: "m11", name: "Justice", imageUrl: PLACEHOLDER_IMG, upright: "Justice, fairness, truth, cause and effect, law.", reversed: "Unfairness, lack of accountability, dishonesty.", yesNo: "Maybe" },
  { id: "m12", name: "The Hanged Man", imageUrl: PLACEHOLDER_IMG, upright: "Pause, surrender, letting go, new perspectives.", reversed: "Delays, resistance, stalling, indecision.", yesNo: "Maybe" },
  { id: "m13", name: "Death", imageUrl: PLACEHOLDER_IMG, upright: "Endings, change, transformation, transition.", reversed: "Resistance to change, personal transformation, inner purging.", yesNo: "No" },
  { id: "m14", name: "Temperance", imageUrl: PLACEHOLDER_IMG, upright: "Balance, moderation, patience, purpose.", reversed: "Imbalance, excess, self-healing, re-alignment.", yesNo: "Yes" },
  { id: "m15", name: "The Devil", imageUrl: PLACEHOLDER_IMG, upright: "Shadow self, attachment, addiction, restriction, sexuality.", reversed: "Releasing limiting beliefs, exploring dark thoughts, detachment.", yesNo: "No" },
  { id: "m16", name: "The Tower", imageUrl: PLACEHOLDER_IMG, upright: "Sudden change, upheaval, chaos, revelation, awakening.", reversed: "Personal transformation, fear of change, averting disaster.", yesNo: "No" },
  { id: "m17", name: "The Star", imageUrl: PLACEHOLDER_IMG, upright: "Hope, faith, purpose, renewal, spirituality.", reversed: "Lack of faith, despair, self-trust, disconnection.", yesNo: "Yes" },
  { id: "m18", name: "The Moon", imageUrl: PLACEHOLDER_IMG, upright: "Illusion, fear, anxiety, subconscious, intuition.", reversed: "Release of fear, repressed emotion, inner confusion.", yesNo: "No" },
  { id: "m19", name: "The Sun", imageUrl: PLACEHOLDER_IMG, upright: "Positivity, fun, warmth, success, vitality.", reversed: "Inner child, feeling down, overly optimistic.", yesNo: "Yes" },
  { id: "m20", name: "Judgement", imageUrl: PLACEHOLDER_IMG, upright: "Judgement, rebirth, inner calling, absolution.", reversed: "Self-doubt, inner critic, ignoring the call.", yesNo: "Yes" },
  { id: "m21", name: "The World", imageUrl: PLACEHOLDER_IMG, upright: "Completion, integration, accomplishment, travel.", reversed: "Seeking personal closure, short-cuts, delays.", yesNo: "Yes" },

  // CUPS (Water / Emotion) - Sample mapped for brevity, providing all 14
  { id: "c1", name: "Ace of Cups", imageUrl: PLACEHOLDER_IMG, upright: "New feelings, spirituality, intuition.", reversed: "Emotional loss, blocked creativity.", yesNo: "Yes" },
  { id: "c2", name: "Two of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Unified love, partnership, mutual attraction.", reversed: "Breakups, disharmony, distrust.", yesNo: "Yes" },
  { id: "c3", name: "Three of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Celebration, friendship, creativity, collaborations.", reversed: "Independence, alone time, hardcore partying.", yesNo: "Yes" },
  { id: "c4", name: "Four of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Meditation, contemplation, apathy, reevaluation.", reversed: "Retreat, withdrawal, checking in for alignment.", yesNo: "No" },
  { id: "c5", name: "Five of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Regret, failure, disappointment, pessimism.", reversed: "Personal setbacks, self-forgiveness, moving on.", yesNo: "No" },
  { id: "c6", name: "Six of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Revisiting the past, childhood memories, innocence.", reversed: "Living in the past, forgiveness, lacking playfulness.", yesNo: "Yes" },
  { id: "c7", name: "Seven of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Opportunities, choices, wishful thinking, illusion.", reversed: "Alignment, personal values, overwhelmed by choices.", yesNo: "Maybe" },
  { id: "c8", name: "Eight of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Disappointment, abandonment, withdrawal, escapism.", reversed: "Trying one more time, indecision, aimless drifting.", yesNo: "No" },
  { id: "c9", name: "Nine of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Contentment, satisfaction, gratitude, wish come true.", reversed: "Inner happiness, materialism, dissatisfaction.", yesNo: "Yes" },
  { id: "c10", name: "Ten of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Divine love, blissful relationships, harmony, alignment.", reversed: "Disconnection, misaligned values, struggling relationships.", yesNo: "Yes" },
  { id: "c11", name: "Page of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Creative opportunities, intuitive messages, curiosity.", reversed: "New ideas, doubting intuition, creative blocks.", yesNo: "Yes" },
  { id: "c12", name: "Knight of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Creativity, romance, charm, imagination, beauty.", reversed: "Overactive imagination, unrealistic, jealous, moody.", yesNo: "Yes" },
  { id: "c13", name: "Queen of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Compassionate, caring, emotionally stable, intuitive.", reversed: "Inner feelings, self-care, co-dependency, martyr.", yesNo: "Yes" },
  { id: "c14", name: "King of Cups", imageUrl: PLACEHOLDER_IMG, upright: "Emotionally balanced, compassionate, diplomatic.", reversed: "Self-compassion, inner guidance, coldness, moody.", yesNo: "Yes" },

  // PENTACLES (Earth / Material)
  { id: "p1", name: "Ace of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "A new financial or career opportunity, manifestation, abundance.", reversed: "Lost opportunity, lack of planning and foresight.", yesNo: "Yes" },
  { id: "p2", name: "Two of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Multiple priorities, time management, prioritization, adaptability.", reversed: "Over-committed, disorganization, reprioritization.", yesNo: "Maybe" },
  { id: "p3", name: "Three of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Teamwork, collaboration, learning, implementation.", reversed: "Disharmony, misalignment, working alone.", yesNo: "Yes" },
  { id: "p4", name: "Four of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Saving money, security, conservatism, scarcity, control.", reversed: "Over-spending, greed, self-protection.", yesNo: "No" },
  { id: "p5", name: "Five of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Financial loss, poverty, isolation, worry.", reversed: "Recovery from financial loss, spiritual poverty.", yesNo: "No" },
  { id: "p6", name: "Six of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Giving, receiving, sharing wealth, generosity, charity.", reversed: "Self-care, unpaid debts, one-sided charity.", yesNo: "Yes" },
  { id: "p7", name: "Seven of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Long-term view, sustainable results, perseverance, investment.", reversed: "Lack of long-term vision, limited success or reward.", yesNo: "Yes" },
  { id: "p8", name: "Eight of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Apprenticeship, repetitive tasks, mastery, skill development.", reversed: "Self-development, perfectionism, misdirected activity.", yesNo: "Yes" },
  { id: "p9", name: "Nine of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Abundance, luxury, self-sufficiency, financial independence.", reversed: "Self-worth, over-investment in work, hustling.", yesNo: "Yes" },
  { id: "p10", name: "Ten of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Wealth, financial security, family, long-term success, contribution.", reversed: "The dark side of wealth, financial failure or loss.", yesNo: "Yes" },
  { id: "p11", name: "Page of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Manifestation, financial opportunity, skill development.", reversed: "Lack of progress, procrastination, learn from failure.", yesNo: "Yes" },
  { id: "p12", name: "Knight of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Hard work, productivity, routine, conservatism.", reversed: "Self-discipline, boredom, feeling 'stuck', perfectionism.", yesNo: "Yes" },
  { id: "p13", name: "Queen of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Nurturing, practical, providing financially, a working parent.", reversed: "Financial independence, self-care, work-home conflict.", yesNo: "Yes" },
  { id: "p14", name: "King of Pentacles", imageUrl: PLACEHOLDER_IMG, upright: "Wealth, business, leadership, security, discipline, abundance.", reversed: "Financially inept, obsessed with wealth and status.", yesNo: "Yes" },

  // SWORDS (Air / Mind)
  { id: "s1", name: "Ace of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Breakthroughs, new ideas, mental clarity, success.", reversed: "Inner clarity, re-thinking an idea, clouded judgement.", yesNo: "Yes" },
  { id: "s2", name: "Two of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Difficult decisions, weighing up options, an impasse, avoidance.", reversed: "Indecision, confusion, information overload, stalemate.", yesNo: "Maybe" },
  { id: "s3", name: "Three of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Heartbreak, emotional pain, sorrow, grief, hurt.", reversed: "Negative self-talk, releasing pain, optimism, forgiveness.", yesNo: "No" },
  { id: "s4", name: "Four of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Rest, relaxation, meditation, contemplation, recuperation.", reversed: "Exhaustion, burn-out, deep contemplation, stagnation.", yesNo: "Maybe" },
  { id: "s5", name: "Five of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Conflict, disagreements, competition, defeat, winning at all costs.", reversed: "Reconciliation, making amends, past resentment.", yesNo: "No" },
  { id: "s6", name: "Six of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Transition, change, rite of passage, releasing baggage.", reversed: "Personal transition, resistance to change, unfinished business.", yesNo: "Yes" },
  { id: "s7", name: "Seven of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Betrayal, deception, getting away with something, acting strategically.", reversed: "Imposter syndrome, self-deceit, keeping secrets.", yesNo: "No" },
  { id: "s8", name: "Eight of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Negative thoughts, self-imposed restriction, imprisonment, victim mentality.", reversed: "Self-limiting beliefs, inner critic, releasing negative thoughts.", yesNo: "No" },
  { id: "s9", name: "Nine of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Anxiety, worry, fear, depression, nightmares.", reversed: "Inner turmoil, deep-seated fears, secrets, releasing worry.", yesNo: "No" },
  { id: "s10", name: "Ten of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Painful endings, deep wounds, betrayal, loss, crisis.", reversed: "Recovery, regeneration, resisting an inevitable end.", yesNo: "No" },
  { id: "s11", name: "Page of Swords", imageUrl: PLACEHOLDER_IMG, upright: "New ideas, curiosity, thirst for knowledge, new ways of communicating.", reversed: "Self-expression, all talk and no action, haphazard action.", yesNo: "Yes" },
  { id: "s12", name: "Knight of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Ambitious, action-oriented, driven to succeed, fast-thinking.", reversed: "Restless, unfocused, impulsive, burn-out.", yesNo: "Yes" },
  { id: "s13", name: "Queen of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Independent, unbiased judgement, clear boundaries, direct communication.", reversed: "Overly-emotional, easily influenced, bitchy, cold-hearted.", yesNo: "Yes" },
  { id: "s14", name: "King of Swords", imageUrl: PLACEHOLDER_IMG, upright: "Mental clarity, intellectual power, authority, truth.", reversed: "Quiet power, inner truth, misuse of power, manipulation.", yesNo: "Yes" },

  // WANDS (Fire / Action)
  { id: "w1", name: "Ace of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Inspiration, new opportunities, growth, potential.", reversed: "An emerging idea, lack of direction, distractions, delays.", yesNo: "Yes" },
  { id: "w2", name: "Two of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Future planning, progress, decisions, discovery.", reversed: "Personal goals, inner alignment, unexpected delays.", yesNo: "Yes" },
  { id: "w3", name: "Three of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Progress, expansion, foresight, overseas opportunities.", reversed: "Playing small, lack of foresight, unexpected delays.", yesNo: "Yes" },
  { id: "w4", name: "Four of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Celebration, joy, harmony, relaxation, homecoming.", reversed: "Personal celebration, inner harmony, conflict with others.", yesNo: "Yes" },
  { id: "w5", name: "Five of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Conflict, disagreements, competition, tension, diversity.", reversed: "Inner conflict, conflict avoidance, tension release.", yesNo: "No" },
  { id: "w6", name: "Six of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Success, public recognition, progress, self-confidence.", reversed: "Private achievement, personal definition of success, fall from grace.", yesNo: "Yes" },
  { id: "w7", name: "Seven of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Challenge, competition, protection, perseverance.", reversed: "Exhaustion, giving up, overwhelmed.", yesNo: "Yes" },
  { id: "w8", name: "Eight of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Movement, fast paced change, action, alignment, air travel.", reversed: "Delays, frustration, resisting change, internal alignment.", yesNo: "Yes" },
  { id: "w9", name: "Nine of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Resilience, courage, persistence, test of faith, boundaries.", reversed: "Inner resources, struggle, overwhelm, defensive, paranoia.", yesNo: "Yes" },
  { id: "w10", name: "Ten of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Burden, extra responsibility, hard work, completion.", reversed: "Doing it all, carrying the burden, delegation, release.", yesNo: "No" },
  { id: "w11", name: "Page of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Inspiration, ideas, discovery, limitless potential, free spirit.", reversed: "Newly-formed ideas, redirecting energy, self-limiting beliefs.", yesNo: "Yes" },
  { id: "w12", name: "Knight of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Energy, passion, inspired action, adventure, impulsiveness.", reversed: "Passion project, haste, scattered energy, delays, frustration.", yesNo: "Yes" },
  { id: "w13", name: "Queen of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Courage, confidence, independence, social butterfly, determination.", reversed: "Inner sense of self, introverted, re-establish sense of self.", yesNo: "Yes" },
  { id: "w14", name: "King of Wands", imageUrl: PLACEHOLDER_IMG, upright: "Natural-born leader, vision, entrepreneur, honour.", reversed: "Impulsive, overbearing, unachievable expectations.", yesNo: "Yes" },
];

// Re-map the deck to assign a random placeholder image to each card
export const tarotDeck: TarotCard[] = rawTarotDeck.map((card, idx) => ({
  ...card,
  imageUrl: getCardImage(card.name, idx)
}));

export const getRandomCard = (): { card: TarotCard, isReversed: boolean } => {
  const randomIndex = Math.floor(Math.random() * tarotDeck.length);
  const card = tarotDeck[randomIndex];
  const isReversed = Math.random() > 0.5;
  return { card, isReversed };
};

export type ReadingCategory = 'Tarot Spreads' | 'Yes/No Readings' | 'Spells & Spiritual Guidance' | 'Numerology';

export type ReadingSpread = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: ReadingCategory;
  positions?: string[];
};

export const readingSpreads: ReadingSpread[] = [
  // Tarot Spreads
  { id: "ts1", name: "One Card Guidance", price: 199, category: "Tarot Spreads", positions: ["Guidance"] },
  { id: "ts2", name: "Three Card Spread", price: 555, category: "Tarot Spreads", positions: ["Card 1", "Card 2", "Card 3"] },
  { id: "ts3", name: "Past–Present–Future", price: 777, category: "Tarot Spreads", positions: ["Past", "Present", "Future"] },
  { id: "ts4", name: "Decision / Two-Path Spread", price: 888, category: "Tarot Spreads", positions: ["Path A", "Path B", "Advice"] },
  { id: "ts5", name: "5 Card Situation Spread", price: 999, category: "Tarot Spreads", positions: ["Present", "Challenge", "Past", "Future", "Outcome"] },
  { id: "ts6", name: "Career Path Spread", price: 999, category: "Tarot Spreads", positions: ["Current Situation", "Challenges", "Strengths", "Opportunities", "Outcome"] },
  { id: "ts7", name: "No Contact Spread", price: 999, category: "Tarot Spreads", positions: ["Your Energy", "Their Energy", "Obstacle", "Advice", "Future"] },
  { id: "ts8", name: "Relationship Spread", price: 1111, category: "Tarot Spreads", positions: ["You", "Them", "The Connection", "Advice", "Outcome"] },
  { id: "ts9", name: "Celtic Cross", price: 1555, category: "Tarot Spreads", positions: ["Present", "Challenge", "Past", "Future", "Above", "Below", "Advice", "External Influences", "Hopes/Fears", "Outcome"] },
  
  // Yes/No & Question-Based Readings
  { id: "yn1", name: "1 Yes/No Question", description: "1 सवाल, clear guidance", price: 151, category: "Yes/No Readings", positions: ["Answer"] },
  { id: "yn2", name: "2 Yes/No Questions", description: "2 direct questions", price: 251, category: "Yes/No Readings", positions: ["Question 1", "Question 2"] },
  { id: "yn3", name: "3 Questions Reading", description: "3 questions + guidance", price: 399, category: "Yes/No Readings", positions: ["Question 1", "Question 2", "Question 3"] },
  { id: "yn4", name: "Single Question Deep Reading", description: "एक सवाल की detailed reading", price: 555, category: "Yes/No Readings", positions: ["Overview", "Details", "Advice"] },
  { id: "yn5", name: "Past • Present • Future", description: "3-card life situation reading", price: 777, category: "Yes/No Readings", positions: ["Past", "Present", "Future"] },
  { id: "yn6", name: "Decision / Two Paths Reading", description: "Option A vs Option B", price: 888, category: "Yes/No Readings", positions: ["Path A", "Path B", "Advice"] },
  { id: "yn7", name: "5-Card Deep Reading", description: "Situation, challenge, hidden factor, advice, outcome", price: 999, category: "Yes/No Readings", positions: ["Situation", "Challenge", "Hidden Factor", "Advice", "Outcome"] },
  { id: "yn8", name: "Career Reading", description: "Career energy, opportunities, challenges, guidance", price: 999, category: "Yes/No Readings", positions: ["Career Energy", "Opportunities", "Challenges", "Guidance"] },
  { id: "yn9", name: "Money / Finance Reading", description: "Financial energy, opportunities, blocks, guidance", price: 999, category: "Yes/No Readings", positions: ["Financial Energy", "Opportunities", "Blocks", "Guidance"] },
  { id: "yn10", name: "No Contact Reading", description: "Current energy, feelings, possibility of communication, guidance", price: 999, category: "Yes/No Readings", positions: ["Current Energy", "Feelings", "Communication", "Guidance"] },
  { id: "yn11", name: "Love / Relationship Reading", description: "Feelings, intentions, connection, future direction", price: 1111, category: "Yes/No Readings", positions: ["Feelings", "Intentions", "Connection", "Future"] },
  { id: "yn12", name: "Celtic Cross Reading", description: "10-card comprehensive spread", price: 1555, category: "Yes/No Readings", positions: ["Present", "Challenge", "Past", "Future", "Above", "Below", "Advice", "External Influences", "Hopes/Fears", "Outcome"] },
  { id: "yn13", name: "Full Life Reading", description: "Love + Career + Finance + Personal guidance", price: 1999, category: "Yes/No Readings", positions: ["Love", "Career", "Finance", "Personal Guidance"] },

  // Numerology
  { id: "num1", name: "Numerology Reading", description: "Detailed numerology analysis based on your date of birth.", price: 1111, category: "Numerology" },
  { id: "num2", name: "Mobile Numerology", description: "Analysis of your mobile number and its energetic impact.", price: 501, category: "Numerology" },
  
  // Spells & Guidance
  { id: "spl1", name: "Candle Spells", description: "Personalized candle rituals for manifestation & energy clearing.", price: 1111, category: "Spells & Spiritual Guidance" },
  { id: "spl2", name: "Jar Spells", description: "Custom spell jars for protection, love, or prosperity.", price: 1555, category: "Spells & Spiritual Guidance" },
  { id: "spl3", name: "Spiritual Guidance", description: "One-on-one session for deep spiritual counseling.", price: 2111, category: "Spells & Spiritual Guidance" },
];

export type SubscriptionPlan = {
  id: string;
  name: string;
  icon: string;
  price: number;
  popular?: boolean;
  features: string[];
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "sub1",
    name: "Mystic Starter",
    icon: "🌟",
    price: 111,
    features: [
      "Daily Guidance",
      "1 Question per Month (Career / Love)",
      "Simple Tarot Guidance for Your Journey"
    ]
  },
  {
    id: "sub2",
    name: "Mystic Basic",
    icon: "🌙",
    price: 299,
    features: [
      "2 Yes/No Questions",
      "1 Monthly Energy Reading",
      "1 Guidance Message",
      "Members-only Offers"
    ]
  },
  {
    id: "sub3",
    name: "Mystic Silver",
    icon: "✨",
    price: 599,
    features: [
      "4 Tarot Questions",
      "1 Monthly Deep Reading",
      "Career / Relationship Guidance",
      "1 Monthly Energy Update",
      "Special Member Pricing"
    ]
  },
  {
    id: "sub4",
    name: "Mystic Premium",
    icon: "👑",
    price: 999,
    popular: true,
    features: [
      "8 Tarot Questions",
      "1 Deep Tarot Reading",
      "Career + Relationship Guidance",
      "1 Numerology Insight",
      "Priority Reading",
      "Exclusive Remedies & Guidance"
    ]
  },
  {
    id: "sub5",
    name: "Mystic VIP",
    icon: "💎",
    price: 1499,
    features: [
      "12 Tarot Questions",
      "Monthly Comprehensive Reading",
      "Tarot + Numerology Guidance",
      "Priority Support",
      "Personalized Spiritual Guidance",
      "Exclusive Member Offers"
    ]
  }
];

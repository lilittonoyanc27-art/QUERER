import React, { useState } from 'react';
import { 
  Heart, 
  Coffee, 
  Sparkles, 
  BookOpen, 
  Gamepad2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight,
  ChevronRight,
  Star,
  User,
  ShoppingBag,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Conjugation {
  pronoun: string;
  form: string;
  armenian: string;
}

interface QuizLevel {
  id: number;
  sentence: string; // e.g., "Yo ___ un café"
  options: string[];
  correct: string;
  meaning: 'want' | 'love';
  translation: string;
  context: string;
}

// --- Data ---

const CONJUGATIONS: Conjugation[] = [
  { pronoun: "Yo", form: "quiero", armenian: "Ես ուզում եմ / սիրում եմ" },
  { pronoun: "Tú", form: "quieres", armenian: "Դու ուզում ես / սիրում ես" },
  { pronoun: "Él / Ella / Usted", form: "quiere", armenian: "Նա ուզում է / սիրում է" },
  { pronoun: "Nosotros", form: "queremos", armenian: "Մենք ուզում ենք / սիրում ենք" },
  { pronoun: "Vosotros", form: "queréis", armenian: "Դուք ուզում եք / սիրում եք" },
  { pronoun: "Ellos / Ellas / Ustedes", form: "quieren", armenian: "Նրանք ուզում են / սիրում են" },
];

const QUIZ_LEVELS: QuizLevel[] = [
  {
    id: 1,
    sentence: "Yo ___ un helado de chocolate.",
    options: ["quiero", "queremos", "quieren"],
    correct: "quiero",
    meaning: 'want',
    translation: "Ես ուզում եմ շոկոլադե պաղպաղակ:",
    context: "Այստեղ 'querer' նշանակում է 'ցանկանալ', քանի որ խոսքը առարկայի մասին է:"
  },
  {
    id: 2,
    sentence: "Tú ___ mucho a tu mamá.",
    options: ["quieres", "quiere", "queréis"],
    correct: "quieres",
    meaning: 'love',
    translation: "Դու շատ ես սիրում մայրիկիդ:",
    context: "Այստեղ 'querer' նշանակում է 'սիրել', քանի որ խոսքը մարդու մասին է:"
  },
  {
    id: 3,
    sentence: "Nosotros ___ viajar a España.",
    options: ["quiero", "queremos", "quieren"],
    correct: "queremos",
    meaning: 'want',
    translation: "Մենք ուզում ենք ճանապարհորդել Իսպանիա:",
    context: "Երբ 'querer'-ին հաջորդում է բայ (viajar), այն նշանակում է 'ցանկանալ':"
  },
  {
    id: 4,
    sentence: "Él ___ a su perro.",
    options: ["quieres", "quiere", "queremos"],
    correct: "quiere",
    meaning: 'love',
    translation: "Նա սիրում է իր շանը:",
    context: "Կենդանիների և մարդկանց դեպքում 'querer'-ը հաճախ նշանակում է 'սիրել':"
  },
  {
    id: 5,
    sentence: "Ellos ___ comprar una casa nueva.",
    options: ["quieren", "queremos", "quieres"],
    correct: "quieren",
    meaning: 'want',
    translation: "Նրանք ուզում են նոր տուն գնել:",
    context: "Ցանկություն արտահայտելու համար:"
  },
  {
    id: 6,
    sentence: "Vosotros ___ a vuestros amigos.",
    options: ["queremos", "queréis", "quieren"],
    correct: "queréis",
    meaning: 'love',
    translation: "Դուք սիրում եք ձեր ընկերներին:",
    context: "Ընկերական սեր:"
  },
  {
    id: 7,
    sentence: "Usted ___ un café con leche.",
    options: ["quiere", "quiero", "quieren"],
    correct: "quiere",
    meaning: 'want',
    translation: "Դուք (հարգալից) ուզում եք սուրճ կաթով:",
    context: "Պատվեր կատարելիս:"
  },
  {
    id: 8,
    sentence: "Yo ___ a mi abuela.",
    options: ["quiero", "quiere", "quieres"],
    correct: "quiero",
    meaning: 'love',
    translation: "Ես սիրում եմ իմ տատիկին:",
    context: "Ընտանեկան սեր:"
  },
  {
    id: 9,
    sentence: "Tú ___ aprender español.",
    options: ["quieres", "queremos", "quieren"],
    correct: "quieres",
    meaning: 'want',
    translation: "Դու ուզում ես սովորել իսպաներեն:",
    context: "Նպատակ կամ ցանկություն:"
  },
  {
    id: 10,
    sentence: "Nosotros ___ a nuestra familia.",
    options: ["queremos", "quieren", "quieres"],
    correct: "queremos",
    meaning: 'love',
    translation: "Մենք սիրում ենք մեր ընտանիքին:",
    context: "Ամենակարևոր սերը:"
  }
];

// --- Components ---

export default function QuererApp() {
  const [view, setView] = useState<'menu' | 'theory' | 'game' | 'result'>('menu');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const level = QUIZ_LEVELS[currentLevel];

  const handleOptionClick = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    
    if (option === level.correct) {
      setFeedback('correct');
      setScore(prev => prev + 1);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (currentLevel + 1 < QUIZ_LEVELS.length) {
        setCurrentLevel(prev => prev + 1);
        setFeedback(null);
        setSelectedOption(null);
      } else {
        setView('result');
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setFeedback(null);
    setSelectedOption(null);
    setView('game');
  };

  return (
    <div className="min-h-screen bg-[#FDF2F8] text-[#1E293B] font-sans selection:bg-pink-200">
      
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10 overflow-hidden">
        <Heart className="absolute top-10 left-10 w-32 h-32 text-pink-400 rotate-12" />
        <Coffee className="absolute bottom-20 right-10 w-40 h-40 text-amber-600 -rotate-12" />
        <Sparkles className="absolute top-1/2 left-1/4 w-24 h-24 text-yellow-400 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-pink-500 rounded-3xl shadow-lg shadow-pink-200">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-pink-600 uppercase">QUERER</h1>
              <p className="text-xs font-bold opacity-50 uppercase tracking-widest">Ցանկանալ և Սիրել</p>
            </div>
          </div>
          
          {view === 'game' && (
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-pink-100 flex items-center gap-4">
              <span className="text-xs font-black text-pink-400 uppercase">Միավորներ</span>
              <span className="text-2xl font-black text-pink-600">{score}</span>
            </div>
          )}
        </header>

        <AnimatePresence mode="wait">
          {view === 'menu' && (
            <motion.div 
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-black text-pink-600 italic tracking-tighter">
                  ¿QUÉ QUIERES?
                </h2>
                <p className="text-xl font-medium text-slate-500 max-w-lg mx-auto">
                  Բացահայտիր իսպաներենի ամենակարևոր բայերից մեկը, որն ունի երկու հզոր իմաստ:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
                <button 
                  onClick={() => setView('theory')}
                  className="group p-8 bg-white rounded-[40px] shadow-xl hover:shadow-2xl transition-all border-4 border-transparent hover:border-pink-500 flex flex-col items-center gap-4"
                >
                  <div className="p-5 bg-pink-50 rounded-3xl group-hover:scale-110 transition-transform">
                    <BookOpen className="w-10 h-10 text-pink-500" />
                  </div>
                  <h3 className="text-2xl font-black">Տեսություն</h3>
                  <p className="text-sm text-slate-400 font-medium">Իմացիր խոնարհումը և իմաստները</p>
                </button>

                <button 
                  onClick={() => setView('game')}
                  className="group p-8 bg-pink-500 rounded-[40px] shadow-xl hover:shadow-2xl transition-all border-4 border-transparent hover:border-white flex flex-col items-center gap-4 text-white"
                >
                  <div className="p-5 bg-white/20 rounded-3xl group-hover:scale-110 transition-transform">
                    <Gamepad2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black">Խաղալ</h3>
                  <p className="text-sm text-pink-100 font-medium">Ստուգիր գիտելիքներդ</p>
                </button>
              </div>
            </motion.div>
          )}

          {view === 'theory' && (
            <motion.div 
              key="theory"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[40px] p-8 shadow-xl border-4 border-pink-100">
                <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <Info className="text-pink-500" />
                  Ի՞նչ է նշանակում QUERER
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4 p-6 bg-pink-50 rounded-3xl border-2 border-pink-100">
                    <div className="flex items-center gap-3 text-pink-600 font-black text-xl">
                      <ShoppingBag className="w-6 h-6" />
                      Ցանկանալ (Want)
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Երբ խոսում ենք առարկաների կամ գործողությունների մասին:
                      <br />
                      <span className="italic font-bold text-pink-400">Ejemplo: Quiero un café. (Ուզում եմ սուրճ)</span>
                    </p>
                  </div>
                  <div className="space-y-4 p-6 bg-red-50 rounded-3xl border-2 border-red-100">
                    <div className="flex items-center gap-3 text-red-600 font-black text-xl">
                      <Heart className="w-6 h-6 fill-current" />
                      Սիրել (Love)
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Երբ խոսում ենք մարդկանց կամ կենդանիների մասին:
                      <br />
                      <span className="italic font-bold text-red-400">Ejemplo: Te quiero. (Ես քեզ սիրում եմ)</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[40px] p-8 shadow-xl border-4 border-pink-100">
                <h2 className="text-3xl font-black mb-8 text-center">Խոնարհում (Conjugación)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CONJUGATIONS.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-pink-300 transition-colors">
                      <span className="font-bold text-slate-400">{item.pronoun}</span>
                      <span className="font-black text-pink-600 text-xl">{item.form}</span>
                      <span className="text-xs font-medium text-slate-500">{item.armenian}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-yellow-50 rounded-3xl border-2 border-yellow-100 flex items-start gap-4">
                  <Star className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
                  <p className="text-sm text-yellow-800 font-medium">
                    Ուշադրություն. Սա <span className="font-black underline">e ➔ ie</span> փոփոխվող բայ է: 
                    Արմատի <span className="font-black">e</span>-ն դառնում է <span className="font-black">ie</span> բոլոր դեպքերում, բացի <span className="italic">Nosotros</span> և <span className="italic">Vosotros</span> ձևերից:
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => setView('game')}
                  className="px-12 py-5 bg-pink-500 text-white rounded-full font-black text-xl shadow-lg hover:bg-pink-600 transition-all flex items-center gap-4"
                >
                  Անցնել խաղին
                  <ArrowRight />
                </button>
              </div>
            </motion.div>
          )}

          {view === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex-1 flex flex-col gap-8"
            >
              {/* Progress Bar */}
              <div className="h-4 bg-white rounded-full overflow-hidden p-1 shadow-inner border border-pink-100">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentLevel + 1) / QUIZ_LEVELS.length) * 100}%` }}
                  className="h-full bg-pink-500 rounded-full"
                />
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-[50px] p-10 shadow-2xl border-8 border-pink-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  {level.meaning === 'love' ? <Heart className="w-24 h-24 fill-current" /> : <ShoppingBag className="w-24 h-24" />}
                </div>

                <div className="space-y-8 relative z-10">
                  <div className="space-y-4">
                    <span className="text-xs font-black text-pink-400 uppercase tracking-widest">Մակարդակ {currentLevel + 1}</span>
                    <p className="text-2xl font-bold text-slate-400 italic">"{level.translation}"</p>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight">
                      {level.sentence.split('___').map((part, i) => (
                        <React.Fragment key={i}>
                          {part}
                          {i === 0 && (
                            <span className={`inline-block min-w-[120px] border-b-4 mx-2 text-center ${
                              feedback === 'correct' ? 'text-green-500 border-green-500' : 
                              feedback === 'wrong' ? 'text-red-500 border-red-500' : 'text-pink-500 border-pink-200'
                            }`}>
                              {selectedOption || '...'}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </h2>
                  </div>

                  <div className="grid gap-4">
                    {level.options.map((option, i) => (
                      <button
                        key={i}
                        disabled={!!feedback}
                        onClick={() => handleOptionClick(option)}
                        className={`p-6 rounded-3xl font-black text-2xl text-left transition-all border-4 flex justify-between items-center ${
                          selectedOption === option
                            ? option === level.correct
                              ? 'bg-green-50 border-green-500 text-green-700'
                              : 'bg-red-50 border-red-500 text-red-700'
                            : 'bg-white border-slate-100 text-slate-600 hover:border-pink-300 hover:bg-pink-50'
                        }`}
                      >
                        {option}
                        {selectedOption === option && (
                          option === level.correct ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />
                        )}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {feedback && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-6 rounded-3xl border-2 ${
                          feedback === 'correct' ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'
                        }`}
                      >
                        <p className="font-bold text-lg mb-1">{level.translation}</p>
                        <p className="text-sm opacity-80">{level.context}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-12"
            >
              <div className="relative">
                <div className="w-48 h-48 bg-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-pink-300">
                  <Star className="w-24 h-24 text-white fill-current" />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-4 -right-4 text-6xl"
                >
                  🏆
                </motion.div>
              </div>

              <div className="space-y-4">
                <h2 className="text-6xl font-black text-pink-600 italic tracking-tighter">ԳԵՐԱԶԱՆՑ Է!</h2>
                <p className="text-2xl font-medium text-slate-500">
                  Դուք հավաքեցիք <span className="text-pink-600 font-black">{score}</span> միավոր {QUIZ_LEVELS.length}-ից:
                  <br />
                  Այժմ դուք գիտեք, թե ինչպես ճիշտ ցանկանալ և սիրել իսպաներենով:
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button 
                  onClick={resetGame}
                  className="px-12 py-6 bg-pink-500 text-white rounded-full font-black text-xl shadow-lg hover:bg-pink-600 transition-all flex items-center gap-4"
                >
                  <RotateCcw />
                  Փորձել նորից
                </button>
                <button 
                  onClick={() => setView('menu')}
                  className="px-12 py-6 bg-white text-pink-600 rounded-full font-black text-xl shadow-lg border-4 border-pink-500 hover:bg-pink-50 transition-all flex items-center gap-4"
                >
                  Գլխավոր մենյու
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer */}
      <footer className="p-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
        Aprende Español con Amor y Deseo • 2026
      </footer>
    </div>
  );
}

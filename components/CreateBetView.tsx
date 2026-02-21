
import React, { useState } from 'react';

interface CreateBetViewProps {
  onBack: () => void;
  onCreate: (data: any) => void;
}

const TEMPLATES = [
  { title: "Will Bitcoin hit $100k by March?", category: "Crypto" },
  { title: "Will GPT-5 be released in 2025?", category: "Tech" },
  { title: "Will it rain in London tomorrow?", category: "Weather" },
  { title: "Who will win the next NBA Finals?", category: "Sports" },
  { title: "Will SOL flip ETH in market cap?", category: "Market" }
];

const CreateBetView: React.FC<CreateBetViewProps> = ({ onBack, onCreate }) => {
  const [title, setTitle] = useState("");
  const [authorComment, setAuthorComment] = useState("");
  const [deadline, setDeadline] = useState("1d");
  const [category, setCategory] = useState("General");

  const handleSubmit = () => {
    if (!title) return;
    onCreate({ title, authorComment, deadline, category });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white animate-in slide-in-from-bottom duration-300 z-[70]">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-neutral-900 bg-neutral-900/50 sticky top-0 z-10 backdrop-blur-md">
        <button onClick={onBack} className="p-2 text-neutral-400 hover:text-white">
          <i className="fa-solid fa-chevron-left text-xl"></i>
        </button>
        <h1 className="font-bold text-lg">Bingo Now</h1>
        <button 
          onClick={handleSubmit}
          disabled={!title}
          className="text-brand-400 font-bold disabled:opacity-30"
        >
          Bingo Now
        </button>
      </div>

      <div className="p-6 space-y-8 pb-32">
        <div className="space-y-6">
          <section className="space-y-3">
             <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Market Question</label>
             <textarea 
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               placeholder="What event are you predicting?"
               className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 text-white focus:outline-none focus:border-brand-500 transition-colors min-h-[100px] resize-none"
             />
          </section>
        </div>

        <section className="space-y-4">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Deadline</label>
          <div className="grid grid-cols-4 gap-2">
            {['1h', '6h', '1d', '2d'].map((opt) => (
              <button
                key={opt}
                onClick={() => setDeadline(opt)}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                  deadline === opt ? 'bg-brand-600 text-white' : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                }`}
              >
                {opt.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">Category</label>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['Crypto', 'Tech', 'Politics', 'Sports', 'Entertainment', 'Economy'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  category === cat ? 'bg-white text-black' : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto p-6 bg-gradient-to-t from-neutral-950 to-transparent">
        <button
          onClick={handleSubmit}
          disabled={!title}
          className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold rounded-2xl shadow-xl shadow-brand-600/20 transition-all active:scale-95"
        >
          Bingo Now
        </button>
      </div>
    </div>
  );
};

export default CreateBetView;

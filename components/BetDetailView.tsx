
import React, { useState, useEffect } from 'react';
import { Prediction } from '../types';

interface BetDetailViewProps {
  prediction: Prediction;
  onBack: () => void;
  onBet: (side: 'yes' | 'no') => void;
}

const BetDetailView: React.FC<BetDetailViewProps> = ({ prediction, onBack, onBet }) => {
  const calculateRemainingTime = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    
    if (diffTime <= 0) return 'Ended';
    
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (diffHours < 24) return `${diffHours}h left`;
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays}d left`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white animate-in slide-in-from-right duration-300 pb-40">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-xl pt-4 pb-4 px-6 flex items-center justify-between border-b border-neutral-900/50">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors active:scale-90 -ml-2">
          <i className="fa-solid fa-chevron-left text-xl"></i>
        </button>
        <h1 className="text-lg font-black tracking-tight text-white">Market Info</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-5">
        {/* Main Info Card */}
        <div className="bg-neutral-900/40 rounded-[28px] p-5 border border-neutral-800/60 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-5">
            <span className="text-[9px] font-black text-brand-400 uppercase tracking-[0.15em]">
              {prediction.category} Market
            </span>
            <div className="flex items-center gap-1.5 bg-brand-500/10 border border-brand-500/20 px-2 py-0.5 rounded-full">
              <i className="fa-solid fa-bolt text-[9px] text-brand-400"></i>
              <span className="font-black text-[9px] text-white uppercase tracking-tight">Bingo</span>
              <i className="fa-solid fa-crown text-yellow-500 text-[9px]"></i>
            </div>
          </div>

          <h2 className="text-xl font-black leading-[1.2] mb-6 text-white tracking-tight">
            {prediction.question}
          </h2>
          
          {/* Probability Bar */}
          <div className="space-y-2.5 mb-6">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">Yes</span>
                <span className="text-xl font-black text-emerald-500 leading-none">{prediction.probability}%</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-0.5">No</span>
                <span className="text-xl font-black text-red-500 leading-none">{100 - prediction.probability}%</span>
              </div>
            </div>
            <div className="w-full h-2.5 bg-neutral-800/50 rounded-full overflow-hidden flex p-0.5 border border-neutral-800">
               <div className="h-full bg-emerald-500 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(16,185,129,0.3)]" style={{ width: `${prediction.probability}%` }}></div>
               <div className="h-full bg-red-500 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(239,68,68,0.3)] ml-0.5" style={{ width: `${100 - prediction.probability}%` }}></div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3.5 border-t border-neutral-800/50">
             <div className="flex items-center gap-2 text-neutral-500">
                <i className="fa-regular fa-clock text-[10px]"></i>
                <span className="text-[10px] font-bold uppercase tracking-tight">Ends {calculateRemainingTime(prediction.endTime)}</span>
             </div>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-brand-400 uppercase tracking-tight">${(prediction.volume / 1000).toFixed(2)}K Vol</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                   <i className="fa-solid fa-users text-[9px] text-neutral-500"></i>
                   <span className="text-[10px] font-black tracking-tight">62</span>
                </div>
             </div>
          </div>
          
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/5 blur-[80px] rounded-full pointer-events-none"></div>
        </div>

        {/* Wagers Section */}
        <div className="space-y-4">
          <div className="flex border-b border-neutral-900 px-2">
            <h3 className="pb-3 px-2 text-[10px] font-black uppercase tracking-[0.25em] text-white relative">
              Wagers
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-brand-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
            </h3>
          </div>

          <div className="space-y-0.5">
            {[
              { user: 'hags55', amount: '7.75', side: 'No', color: 'text-red-500', avatar: 'https://picsum.photos/seed/hags/100/100' },
              { user: 'jordanv', amount: '10.00', side: 'No', color: 'text-red-500', avatar: 'https://picsum.photos/seed/jordan/100/100' },
              { user: 'airdropped', amount: '3.00', side: 'No', color: 'text-red-500', avatar: 'https://picsum.photos/seed/air/100/100' },
            ].map((wager, i) => (
              <div key={i} className="flex gap-3.5 items-center p-2.5 rounded-2xl hover:bg-neutral-900/50 transition-colors group">
                <div className="relative">
                  <img src={wager.avatar} className="w-9 h-9 rounded-full border-2 border-neutral-800 object-cover" alt={wager.user} />
                  <div className={`absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full border-2 border-neutral-950 flex items-center justify-center text-[7px] font-black ${wager.side === 'Yes' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                    {wager.side[0]}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-black text-white text-[13px] tracking-tight">{wager.user}</span>
                    <span className="text-[9px] text-neutral-600 font-bold uppercase">Just now</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px]">
                    <span className="text-neutral-400 font-medium tracking-tight">Bet</span>
                    <span className={`${wager.color} font-black tracking-tight`}>${wager.amount}</span>
                    <span className="text-neutral-500 font-medium tracking-tight">on {wager.side}</span>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-neutral-800 group-hover:text-neutral-600 transition-colors text-[9px]"></i>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto p-4 bg-neutral-950/90 backdrop-blur-2xl border-t border-neutral-900/50 grid grid-cols-2 gap-3 pb-10 z-40">
        <button 
          onClick={() => onBet('yes')}
          className="group bg-neutral-900/50 hover:bg-emerald-600 transition-all duration-300 rounded-[20px] p-4 flex flex-col items-center justify-center border border-neutral-800 hover:border-emerald-400 active:scale-95 shadow-xl"
        >
          <span className="font-black text-emerald-500 group-hover:text-white text-xl uppercase italic tracking-tighter">Yes</span>
          <span className="text-neutral-500 group-hover:text-emerald-100 text-[9px] font-black tracking-[0.1em] mt-0.5 opacity-60">$100 → $270</span>
        </button>
        <button 
          onClick={() => onBet('no')}
          className="group bg-neutral-900/50 hover:bg-red-600 transition-all duration-300 rounded-[20px] p-4 flex flex-col items-center justify-center border border-neutral-800 hover:border-red-400 active:scale-95 shadow-xl"
        >
          <span className="font-black text-red-500 group-hover:text-white text-xl uppercase italic tracking-tighter">No</span>
          <span className="text-neutral-500 group-hover:text-red-100 text-[9px] font-black tracking-[0.1em] mt-0.5 opacity-60">$100 → $158</span>
        </button>
      </div>
    </div>
  );
};

export default BetDetailView;

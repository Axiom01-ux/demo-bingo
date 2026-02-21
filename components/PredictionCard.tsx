
import React, { useState } from 'react';
import { Prediction } from '../types';

interface PredictionCardProps {
  prediction: Prediction;
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onBet: (side: 'yes' | 'no') => void;
  onShare?: (prediction: Prediction) => void;
  onClick?: () => void;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ 
  prediction, 
  isBookmarked, 
  onBookmark, 
  onBet, 
  onShare,
  onClick 
}) => {
  const isResolved = prediction.isResolved;

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark && onBookmark();
  };

  const calculateRemainingDays = (endTime: string) => {
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
    <div 
      className={`border-b border-neutral-800 p-4 hover:bg-neutral-900 transition-all duration-200 cursor-pointer active:bg-neutral-900/50 ${isResolved ? 'opacity-80' : ''}`}
      onClick={onClick}
    >
      <div className="flex gap-3">
        <img 
          src={prediction.creator.avatar} 
          alt={prediction.creator.name} 
          className="w-8 h-8 rounded-full border border-neutral-800"
          onClick={(e) => { e.stopPropagation(); }}
        />
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <span className="font-bold text-white text-[13px] hover:underline">{prediction.creator.name}</span>
            <span className="text-neutral-500 text-[11px]">{prediction.creator.handle} · 17h</span>
            {isResolved && (
              <span className="ml-2 bg-emerald-500/10 text-emerald-500 text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest border border-emerald-500/20">Settled</span>
            )}
            <i className="fa-brands fa-x-twitter text-[11px] ml-auto text-neutral-400"></i>
          </div>

          <div className={`rounded-2xl border ${isResolved ? 'border-emerald-500/30 bg-emerald-950/5' : 'border-neutral-700 bg-neutral-900/50'} overflow-hidden mb-1 transition-colors`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-semibold text-brand-400 uppercase tracking-wider">
                  {prediction.category} MARKET
                </span>
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:text-brand-400 transition-colors"
                  onClick={(e) => { e.stopPropagation(); onShare && onShare(prediction); }}
                >
                  <span className="text-[10px] text-neutral-500">
                    {calculateRemainingDays(prediction.endTime)}
                  </span>
                  <i className="fa-solid fa-share-nodes text-[9px] text-neutral-500"></i>
                </div>
              </div>
              
              <div className="flex items-end justify-between mb-2">
                <div className="max-w-[70%]">
                  <h3 className={`text-[15px] font-bold leading-snug ${isResolved ? 'text-neutral-300 line-through decoration-neutral-600' : 'text-white'}`}>
                    {prediction.question}
                  </h3>
                </div>
                <div className="text-right">
                    <span className={`text-[20px] font-black leading-none ${isResolved ? 'text-emerald-500' : 'text-brand-500'}`}>{prediction.probability}%</span>
                    <p className="text-[8px] text-neutral-500 uppercase tracking-tighter">{isResolved ? 'Outcome' : 'CHANCE'}</p>
                </div>
              </div>

              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-5">
                <div 
                  className={`h-full transition-all duration-700 ${isResolved ? 'bg-emerald-500' : 'bg-brand-500'}`} 
                  style={{ width: `${prediction.probability}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                <button 
                  disabled={isResolved}
                  onClick={() => onBet('yes')}
                  className={`py-2 px-4 transition-all text-white font-bold rounded-xl flex items-center justify-between text-[12px] ${
                    isResolved 
                      ? prediction.result === 'yes' ? 'bg-emerald-600 border border-emerald-400 shadow-emerald-500/10' : 'bg-neutral-800 opacity-30'
                      : 'bg-brand-600 hover:bg-brand-500 active:scale-95 shadow-lg shadow-brand-600/20'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isResolved && prediction.result === 'yes' && <i className="fa-solid fa-check animate-in zoom-in duration-300"></i>}
                    Yes
                  </span>
                  <span className="opacity-70 text-[11px] font-medium">${isResolved ? (prediction.result === 'yes' ? '1.00' : '0.00') : prediction.odds.yes.toFixed(2)}</span>
                </button>
                <button 
                  disabled={isResolved}
                  onClick={() => onBet('no')}
                  className={`py-2 px-4 transition-all text-white font-bold rounded-xl flex items-center justify-between text-[12px] ${
                    isResolved 
                      ? prediction.result === 'no' ? 'bg-emerald-600 border border-emerald-400 shadow-emerald-500/10' : 'bg-neutral-800 opacity-30'
                      : 'bg-neutral-800 hover:bg-neutral-700 active:scale-95 shadow-lg shadow-neutral-900/10'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isResolved && prediction.result === 'no' && <i className="fa-solid fa-check animate-in zoom-in duration-300"></i>}
                    No
                  </span>
                  <span className="opacity-70 text-[11px] font-medium">${isResolved ? (prediction.result === 'no' ? '1.00' : '0.00') : prediction.odds.no.toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;


import React from 'react';
import { Prediction, UserPosition } from '../types';

interface WalletViewProps {
  userCreations?: Prediction[];
  bookmarkedPredictions?: Prediction[];
  userPositions?: (UserPosition & { prediction: Prediction })[];
  userPoints?: number;
  onSelectPrediction?: (p: Prediction) => void;
  onResolve?: (p: Prediction) => void;
}

const WalletView: React.FC<WalletViewProps> = ({ 
  userCreations = [], 
  bookmarkedPredictions = [],
  userPositions = [],
  userPoints = 0,
  onSelectPrediction, 
  onResolve 
}) => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black">Wallet</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 text-neutral-400">
          <i className="fa-solid fa-rotate-right"></i>
        </button>
      </div>

      {/* Balance Section */}
      <div className="mb-12 flex justify-between items-end">
        <div>
          <div className="text-[56px] font-black leading-tight tracking-tight">$9.90</div>
          <div className="text-neutral-500 font-medium">${(userPositions.length * 10).toFixed(2)} wagered</div>
        </div>
        <div className="text-right pb-2">
          <div className="text-brand-400 font-black text-2xl">{userPoints.toLocaleString()}</div>
          <div className="text-neutral-600 text-[10px] font-black uppercase tracking-widest">Bingo Points</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        <div className="flex flex-col items-center gap-3">
          <button className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-xl transition-transform active:scale-90">
            <i className="fa-solid fa-plus"></i>
          </button>
          <span className="text-sm font-bold">Buy</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center text-xl transition-transform active:scale-90">
            <i className="fa-solid fa-wallet"></i>
          </button>
          <span className="text-sm font-bold text-neutral-400">Deposit</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center text-xl transition-transform active:scale-90">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
          <span className="text-sm font-bold text-neutral-400">Send</span>
        </div>
      </div>

      {/* My Positions Section - NEW! This is where users see their active bets */}
      {userPositions.length > 0 && (
        <div className="mb-10">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-neutral-500 mb-6 flex items-center justify-between">
            MY POSITIONS
            <span className="text-emerald-500 lowercase italic font-normal tracking-normal text-[10px]">{userPositions.length} Active</span>
          </h2>
          <div className="space-y-4">
            {userPositions.map((pos, idx) => (
              <div 
                key={idx} 
                className="bg-neutral-900/60 rounded-3xl p-5 border border-brand-500/10 active:scale-[0.98] transition-transform cursor-pointer"
                onClick={() => onSelectPrediction?.(pos.prediction)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${pos.side === 'yes' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                      {pos.side.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-[14px] line-clamp-1">{pos.prediction.question}</div>
                      <div className="text-[10px] text-neutral-500">{pos.shares.toFixed(2)} Shares @ ${pos.avgPrice.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-500 font-black text-sm">+{(Math.random() * 5).toFixed(2)}%</div>
                    <div className="text-[9px] text-neutral-600 font-bold uppercase tracking-tighter">Current ROI</div>
                  </div>
                </div>
                <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
                   <div className="h-full bg-brand-500" style={{ width: `${pos.prediction.probability}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Creations Section - User-launched markets backup */}
      {userCreations.length > 0 && (
        <div className="mb-10">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-neutral-500 mb-6 flex items-center justify-between">
            MY CREATIONS
            <span className="text-neutral-600 lowercase italic font-normal tracking-normal text-[10px]">Records</span>
          </h2>
          <div className="space-y-4">
            {userCreations.map((p) => {
              const needsResolution = !p.isResolved; 
              
              return (
                <div 
                  key={p.id} 
                  className="bg-neutral-900/40 rounded-3xl p-4 flex items-center gap-4 border border-brand-500/20 group relative"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-400" onClick={() => onSelectPrediction?.(p)}>
                    <i className="fa-solid fa-bolt"></i>
                  </div>
                  <div className="flex-1 cursor-pointer" onClick={() => onSelectPrediction?.(p)}>
                    <div className="font-bold text-[15px] line-clamp-1">{p.question}</div>
                    <div className="text-xs text-neutral-500 font-medium uppercase tracking-tighter">
                      {p.category} · {p.isResolved ? 'Settle complete' : `Ends ${p.endTime}`}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {needsResolution ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onResolve?.(p);
                        }}
                        className="bg-brand-600 hover:bg-brand-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse"
                      >
                        Resolve
                      </button>
                    ) : (
                      <div className="font-black text-emerald-500 uppercase text-[10px] tracking-widest">
                        Winner: {p.result?.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Watchlist Section */}
      {bookmarkedPredictions.length > 0 && (
        <div className="mb-10">
          <h2 className="text-[11px] font-black uppercase tracking-widest text-neutral-500 mb-6 flex items-center justify-between">
            WATCHLIST
            <span className="text-brand-400 lowercase italic font-normal tracking-normal text-[10px]">Tracking {bookmarkedPredictions.length}</span>
          </h2>
          <div className="space-y-4">
            {bookmarkedPredictions.map((p) => (
              <div 
                key={p.id} 
                className="bg-neutral-900/40 rounded-3xl p-4 flex items-center gap-4 border border-neutral-900/50 group active:scale-[0.98] transition-transform cursor-pointer"
                onClick={() => onSelectPrediction?.(p)}
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <i className="fa-solid fa-bookmark text-brand-400 text-xs"></i>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[14px] line-clamp-1">{p.question}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-emerald-500 font-black">{p.probability}%</span>
                    <div className="w-24 h-1 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${p.probability}%` }}></div>
                    </div>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-neutral-700 text-[10px]"></i>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="space-y-6">
        <h2 className="text-[11px] font-black uppercase tracking-widest text-neutral-500 mb-6">
          HISTORY
        </h2>

        <div className="space-y-4">
          <div className="bg-neutral-900/40 rounded-3xl p-4 flex items-center gap-4 border border-neutral-900/50">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-neutral-400">
              <i className="fa-solid fa-gamepad"></i>
            </div>
            <div className="flex-1">
              <div className="font-bold text-[15px]">Placed Wager</div>
              <div className="text-xs text-neutral-500 font-medium uppercase tracking-tighter">10:41 PM</div>
            </div>
            <div className="text-right">
              <div className="font-black text-white">$0.10</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="h-32"></div>
    </div>
  );
};

export default WalletView;

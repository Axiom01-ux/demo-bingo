
import React, { useRef } from 'react';
import { Prediction } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import { toPng } from 'html-to-image';

interface ShareCardModalProps {
  prediction: Prediction;
  referralCode: string;
  onClose: () => void;
}

const ShareCardModal: React.FC<ShareCardModalProps> = ({ prediction, referralCode, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = async () => {
    if (cardRef.current === null) return;
    
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `bingo-prediction-${prediction.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to save image', err);
      alert('Failed to save image. Please try again.');
    }
  };

  const shareUrl = `${window.location.origin}?ref=${referralCode}&bet=${prediction.id}`;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        ref={cardRef}
        className="w-full max-w-[320px] bg-neutral-950 rounded-[24px] overflow-hidden border border-neutral-800 shadow-2xl animate-in zoom-in-95 duration-300 mb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Poster Header */}
        <div className="bg-brand-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                <span className="text-brand-600 font-black italic text-sm">B</span>
             </div>
             <span className="text-white font-black tracking-tight text-lg">Bingo</span>
          </div>
          <div className="text-right">
            <span className="text-white/60 text-[8px] font-bold uppercase tracking-widest block">Referral Code</span>
            <span className="text-white font-mono font-black text-xs">{referralCode}</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-5">
          <div className="flex items-center gap-3">
            <img 
              src={prediction.creator.avatar} 
              alt={prediction.creator.name} 
              className="w-8 h-8 rounded-full border border-neutral-800"
            />
            <div>
              <div className="font-bold text-white text-[13px]">{prediction.creator.name}</div>
              <div className="text-neutral-500 text-[10px]">{prediction.creator.handle}</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-400">{prediction.category} Market</span>
              <span className="text-[9px] text-neutral-500">Vol: ${(prediction.volume / 1000).toFixed(1)}K</span>
            </div>

            <h3 className="text-xl font-bold leading-tight text-white">
              {prediction.question}
            </h3>

            <div className="space-y-1.5">
              <div className="flex justify-between items-end">
                <span className="text-neutral-400 text-[9px] font-bold uppercase">Probability</span>
                <span className="text-2xl font-black text-brand-500">{prediction.probability}%</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-500" 
                  style={{ width: `${prediction.probability}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <div className="bg-neutral-900 rounded-xl p-3 border border-neutral-800 flex flex-col items-center">
                <span className="text-emerald-500 font-black text-base">YES</span>
                <span className="text-neutral-500 text-[10px]">${prediction.odds.yes.toFixed(2)}</span>
              </div>
              <div className="bg-neutral-900 rounded-xl p-3 border border-neutral-800 flex flex-col items-center">
                <span className="text-neutral-400 font-black text-base">NO</span>
                <span className="text-neutral-500 text-[10px]">${prediction.odds.no.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Real QR */}
        <div className="p-5 bg-black border-t border-neutral-900 flex items-center justify-between">
           <div className="space-y-0.5">
             <p className="text-white text-[11px] font-bold">Join the prediction</p>
             <p className="text-neutral-500 text-[9px]">Bingo: Social Prediction Hub</p>
           </div>
           <div 
             className="bg-white rounded-lg p-1.5 cursor-pointer active:scale-95 transition-transform"
             onClick={() => {
               navigator.clipboard.writeText(shareUrl);
               alert('Link copied to clipboard!');
             }}
           >
              <QRCodeSVG 
                value={shareUrl} 
                size={44} 
                level="M"
                includeMargin={false}
              />
           </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3 px-6 w-full max-w-[320px]" onClick={(e) => e.stopPropagation()}>
         <button 
           onClick={onClose}
           className="w-12 h-12 rounded-full bg-neutral-800 text-white flex items-center justify-center shadow-xl active:scale-90 transition-transform flex-shrink-0"
         >
           <i className="fa-solid fa-xmark text-lg"></i>
         </button>
         <button 
           className="flex-1 bg-brand-600 text-white font-bold py-3.5 rounded-full shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
           onClick={handleSaveImage}
         >
           <i className="fa-solid fa-download"></i>
           Save Image
         </button>
      </div>
    </div>
  );
};

export default ShareCardModal;

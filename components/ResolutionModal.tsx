
import React from 'react';
import { Prediction } from '../types';

interface ResolutionModalProps {
  prediction: Prediction;
  onClose: () => void;
  onResolve: (result: 'yes' | 'no') => void;
}

const ResolutionModal: React.FC<ResolutionModalProps> = ({ prediction, onClose, onResolve }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-sm bg-neutral-900 rounded-[32px] p-6 border border-neutral-800 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-600/20 rounded-full flex items-center justify-center text-brand-400 mx-auto mb-4 border border-brand-500/30">
            <i className="fa-solid fa-gavel text-2xl"></i>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Resolve Market</h2>
          <p className="text-neutral-500 text-sm">Please select the actual outcome for the event below. This action is irreversible.</p>
        </div>

        <div className="bg-neutral-800/30 rounded-2xl p-4 mb-8 border border-neutral-800">
          <p className="text-white font-bold text-sm leading-relaxed">{prediction.question}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            onClick={() => onResolve('yes')}
            className="py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
          >
            YES
          </button>
          <button 
            onClick={() => onResolve('no')}
            className="py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-lg transition-all active:scale-95 shadow-lg shadow-red-900/20"
          >
            NO
          </button>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-3 text-neutral-500 font-bold hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ResolutionModal;

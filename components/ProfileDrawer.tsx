
import React from 'react';
import { ViewType, User } from '../types';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType) => void;
  user: User;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ isOpen, onClose, onNavigate, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Drawer Content */}
      <div className="relative w-[280px] h-full bg-neutral-950 border-r border-neutral-900 shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
        <div className="p-6 pt-12">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-800 mb-4">
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-black text-white">{user.name}</h2>
          <p className="text-neutral-500 text-sm mb-4">{user.handle}</p>

          <div className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-3 mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Your Points</span>
              <i className="fa-solid fa-star text-brand-400 text-[10px]"></i>
            </div>
            <div className="text-xl font-black text-white">{user.points.toLocaleString()} <span className="text-xs font-bold text-neutral-500">PTS</span></div>
          </div>
          
          <div className="flex gap-4 mb-8">
            <div className="flex items-center gap-1">
              <span className="font-black text-white">12</span>
              <span className="text-neutral-500 text-xs uppercase tracking-tighter">Wins</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-black text-white">45</span>
              <span className="text-neutral-500 text-xs uppercase tracking-tighter">Bets</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2 block">Referral Code</label>
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
              <span className="font-mono font-bold text-white text-sm">{user.referralCode}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(user.referralCode);
                  alert('Referral code copied!');
                }}
                className="ml-auto text-neutral-500 hover:text-brand-400"
              >
                <i className="fa-regular fa-copy"></i>
              </button>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2">
          {[
            { icon: 'fa-user', label: 'Profile', view: ViewType.PROFILE },
            { icon: 'fa-wallet', label: 'Wallet', view: ViewType.WALLET },
            { icon: 'fa-trophy', label: 'Leaderboard', view: ViewType.LEADERBOARD },
            { icon: 'fa-gear', label: 'Settings', view: ViewType.PROFILE },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => {
                onNavigate(item.view);
                onClose();
              }}
              className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-neutral-900 transition-colors group active:scale-[0.98]"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center text-neutral-400 group-hover:text-brand-400 transition-colors">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <span className="font-bold text-neutral-300 group-hover:text-white transition-colors">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-neutral-900">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-red-500 font-bold hover:bg-red-500/10 rounded-xl transition-colors">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;

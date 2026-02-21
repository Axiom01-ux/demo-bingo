
import React, { useState } from 'react';

interface SettingsViewProps {
  onBack: () => void;
}

const LinkedAccountsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="animate-in slide-in-from-right duration-300">
      <div className="flex items-center mb-10">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 text-neutral-400 mr-2">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h1 className="text-2xl font-black">Linked Accounts</h1>
      </div>

      <div className="space-y-6">
        <h2 className="text-[11px] font-black uppercase tracking-widest text-neutral-500 mb-4 px-2">Your Linked Accounts</h2>
        
        <div className="space-y-2">
          <div className="bg-neutral-900/40 border border-neutral-900/50 rounded-3xl p-5 flex items-center justify-between">
            <span className="font-bold">X (Twitter)</span>
            <button className="flex items-center gap-2 text-brand-400 font-bold group">
              Link <i className="fa-solid fa-chevron-right text-xs text-neutral-700 group-hover:text-brand-400"></i>
            </button>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-900/50 rounded-3xl p-5 flex items-center justify-between">
            <span className="font-bold">Apple</span>
            <button className="flex items-center gap-2 text-brand-400 font-bold group">
              Link <i className="fa-solid fa-chevron-right text-xs text-neutral-700 group-hover:text-brand-400"></i>
            </button>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-900/50 rounded-3xl p-5 flex items-center justify-between">
            <span className="font-bold text-neutral-200">Google</span>
            <span className="text-neutral-500 font-medium">Linked</span>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-900/50 rounded-3xl p-5 flex items-center justify-between">
            <span className="font-bold text-neutral-200">Email</span>
            <span className="text-neutral-500 font-medium">Linked</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  const [subView, setSubView] = useState<'main' | 'linked'>('main');
  const [pushEnabled, setPushEnabled] = useState(true);

  if (subView === 'linked') {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-6">
        <LinkedAccountsView onBack={() => setSubView('main')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black">Settings</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 text-neutral-400">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>

      {/* Account Section */}
      <div className="mb-10">
        <h2 className="text-[11px] font-black uppercase tracking-widest text-neutral-500 mb-4 px-2">Account</h2>
        <div className="space-y-2">
          <div className="bg-neutral-900/40 border border-neutral-900/50 rounded-3xl p-5 flex items-center justify-between">
            <span className="font-bold text-neutral-300">Display name</span>
            <button className="flex items-center gap-2 group">
              <span className="text-brand-400 font-bold">lady gaga</span>
              <i className="fa-solid fa-pencil text-xs text-neutral-700 group-hover:text-brand-400"></i>
            </button>
          </div>
          <button 
            onClick={() => setSubView('linked')}
            className="w-full bg-neutral-900/40 border border-neutral-900/50 rounded-3xl p-5 flex items-center justify-between active:scale-[0.98] transition-all"
          >
            <span className="font-bold text-neutral-300">Linked accounts</span>
            <i className="fa-solid fa-chevron-right text-neutral-700"></i>
          </button>
        </div>
      </div>

      {/* Push Notifications Section */}
      <div className="mb-10">
        <div className="bg-neutral-900/40 border border-neutral-900/50 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <i className="fa-solid fa-bell text-white"></i>
            <h2 className="font-bold text-lg">Push Notifications</h2>
            <div className="ml-auto">
              <button 
                onClick={() => setPushEnabled(!pushEnabled)}
                className={`w-12 h-6 rounded-full transition-all relative ${pushEnabled ? 'bg-brand-600' : 'bg-neutral-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${pushEnabled ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
          <p className="text-sm text-neutral-500 leading-snug">
            Get notified about your account activity, what your friends are up to and product announcements.
          </p>
        </div>
      </div>

      <div className="h-32"></div> {/* Spacer for bottom nav */}
    </div>
  );
};

export default SettingsView;

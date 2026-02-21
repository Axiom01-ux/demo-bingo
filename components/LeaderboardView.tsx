
import React, { useState } from 'react';

type RankingType = 'accuracy' | 'volume';

const MOCK_DATA = {
  accuracy: [
    { rank: 1, name: 'CryptoKing', title: 'Precision Master', score: '94.2%', detail: '124 Wins', avatar: 'https://picsum.photos/seed/ck/100/100', color: 'text-yellow-500' },
    { rank: 2, name: 'inigosolos', title: 'Top Predictor', score: '88.5%', detail: '89 Wins', avatar: 'https://picsum.photos/seed/1/100/100', color: 'text-neutral-400' },
    { rank: 3, name: 'xinju', title: 'Analyst', score: '82.1%', detail: '156 Wins', avatar: 'https://picsum.photos/seed/2/100/100', color: 'text-orange-700' },
    { rank: 4, name: 'berkshire', title: 'Strategist', score: '79.8%', detail: '45 Wins', avatar: 'https://picsum.photos/seed/3/100/100' },
    { rank: 5, name: 'tgs', title: 'Bullish', score: '76.4%', detail: '210 Wins', avatar: 'https://picsum.photos/seed/5/100/100' },
    { rank: 6, name: 'dimelo', title: 'Scholar', score: '74.2%', detail: '33 Wins', avatar: 'https://picsum.photos/seed/6/100/100' },
    { rank: 7, name: 'lizzte', title: 'Rookie', score: '71.5%', detail: '12 Wins', avatar: 'https://picsum.photos/seed/7/100/100' },
  ],
  volume: [
    { rank: 1, name: 'inigosolos', title: 'Whale', score: '$413.1K', detail: '2.4K Trades', avatar: 'https://picsum.photos/seed/1/100/100', color: 'text-yellow-500' },
    { rank: 2, name: 'xinju', title: 'High Roller', score: '$206.9K', detail: '1.1K Trades', avatar: 'https://picsum.photos/seed/2/100/100', color: 'text-neutral-400' },
    { rank: 3, name: 'berkshire', title: 'Market Maker', score: '$159.5K', detail: '890 Trades', avatar: 'https://picsum.photos/seed/3/100/100', color: 'text-orange-700' },
    { rank: 4, name: 'airdropped', title: 'Liquidator', score: '$139.2K', detail: '456 Trades', avatar: 'https://picsum.photos/seed/4/100/100' },
    { rank: 5, name: 'tgs', title: 'Day Trader', score: '$113.4K', detail: '312 Trades', avatar: 'https://picsum.photos/seed/5/100/100' },
    { rank: 6, name: 'dimelo', title: 'Arbitrageur', score: '$110.3K', detail: '298 Trades', avatar: 'https://picsum.photos/seed/6/100/100' },
    { rank: 7, name: 'lizzte', title: 'Collector', score: '$59.4K', detail: '145 Trades', avatar: 'https://picsum.photos/seed/7/100/100' },
  ]
};

const LeaderboardView: React.FC = () => {
  const [rankingType, setRankingType] = useState<RankingType>('accuracy');

  const currentLeaders = MOCK_DATA[rankingType];

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Leaderboard</h1>
          <p className="text-neutral-500 text-[9px] font-black uppercase tracking-widest mt-1">Global Standings</p>
        </div>
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800 active:scale-95 transition-all">
          <i className="fa-solid fa-question text-xs"></i>
        </button>
      </div>

      {/* Interactive Top Selection Cards */}
      <div className="flex gap-3 mb-8">
        <button 
          onClick={() => setRankingType('accuracy')}
          className={`flex-1 p-4 rounded-[24px] border transition-all duration-300 flex flex-col items-start gap-3 active:scale-[0.97] ${
            rankingType === 'accuracy' 
              ? 'bg-brand-600/20 border-brand-500/50 shadow-2xl shadow-brand-500/10' 
              : 'bg-neutral-900/40 border-neutral-900 opacity-60'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
            rankingType === 'accuracy' ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'bg-neutral-800 text-neutral-500'
          }`}>
            <i className="fa-solid fa-bullseye"></i>
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-tight mb-0.5">Win Rate</div>
            <div className={`text-[9px] font-bold ${rankingType === 'accuracy' ? 'text-brand-400' : 'text-neutral-500'}`}>Accuracy focused</div>
          </div>
        </button>

        <button 
          onClick={() => setRankingType('volume')}
          className={`flex-1 p-4 rounded-[24px] border transition-all duration-300 flex flex-col items-start gap-3 active:scale-[0.97] ${
            rankingType === 'volume' 
              ? 'bg-brand-600/20 border-brand-500/50 shadow-2xl shadow-brand-500/10' 
              : 'bg-neutral-900/40 border-neutral-900 opacity-60'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
            rankingType === 'volume' ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'bg-neutral-800 text-neutral-500'
          }`}>
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-tight mb-0.5">Volume</div>
            <div className={`text-[9px] font-bold ${rankingType === 'volume' ? 'text-brand-400' : 'text-neutral-500'}`}>Capital focused</div>
          </div>
        </button>
      </div>

      {/* Rankings List */}
      <div className="space-y-5 pb-24">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">
            {rankingType === 'accuracy' ? 'Precision Rankings' : 'Capital Rankings'}
          </h2>
          <div className="flex items-center gap-1.5 text-[8px] font-black text-brand-400 uppercase tracking-widest bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/20">
            Active
            <div className="w-1 h-1 rounded-full bg-brand-500 animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-2.5">
          {currentLeaders.map((user) => (
            <div 
              key={`${rankingType}-${user.rank}`} 
              className="flex items-center gap-3.5 bg-neutral-900/30 border border-neutral-900/50 p-3 rounded-[20px] group cursor-pointer active:scale-[0.98] transition-all hover:bg-neutral-900/60"
            >
              {/* Rank Column */}
              <div className="w-7 flex flex-col items-center justify-center">
                {user.rank <= 3 ? (
                  <div className={`relative flex items-center justify-center`}>
                    <i className={`fa-solid fa-medal ${user.color} text-base`}></i>
                    <span className="absolute text-[7px] font-black text-black top-1">{user.rank}</span>
                  </div>
                ) : (
                  <span className="text-[11px] font-black text-neutral-600 italic">
                    #{user.rank}
                  </span>
                )}
              </div>

              {/* Avatar Section */}
              <div className="relative">
                <div className={`w-10 h-10 rounded-full border-2 overflow-hidden bg-neutral-900 flex-shrink-0 transition-transform group-hover:scale-105 ${
                  user.rank === 1 ? 'border-yellow-500/40 shadow-lg shadow-yellow-500/10' : 
                  user.rank === 2 ? 'border-neutral-400/40 shadow-lg shadow-neutral-400/10' : 
                  user.rank === 3 ? 'border-orange-700/40 shadow-lg shadow-orange-700/10' : 'border-neutral-800'
                }`}>
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                {user.rank === 1 && (
                  <div className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-yellow-500 rounded-full flex items-center justify-center text-[9px] text-black font-black border-2 border-neutral-950">
                    <i className="fa-solid fa-crown"></i>
                  </div>
                )}
              </div>

              {/* User Identity */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[14px] text-white tracking-tight truncate flex items-center gap-1.5">
                  {user.name}
                  {user.rank <= 3 && <i className="fa-solid fa-circle-check text-brand-400 text-[9px]"></i>}
                </div>
                <div className="text-[8px] font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2 mt-0.5">
                  <span className="text-brand-400/80">{user.title}</span>
                  <div className="w-1 h-1 rounded-full bg-neutral-800"></div>
                  <span>{user.detail}</span>
                </div>
              </div>

              {/* Performance Score */}
              <div className="text-right flex-shrink-0">
                <div className={`font-black text-[16px] tracking-tighter ${
                  rankingType === 'accuracy' ? 'text-emerald-500' : 'text-white'
                }`}>
                  {user.score}
                </div>
                <div className="text-[8px] font-bold text-neutral-600 uppercase tracking-tighter">
                  {rankingType === 'accuracy' ? 'Success' : 'Volume'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer Spacer */}
      <div className="h-24"></div>
    </div>
  );
};

export default LeaderboardView;

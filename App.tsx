
import React, { useState, useCallback } from 'react';
import { ViewType, Prediction, UserPosition, User } from './types';
import { MOCK_PREDICTIONS } from './constants';
import PredictionCard from './components/PredictionCard';
import BetModal from './components/BetModal';
import BetDetailView from './components/BetDetailView';
import CreateBetView from './components/CreateBetView';
import WalletView from './components/WalletView';
import ShareCardModal from './components/ShareCardModal';
import ResolutionModal from './components/ResolutionModal';
import ProfileDrawer from './components/ProfileDrawer';
import SettingsView from './components/SettingsView';
import LeaderboardView from './components/LeaderboardView';
import ExploreView from './components/ExploreView';
import FriendsView from './components/FriendsView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.HOME);
  const [predictions, setPredictions] = useState<Prediction[]>(MOCK_PREDICTIONS);
  const [selectedPrediction, setSelectedPrediction] = useState<{ p: Prediction, side: 'yes' | 'no' } | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<{prediction: Prediction} | null>(null);
  const [sharingPrediction, setSharingPrediction] = useState<Prediction | null>(null);
  const [resolvingPrediction, setResolvingPrediction] = useState<Prediction | null>(null);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  
  // Track bookmarked IDs globally
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Track User Positions (Bets)
  const [userPositions, setUserPositions] = useState<UserPosition[]>([]);

  // Current User State
  const [currentUser, setCurrentUser] = useState<User>({
    name: 'lady gaga',
    handle: '@ladygaga',
    avatar: 'https://picsum.photos/seed/user123/100/100',
    points: 0,
    referralCode: 'GAGA777'
  });

  // Fetch real data on mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('/api/user/stats');
        const userData = await userRes.json();
        setCurrentUser(prev => ({ ...prev, points: userData.points }));
      } catch (err) {
        console.error("Failed to sync with backend", err);
      }
    };
    fetchData();
  }, []);

  const handleBookmark = useCallback((id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleNavClick = (view: ViewType) => {
    setSelectedDetail(null);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreatePrediction = (data: any) => {
    const now = new Date();
    let endTime = new Date();
    
    if (data.deadline === '1h') endTime.setHours(now.getHours() + 1);
    else if (data.deadline === '6h') endTime.setHours(now.getHours() + 6);
    else if (data.deadline === '1d') endTime.setDate(now.getDate() + 1);
    else if (data.deadline === '2d') endTime.setDate(now.getDate() + 2);
    else endTime.setDate(now.getDate() + 7); // Default fallback

    const newPrediction: Prediction = {
      id: Date.now().toString(),
      creator: currentUser,
      authorComment: data.authorComment,
      question: data.title,
      description: `Market created by ${currentUser.name}. Deadline: ${data.deadline}`,
      odds: { yes: 0.5, no: 0.5 },
      volume: 0,
      endTime: endTime.toISOString(),
      category: data.category,
      probability: 50
    };

    setPredictions([newPrediction, ...predictions]);
    setActiveView(ViewType.HOME);
    setSelectedDetail({ prediction: newPrediction });
  };

  const handleConfirmBet = async (amount: number) => {
    if (!selectedPrediction) return;

    try {
      const res = await fetch('/api/user/bet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      const data = await res.json();

      const newPosition: UserPosition = {
        predictionId: selectedPrediction.p.id,
        side: selectedPrediction.side,
        shares: amount / (selectedPrediction.side === 'yes' ? selectedPrediction.p.odds.yes : selectedPrediction.p.odds.no),
        avgPrice: selectedPrediction.side === 'yes' ? selectedPrediction.p.odds.yes : selectedPrediction.p.odds.no
      };

      setUserPositions(prev => [...prev, newPosition]);
      setCurrentUser(prev => ({ ...prev, points: data.newPoints }));
      setSelectedPrediction(null);
      alert(`Success! You earned ${Math.floor(amount * 10)} points from real trade!`);
    } catch (err) {
      alert("Bet failed to sync with server");
    }
  };

  const handleResolvePrediction = (predictionId: string, result: 'yes' | 'no') => {
    setPredictions(prev => prev.map(p => 
      p.id === predictionId 
        ? { ...p, isResolved: true, result, probability: result === 'yes' ? 100 : 0 } 
        : p
    ));
    setResolvingPrediction(null);
    if (selectedDetail?.prediction.id === predictionId) {
      setSelectedDetail(prev => prev ? { ...prev, prediction: { ...prev.prediction, isResolved: true, result, probability: result === 'yes' ? 100 : 0 } } : null);
    }
  };

  const renderHome = () => (
    <div className="pb-24">
      <div className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-xl pt-4 pb-2 px-6 flex items-center justify-between border-b border-neutral-900/50">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full overflow-hidden border border-neutral-800 flex-shrink-0 cursor-pointer active:scale-90 transition-transform"
            onClick={() => setIsProfileDrawerOpen(true)}
          >
            <img src={currentUser.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div 
            onClick={() => handleNavClick(ViewType.WALLET)}
            className="bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
          >
            <span className="text-emerald-500 font-black text-[13px] tracking-tight">$9.90</span>
            <i className="fa-solid fa-plus text-[8px] text-neutral-500 bg-neutral-800 p-0.5 rounded-sm"></i>
          </div>
        </div>
        <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="flex items-center gap-1">
            <i className="fa-brands fa-x-twitter text-lg text-white"></i>
          </div>
          <span className="text-2xl font-black tracking-tight text-brand-500 -mt-1">Bingo</span>
        </div>
        <div className="w-10 h-10"></div>
      </div>

      <div className="space-y-0">
        {predictions.map(p => (
          <PredictionCard 
            key={p.id} 
            prediction={p} 
            isBookmarked={bookmarkedIds.has(p.id)}
            onBookmark={() => handleBookmark(p.id)}
            onBet={(side) => !p.isResolved && setSelectedPrediction({ p, side })}
            onShare={(p) => setSharingPrediction(p)}
            onClick={() => setSelectedDetail({ prediction: p })}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen max-w-lg mx-auto bg-neutral-950 relative overflow-x-hidden selection:bg-brand-500/30">
      <div className="safe-bottom">
        {activeView === ViewType.CREATE_BET ? (
          <CreateBetView onBack={() => handleNavClick(ViewType.HOME)} onCreate={handleCreatePrediction} />
        ) : selectedDetail ? (
          <BetDetailView 
            prediction={selectedDetail.prediction} 
            onBack={() => setSelectedDetail(null)}
            onBet={(side) => !selectedDetail.prediction.isResolved && setSelectedPrediction({ p: selectedDetail.prediction, side })}
          />
        ) : activeView === ViewType.PROFILE ? (
          <SettingsView onBack={() => handleNavClick(ViewType.HOME)} />
        ) : activeView === ViewType.LEADERBOARD ? (
          <LeaderboardView />
        ) : activeView === ViewType.EXPLORE ? (
          <ExploreView 
            allPredictions={predictions} 
            bookmarkedIds={bookmarkedIds} 
            onBookmark={handleBookmark}
            onSelectPrediction={(p) => setSelectedDetail({ prediction: p })}
          />
        ) : activeView === ViewType.FRIENDS ? (
          <FriendsView onBack={() => handleNavClick(ViewType.HOME)} />
        ) : activeView === ViewType.WALLET ? (
          <WalletView 
            userCreations={predictions.filter(p => p.creator.handle === currentUser.handle)}
            bookmarkedPredictions={predictions.filter(p => bookmarkedIds.has(p.id))}
            userPoints={currentUser.points}
            userPositions={userPositions.map(pos => ({
              ...pos,
              prediction: predictions.find(p => p.id === pos.predictionId)!
            }))}
            onSelectPrediction={(p) => setSelectedDetail({ prediction: p })}
            onResolve={(p) => setResolvingPrediction(p)}
          />
        ) : (
          <>
            {activeView === ViewType.HOME && renderHome()}
          </>
        )}
      </div>

      {!selectedDetail && activeView !== ViewType.CREATE_BET && (
        <div className="fixed bottom-0 left-0 right-0 max-lg mx-auto bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-900 h-20 px-12 flex items-center justify-between z-40 safe-bottom">
          {[
            { icon: 'fa-house', view: ViewType.HOME },
            { icon: 'fa-plus', view: ViewType.CREATE_BET, isSpecial: true },
            { icon: 'fa-wallet', view: ViewType.WALLET },
          ].map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => handleNavClick(item.view)} 
              className={`w-12 h-12 flex items-center justify-center transition-all active:scale-90 ${
                item.isSpecial 
                  ? 'bg-brand-600 text-white rounded-full shadow-lg shadow-brand-600/20' 
                  : activeView === item.view ? 'text-white scale-110' : 'text-neutral-500'
              }`}
            >
              <i className={`fa-solid ${item.icon} ${item.isSpecial ? 'text-lg' : 'text-xl'}`}></i>
            </button>
          ))}
        </div>
      )}

      {selectedPrediction && (
        <BetModal 
          prediction={selectedPrediction.p} 
          side={selectedPrediction.side} 
          onClose={() => setSelectedPrediction(null)} 
          onConfirm={handleConfirmBet} 
        />
      )}
      {sharingPrediction && <ShareCardModal prediction={sharingPrediction} referralCode={currentUser.referralCode} onClose={() => setSharingPrediction(null)} />}
      
      {resolvingPrediction && (
        <ResolutionModal 
          prediction={resolvingPrediction} 
          onClose={() => setResolvingPrediction(null)} 
          onResolve={(res) => handleResolvePrediction(resolvingPrediction.id, res)}
        />
      )}

      <ProfileDrawer 
        isOpen={isProfileDrawerOpen} 
        onClose={() => setIsProfileDrawerOpen(false)} 
        onNavigate={handleNavClick}
        user={currentUser}
      />
    </div>
  );
};

export default App;

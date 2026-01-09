import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { RewardHero } from './components/RewardHero';
import { Leaderboard } from './components/Leaderboard';
import { BettingPanel } from './components/BettingPanel';
import { MyPrediction } from './components/MyActiveNumbers';
import { HistoryPanel } from './components/HistoryPanel';
import { NotificationToast } from './components/NotificationToast';
import { RulesBanner } from './components/RulesBanner';
import { MyPositions } from './components/MyPositions';
import { MesonDepositModal } from './components/MesonDepositModal';
import { 
  NumberSlot, 
  UserState, 
  Transaction, 
  NotificationPreferences 
} from './types';
import { 
  TOTAL_SLOTS, 
  MOCK_WALLET, 
  MOCK_HISTORY,
  generateInitialSlots, 
  generateRandomWallet,
  COST_PER_PLAY 
} from './constants';

const App: React.FC = () => {
  // --- View State ---
  const [view, setView] = useState<'live' | 'prediction' | 'history'>('live');
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  // --- Notification State ---
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>({
    enabled: false,
    top10Alerts: true,
    roundEndAlerts: true,
  });
  const [activeToast, setActiveToast] = useState<{title: string, message: string} | null>(null);
  
  // Track previous top slot for change detection
  const prevTopSlotIdRef = useRef<number | null>(null);

  // --- App State ---
  const [slots, setSlots] = useState<NumberSlot[]>([]);
  const [user, setUser] = useState<UserState>({
    walletAddress: '',
    playsToday: 0,
    balance: 0.00, // Initial balance 0 to force deposit
    isConnected: false,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("23:59:59");
  const [totalPool, setTotalPool] = useState(0);

  // --- Initialization ---
  useEffect(() => {
    // Load initial slots
    const initialSlots = generateInitialSlots(TOTAL_SLOTS);
    let initialPool = 0;
    const prefilledSlots = initialSlots.map(slot => {
      if (Math.random() > 0.7) {
        const bids = Math.floor(Math.random() * 5) + 1;
        const amount = bids * COST_PER_PLAY;
        initialPool += amount;
        return {
          ...slot,
          totalAmount: parseFloat(amount.toFixed(2)),
          lastBidder: generateRandomWallet(),
          lastBidTime: Date.now() - Math.floor(Math.random() * 10000000)
        };
      }
      return slot;
    });
    
    setSlots(prefilledSlots);
    setTotalPool(initialPool);

    // Initial top slot check
    const sorted = [...prefilledSlots].filter(s => s.totalAmount > 0).sort((a,b) => a.totalAmount - b.totalAmount);
    if(sorted.length > 0) prevTopSlotIdRef.current = sorted[0].id;

    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();
      
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      
      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // --- Notification Logic ---
  const triggerNotification = (title: string, message: string) => {
    setActiveToast({ title, message });

    if (notificationPrefs.enabled && Notification.permission === "granted") {
      new Notification(title, { body: message, icon: '/icon.png' });
    }
  };

  const handleToggleNotification = async (key: keyof NotificationPreferences) => {
    if (key === 'enabled' && !notificationPrefs.enabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotificationPrefs(prev => ({ ...prev, [key]: !prev[key] }));
          triggerNotification("Notifications Enabled", "You will now receive game alerts.");
        } else {
           alert("Permission denied. Check your browser settings.");
        }
      }
    } else {
      setNotificationPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  // --- Simulated Bot Activity ---
  useEffect(() => {
    const botInterval = setInterval(() => {
        const randomSlotId = Math.floor(Math.random() * TOTAL_SLOTS);
        const randomBot = generateRandomWallet();
        
        let newTopId: number | null = null;

        setSlots(prev => {
            const nextSlots = prev.map(slot => {
                if (slot.id === randomSlotId) {
                    return {
                        ...slot,
                        totalAmount: slot.totalAmount + COST_PER_PLAY,
                        lastBidder: randomBot,
                        lastBidTime: Date.now()
                    }
                }
                return slot;
            });

            const sorted = [...nextSlots].filter(s => s.totalAmount > 0).sort((a,b) => a.totalAmount - b.totalAmount);
            if (sorted.length > 0) {
               newTopId = sorted[0].id;
            }

            return nextSlots;
        });

        setTimeout(() => {
             if (newTopId !== null && prevTopSlotIdRef.current !== null) {
                if (newTopId !== prevTopSlotIdRef.current) {
                    if (notificationPrefs.enabled && notificationPrefs.top10Alerts) {
                        triggerNotification(
                            "New Leader!", 
                            `Number #${newTopId} has taken the lead with the lowest unique bid structure.`
                        );
                    }
                    prevTopSlotIdRef.current = newTopId;
                }
            } else if (newTopId !== null) {
                prevTopSlotIdRef.current = newTopId;
            }
        }, 0);

        setTotalPool(prev => prev + COST_PER_PLAY);

        const newTx: Transaction = {
            id: Math.random().toString(36).substr(2, 9),
            slotId: randomSlotId,
            bidder: randomBot,
            amount: COST_PER_PLAY,
            timestamp: Date.now()
        };
        setTransactions(prev => [newTx, ...prev].slice(0, 10));

    }, 3500); 

    return () => clearInterval(botInterval);
  }, [notificationPrefs]);

  // --- Handlers ---
  const handleConnect = () => {
    setUser({
      walletAddress: MOCK_WALLET,
      playsToday: Math.floor(Math.random() * 20),
      balance: 0.00, // New user starts with 0
      isConnected: true,
    });
  };

  const handleDeposit = (amount: number) => {
      setUser(prev => ({
          ...prev,
          balance: prev.balance + amount
      }));
      triggerNotification("Deposit Confirmed", `$${amount} added via Meson X402.`);
  };

  const handlePlaceBid = async (slotId: number) => {
    if (!user.isConnected) {
        alert("Please connect wallet first.");
        return;
    }

    if (user.balance < COST_PER_PLAY) {
        setIsDepositOpen(true); // Open deposit modal if insufficient funds
        return;
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    setSlots(prev => prev.map(slot => {
        if (slot.id === slotId) {
            return {
                ...slot,
                totalAmount: slot.totalAmount + COST_PER_PLAY,
                lastBidder: user.walletAddress,
                lastBidTime: Date.now()
            };
        }
        return slot;
    }));

    setTotalPool(prev => prev + COST_PER_PLAY);
    
    setUser(prev => ({
        ...prev,
        playsToday: prev.playsToday + 1,
        balance: prev.balance - COST_PER_PLAY
    }));

    const newTx: Transaction = {
        id: Math.random().toString(36).substr(2, 9),
        slotId: slotId,
        bidder: user.walletAddress,
        amount: COST_PER_PLAY,
        timestamp: Date.now()
    };
    setTransactions(prev => [newTx, ...prev].slice(0, 10));

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-crypto-black text-gray-200 font-sans selection:bg-crypto-accent/30 selection:text-white pb-10">
      <Header 
        user={user} 
        onConnect={handleConnect} 
        currentView={view}
        onNavigate={setView}
        notificationPrefs={notificationPrefs}
        onToggleNotificationPref={handleToggleNotification}
        onOpenDeposit={() => setIsDepositOpen(true)}
      />

      {activeToast && (
        <NotificationToast 
          title={activeToast.title} 
          message={activeToast.message} 
          onClose={() => setActiveToast(null)} 
        />
      )}

      {/* Meson Payment Modal */}
      <MesonDepositModal 
        isOpen={isDepositOpen} 
        onClose={() => setIsDepositOpen(false)}
        onConfirm={handleDeposit}
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {view === 'live' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <RewardHero totalPool={totalPool} timeLeft={timeRemaining} />
            <RulesBanner />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Leaderboard */}
              <div className="lg:col-span-2 h-[600px]">
                <Leaderboard 
                    slots={slots} 
                    currentUserAddress={user.walletAddress} 
                    onQuickBid={handlePlaceBid}
                />
              </div>

              {/* Right: Betting Panel */}
              <div className="lg:col-span-1 h-[600px] flex flex-col">
                <div className="flex-1">
                    <BettingPanel 
                        onPlaceBid={handlePlaceBid} 
                        userPlays={user.playsToday}
                        isConnected={user.isConnected}
                        isProcessing={isProcessing}
                    />
                </div>
                {/* My Positions List below Panel */}
                <div className="flex-1">
                    <MyPositions 
                        slots={slots} 
                        currentUserAddress={user.walletAddress}
                        onQuickBid={handlePlaceBid}
                        isConnected={user.isConnected}
                    />
                </div>
              </div>
            </div>
          </div>
        ) : view === 'prediction' ? (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <MyPrediction slots={slots} currentUserAddress={user.walletAddress} />
           </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
             <HistoryPanel history={MOCK_HISTORY} />
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-white/5 mt-12 py-8 text-center text-gray-600 text-sm">
        <p>© 2024 X402Prediction. Decentralized Reverse Auction.</p>
      </footer>
    </div>
  );
};

export default App;

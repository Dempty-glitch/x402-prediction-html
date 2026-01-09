import React, { useState } from 'react';
import { TOTAL_SLOTS, COST_PER_PLAY, DAILY_LIMIT } from '../constants';
import { Target, Share2, AlertCircle } from 'lucide-react';

interface BettingPanelProps {
  onPlaceBid: (slotId: number) => void;
  userPlays: number;
  isConnected: boolean;
  isProcessing: boolean;
}

export const BettingPanel: React.FC<BettingPanelProps> = ({ 
  onPlaceBid, 
  userPlays, 
  isConnected,
  isProcessing 
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  const handleBid = () => {
    setError(null);
    
    if (!isConnected) {
        setError("Please connect your wallet first.");
        return;
    }

    if (selectedNumber === '' || selectedNumber < 0 || selectedNumber > TOTAL_SLOTS - 1) {
      setError(`Please select a valid number between 0 and ${TOTAL_SLOTS - 1}`);
      return;
    }

    if (userPlays >= DAILY_LIMIT) {
      setError("Daily limit reached (100/100). Come back tomorrow!");
      return;
    }

    onPlaceBid(Number(selectedNumber));
  };

  const shareStatus = () => {
      const text = `I'm leading number ${selectedNumber || '???'} on LowCap Lotto! Estimated Reward is growing. Can you snatch it? #LowCapLotto`;
      navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
  }

  return (
    <div className="bg-crypto-card border border-white/10 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-crypto-accent/10 rounded-full blur-3xl pointer-events-none" />

      <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2 relative z-10">
        <Target className="w-5 h-5 text-crypto-accent" />
        Place Your Bid
      </h3>

      <div className="flex-1 flex flex-col justify-center space-y-6 relative z-10">
        
        {/* Input Section */}
        <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Select Number (0 - {TOTAL_SLOTS - 1})</label>
            <div className="relative">
                <input
                    type="number"
                    value={selectedNumber}
                    onChange={(e) => setSelectedNumber(e.target.value === '' ? '' : parseInt(e.target.value))}
                    placeholder="e.g. 1024"
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-4 text-2xl font-mono text-white focus:outline-none focus:border-crypto-accent focus:ring-1 focus:ring-crypto-accent transition-all placeholder:text-gray-700"
                    disabled={isProcessing}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-mono">
                    COST: ${COST_PER_PLAY}
                </div>
            </div>
            {error && (
                <div className="flex items-center gap-2 text-crypto-danger text-sm animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}
        </div>

        {/* Action Button */}
        <button
            onClick={handleBid}
            disabled={isProcessing || (isConnected && userPlays >= DAILY_LIMIT)}
            className={`
                w-full py-4 rounded-xl font-bold text-lg tracking-wide uppercase transition-all transform active:scale-95
                ${!isConnected 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : isProcessing 
                        ? 'bg-crypto-accent/50 cursor-wait'
                        : userPlays >= DAILY_LIMIT
                            ? 'bg-red-900/50 text-red-200 cursor-not-allowed border border-red-500/30'
                            : 'bg-crypto-accent hover:bg-blue-600 text-white shadow-lg shadow-crypto-accent/30 hover:shadow-crypto-accent/50'
                }
            `}
        >
            {isProcessing ? 'Processing...' : !isConnected ? 'Connect to Play' : userPlays >= DAILY_LIMIT ? 'Limit Reached' : 'PAY $0.01 & CLAIM'}
        </button>

        {/* Info / Stats within panel */}
        <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                 <div className="text-gray-500 text-xs uppercase mb-1">Your Plays</div>
                 <div className={`text-xl font-mono font-bold ${userPlays >= DAILY_LIMIT ? 'text-crypto-danger' : 'text-white'}`}>
                     {isConnected ? `${userPlays}/${DAILY_LIMIT}` : '-/-'}
                 </div>
             </div>
             <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5 cursor-pointer hover:bg-white/10 transition-colors" onClick={shareStatus}>
                 <div className="text-gray-500 text-xs uppercase mb-1 flex items-center justify-center gap-1">
                     Share <Share2 className="w-3 h-3" />
                 </div>
                 <div className="text-xl font-mono font-bold text-crypto-accent">Viral</div>
             </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
          <p className="text-xs text-gray-600 max-w-xs mx-auto">
              Smart Contract verifies plays. Strategy: Distribute bids or defend a single low-cap number.
          </p>
      </div>
    </div>
  );
};

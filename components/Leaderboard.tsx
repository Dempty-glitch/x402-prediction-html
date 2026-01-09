import React from 'react';
import { NumberSlot } from '../types';
import { Trophy, ArrowUp, User, Zap } from 'lucide-react';

interface LeaderboardProps {
  slots: NumberSlot[];
  currentUserAddress: string;
  onQuickBid: (id: number) => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ slots, currentUserAddress, onQuickBid }) => {
  // Logic: Filter > 0, Sort Ascending by Amount
  const sortedSlots = [...slots]
    .filter(s => s.totalAmount > 0)
    .sort((a, b) => a.totalAmount - b.totalAmount)
    .slice(0, 10);

  return (
    <div className="bg-crypto-card border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full shadow-xl">
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
        <h3 className="font-bold text-lg text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-crypto-gold" />
          Top 10 Competitive
        </h3>
        <span className="text-xs text-crypto-accent font-mono bg-crypto-accent/10 px-2 py-1 rounded animate-pulse">
          LIVE
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/20 text-xs uppercase text-gray-500">
              <th className="p-4 font-medium">Rank</th>
              <th className="p-4 font-medium">Number</th>
              <th className="p-4 font-medium text-right">Total (USDC)</th>
              <th className="p-4 font-medium text-right w-40">Leader</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedSlots.length === 0 ? (
                <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                        No bids yet. Be the first!
                    </td>
                </tr>
            ) : (
                sortedSlots.map((slot, index) => {
                const isCurrentUser = slot.lastBidder === currentUserAddress;
                return (
                    <tr key={slot.id} className={`group hover:bg-white/5 transition-colors ${index === 0 ? 'bg-crypto-gold/5' : ''}`}>
                    <td className="p-4">
                        <span className={`
                        flex items-center justify-center w-6 h-6 rounded font-mono text-xs font-bold
                        ${index === 0 ? 'bg-crypto-gold text-black' : 
                          index === 1 ? 'bg-gray-300 text-black' :
                          index === 2 ? 'bg-orange-700 text-white' : 'text-gray-500 bg-white/10'}
                        `}>
                        {index + 1}
                        </span>
                    </td>
                    <td className="p-4">
                        <span className="font-mono text-white font-bold text-lg">#{slot.id}</span>
                    </td>
                    <td className="p-4 text-right">
                        <span className="font-mono text-crypto-success font-medium">
                        ${slot.totalAmount.toFixed(2)}
                        </span>
                    </td>
                    <td className="p-4 text-right relative">
                        {/* Normal State: Show Wallet */}
                        <div className={`group-hover:opacity-0 transition-opacity absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-end gap-2 font-mono text-sm ${isCurrentUser ? 'text-crypto-accent' : 'text-gray-400'}`}>
                            {isCurrentUser && <User className="w-3 h-3" />}
                            {slot.lastBidder}
                        </div>
                        
                        {/* Hover State: Show Quick Bid Button */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2">
                             <button
                                onClick={() => onQuickBid(slot.id)}
                                className="bg-crypto-accent hover:bg-blue-400 text-white text-xs font-bold px-3 py-1.5 rounded shadow-lg shadow-crypto-accent/20 flex items-center gap-1 transform active:scale-95 transition-all"
                             >
                                <Zap className="w-3 h-3" /> Quick Bid
                             </button>
                        </div>

                        {/* Rank 1 Crown (Visible only when not hovered or integrated differently, kept simple here) */}
                        {index === 0 && <span className="text-[10px] text-crypto-gold absolute right-4 bottom-1 group-hover:opacity-0 transition-opacity">Leader</span>}
                    </td>
                    </tr>
                );
                })
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 text-center text-xs text-gray-500 mt-auto border-t border-white/10 bg-black/20">
        Hover over a row to Quick Bid on that number.
      </div>
    </div>
  );
};

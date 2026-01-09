import React from 'react';
import { NumberSlot } from '../types';
import { BrainCircuit, Trophy, DollarSign, TrendingUp, AlertCircle, Target } from 'lucide-react';

interface MyPredictionProps {
  slots: NumberSlot[];
  currentUserAddress: string;
}

export const MyPrediction: React.FC<MyPredictionProps> = ({ slots, currentUserAddress }) => {
  // 1. Calculate Ranks for ALL active slots (>0)
  // Lower total amount = Better Rank (1 is best)
  const sortedActiveSlots = [...slots]
    .filter(s => s.totalAmount > 0)
    .sort((a, b) => a.totalAmount - b.totalAmount);

  // 2. Filter for User's slots
  const mySlots = slots.filter(s => s.lastBidder === currentUserAddress);

  // 3. Enrich user slots with Rank and Win Rate
  const enrichedSlots = mySlots.map(slot => {
    const rankIndex = sortedActiveSlots.findIndex(s => s.id === slot.id);
    const rank = rankIndex !== -1 ? rankIndex + 1 : -1;
    
    // Simple heuristic for Win Rate based on Rank
    let winRate = 0;
    if (rank === 1) winRate = 98.5;
    else if (rank === 2) winRate = 45.0;
    else if (rank === 3) winRate = 25.0;
    else if (rank >= 4 && rank <= 10) winRate = 10.0;
    else if (rank > 10) winRate = 1.0;

    return { ...slot, rank, winRate };
  });

  // 4. Filter and Sort for display
  // - Must have > 0 amount (explicit check as requested)
  // - Sort by Rank ASC (Rank 1 = High Win Rate)
  const validMySlots = enrichedSlots
    .filter(s => s.totalAmount > 0 && s.rank !== -1)
    .sort((a, b) => a.rank - b.rank);

  // 5. Get Top 10 only
  const top10Slots = validMySlots.slice(0, 10);

  // Stats derived from ALL user slots, not just top 10
  const leadingCount = validMySlots.filter(s => s.rank === 1).length;
  const top10Count = validMySlots.filter(s => s.rank > 0 && s.rank <= 10).length;

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-3 bg-crypto-accent/10 border border-crypto-accent/20 rounded-xl">
           <BrainCircuit className="w-6 h-6 text-crypto-accent" />
        </div>
        <div>
           <h2 className="text-2xl font-bold text-white">My Prediction</h2>
           <p className="text-gray-400 text-sm">Your Top 10 highest probability positions.</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-crypto-card border border-white/10 rounded-xl p-4 flex items-center justify-between">
            <div>
                <div className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Active</div>
                <div className="text-2xl font-mono font-bold text-white mt-1">{validMySlots.length}</div>
            </div>
            <Target className="w-8 h-8 text-gray-700" />
        </div>
        <div className="bg-crypto-card border border-white/10 rounded-xl p-4 flex items-center justify-between">
             <div>
                <div className="text-gray-500 text-xs uppercase font-bold tracking-wider">Top 10 Positions</div>
                <div className="text-2xl font-mono font-bold text-white mt-1">{top10Count}</div>
            </div>
            <Trophy className={`w-8 h-8 ${top10Count > 0 ? 'text-crypto-gold' : 'text-gray-700'}`} />
        </div>
        <div className="bg-crypto-card border border-white/10 rounded-xl p-4 flex items-center justify-between">
             <div>
                <div className="text-gray-500 text-xs uppercase font-bold tracking-wider">Leading (#1)</div>
                <div className="text-2xl font-mono font-bold text-white mt-1">{leadingCount}</div>
            </div>
            <TrendingUp className={`w-8 h-8 ${leadingCount > 0 ? 'text-crypto-success' : 'text-gray-700'}`} />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-crypto-card border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h3 className="font-bold text-white text-sm">Your Best Positions (Top 10)</h3>
            {validMySlots.length > 10 && (
                <span className="text-xs text-gray-500 italic">
                    Showing top 10 of {validMySlots.length} active bets
                </span>
            )}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-white/5 text-xs uppercase text-gray-400 border-b border-white/5">
                    <th className="p-4 font-medium">Number</th>
                    <th className="p-4 font-medium">Rank</th>
                    <th className="p-4 font-medium text-right">Total Bid (USDC)</th>
                    <th className="p-4 font-medium text-right">Win Rate</th>
                    <th className="p-4 font-medium text-right">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
                {top10Slots.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="p-16 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                                <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
                                <p className="text-lg font-medium text-gray-300">No active predictions</p>
                                <p className="text-sm mt-1 max-w-sm mx-auto">You aren't leading any numbers right now. Place a bid to take a spot!</p>
                            </div>
                        </td>
                    </tr>
                ) : (
                    top10Slots.map((slot) => (
                        <tr key={slot.id} className="group hover:bg-white/5 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xl font-bold text-white">#{slot.id}</span>
                                </div>
                            </td>
                            <td className="p-4">
                                <div className={`flex items-center gap-2 font-mono font-bold ${
                                    slot.rank === 1 ? 'text-crypto-gold' : 
                                    slot.rank <= 10 ? 'text-crypto-accent' : 'text-gray-500'
                                }`}>
                                    {slot.rank === 1 && <Trophy className="w-4 h-4" />}
                                    #{slot.rank > 0 ? slot.rank : '100+'}
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-1 text-crypto-success font-mono font-bold">
                                    <DollarSign className="w-3 h-3" />
                                    {slot.totalAmount.toFixed(2)}
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex flex-col items-end gap-1">
                                     <div className="flex items-center gap-2 w-full justify-end">
                                        <span className={`font-mono text-sm font-bold ${
                                            slot.winRate > 50 ? 'text-crypto-success' : 
                                            slot.winRate > 10 ? 'text-crypto-gold' : 'text-gray-500'
                                        }`}>
                                            {slot.winRate}%
                                        </span>
                                     </div>
                                     <div className="w-24 bg-gray-800 rounded-full h-1">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-500 ${
                                                slot.winRate > 50 ? 'bg-crypto-success' : 
                                                slot.winRate > 10 ? 'bg-crypto-gold' : 'bg-gray-600'
                                            }`} 
                                            style={{ width: `${slot.winRate}%` }}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                {slot.rank === 1 ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-crypto-gold/20 text-crypto-gold border border-crypto-gold/20 shadow-sm shadow-crypto-gold/10">
                                        <TrendingUp className="w-3 h-3 mr-1" /> LEADING
                                    </span>
                                ) : slot.rank <= 10 ? (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-crypto-accent/20 text-crypto-accent border border-crypto-accent/20">
                                        Top 10
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-400 border border-white/5">
                                        Outranked
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

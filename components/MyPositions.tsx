import React from 'react';
import { NumberSlot } from '../types';
import { ShieldCheck, Zap } from 'lucide-react';

interface MyPositionsProps {
    slots: NumberSlot[];
    currentUserAddress: string;
    onQuickBid: (id: number) => void;
    isConnected: boolean;
}

export const MyPositions: React.FC<MyPositionsProps> = ({ slots, currentUserAddress, onQuickBid, isConnected }) => {
    // Filter slots where the user is the LAST bidder
    const mySlots = slots.filter(s => s.lastBidder === currentUserAddress);

    if (!isConnected) return null;

    return (
        <div className="bg-crypto-card border border-white/10 rounded-2xl overflow-hidden flex flex-col mt-6 shadow-xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-green-900/20 to-transparent">
                <h3 className="font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-400" />
                    My Numbers <span className="text-xs font-normal text-gray-400">(You are leading)</span>
                </h3>
                <span className="text-xs text-crypto-success font-mono bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                    {mySlots.length} Active
                </span>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2 space-y-2">
                {mySlots.length === 0 ? (
                    <div className="text-center py-8 px-4 text-gray-500 text-sm border border-dashed border-white/10 rounded-lg m-2">
                        <p>You aren't leading any numbers.</p>
                        <p className="text-xs mt-1">Place a bid to take the lead!</p>
                    </div>
                ) : (
                    mySlots.map(slot => (
                        <div key={slot.id} className="group flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/5 hover:border-crypto-accent/50 transition-all hover:shadow-lg hover:shadow-crypto-accent/10">
                            <div className="flex flex-col">
                                <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Number</span>
                                <span className="font-mono font-bold text-white text-lg">#{slot.id}</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col text-right">
                                     <span className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">Total</span>
                                     <span className="font-mono text-green-400">${slot.totalAmount.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => onQuickBid(slot.id)}
                                    className="bg-crypto-accent/20 hover:bg-crypto-accent text-crypto-accent hover:text-white p-2 rounded-lg transition-all transform active:scale-95"
                                    title="Quick Bid (Defend)"
                                >
                                    <Zap className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

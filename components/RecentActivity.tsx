import React from 'react';
import { Transaction } from '../types';
import { Activity } from 'lucide-react';

interface RecentActivityProps {
  transactions: Transaction[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ transactions }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4 text-gray-400">
        <Activity className="w-4 h-4" />
        <span className="text-sm uppercase tracking-widest font-bold">Live Order Flow</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {transactions.slice(0, 4).map((tx) => (
          <div key={tx.id} className="bg-black/40 border border-white/10 rounded-lg p-3 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-500">
             <div>
                 <div className="text-xs text-gray-500">Number</div>
                 <div className="text-crypto-accent font-mono font-bold">#{tx.slotId}</div>
             </div>
             <div className="text-right">
                 <div className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', second: '2-digit' })}</div>
                 <div className="text-xs font-mono text-white">{tx.bidder}</div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

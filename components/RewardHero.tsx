import React from 'react';
import { TrendingUp, Clock, Info } from 'lucide-react';
import { POOL_SHARE_PERCENTAGE } from '../constants';

interface RewardHeroProps {
  totalPool: number;
  timeLeft: string;
}

export const RewardHero: React.FC<RewardHeroProps> = ({ totalPool, timeLeft }) => {
  const estimatedPrize = totalPool * POOL_SHARE_PERCENTAGE;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Main Prize Card */}
      <div className="md:col-span-2 relative overflow-hidden rounded-2xl border border-crypto-accent/30 bg-gradient-to-br from-crypto-card to-crypto-dark p-6 md:p-8 shadow-2xl shadow-crypto-accent/10 group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <TrendingUp className="w-32 h-32 text-crypto-accent" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center rounded-full bg-crypto-accent/10 px-2.5 py-0.5 text-xs font-medium text-crypto-accent ring-1 ring-inset ring-crypto-accent/20">
              Live Round
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Info className="w-3 h-3" /> 90% Pool Share
            </span>
          </div>
          
          <h2 className="text-gray-400 text-sm md:text-base font-medium uppercase tracking-widest mb-1">
            Estimated Grand Prize
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              ${estimatedPrize.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xl text-gray-500 font-mono">USDC</span>
          </div>
          <p className="mt-4 text-sm text-gray-400 max-w-lg">
            Identify the lowest unique bid. Be the last to bid on it. The strategy is yours.
          </p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="rounded-2xl border border-white/10 bg-crypto-card p-6 flex flex-col justify-center">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
            <Clock className="w-4 h-4" />
            <span>Time Remaining</span>
          </div>
          <div className="text-3xl font-mono font-bold text-white">{timeLeft}</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Total Pool</span>
            <span className="font-mono text-white">${totalPool.toFixed(2)}</span>
          </div>
           <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Protocol Fee (10%)</span>
            <span className="font-mono text-gray-400">${(totalPool * 0.1).toFixed(2)}</span>
          </div>
           <div className="w-full bg-white/5 rounded-full h-1.5 mt-2">
             <div className="bg-crypto-accent h-1.5 rounded-full w-[65%]" />
           </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ScrollText, Gavel, AlertTriangle } from 'lucide-react';

export const RulesBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start gap-4 shadow-lg">
      <div className="p-2 bg-blue-500/20 rounded-lg shrink-0 hidden sm:block">
         <Gavel className="w-6 h-6 text-blue-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <span className="sm:hidden"><Gavel className="w-5 h-5 text-blue-400" /></span>
            Game Rules
        </h3>
        <ul className="space-y-2 text-sm text-gray-300">
           <li className="flex items-start gap-2">
             <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
             <span><strong>Winning Number:</strong> The number with the <span className="text-white font-bold underline decoration-green-500/50">lowest total amount</span> that is greater than 0.</span>
           </li>
           <li className="flex items-start gap-2">
             <span className="mt-1.5 w-1.5 h-1.5 bg-yellow-500 rounded-full shrink-0"></span>
             <span><strong>Winning Player:</strong> The wallet that placed the <span className="text-white font-bold underline decoration-yellow-500/50">last bid</span> on that winning number.</span>
           </li>
        </ul>
      </div>
      <div className="hidden lg:block border-l border-white/10 pl-4">
           <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-widest mb-1">
               <AlertTriangle className="w-3 h-3" /> Strategy Tip
           </div>
           <p className="text-xs text-gray-400 w-48 italic">
               Defend your number at the last second or spread your bids to find hidden low-cap numbers.
           </p>
      </div>
    </div>
  );
};

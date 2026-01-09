import React from 'react';
import { RoundHistory } from '../types';
import { History, Calendar, Trophy, Users, Award } from 'lucide-react';

interface HistoryPanelProps {
  history: RoundHistory[];
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-crypto-card border border-white/10 rounded-xl">
          <History className="w-6 h-6 text-crypto-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Round History</h2>
          <p className="text-gray-400 text-sm">Review past winning numbers and payouts.</p>
        </div>
      </div>

      <div className="bg-crypto-card border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-xs uppercase text-gray-500 border-b border-white/5">
                <th className="p-5 font-medium">Round Info</th>
                <th className="p-5 font-medium">Winning Number</th>
                <th className="p-5 font-medium text-right">Prize Pool</th>
                <th className="p-5 font-medium text-right">Participants</th>
                <th className="p-5 font-medium text-right">Winner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((round) => (
                <tr key={round.roundId} className="group hover:bg-white/5 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 text-xs font-mono">
                           #{round.roundId} 
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="w-3 h-3" />
                            {round.date}
                        </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-crypto-gold" />
                        <span className="font-mono text-xl font-bold text-white">#{round.winningNumber}</span>
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <span className="font-mono text-crypto-success font-bold text-lg">
                      ${round.prizePool.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 text-gray-400 text-sm">
                        <Users className="w-3 h-3" />
                        {round.totalParticipants.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Trophy className="w-3 h-3 text-crypto-gold" />
                        <span className="font-mono text-crypto-accent text-sm bg-crypto-accent/10 px-2 py-1 rounded">
                            {round.winner}
                        </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Distributed</span>
              <span className="text-2xl font-mono font-bold text-white">$1.2M+</span>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Rounds</span>
              <span className="text-2xl font-mono font-bold text-white">1,024</span>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
              <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Active Players</span>
              <span className="text-2xl font-mono font-bold text-white">45.2K</span>
          </div>
      </div>
    </div>
  );
};

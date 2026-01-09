import React, { useState } from 'react';
import { X, CheckCircle, Loader2, Zap } from 'lucide-react';

interface MesonDepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

export const MesonDepositModal: React.FC<MesonDepositModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [amount, setAmount] = useState<number>(5);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  if (!isOpen) return null;

  const handlePayment = async () => {
    setStatus('processing');
    // Simulate Meson X402 SDK Interaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
    setTimeout(() => {
        onConfirm(amount);
        setStatus('idle');
        onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-crypto-card border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header with Meson Branding */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-lg">
               {/* Simulated Meson Logo */}
               <Zap className="w-6 h-6 text-indigo-600 fill-indigo-600" />
            </div>
            <div>
                <h3 className="text-white font-bold text-lg">Meson X402</h3>
                <p className="text-indigo-200 text-xs">Micropayment Gateway</p>
            </div>
          </div>
          <button onClick={onClose} className="text-indigo-200 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
            {status === 'success' ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Deposit Successful!</h4>
                    <p className="text-gray-400">Your balance has been updated via Meson.</p>
                </div>
            ) : status === 'processing' ? (
                 <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Processing with Meson...</h4>
                    <p className="text-gray-400 text-sm">Verifying micropayment channel...</p>
                </div>
            ) : (
                <>
                    <div>
                        <label className="text-sm text-gray-400 mb-2 block">Select Top-up Amount (USDC)</label>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {[5, 10, 20, 50, 100].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => setAmount(val)}
                                    className={`py-3 rounded-xl border font-mono font-medium transition-all ${
                                        amount === val 
                                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                    }`}
                                >
                                    ${val}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full bg-black/40 border border-white/20 rounded-xl py-3 pl-8 pr-4 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-lg p-4 flex items-start gap-3">
                        <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                        <div className="text-xs text-indigo-200">
                            <strong>Instant Settlement:</strong> Meson X402 enables gas-less high-frequency betting by locking these funds into the game session.
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all transform active:scale-95"
                    >
                        Confirm Deposit
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

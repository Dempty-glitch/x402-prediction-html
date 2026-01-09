import React, { useState } from 'react';
import { Wallet, Bell, Menu, LayoutDashboard, History, Settings, Check, Plus, BrainCircuit } from 'lucide-react';
import { UserState, NotificationPreferences } from '../types';

interface HeaderProps {
  user: UserState;
  onConnect: () => void;
  currentView: 'live' | 'prediction' | 'history';
  onNavigate: (view: 'live' | 'prediction' | 'history') => void;
  notificationPrefs: NotificationPreferences;
  onToggleNotificationPref: (key: keyof NotificationPreferences) => void;
  onOpenDeposit: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  onConnect, 
  currentView, 
  onNavigate,
  notificationPrefs,
  onToggleNotificationPref,
  onOpenDeposit
}) => {
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-crypto-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <div 
             className="flex items-center gap-2 cursor-pointer"
             onClick={() => onNavigate('live')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="font-mono font-bold text-white text-lg">X</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block text-white">
              X402<span className="text-crypto-accent">Prediction</span>
            </span>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
            <button
              onClick={() => onNavigate('live')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentView === 'live' 
                  ? 'bg-crypto-accent text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Live Round
            </button>
            <button
              onClick={() => onNavigate('prediction')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentView === 'prediction' 
                  ? 'bg-crypto-accent text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              My Prediction
            </button>
            <button
              onClick={() => onNavigate('history')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                currentView === 'history' 
                  ? 'bg-crypto-accent text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <History className="w-4 h-4" />
              History
            </button>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {user.isConnected ? (
            <div className="flex items-center gap-3">
                {/* Balance & Deposit */}
                <div className="flex items-center bg-crypto-card border border-white/10 rounded-full pl-4 pr-1 py-1">
                    <span className="font-mono text-white text-sm font-bold mr-3">
                        ${user.balance.toFixed(2)}
                    </span>
                    <button 
                        onClick={onOpenDeposit}
                        className="w-6 h-6 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white transition-colors"
                        title="Deposit with Meson"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                {/* Wallet Info */}
                <div className="hidden sm:flex items-center gap-3 bg-crypto-card border border-white/10 rounded-full px-4 py-1.5">
                <div className="flex flex-col items-end mr-2 border-r border-white/10 pr-3">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Daily Limit</span>
                    <span className={`text-xs font-mono font-bold ${user.playsToday >= 100 ? 'text-crypto-danger' : 'text-crypto-success'}`}>
                    {user.playsToday}/100
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-crypto-success animate-pulse" />
                    <span className="font-mono text-sm text-gray-300">{user.walletAddress}</span>
                </div>
                </div>
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition-all text-sm"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          )}
          
          {/* Notification Menu */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className={`p-2 transition-colors relative rounded-full ${showNotifMenu ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Bell className="w-5 h-5" />
              {notificationPrefs.enabled && <span className="absolute top-1.5 right-2 w-2 h-2 bg-crypto-danger rounded-full border border-black"></span>}
            </button>

            {showNotifMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowNotifMenu(false)} 
                />
                <div className="absolute right-0 mt-2 w-64 bg-crypto-card border border-white/10 rounded-xl shadow-2xl z-20 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-2 mb-4 text-white font-medium pb-2 border-b border-white/10">
                    <Settings className="w-4 h-4" />
                    Notification Settings
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Push Notifications</span>
                      <div 
                        onClick={() => onToggleNotificationPref('enabled')}
                        className={`w-10 h-6 rounded-full p-1 transition-colors ${notificationPrefs.enabled ? 'bg-crypto-success' : 'bg-gray-700'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${notificationPrefs.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                      </div>
                    </label>

                    <label className={`flex items-center justify-between cursor-pointer group ${!notificationPrefs.enabled && 'opacity-50 pointer-events-none'}`}>
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Top 10 Changes</span>
                      <button 
                        onClick={() => onToggleNotificationPref('top10Alerts')}
                        className={`w-4 h-4 border border-gray-600 rounded flex items-center justify-center ${notificationPrefs.top10Alerts ? 'bg-crypto-accent border-crypto-accent' : ''}`}
                      >
                        {notificationPrefs.top10Alerts && <Check className="w-3 h-3 text-white" />}
                      </button>
                    </label>

                    <label className={`flex items-center justify-between cursor-pointer group ${!notificationPrefs.enabled && 'opacity-50 pointer-events-none'}`}>
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">Round End Alert</span>
                      <button 
                         onClick={() => onToggleNotificationPref('roundEndAlerts')}
                         className={`w-4 h-4 border border-gray-600 rounded flex items-center justify-center ${notificationPrefs.roundEndAlerts ? 'bg-crypto-accent border-crypto-accent' : ''}`}
                      >
                         {notificationPrefs.roundEndAlerts && <Check className="w-3 h-3 text-white" />}
                      </button>
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <button className="p-2 text-gray-400 hover:text-white transition-colors md:hidden">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
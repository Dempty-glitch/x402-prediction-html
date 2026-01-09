export interface NumberSlot {
  id: number;
  totalAmount: number;
  lastBidder: string; // Wallet address format
  lastBidTime: number; // Timestamp
}

export interface UserState {
  walletAddress: string;
  playsToday: number;
  balance: number;
  isConnected: boolean;
}

export interface Transaction {
  id: string;
  slotId: number;
  bidder: string;
  amount: number;
  timestamp: number;
}

export interface RoundHistory {
  roundId: number;
  date: string;
  winningNumber: number;
  winner: string;
  prizePool: number;
  totalParticipants: number;
}

export interface NotificationPreferences {
  enabled: boolean;
  top10Alerts: boolean;
  roundEndAlerts: boolean;
}

export enum ConnectStatus {
  DISCONNECTED,
  CONNECTING,
  CONNECTED
}

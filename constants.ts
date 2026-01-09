import { RoundHistory } from './types';

export const TOTAL_SLOTS = 1441; // 0 to 1440
export const DAILY_LIMIT = 100;
export const COST_PER_PLAY = 0.01;
export const POOL_SHARE_PERCENTAGE = 0.90;

export const MOCK_WALLET = "0x71C...9A23";

// Helper to generate a random wallet address
export const generateRandomWallet = (): string => {
  const chars = '0123456789ABCDEF';
  let addr = '0x';
  for (let i = 0; i < 3; i++) addr += chars[Math.floor(Math.random() * chars.length)];
  addr += '...';
  for (let i = 0; i < 4; i++) addr += chars[Math.floor(Math.random() * chars.length)];
  return addr;
};

// Initial state generation
export const generateInitialSlots = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    totalAmount: 0,
    lastBidder: '',
    lastBidTime: 0,
  }));
};

export const MOCK_HISTORY: RoundHistory[] = [
  {
    roundId: 1024,
    date: '2024-03-10',
    winningNumber: 88,
    winner: '0x3A2...9B11',
    prizePool: 4520.50,
    totalParticipants: 1240
  },
  {
    roundId: 1023,
    date: '2024-03-09',
    winningNumber: 1302,
    winner: '0x8B1...C220',
    prizePool: 3890.10,
    totalParticipants: 980
  },
  {
    roundId: 1022,
    date: '2024-03-08',
    winningNumber: 42,
    winner: '0x1C9...F441',
    prizePool: 5100.75,
    totalParticipants: 1560
  },
  {
    roundId: 1021,
    date: '2024-03-07',
    winningNumber: 777,
    winner: '0x9D2...A113',
    prizePool: 4200.00,
    totalParticipants: 1100
  },
  {
    roundId: 1020,
    date: '2024-03-06',
    winningNumber: 5,
    winner: '0x4F4...E332',
    prizePool: 3250.25,
    totalParticipants: 850
  }
];

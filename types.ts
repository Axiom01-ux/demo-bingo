
export interface Prediction {
  id: string;
  creator: {
    name: string;
    handle: string;
    avatar: string;
  };
  authorComment?: string;
  question: string;
  description: string;
  odds: {
    yes: number;
    no: number;
  };
  volume: number;
  endTime: string;
  category: string;
  probability: number;
  isResolved?: boolean;
  result?: 'yes' | 'no';
}

export interface User {
  name: string;
  handle: string;
  avatar: string;
  points: number;
  referralCode: string;
}

export interface UserPosition {
  predictionId: string;
  side: 'yes' | 'no';
  shares: number;
  avgPrice: number;
}

export enum ViewType {
  HOME = 'home',
  EXPLORE = 'explore',
  PORTFOLIO = 'portfolio',
  NOTIFICATIONS = 'notifications',
  PROFILE = 'profile',
  CREATE_BET = 'create_bet',
  FRIENDS = 'friends',
  WALLET = 'wallet',
  LEADERBOARD = 'leaderboard'
}
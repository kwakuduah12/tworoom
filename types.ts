
export enum AppState {
  ONBOARDING = 'ONBOARDING',
  PAIRING = 'PAIRING',
  DASHBOARD = 'DASHBOARD',
  TIMELINE = 'TIMELINE',
  MEMORIES = 'MEMORIES',
  SETTINGS = 'SETTINGS'
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  mood?: string;
}

export interface CoupleData {
  id: string;
  partner1: UserProfile;
  partner2: UserProfile;
  anniversary: string;
  nextVisit: string | null;
  pairCode: string;
}

export interface TimelineEntry {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  timestamp: number;
  type: 'text' | 'photo' | 'prompt_answer';
  emoji?: string;
}

export interface DailyPrompt {
  id: string;
  question: string;
  date: string;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

import { CoupleData, TimelineEntry, UserProfile, Memory } from '../types';

const KEYS = {
  COUPLE: 'aura_couple',
  USER: 'aura_user',
  TIMELINE: 'aura_timeline',
  MEMORIES: 'aura_memories',
};

export const saveUser = (user: UserProfile) => localStorage.setItem(KEYS.USER, JSON.stringify(user));
export const getUser = (): UserProfile | null => {
  const data = localStorage.getItem(KEYS.USER);
  return data ? JSON.parse(data) : null;
};

export const saveCouple = (couple: CoupleData) => localStorage.setItem(KEYS.COUPLE, JSON.stringify(couple));
export const getCouple = (): CoupleData | null => {
  const data = localStorage.getItem(KEYS.COUPLE);
  return data ? JSON.parse(data) : null;
};

export const getTimeline = (): TimelineEntry[] => {
  const data = localStorage.getItem(KEYS.TIMELINE);
  return data ? JSON.parse(data) : [];
};

export const addTimelineEntry = (entry: TimelineEntry) => {
  const timeline = getTimeline();
  localStorage.setItem(KEYS.TIMELINE, JSON.stringify([entry, ...timeline]));
};

export const getMemories = (): Memory[] => {
  const data = localStorage.getItem(KEYS.MEMORIES);
  return data ? JSON.parse(data) : [];
};

export const addMemory = (memory: Memory) => {
  const memories = getMemories();
  localStorage.setItem(KEYS.MEMORIES, JSON.stringify([memory, ...memories]));
};

export const clearAll = () => localStorage.clear();

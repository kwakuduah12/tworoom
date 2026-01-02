import { PROMPTS } from "./list";

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

export function getDailyPrompt() {
  const dayIndex = Math.floor(
    new Date().getTime() / (1000 * 60 * 60 * 24)
  );
  return PROMPTS[dayIndex % PROMPTS.length];
}
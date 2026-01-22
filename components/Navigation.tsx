
import React from 'react';
import { AppState } from '../types';

interface NavigationProps {
  currentScreen: AppState;
  onNavigate: (screen: AppState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  const tabs = [
    { id: AppState.DASHBOARD, label: 'Sanctuary', icon: '🏠' },
    { id: AppState.TIMELINE, label: 'Timeline', icon: '📖' },
    { id: AppState.MEMORIES, label: 'Vault', icon: '✨' },
    { id: AppState.SETTINGS, label: 'Setting', icon: '⚙️' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] glass border border-white/40 rounded-3xl p-3 flex justify-around items-center shadow-xl z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 px-4 py-2 rounded-2xl ${
            currentScreen === tab.id 
              ? 'bg-rose-500/10 scale-105' 
              : 'opacity-50 hover:opacity-100'
          }`}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span className={`text-[10px] font-bold tracking-tight uppercase ${
            currentScreen === tab.id ? 'text-rose-600' : 'text-slate-600'
          }`}>
            {tab.label}
          </span>
          {currentScreen === tab.id && (
            <div className="w-1 h-1 rounded-full bg-rose-500 mt-0.5" />
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;

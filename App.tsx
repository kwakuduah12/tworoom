import React, { useState, useEffect } from 'react';
import { AppState, UserProfile, CoupleData, TimelineEntry } from './types';
import * as storage from './services/storageService';
import Onboarding from './screens/Onboarding';
import Dashboard from './screens/Dashboard';
import Timeline from './screens/Timeline';
import Memories from './screens/Memories';
import Settings from './screens/Settings';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>(AppState.ONBOARDING);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [couple, setCouple] = useState<CoupleData | null>(null);

  useEffect(() => {
    const savedUser = storage.getUser();
    const savedCouple = storage.getCouple();
    
    if (savedUser && savedCouple) {
      setUser(savedUser);
      setCouple(savedCouple);
      setCurrentScreen(AppState.DASHBOARD);
    } else if (savedUser) {
      setUser(savedUser);
      setCurrentScreen(AppState.PAIRING);
    }
  }, []);

  const handleUserCreated = (newUser: UserProfile) => {
    setUser(newUser);
    storage.saveUser(newUser);
    setCurrentScreen(AppState.PAIRING);
  };

  const handlePairingComplete = (newCouple: CoupleData) => {
    setCouple(newCouple);
    storage.saveCouple(newCouple);
    setCurrentScreen(AppState.DASHBOARD);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppState.ONBOARDING:
      case AppState.PAIRING:
        return (
          <Onboarding 
            onUserCreated={handleUserCreated} 
            onPairingComplete={handlePairingComplete}
            currentStep={user ? 'pairing' : 'signup'}
          />
        );
      case AppState.DASHBOARD:
        return <Dashboard user={user!} couple={couple!} />;
      case AppState.TIMELINE:
        return <Timeline user={user!} couple={couple!} />;
      case AppState.MEMORIES:
        return <Memories user={user!} couple={couple!} />;
      case AppState.SETTINGS:
        return <Settings user={user!} couple={couple!} onLogout={() => {
          storage.clearAll();
          setUser(null);
          setCouple(null);
          setCurrentScreen(AppState.ONBOARDING);
        }} />;
      default:
        return <Dashboard user={user!} couple={couple!} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col bg-slate-50 shadow-2xl overflow-hidden">
      <main className="flex-1 pb-24 overflow-y-auto no-scrollbar">
        {renderScreen()}
      </main>
      
      {couple && (
        <Navigation 
          currentScreen={currentScreen} 
          onNavigate={(screen) => setCurrentScreen(screen)} 
        />
      )}
    </div>
  );
};

export default App;

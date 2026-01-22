
import React, { useState } from 'react';
import { UserProfile, CoupleData } from '../types';

interface OnboardingProps {
  onUserCreated: (user: UserProfile) => void;
  onPairingComplete: (couple: CoupleData) => void;
  currentStep: 'signup' | 'pairing';
}

const Onboarding: React.FC<OnboardingProps> = ({ onUserCreated, onPairingComplete, currentStep }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onUserCreated({
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      avatar: `https://picsum.photos/seed/${name}/200`,
    });
  };

  const handlePair = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a successful pairing
    const fakePartner: UserProfile = {
      id: 'partner-123',
      name: isJoining ? 'My Partner' : 'Future Partner',
      avatar: `https://picsum.photos/seed/partner/200`,
    };
    
    onPairingComplete({
      id: 'couple-' + Math.random().toString(36).substr(2, 5),
      partner1: { id: 'me', name: name || 'Me', avatar: `https://picsum.photos/seed/me/200` },
      partner2: fakePartner,
      anniversary: new Date().toISOString(),
      nextVisit: null,
      pairCode: code || 'LOVE-123',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 pt-12 text-center">
      <div className="w-20 h-20 bg-rose-100 rounded-[40%] flex items-center justify-center mb-8 rotate-12 shadow-inner">
        <span className="text-4xl">✨</span>
      </div>
      
      {currentStep === 'signup' ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="serif text-4xl mb-4 font-bold text-slate-900">Welcome to Aura</h1>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Create a private sanctuary for just you and your partner.
          </p>
          
          <form onSubmit={handleSignUp} className="w-full max-w-xs space-y-4">
            <input
              type="text"
              placeholder="What's your name?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-rose-200 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-xl disabled:opacity-50 hover:bg-slate-800 transition-colors"
            >
              Begin Journey
            </button>
          </form>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="serif text-3xl mb-4 font-bold text-slate-900">Sync with Partner</h2>
          <p className="text-slate-500 mb-8 px-4">
            Share this code with your partner or enter theirs to connect your worlds.
          </p>
          
          <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-rose-200 mb-8 group cursor-pointer hover:border-rose-400 transition-all">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest block mb-2">Your Couple Code</span>
            <span className="text-4xl font-mono font-bold text-rose-500 tracking-tighter">AURA-X72</span>
          </div>

          <form onSubmit={handlePair} className="w-full max-w-xs space-y-4 mx-auto">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsJoining(false)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${!isJoining ? 'bg-slate-200' : 'text-slate-400'}`}
              >
                Waiting
              </button>
              <button
                type="button"
                onClick={() => setIsJoining(true)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${isJoining ? 'bg-slate-200' : 'text-slate-400'}`}
              >
                Enter Code
              </button>
            </div>

            {isJoining && (
              <input
                type="text"
                placeholder="Partner's Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-none ring-2 ring-slate-100 focus:ring-rose-200 outline-none transition-all"
              />
            )}

            <button
              type="submit"
              className="w-full py-4 bg-rose-500 text-white rounded-2xl font-semibold shadow-xl hover:bg-rose-600 transition-colors"
            >
              {isJoining ? 'Connect Now' : 'I Sent It'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Onboarding;

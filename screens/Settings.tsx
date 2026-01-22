import React from 'react';
import { UserProfile, CoupleData } from '../types';

interface SettingsProps {
  user: UserProfile;
  couple: CoupleData;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, couple, onLogout }) => {
  return (
    <div className="p-6">
      <header className="mb-8 pt-4 text-center">
        <div className="relative inline-block mb-4">
          <img src={user.avatar} className="w-24 h-24 rounded-[35%] border-4 border-white shadow-xl object-cover mx-auto" alt="Profile" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-rose-500 rounded-full border-4 border-slate-50 flex items-center justify-center text-[10px] text-white font-bold">
            EDIT
          </div>
        </div>
        <h1 className="serif text-2xl font-bold">{user.name}</h1>
        <p className="text-slate-400 text-sm">Connected with {couple.partner2.name}</p>
      </header>

      <div className="space-y-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl">💍</span>
            <div>
              <p className="text-sm font-bold text-slate-800">Our Anniversary</p>
              <p className="text-xs text-slate-400">{new Date(couple.anniversary).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          <button className="text-rose-500 text-xs font-bold">CHANGE</button>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl">🔒</span>
            <div>
              <p className="text-sm font-bold text-slate-800">Privacy & Pin</p>
              <p className="text-xs text-slate-400">Keep our space safe</p>
            </div>
          </div>
          <div className="w-10 h-5 bg-slate-200 rounded-full relative">
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl">🔔</span>
            <div>
              <p className="text-sm font-bold text-slate-800">Notifications</p>
              <p className="text-xs text-slate-400">Updates from partner</p>
            </div>
          </div>
          <div className="w-10 h-5 bg-rose-500 rounded-full relative">
            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <button 
          onClick={onLogout}
          className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl text-sm font-semibold hover:bg-slate-200 transition-colors"
        >
          Disconnect Account
        </button>
        <p className="text-[10px] text-center text-slate-300 font-bold tracking-widest uppercase">
          Aura v1.0.0 • Made with Love
        </p>
      </div>
    </div>
  );
};

export default Settings;

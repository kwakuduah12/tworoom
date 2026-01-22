
import React, { useState, useEffect } from 'react';
import { UserProfile, CoupleData } from '../types';
import { getDailyPrompt, generateRelationshipNote } from '../services/geminiService';
import { getTimeline } from '../services/storageService';

interface DashboardProps {
  user: UserProfile;
  couple: CoupleData;
}

const Dashboard: React.FC<DashboardProps> = ({ user, couple }) => {
  const [prompt, setPrompt] = useState('Loading daily spark...');
  const [note, setNote] = useState('');
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      const p = await getDailyPrompt();
      setPrompt(p);
      
      const timeline = getTimeline();
      const recentUpdates = timeline.slice(0, 3).map(e => e.content);
      const n = await generateRelationshipNote(recentUpdates);
      setNote(n);
    };

    const anniversaryDate = new Date(couple.anniversary);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - anniversaryDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);

    fetchContent();
  }, [couple]);

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8 pt-4">
        <div>
          <h1 className="serif text-3xl font-bold text-slate-900">Sanctuary</h1>
          <p className="text-slate-400 text-sm font-medium">Day {daysTogether} of us</p>
        </div>
        <div className="flex -space-x-3">
          <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Me" />
          <img src={couple.partner2.avatar} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Partner" />
        </div>
      </header>

      {/* Dynamic Visual: The Sanctuary Tree/Garden */}
      <div className="relative aspect-square w-full bg-gradient-to-br from-rose-50 to-orange-50 rounded-[2.5rem] mb-8 overflow-hidden flex items-center justify-center border border-white/50 shadow-inner">
        {/* Animated Background Elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-rose-200/40 rounded-full blur-3xl" />
        
        {/* The "Heart" of the Sanctuary */}
        <div className="z-10 text-center animate-in zoom-in duration-1000">
           <div className="w-48 h-48 bg-white/40 backdrop-blur-md rounded-full border border-white/60 flex flex-col items-center justify-center p-4 shadow-lg group hover:scale-105 transition-transform">
              <span className="text-5xl mb-2">🌿</span>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Growth</p>
              <p className="serif text-xl font-bold text-slate-800">Together</p>
           </div>
        </div>

        {/* Floaties representing memories */}
        <div className="absolute top-1/4 left-8 animate-bounce delay-75"><span className="text-xl">📸</span></div>
        <div className="absolute bottom-1/4 right-8 animate-bounce delay-300"><span className="text-xl">💬</span></div>
        <div className="absolute top-10 left-1/2 animate-pulse"><span className="text-2xl">☁️</span></div>
      </div>

      {/* Daily Spark */}
      <div className="bg-white p-6 rounded-3xl soft-shadow mb-6 border border-slate-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">✨</span>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Spark</span>
        </div>
        <p className="serif text-xl text-slate-800 mb-6 leading-relaxed italic">
          "{prompt}"
        </p>
        <button className="w-full py-3 bg-slate-900 text-white rounded-2xl text-sm font-semibold hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
          <span>Answer Together</span>
          <span className="opacity-50">→</span>
        </button>
      </div>

      {/* AI Love Note */}
      {note && (
        <div className="bg-rose-500 text-white p-6 rounded-3xl shadow-xl shadow-rose-200 mb-6 relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2 block">Thought for you</span>
          <p className="serif text-lg leading-relaxed relative z-10">
            {note}
          </p>
        </div>
      )}

      {/* Next Meetup Countdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-100 p-5 rounded-3xl border border-white/50 flex flex-col items-center justify-center">
          <span className="text-2xl mb-1">✈️</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Next Meetup</span>
          <span className="font-bold text-slate-800">Add Date</span>
        </div>
        <div className="bg-slate-100 p-5 rounded-3xl border border-white/50 flex flex-col items-center justify-center">
          <span className="text-2xl mb-1">🎁</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Next Milestone</span>
          <span className="font-bold text-slate-800">14 Days</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

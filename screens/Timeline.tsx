import React, { useState, useEffect } from 'react';
import { UserProfile, CoupleData, TimelineEntry } from '../types';
import * as storage from '../services/storageService';

interface TimelineProps {
  user: UserProfile;
  couple: CoupleData;
}

const Timeline: React.FC<TimelineProps> = ({ user, couple }) => {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [newPost, setNewPost] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    setEntries(storage.getTimeline());
  }, []);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const entry: TimelineEntry = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      content: newPost,
      timestamp: Date.now(),
      type: 'text',
      emoji: '💭'
    };

    storage.addTimelineEntry(entry);
    setEntries([entry, ...entries]);
    setNewPost('');
    setShowInput(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-6 py-6 border-b border-slate-50 flex justify-between items-center">
        <h1 className="serif text-3xl font-bold">Timeline</h1>
        <button 
          onClick={() => setShowInput(!showInput)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
            showInput ? 'bg-slate-800 rotate-45' : 'bg-rose-500'
          }`}
        >
          <span className="text-white text-2xl font-light">+</span>
        </button>
      </div>

      {showInput && (
        <div className="p-6 bg-slate-50 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handlePost}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?..."
              className="w-full h-32 p-4 rounded-2xl border-none ring-2 ring-slate-200 focus:ring-rose-200 outline-none transition-all resize-none mb-4"
            />
            <div className="flex justify-end gap-2">
              <button 
                type="button"
                onClick={() => setShowInput(false)}
                className="px-6 py-2 rounded-xl text-sm font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-2 bg-rose-500 text-white rounded-xl text-sm font-semibold shadow-md"
              >
                Post Update
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="px-6 py-10 relative">
        {/* Timeline Line */}
        <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-slate-100" />

        <div className="space-y-12">
          {entries.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-4xl block mb-4">✍️</span>
              <p className="text-slate-400 italic">No shared moments yet. Be the first to post!</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="relative pl-14 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* Avatar on timeline line */}
                <div className="absolute left-6 top-0 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-sm z-10">
                  <img 
                    src={entry.userId === user.id ? user.avatar : couple.partner2.avatar} 
                    className="w-full h-full object-cover" 
                    alt="User"
                  />
                </div>
                
                <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {entry.emoji && <span className="text-lg">{entry.emoji}</span>}
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {entry.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;

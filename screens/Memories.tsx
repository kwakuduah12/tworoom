
import React, { useState, useEffect } from 'react';
import { UserProfile, CoupleData, Memory } from '../types';
import * as storage from '../services/storageService';

interface MemoriesProps {
  user: UserProfile;
  couple: CoupleData;
}

const Memories: React.FC<MemoriesProps> = ({ user, couple }) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const saved = storage.getMemories();
    if (saved.length === 0) {
      // Add a placeholder memory
      const initial: Memory = {
        id: 'init',
        title: 'The Beginning',
        description: 'Where our private world started.',
        imageUrl: 'https://picsum.photos/seed/love/600/400',
        date: new Date().toLocaleDateString()
      };
      storage.addMemory(initial);
      setMemories([initial]);
    } else {
      // Fix: Changed setEntries to setMemories to correctly update the state
      setMemories(saved);
    }
  }, []);

  return (
    <div className="p-6">
      <header className="mb-8 pt-4">
        <h1 className="serif text-3xl font-bold">The Vault</h1>
        <p className="text-slate-400 text-sm">Every special chapter we've written.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {memories.map((memory) => (
          <div key={memory.id} className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform hover:-translate-y-1">
            <img src={memory.imageUrl} className="w-full h-80 object-cover" alt={memory.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="text-rose-300 text-[10px] font-bold uppercase tracking-widest block mb-1">
                {memory.date}
              </span>
              <h3 className="serif text-2xl font-bold text-white mb-2">{memory.title}</h3>
              <p className="text-white/80 text-sm line-clamp-2">{memory.description}</p>
            </div>

            <button className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md border border-white/40 rounded-full flex items-center justify-center text-white">
              <span>❤️</span>
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-10 py-6 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 group hover:border-rose-300 transition-all">
        <span className="text-2xl opacity-40 group-hover:scale-110 transition-transform">💎</span>
        <span className="text-sm font-bold text-slate-400 group-hover:text-rose-500">Seal a New Memory</span>
      </button>
    </div>
  );
};

export default Memories;

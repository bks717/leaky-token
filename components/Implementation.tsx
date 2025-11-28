import React, { useState } from 'react';
import { SAMPLE_C_CODE_LEAKY, SAMPLE_C_CODE_TOKEN } from '../types';

const Implementation: React.FC = () => {
  const [lang, setLang] = useState<'leaky' | 'token'>('leaky');

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">C Implementation</h2>
        <div className="flex bg-slate-200 rounded p-1">
          <button
            onClick={() => setLang('leaky')}
            className={`px-4 py-1 text-sm font-medium rounded transition-colors ${lang === 'leaky' ? 'bg-white shadow text-blue-600' : 'text-slate-600'}`}
          >
            Leaky Bucket
          </button>
          <button
            onClick={() => setLang('token')}
            className={`px-4 py-1 text-sm font-medium rounded transition-colors ${lang === 'token' ? 'bg-white shadow text-emerald-600' : 'text-slate-600'}`}
          >
            Token Bucket
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-slate-900 rounded-xl overflow-hidden shadow-2xl flex flex-col">
        <div className="bg-slate-800 px-4 py-2 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-xs text-slate-400 font-mono">main.c</span>
        </div>
        <pre className="p-6 text-sm font-mono text-slate-300 overflow-auto flex-1 leading-relaxed">
          {lang === 'leaky' ? SAMPLE_C_CODE_LEAKY : SAMPLE_C_CODE_TOKEN}
        </pre>
      </div>
    </div>
  );
};

export default Implementation;
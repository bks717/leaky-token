import React from 'react';
import { Cloud, Server, ShieldAlert } from 'lucide-react';

const Overview: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Traffic Shaping</h1>
        <p className="text-blue-100 text-lg leading-relaxed">
          A technique used in computer networks to control the amount and rate of traffic sent to the network. 
          It ensures a more uniform flow of traffic, preventing congestion and packet loss.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
            <Server size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Leaky Bucket</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Imagine a bucket with a small hole at the bottom. No matter how fast water is poured in, 
            it leaks out at a constant rate. If the bucket overflows, the extra water is lost.
          </p>
          <ul className="text-sm text-slate-500 space-y-2 bg-slate-50 p-3 rounded">
            <li>• converts bursty traffic into fixed rate</li>
            <li>• Output rate is constant</li>
            <li>• Drops packets if bucket full</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
            <Cloud size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Token Bucket</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Tokens are added to a bucket at a fixed rate. To send a packet, you need to consume a token. 
            If the bucket is full of tokens, new tokens are discarded, but you can save up tokens to send a "burst" of data later.
          </p>
          <ul className="text-sm text-slate-500 space-y-2 bg-slate-50 p-3 rounded">
            <li>• Allows bursty traffic</li>
            <li>• Output rate can vary</li>
            <li>• Flexible than Leaky Bucket</li>
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex gap-4">
          <ShieldAlert className="text-amber-600 shrink-0" />
          <div>
            <h3 className="font-bold text-amber-800 mb-1">Real World Examples</h3>
            <p className="text-amber-700 text-sm">
              <strong>ISPs:</strong> Limiting your home internet upload speed.<br/>
              <strong>Cloud APIs:</strong> Rate limiting API requests (e.g., 100 requests/minute).<br/>
              <strong>Video Streaming:</strong> Buffering video data to ensure smooth playback despite network jitter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
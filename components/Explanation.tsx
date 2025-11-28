import React from 'react';
import { ArrowDown, ArrowRight, MinusCircle, CheckCircle } from 'lucide-react';

const Explanation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      
      {/* Leaky Logic */}
      <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
          Leaky Bucket Logic
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Algorithm Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm">
              <li>Initialize <code className="bg-slate-100 px-1 rounded">bucket_size</code> to 0.</li>
              <li>For each second (time unit):
                <ul className="pl-6 list-disc mt-1 space-y-1">
                  <li>Add incoming packet size to <code className="bg-slate-100 px-1 rounded">bucket_size</code>.</li>
                  <li>If <code className="bg-slate-100 px-1 rounded">bucket_size > capacity</code>, drop the excess.</li>
                  <li>Transmit packets: <code className="bg-slate-100 px-1 rounded">min(bucket_size, outflow_rate)</code>.</li>
                  <li>Subtract transmitted amount from <code className="bg-slate-100 px-1 rounded">bucket_size</code>.</li>
                </ul>
              </li>
              <li>Repeat until no packets remain.</li>
            </ol>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col items-center justify-center">
             <div className="text-center space-y-2">
                <div className="bg-slate-200 px-3 py-1 rounded-full text-xs text-slate-600 inline-block">Incoming Packets</div>
                <ArrowDown className="mx-auto text-slate-400" />
                <div className="w-32 h-24 border-x-2 border-b-2 border-slate-400 rounded-b-lg relative bg-white flex items-end justify-center overflow-hidden">
                    <div className="w-full h-1/2 bg-blue-400/30 absolute bottom-0"></div>
                    <span className="relative z-10 text-xs text-slate-500 mb-1">Queue</span>
                </div>
                <ArrowDown className="mx-auto text-slate-400" />
                 <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs inline-block">Constant Output</div>
             </div>
          </div>
        </div>
      </section>

      {/* Token Logic */}
      <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-emerald-600 mb-6 flex items-center gap-2">
          <span className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
          Token Bucket Logic
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-800">Algorithm Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-600 text-sm">
              <li>Generate tokens at rate <code className="bg-slate-100 px-1 rounded">R</code> every second.</li>
              <li>Cap tokens at <code className="bg-slate-100 px-1 rounded">Capacity</code>.</li>
              <li>When a packet of size <code className="bg-slate-100 px-1 rounded">S</code> arrives:
                <ul className="pl-6 list-disc mt-1 space-y-1">
                  <li>Check if <code className="bg-slate-100 px-1 rounded">tokens >= S</code>.</li>
                  <li>If yes, send packet and remove <code className="bg-slate-100 px-1 rounded">S</code> tokens.</li>
                  <li>If no, queue packet (or drop if queue full).</li>
                </ul>
              </li>
            </ol>
          </div>

           <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col items-center justify-center">
             <div className="text-center space-y-2">
                <div className="flex justify-center gap-4">
                    <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Tokens</div>
                        <div className="w-16 h-16 border-2 border-emerald-400 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-600 text-xs font-bold">
                            Tokens
                        </div>
                    </div>
                     <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1">Packets</div>
                        <div className="w-16 h-16 border-2 border-slate-300 rounded flex items-center justify-center bg-white text-xs">
                            Buffer
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2 mt-2">
                    <ArrowDown className="text-slate-400 rotate-[-45deg]" />
                    <ArrowDown className="text-slate-400 rotate-[45deg]" />
                </div>
                 <div className="bg-emerald-600 text-white px-3 py-1 rounded text-xs inline-block">Bursty Output OK</div>
             </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-4">Key Differences</h3>
        <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm text-left">
                <thead className="bg-slate-100 text-slate-700">
                    <tr>
                        <th className="px-6 py-4">Feature</th>
                        <th className="px-6 py-4">Leaky Bucket</th>
                        <th className="px-6 py-4">Token Bucket</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">Output Rate</td>
                        <td className="px-6 py-4 text-slate-600">Constant (Fixed)</td>
                        <td className="px-6 py-4 text-slate-600">Variable (Allows Bursts)</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">Packet Handling</td>
                        <td className="px-6 py-4 text-slate-600">Packets processed at fixed rate</td>
                        <td className="px-6 py-4 text-slate-600">Packets processed if tokens exist</td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 font-medium text-slate-900">Analogy</td>
                        <td className="px-6 py-4 text-slate-600">Water leaking from a hole</td>
                        <td className="px-6 py-4 text-slate-600">Saving money (tokens) to buy items</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </section>

    </div>
  );
};

export default Explanation;
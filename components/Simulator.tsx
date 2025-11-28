import React, { useState, useEffect } from 'react';
import { runLeakyBucket, runTokenBucket } from '../utils/simulation';
import { SimulationStep, AlgorithmType } from '../types';
import { Play, RotateCcw, Droplets, Coins } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SimulatorProps {
  onRun: (algo: AlgorithmType, data: SimulationStep[], params: any) => void;
}

const Simulator: React.FC<SimulatorProps> = ({ onRun }) => {
  const [algo, setAlgo] = useState<AlgorithmType>('leaky');
  const [bucketSize, setBucketSize] = useState(10);
  const [rate, setRate] = useState(3); // Outflow for leaky, Token gen for token
  const [packetInput, setPacketInput] = useState("4, 2, 6, 8, 2");
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [simulationRan, setSimulationRan] = useState(false);

  const handleRun = () => {
    const packets = packetInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    let result: SimulationStep[] = [];
    
    const params = {
      bucketCapacity: bucketSize,
      outflowRate: rate,
      tokenRate: rate,
      packets
    };

    if (algo === 'leaky') {
      result = runLeakyBucket(params);
    } else {
      result = runTokenBucket(params);
    }

    setSteps(result);
    setSimulationRan(true);
    onRun(algo, result, params);
  };

  const handleReset = () => {
    setSteps([]);
    setSimulationRan(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Controls */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Select Algorithm</label>
              <div className="flex p-1 bg-slate-100 rounded-lg">
                <button 
                  onClick={() => setAlgo('leaky')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${algo === 'leaky' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Droplets size={16} /> Leaky Bucket
                </button>
                <button 
                  onClick={() => setAlgo('token')}
                  className={`flex-1 py-2 text-sm font-medium rounded-md flex items-center justify-center gap-2 transition-all ${algo === 'token' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Coins size={16} /> Token Bucket
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Bucket Capacity</label>
                <input 
                  type="number" 
                  value={bucketSize}
                  onChange={(e) => setBucketSize(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  {algo === 'leaky' ? 'Outflow Rate' : 'Token Gen Rate'}
                </label>
                <input 
                  type="number" 
                  value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Incoming Packets (per sec)
              </label>
              <input 
                type="text" 
                value={packetInput}
                onChange={(e) => setPacketInput(e.target.value)}
                placeholder="e.g. 4, 2, 5, 1"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
              />
              <p className="text-xs text-slate-400 mt-1">Comma separated integer values</p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleRun}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Play size={16} /> Run Simulation
              </button>
              <button 
                onClick={handleReset}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600"
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Visualization Placeholder / Stats */}
          <div className="flex-1 bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col justify-center items-center">
            {simulationRan ? (
               <div className="w-full h-64">
                 <h4 className="text-sm font-semibold text-slate-500 mb-2 text-center">Buffer Usage Over Time</h4>
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={steps}>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="time" />
                     <YAxis />
                     <Tooltip />
                     <Area type="monotone" dataKey="bufferAfter" stroke="#3b82f6" fill="#93c5fd" name="Buffer Level" />
                     {algo === 'token' && <Area type="monotone" dataKey="tokensAvailable" stroke="#10b981" fill="#6ee7b7" fillOpacity={0.3} name="Tokens" />}
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            ) : (
              <div className="text-center text-slate-400">
                <Play size={48} className="mx-auto mb-2 opacity-20" />
                <p>Enter parameters and run simulation<br/>to see visualization</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {simulationRan && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-semibold text-slate-800">Simulation Output Log</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Time (s)</th>
                  <th className="px-6 py-3">Incoming</th>
                  <th className="px-6 py-3">Buffer (Before)</th>
                  {algo === 'token' && <th className="px-6 py-3 text-emerald-600">Tokens Avail</th>}
                  <th className="px-6 py-3 text-blue-600">Sent</th>
                  <th className="px-6 py-3 text-red-600">Dropped</th>
                  <th className="px-6 py-3">Buffer (After)</th>
                  {algo === 'token' && <th className="px-6 py-3 text-emerald-600">Tokens Left</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {steps.map((step) => (
                  <tr key={step.time} className="hover:bg-slate-50">
                    <td className="px-6 py-3 font-mono">{step.time}</td>
                    <td className="px-6 py-3">{step.incoming}</td>
                    <td className="px-6 py-3">{step.bufferBefore}</td>
                    {algo === 'token' && <td className="px-6 py-3 font-mono text-emerald-600">{step.tokensAvailable}</td>}
                    <td className="px-6 py-3 font-bold text-blue-600">{step.sent}</td>
                    <td className="px-6 py-3 font-bold text-red-500">{step.dropped > 0 ? step.dropped : '-'}</td>
                    <td className="px-6 py-3 font-mono">{step.bufferAfter}</td>
                    {algo === 'token' && <td className="px-6 py-3 font-mono text-emerald-600">{step.tokensAfter}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Simulator;
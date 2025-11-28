import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Simulator from './components/Simulator';
import Explanation from './components/Explanation';
import Implementation from './components/Implementation';
import Report from './components/Report';
import { AlgorithmType, SimulationStep } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [lastSimulation, setLastSimulation] = useState<{
    algo: AlgorithmType;
    data: SimulationStep[];
    params: any;
  } | null>(null);

  const handleRun = (algo: AlgorithmType, data: SimulationStep[], params: any) => {
    setLastSimulation({ algo, data, params });
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'overview': return <Overview />;
      case 'simulation': return <Simulator onRun={handleRun} />;
      case 'explanation': return <Explanation />;
      case 'implementation': return <Implementation />;
      case 'report': return <Report lastRun={lastSimulation} />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar currentTab={currentTab} setTab={(tab) => { setCurrentTab(tab); setSidebarOpen(false); }} />

      {/* Mobile Header */}
      <div className="md:hidden fixed w-full bg-slate-900 text-white z-50 px-4 py-3 flex items-center justify-between shadow-md">
        <span className="font-bold">NetShape</span>
        <button onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <Menu />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden pt-16">
          <div className="bg-slate-900 h-full w-64 p-4">
            <Sidebar currentTab={currentTab} setTab={(tab) => { setCurrentTab(tab); setSidebarOpen(false); }} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-12 mt-12 md:mt-0 transition-all">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
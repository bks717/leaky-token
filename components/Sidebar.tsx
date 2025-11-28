import React from 'react';
import { LayoutDashboard, PlayCircle, Code2, BookOpen, FileText } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, setTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Project Overview', icon: LayoutDashboard },
    { id: 'simulation', label: 'Simulator', icon: PlayCircle },
    { id: 'explanation', label: 'Explanation', icon: BookOpen },
    { id: 'implementation', label: 'Code Implementation', icon: Code2 },
    { id: 'report', label: 'Final Report', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 overflow-y-auto hidden md:flex flex-col no-print">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight text-blue-400">NetShape</h1>
        <p className="text-xs text-slate-400 mt-1">Traffic Shaping Lab</p>
      </div>
      
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${currentTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded p-3">
          <p className="text-xs text-slate-400">Lab Mini-Project</p>
          <p className="text-xs text-slate-500 mt-1">Computer Networks</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
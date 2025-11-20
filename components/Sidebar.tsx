import React from 'react';
import { LayoutDashboard, CreditCard, Settings, PieChart, LogOut, Hexagon } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Vue Globale', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'reports', label: 'Rapports & Fisc', icon: PieChart },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="w-72 bg-white h-screen flex flex-col fixed left-0 top-0 border-r border-slate-200 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="bg-swiss-blue p-2.5 rounded-xl shadow-glow">
            <Hexagon className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Aura</h1>
          <p className="text-xs text-slate-400 font-medium">Édition Suisse</p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-200 font-medium text-sm ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-swiss-accent' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-colors text-sm font-medium">
          <LogOut className="w-5 h-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
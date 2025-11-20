import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Wallet, TrendingUp, RefreshCw, Info, ArrowUpRight, ArrowDownRight, Zap, Building2, User } from 'lucide-react';
import { CHART_DATA_MOCK } from '../constants';
import { Transaction } from '../types';
import { generateFinancialInsight } from '../services/geminiService';

interface DashboardProps {
  transactions: Transaction[];
  totalEur: number;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, totalEur }) => {
  const [insight, setInsight] = useState<string>("Analyse de votre patrimoine en cours...");
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [userMode, setUserMode] = useState<'personal' | 'business'>('personal');

  const refreshInsight = async () => {
    setLoadingInsight(true);
    const text = await generateFinancialInsight(transactions);
    setInsight(text);
    setLoadingInsight(false);
  };

  useEffect(() => {
    refreshInsight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  return (
    <div className="p-8 lg:p-12 ml-72 bg-slate-50 min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end mb-12 animate-[fadeIn_0.5s_ease-out] gap-6">
        <div>
            <div className="flex items-center gap-3 mb-2">
               <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Vue d'ensemble</h2>
               <span className="px-3 py-1 bg-swiss-blue/10 text-swiss-blue text-xs font-bold uppercase rounded-full tracking-wide">Live</span>
            </div>
            <p className="text-slate-500 font-medium text-lg">Bienvenue, voici votre situation financière consolidée.</p>
        </div>
        <div className="flex flex-col items-end">
            <div className="flex gap-2 mb-4 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                <button 
                    onClick={() => setUserMode('personal')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${userMode === 'personal' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <User size={14} /> Perso
                </button>
                <button 
                    onClick={() => setUserMode('business')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${userMode === 'business' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <Building2 size={14} /> Pro
                </button>
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                {userMode === 'personal' ? 'Patrimoine Net (Net Worth)' : 'Trésorerie Globale'}
            </p>
            <h3 className="text-6xl font-extrabold text-slate-900 tracking-tighter">
                {(totalEur || 0).toLocaleString('fr-CH', { style: 'currency', currency: 'CHF', maximumFractionDigits: 0 })}
            </h3>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100 hover:-translate-y-1 transition-transform duration-300 group">
          <div className="flex items-center justify-between mb-8">
            <div className="p-4 bg-blue-50 text-swiss-blue rounded-2xl group-hover:scale-110 transition-transform">
              <Wallet className="w-8 h-8" />
            </div>
            <span className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                <ArrowUpRight size={16} /> +12.5%
            </span>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Banque (Fiat)</p>
          <p className="text-4xl font-bold text-slate-900">CHF 45,230</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Disponible sur comptes courants</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100 hover:-translate-y-1 transition-transform duration-300 group">
          <div className="flex items-center justify-between mb-8">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8" />
            </div>
            <span className="flex items-center gap-1 text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                <ArrowUpRight size={16} /> +8.2%
            </span>
          </div>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2">Web3 (Crypto)</p>
          <p className="text-4xl font-bold text-slate-900">CHF 18,400</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Valorisés en temps réel</p>
        </div>

        <div className="bg-swiss-navy p-8 rounded-[2.5rem] shadow-glow text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 opacity-10 transform translate-x-8 -translate-y-8 transition-transform group-hover:scale-110">
             <TrendingUp size={140} />
          </div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                        <Info size={20} className="text-swiss-accent" />
                    </div>
                    <p className="text-swiss-accent text-sm font-bold uppercase tracking-widest">Conseiller IA</p>
                </div>
                <button onClick={refreshInsight} disabled={loadingInsight} className="text-slate-400 hover:text-white transition-colors">
                    <RefreshCw size={20} className={loadingInsight ? "animate-spin" : ""} />
                </button>
            </div>
            <p className="text-lg font-medium leading-relaxed text-slate-200 mt-auto italic">
              "{insight}"
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-2xl text-slate-900">Évolution du Patrimoine</h3>
            <div className="flex gap-6">
                <span className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wide"><div className="w-3 h-3 bg-swiss-blue rounded-full"></div> Total</span>
                <span className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-wide"><div className="w-3 h-3 bg-purple-400 rounded-full"></div> Crypto</span>
            </div>
          </div>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA_MOCK} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0052FF" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#0052FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13, fontWeight: 600}} tickFormatter={(value) => `k${value/1000}`} />
                <Tooltip 
                    contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', color: '#fff', padding: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'}}
                    itemStyle={{color: '#fff', fontWeight: 600, fontSize: '14px'}}
                    cursor={{stroke: '#e2e8f0', strokeWidth: 2}}
                />
                <Area type="monotone" dataKey="total" stroke="#0052FF" strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" activeDot={{r: 8, fill: '#0052FF', strokeWidth: 0}} />
                <Area type="monotone" dataKey="crypto" stroke="#c084fc" strokeWidth={3} fillOpacity={0} fill="transparent" strokeDasharray="8 8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-soft border border-slate-100 flex flex-col">
          <h3 className="font-bold text-2xl text-slate-900 mb-8">Diversification</h3>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{name: 'Sources', fiat: 65, crypto: 35}]} layout="vertical" barSize={60}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px'}} />
                    <Bar dataKey="fiat" stackId="a" fill="#0B1120" radius={[20, 0, 0, 20]} />
                    <Bar dataKey="crypto" stackId="a" fill="#00D1FF" radius={[0, 20, 20, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-6">
                <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center gap-3 text-slate-600 font-bold">
                        <div className="w-4 h-4 bg-swiss-navy rounded-full"></div> Fiat (Sécurisé)
                    </span>
                    <span className="font-extrabold text-slate-900 text-xl">65%</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="flex items-center gap-3 text-slate-600 font-bold">
                        <div className="w-4 h-4 bg-swiss-accent rounded-full"></div> Crypto (Volatile)
                    </span>
                    <span className="font-extrabold text-slate-900 text-xl">35%</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
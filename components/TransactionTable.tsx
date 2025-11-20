import React, { useState, useRef } from 'react';
import { Transaction, TransactionCategory, CurrencyCode, CurrencyType } from '../types';
import { Search, Filter, Wand2, FileJson, RefreshCw } from 'lucide-react';
import { categorizeTransactionsAI } from '../services/geminiService';

interface TransactionTableProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, setTransactions }) => {
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = (id: string, newCategory: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, category: newCategory } : t));
  };

  const handleRunAI = async () => {
    setIsAIProcessing(true);
    const updated = await categorizeTransactionsAI(transactions);
    setTransactions(updated);
    setIsAIProcessing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTimeout(() => {
        const newTx: Transaction = {
            id: `import-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            description: 'Transaction Importée (Simulée)',
            amount: Math.floor(Math.random() * 5000) - 2500,
            currency: CurrencyCode.EUR,
            type: CurrencyType.FIAT,
            category: TransactionCategory.UNCATEGORIZED,
            status: 'completed'
        };
        setTransactions(prev => [newTx, ...prev]);
    }, 800);
  };

  const handleBlockchainSync = () => {
    const newTx: Transaction = {
        id: `0x${Math.random().toString(16).slice(2, 10)}...`,
        date: new Date().toISOString().split('T')[0],
        description: 'Paiement Entrant (Wallet)',
        amount: parseFloat(Math.random().toFixed(3)),
        currency: CurrencyCode.ETH,
        type: CurrencyType.CRYPTO,
        category: TransactionCategory.UNCATEGORIZED,
        hash: `0x${Math.random().toString(16).slice(2)}`,
        status: 'completed'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(filter.toLowerCase()) || t.amount.toString().includes(filter);
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-10 ml-72 bg-slate-50/50 min-h-screen">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Transactions</h2>
            <p className="text-slate-500 mt-1 font-medium">Gérez, taguez et réconciliez vos entrées.</p>
        </div>
        <div className="flex gap-3">
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".csv" 
                onChange={handleFileUpload}
            />
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
            >
                <FileJson size={18} />
                Importer CSV
            </button>
            <button 
                onClick={handleBlockchainSync}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
            >
                <RefreshCw size={18} />
                Sync Chain
            </button>
            <button 
                onClick={handleRunAI}
                disabled={isAIProcessing}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                {isAIProcessing ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} />}
                Auto-Tag IA
            </button>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-soft border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-full border border-slate-200 w-full md:w-auto focus-within:border-swiss-blue focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <Search size={18} className="text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="bg-transparent border-none outline-none text-sm text-slate-700 w-64 font-medium placeholder:text-slate-400"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-3">
                <Filter size={18} className="text-slate-400" />
                <select 
                    className="bg-slate-50 border border-slate-200 text-sm text-slate-700 font-medium rounded-full px-4 py-2.5 outline-none cursor-pointer hover:bg-slate-100 transition-colors appearance-none"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="All">Toutes catégories</option>
                    {Object.values(TransactionCategory).map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase text-slate-500 font-bold tracking-wider">
                        <th className="px-8 py-5">Date</th>
                        <th className="px-8 py-5">Description</th>
                        <th className="px-8 py-5 text-right">Montant</th>
                        <th className="px-8 py-5">Source</th>
                        <th className="px-8 py-5">Catégorie</th>
                        <th className="px-8 py-5">Statut</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                    {filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                            <td className="px-8 py-5 font-medium text-slate-500">{tx.date}</td>
                            <td className="px-8 py-5">
                                <div className="font-semibold text-slate-900">{tx.description}</div>
                                {tx.hash && <div className="text-xs text-swiss-blue font-mono mt-1 opacity-80">{tx.hash}</div>}
                            </td>
                            <td className={`px-8 py-5 text-right font-mono font-bold text-base ${tx.amount > 0 ? 'text-green-600' : 'text-slate-900'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount} <span className="text-xs text-slate-400 font-sans font-medium ml-1">{tx.currency}</span>
                            </td>
                            <td className="px-8 py-5">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${tx.type === CurrencyType.CRYPTO ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                                    {tx.type === CurrencyType.CRYPTO ? '⛓️' : '🏦'} {tx.type}
                                </span>
                            </td>
                            <td className="px-8 py-5">
                                <div className="relative group/select">
                                    <select 
                                        className="appearance-none bg-transparent hover:bg-white border border-transparent hover:border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer outline-none transition-all font-medium text-slate-600 w-full"
                                        value={tx.category}
                                        onChange={(e) => handleCategoryChange(tx.id, e.target.value)}
                                    >
                                        {Object.values(TransactionCategory).map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                            <td className="px-8 py-5">
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                                    Complété
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        {filteredTransactions.length === 0 && (
            <div className="p-16 text-center text-slate-400">
                <p className="font-medium">Aucune transaction trouvée.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
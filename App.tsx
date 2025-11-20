import React, { useState, useMemo } from 'react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TransactionTable from './components/TransactionTable';
import { MOCK_TRANSACTIONS, EXCHANGE_RATES } from './constants';
import { Transaction, CurrencyCode, TransactionCategory } from './types';

function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  // Calculated State
  const { totalEur } = useMemo(() => {
    let total = 0;
    transactions.forEach(tx => {
        const rate = EXCHANGE_RATES[tx.currency] || 1;
        // In a real app, we would sum balances, not just transaction history.
        // For this MVP, we simulate a base balance + transaction summation
        // Assuming initial bank balance is 40,000 EUR and Initial Crypto is 15,000 EUR value
        total += tx.amount * rate;
    });
    // Add Base mock balance for visual realism
    return { totalEur: total + 55000 }; 
  }, [transactions]);

  if (view === 'landing') {
    return <LandingPage onEnterApp={() => setView('app')} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 w-full">
        {activeTab === 'dashboard' && (
            <Dashboard transactions={transactions} totalEur={totalEur} />
        )}
        {activeTab === 'transactions' && (
            <TransactionTable transactions={transactions} setTransactions={setTransactions} />
        )}
        {activeTab !== 'dashboard' && activeTab !== 'transactions' && (
            <div className="flex items-center justify-center h-screen ml-64 text-slate-400">
                Feature coming soon in MVP v2
            </div>
        )}
      </main>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WalletGenerator from './components/WalletGenerator';
import BalanceChecker from './components/BalanceChecker';
import WalletInfo from './components/WalletInfo';
import WalletHistory from './components/WalletHistory';

function App() {
  const [wallet, setWallet] = useState(null);
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-polygon-dark text-white p-6">
            <h1 className="text-3xl font-bold">Polygon USDT Wallet Manager</h1>
            <p className="mt-2">Generate Polygon addresses and check USDT balances</p>
          </div>
          
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('generate')}
                className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'generate'
                    ? 'border-polygon-purple text-polygon-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Generate Wallet
              </button>
              <button
                onClick={() => setActiveTab('balance')}
                className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'balance'
                    ? 'border-polygon-purple text-polygon-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Check Balance
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-polygon-purple text-polygon-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Wallet History
              </button>
            </nav>
          </div>
          
          <div className="p-6">
            {wallet && activeTab === 'generate' && (
              <WalletInfo wallet={wallet} />
            )}
            
            {activeTab === 'generate' ? (
              <WalletGenerator setWallet={setWallet} />
            ) : activeTab === 'balance' ? (
              <BalanceChecker />
            ) : (
              <WalletHistory />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App; 
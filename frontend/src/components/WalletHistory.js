import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WalletHistory = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [balanceHistory, setBalanceHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get('/api/wallets');
      
      if (response.data.success) {
        setWallets(response.data.wallets);
      } else {
        setError('Failed to fetch wallets: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      setError('Error fetching wallets: ' + (error.response?.data?.error || error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const fetchBalanceHistory = async (address) => {
    setHistoryLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`/api/balance-history/${address}`);
      
      if (response.data.success) {
        setBalanceHistory(response.data.history);
      } else {
        setError('Failed to fetch balance history: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      setError('Error fetching balance history: ' + (error.response?.data?.error || error.message || 'Unknown error'));
    } finally {
      setHistoryLoading(false);
    }
  };

  const selectWallet = (wallet) => {
    setSelectedWallet(wallet);
    fetchBalanceHistory(wallet.address);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="mt-6 p-6 bg-polygon-light rounded-lg border border-gray-200">
        <div className="text-center">
          <p className="text-gray-700">Loading wallets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="bg-polygon-light p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-polygon-dark mb-4">Wallet History</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {wallets.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-700">No wallets found. Generate a wallet first.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4">
              <h3 className="font-medium text-gray-900 mb-2">Your Wallets</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {wallets.map((wallet) => (
                    <li 
                      key={wallet.id} 
                      className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedWallet?.id === wallet.id ? 'bg-polygon-purple bg-opacity-10' : ''
                      }`}
                      onClick={() => selectWallet(wallet)}
                    >
                      <div className="font-mono text-sm break-all">{wallet.address}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Created: {formatDate(wallet.created_at)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-8">
              {selectedWallet ? (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Balance History</h3>
                  
                  {historyLoading ? (
                    <div className="text-center py-4">
                      <p className="text-gray-700">Loading balance history...</p>
                    </div>
                  ) : balanceHistory.length === 0 ? (
                    <div className="text-center py-4 border border-gray-200 rounded-lg">
                      <p className="text-gray-700">No balance checks found for this wallet.</p>
                    </div>
                  ) : (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Balance (USDT)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {balanceHistory.map((check) => (
                            <tr key={check.id}>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(check.checked_at)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">
                                {check.balance.toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-6 text-center">
                  <p className="text-gray-700">Select a wallet to view its balance history.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletHistory; 
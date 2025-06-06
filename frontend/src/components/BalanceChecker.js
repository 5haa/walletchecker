import React, { useState } from 'react';
import axios from 'axios';

const BalanceChecker = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const checkBalance = async (e) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError('Please enter a wallet address');
      return;
    }
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await axios.post('/api/check-balance', { address });
      
      if (response.data.success) {
        setResult({
          address: response.data.address,
          balance: response.data.balance
        });
      } else {
        setError('Failed to check balance: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      setError('Error checking balance: ' + (error.response?.data?.error || error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="bg-polygon-light p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-polygon-dark mb-4">Check USDT Balance</h2>
        <p className="text-gray-700 mb-6">
          Enter a Polygon wallet address to check its USDT balance.
        </p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={checkBalance}>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-polygon-purple"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-polygon-purple hover:bg-opacity-90'} 
              transition-colors focus:outline-none focus:ring-2 focus:ring-polygon-purple focus:ring-opacity-50`}
          >
            {loading ? 'Checking...' : 'Check Balance'}
          </button>
        </form>
        
        {result && (
          <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-900">Balance Result</h3>
            <div className="mt-2 grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Address:</span>
                <span className="text-gray-900 font-mono text-sm break-all">
                  {result.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">USDT Balance:</span>
                <span className="text-gray-900 font-semibold">
                  {result.balance.toFixed(2)} USDT
                </span>
              </div>
              <div className="mt-2 text-right">
                <a
                  href={`https://polygonscan.com/address/${result.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-polygon-purple hover:underline"
                >
                  View on Polygonscan →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceChecker; 
import React, { useState } from 'react';
import axios from 'axios';

const WalletGenerator = ({ setWallet }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateWallet = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/generate-address');
      
      if (response.data.success) {
        setWallet({
          address: response.data.address,
          privateKey: response.data.private_key
        });
      } else {
        setError('Failed to generate wallet: ' + (response.data.error || 'Unknown error'));
      }
    } catch (error) {
      setError('Error generating wallet: ' + (error.response?.data?.error || error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="bg-polygon-light p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-polygon-dark mb-4">Generate Polygon Wallet</h2>
        <p className="text-gray-700 mb-6">
          Click the button below to generate a new Polygon wallet address for USDT transactions.
          The generated wallet will be compatible with all Polygon network tokens.
        </p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <button
          onClick={generateWallet}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white 
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-polygon-purple hover:bg-opacity-90'} 
            transition-colors focus:outline-none focus:ring-2 focus:ring-polygon-purple focus:ring-opacity-50`}
        >
          {loading ? 'Generating...' : 'Generate New Wallet'}
        </button>
        
        <div className="mt-4 text-sm text-gray-500">
          <p className="font-semibold">Security Note:</p>
          <p>
            In a production environment, wallet generation should happen client-side,
            and private keys should never be exposed or transmitted over the network.
            This demo is for educational purposes only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletGenerator; 
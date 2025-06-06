import React, { useState } from 'react';

const WalletInfo = ({ wallet }) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  // Function to truncate address/key for display
  const truncateString = (str, firstChars = 6, lastChars = 4) => {
    if (!str) return '';
    return `${str.substring(0, firstChars)}...${str.substring(str.length - lastChars)}`;
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${type} copied to clipboard!`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="mb-6 p-4 bg-white border border-green-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-green-700">Wallet Generated!</h3>
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          New
        </span>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Wallet Address
          </label>
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-l font-mono text-sm break-all overflow-hidden w-full border border-r-0 border-gray-300">
              {wallet.address}
            </div>
            <button
              onClick={() => copyToClipboard(wallet.address, 'Address')}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-r border border-gray-300"
              title="Copy to clipboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
          <div className="mt-1 text-right">
            <a
              href={`https://polygonscan.com/address/${wallet.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-polygon-purple hover:underline"
            >
              View on Polygonscan →
            </a>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Private Key
          </label>
          <div className="flex items-center">
            <div className="bg-gray-100 p-2 rounded-l font-mono text-sm break-all overflow-hidden w-full border border-r-0 border-gray-300">
              {showPrivateKey ? wallet.privateKey : '•'.repeat(64)}
            </div>
            <button
              onClick={() => copyToClipboard(wallet.privateKey, 'Private Key')}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-r border border-gray-300"
              title="Copy to clipboard"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
          <div className="mt-1 flex justify-between items-center">
            <button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="text-xs text-polygon-purple hover:underline focus:outline-none"
            >
              {showPrivateKey ? 'Hide Private Key' : 'Show Private Key'}
            </button>
            <div className="text-xs text-red-600">
              NEVER share this with anyone!
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 bg-yellow-50 p-3 rounded border border-yellow-200">
        <p className="font-semibold text-yellow-700">Important:</p>
        <p className="mt-1">
          Save your private key securely. If lost, you cannot recover your funds.
          This key controls all assets in this wallet.
        </p>
      </div>
    </div>
  );
};

export default WalletInfo; 
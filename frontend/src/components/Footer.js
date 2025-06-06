import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-polygon-dark text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Polygon USDT Wallet Manager</p>
            <p className="text-sm text-gray-400 mt-1">
              Disclaimer: This is a demo application. Never share your private keys.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://polygon.technology/developers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Polygon Docs
            </a>
            <a
              href="https://tether.to/en/transparency"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              USDT Info
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
import React from 'react';
import polygonLogo from '../assets/polygon-logo.svg';

const Header = () => {
  return (
    <header className="bg-polygon-dark text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-2 w-8 h-8">
            {/* Using inline SVG as fallback */}
            <svg viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.0001 0L0 13.0696V19.6044L19.0001 32.674L38 19.6044V13.0696L19.0001 0Z" fill="#8247E5"/>
              <path d="M19.0001 0L0 13.0696H7.59992L19.0001 6.53479L30.3999 13.0696H38L19.0001 0Z" fill="#8247E5"/>
              <path d="M19.0001 26.1391L7.59992 19.6044H0L19.0001 32.674L38 19.6044H30.3999L19.0001 26.1391Z" fill="#8247E5"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold">Polygon USDT Wallet</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="https://polygon.technology/" target="_blank" rel="noopener noreferrer" className="hover:text-polygon-purple transition-colors">Polygon</a></li>
            <li><a href="https://polygonscan.com/token/0xc2132d05d31c914a87c6611c10748aeb04b58e8f" target="_blank" rel="noopener noreferrer" className="hover:text-polygon-purple transition-colors">USDT on Polygon</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
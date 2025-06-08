import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import LoginButton from './LoginButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Student Life', path: '/student-life' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-black bg-opacity-20 backdrop-blur-md border-b border-white border-opacity-20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-bold text-xl">Sengani Girls School</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-link text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path ? 'active text-yellow-300' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <LoginButton />
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-300 focus:outline-none focus:text-yellow-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black bg-opacity-30 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-link block text-white hover:text-yellow-300 px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path ? 'active text-yellow-300' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <LoginButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


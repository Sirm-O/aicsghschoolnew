import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (dropdown) => {
    setDropdownOpen(dropdownOpen === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setDropdownOpen(null);
  };

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { 
      name: 'Academics', 
      path: '/academics',
      dropdown: [
        { name: 'Curriculum', path: '/academics' },
        { name: 'Faculty', path: '/faculty' },
        { name: 'Admissions', path: '/admissions' }
      ]
    },
    { name: 'Student Life', path: '/student-life' },
    { 
      name: 'News & Events', 
      path: '/news',
      dropdown: [
        { name: 'Latest News', path: '/news' },
        { name: 'School Events', path: '/events' },
        { name: 'Gallery', path: '/gallery' }
      ]
    },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                Sengani Girls School
              </h1>
              <p className="text-xs text-gray-300 hidden sm:block">Excellence in Education</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        item.dropdown.some(subItem => isActive(subItem.path))
                          ? 'text-yellow-400 bg-yellow-400/10'
                          : 'text-white hover:text-yellow-400 hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${
                        dropdownOpen === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {dropdownOpen === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg shadow-xl py-2 z-50">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            onClick={closeDropdown}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              isActive(subItem.path)
                                ? 'text-yellow-400 bg-yellow-400/10'
                                : 'text-white hover:text-yellow-400 hover:bg-white/10'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'text-yellow-400 bg-yellow-400/10'
                        : 'text-white hover:text-yellow-400 hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            
            {/* CMS Login Button */}
            <a
              href="/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-400 text-purple-900 rounded-lg font-medium hover:scale-105 transition-transform"
            >
              Admin Login
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="space-y-2">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                          item.dropdown.some(subItem => isActive(subItem.path))
                            ? 'text-yellow-400 bg-yellow-400/10'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          dropdownOpen === item.name ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {/* Mobile Dropdown */}
                      {dropdownOpen === item.name && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              onClick={() => {
                                setIsOpen(false);
                                closeDropdown();
                              }}
                              className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                isActive(subItem.path)
                                  ? 'text-yellow-400 bg-yellow-400/10'
                                  : 'text-white hover:bg-white/10'
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? 'text-yellow-400 bg-yellow-400/10'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CMS Login */}
              <a
                href="/admin/"
                target="_blank"
                rel="noopener noreferrer"
                className="block mx-4 mt-4 px-4 py-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-purple-900 rounded-lg font-medium text-center hover:scale-105 transition-transform"
              >
                Admin Login
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Overlay for mobile dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden" 
          onClick={closeDropdown}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;


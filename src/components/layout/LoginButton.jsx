import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleLogin, handleLogout, getCurrentUser } from '../../lib/netlifyIdentity';

const LoginButton = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined' && window.netlifyIdentity) {
      const currentUser = getCurrentUser();
      setUser(currentUser);

      // Listen for login/logout events
      window.netlifyIdentity.on('login', (user) => setUser(user));
      window.netlifyIdentity.on('logout', () => setUser(null));
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!user) {
    return (
      <button
        onClick={handleLogin}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all"
      >
        Login to CMS
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all"
      >
        <span>{user.email}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white bg-opacity-10 backdrop-blur-md rounded-md shadow-lg overflow-hidden z-50 border border-white border-opacity-20">
          <div className="py-2">
            <Link
              to="/admin"
              className="block px-4 py-2 text-white hover:bg-white hover:bg-opacity-10"
              onClick={() => setIsOpen(false)}
            >
              CMS Dashboard
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-white hover:bg-opacity-10"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginButton;


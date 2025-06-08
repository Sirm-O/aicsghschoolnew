import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-bold text-xl">Sengani Girls School</span>
            </div>
            <p className="text-gray-300 text-sm">
              Empowering young women through quality education and holistic development since 1985.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-yellow-300 text-sm">About Us</a></li>
              <li><a href="/academics" className="text-gray-300 hover:text-yellow-300 text-sm">Academics</a></li>
              <li><a href="/student-life" className="text-gray-300 hover:text-yellow-300 text-sm">Student Life</a></li>
              <li><a href="/gallery" className="text-gray-300 hover:text-yellow-300 text-sm">Gallery</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-yellow-300" />
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-yellow-300" />
                <span className="text-gray-300 text-sm">info@senganigirlsschool.edu</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-yellow-300" />
                <span className="text-gray-300 text-sm">Sengani Village, Tamil Nadu</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="#" className="social-icon">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="#" className="social-icon">
                <Twitter size={20} className="text-white" />
              </a>
              <a href="#" className="social-icon">
                <Instagram size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Sengani Girls School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Heart, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-neutral-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Book size={24} className="text-indigo-400" />
              <span className="font-serif text-xl font-medium text-white">Life Story</span>
            </Link>
            <p className="text-neutral-400 mb-6">
              Preserve your family's legacy through beautiful digital stories.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            &copy; {currentYear} Life Story. All rights reserved.
          </p>
          <p className="text-neutral-400 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="text-red-500 mx-1" /> for families everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
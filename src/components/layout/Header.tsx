import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Book size={24} className="text-indigo-600" />
          <span className="font-serif text-xl font-medium">Life Story</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-neutral-700 hover:text-indigo-600 transition-colors duration-200"
          >
            How it works
          </Link>
          <Link
            to="/"
            className="text-neutral-700 hover:text-indigo-600 transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            to="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Sign in
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-neutral-700 hover:text-indigo-600 transition-colors duration-200 py-2"
            >
              How it works
            </Link>
            <Link
              to="/"
              className="text-neutral-700 hover:text-indigo-600 transition-colors duration-200 py-2"
            >
              Pricing
            </Link>
            <Link
              to="/"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 text-center"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
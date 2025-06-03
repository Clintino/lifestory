import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book } from 'lucide-react';
import Button from './Button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-sm py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Book size={28} className="text-primary" />
            <span className="font-serif text-2xl font-medium">Life Story</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant="text"
              size="sm"
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="primary"
              size="sm"
              to="/choose-relationship"
            >
              Start today
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
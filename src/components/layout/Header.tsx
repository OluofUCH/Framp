"use client";

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Update time every second
    const timer = setInterval(() => {
      const now = new Date();
      const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
      setCurrentDateTime(formattedDateTime);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToProduct = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const productSection = document.getElementById('product');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };
  const scrollToFAQ = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const productSection = document.getElementById('FAQ');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const logoSrc = theme === 'dark' ? "/images/logo-dark.svg" : "/images/logo.svg";
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b border-black/10 backdrop-blur-md bg-white/80">
        <div className="flex justify-between items-center w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-3 max-w-7xl mx-auto">
          <div className="Logo flex items-center">
            <div className="h-7 sm:h-8 md:h-10 w-[120px]" /> {/* Logo placeholder */}
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 backdrop-blur-md bg-white/80 dark:bg-black/80">
      {/* UTC Time and User Info Bar */}
     

      {/* Main Header */}
      <div className="flex justify-between items-center w-full px-3 sm:px-6 lg:px-8 py-2 sm:py-3 max-w-7xl mx-auto">
        <div className="Logo flex items-center">
          <Link href="/">
            {mounted && (
              <Image 
                src={logoSrc} 
                alt="Framp" 
                width={120} 
                height={40} 
                className="h-7 sm:h-8 md:h-10 w-auto"
              />
            )}
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6 text-sm lg:text-base font-medium">
            <Link href="/" className='text-black/80 dark:text-white/80 hover:text-[#7b77b9] dark:hover:text-[#9f9ddb] transition-colors'>
              Home
            </Link>
            <Link href="/about" className='text-black/80 dark:text-white/80 hover:text-[#7b77b9] dark:hover:text-[#9f9ddb] transition-colors'>
              About
            </Link>
            <a 
              href="/#product" 
              onClick={scrollToProduct}
              className='text-black/80 dark:text-white/80 hover:text-[#7b77b9] dark:hover:text-[#9f9ddb] transition-colors'
            >
              Product
            </a>
            <a 
              href="/#FAQ" 
              onClick={scrollToFAQ}
              className='text-black/80 dark:text-white/80 hover:text-[#7b77b9] dark:hover:text-[#9f9ddb] transition-colors'
            >
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3 border-l border-black/10 dark:border-white/10 pl-6">
            {mounted && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleTheme}
                className="rounded-full text-black dark:text-white h-9 w-9"
              >
                {theme === 'dark' ? 
                  <FaSun className="h-5 w-5" /> : 
                  <FaMoon className="h-5 w-5" />
                }
              </Button>
            )}

            <Button 
              asChild 
              className="text-sm px-4 h-9 bg-[#7b77b9] hover:bg-[#7b77b9]/90 text-white"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden rounded-full text-black dark:text-white h-8 w-8 sm:h-9 sm:w-9"
        >
          {isMenuOpen ? (
            <RiCloseLine className="h-6 w-6" />
          ) : (
            <RiMenu4Line className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden fixed inset-x-0 bg-white/95 dark:bg-black/95 backdrop-blur-md
        transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'top-[53px] sm:top-[61px] opacity-100 visible' : '-top-[100vh] opacity-0 invisible'}
        border-b border-black/10 dark:border-white/10
      `}>
        <div className="px-4 py-6 space-y-6">
          {/* User Info & DateTime */}
         

          {/* Navigation Links */}
          <div className="space-y-4 text-lg border-b border-black/10 dark:border-white/10 pb-6">
            <Link 
              href="/" 
              className='block text-black/80 dark:text-white/80 hover:text-[#7b77b9] dark:hover:text-[#9f9ddb] transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className='block text-black/80 dark:text-white/80 hover:text-[#7b77b9] dark:hover:text-[#9f9ddb] transition-colors'
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <a 
              href="#product" 
              onClick={scrollToProduct}
              className='block text-black/80 dark:text-white/80 hover:text-[#7b77b9] dark:hover:text-[#9f9ddb] transition-colors'
            >
              Product
            </a>
            <a 
              href="#FAQ" 
              onClick={scrollToFAQ}
              className='block text-black/80 dark:text-white/80 hover:text-[#7b77b9] dark:hover:text-[#9f9ddb] transition-colors'
            >
              FAQ
            </a>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-black/80 dark:text-white/80">
                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </span>
              {mounted && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleTheme}
                  className="rounded-full text-black dark:text-white h-9 w-9"
                >
                  {theme === 'dark' ? 
                    <FaSun className="h-5 w-5" /> : 
                    <FaMoon className="h-5 w-5" />
                  }
                </Button>
              )}
            </div>

            <Button 
              asChild 
              className="w-full py-2 px-4 h-12 bg-[#7b77b9] hover:bg-[#7b77b9]/90 text-white text-base"
            >
              <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
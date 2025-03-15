import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-4 z-50 flex justify-center w-full px-4 py-2">
      <header
        className={`flex items-center justify-between w-full max-w-6xl mx-auto rounded-xl px-6 py-3 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-xl font-bold text-cyan-600">
          KEYS<span className="text-cyan-900">Experties</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        

        {/* Actions */}
        <div className="flex items-center space-x-2">
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/autodesk/">Autodesk</NavLink>
          <NavLink href="/contact/">Contact</NavLink>
        </nav>
          
          
          {/* Mobile menu button */}
          <button 
            className="p-2 text-gray-700 md:hidden" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden pt-20">
          <div className="absolute inset-0 bg-black/20" onClick={toggleMenu}></div>
          <div className="relative w-4/5 max-w-sm bg-white p-6 overflow-y-auto h-full shadow-xl">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink href="/" onClick={toggleMenu}>Home</MobileNavLink>
              <MobileNavLink href="/products" onClick={toggleMenu}>Products</MobileNavLink>
              <MobileNavLink href="/autodesk" onClick={toggleMenu}>Autodesk</MobileNavLink>
              <MobileNavLink href="/microsoft" onClick={toggleMenu}>Microsoft</MobileNavLink>
              <MobileNavLink href="/adobe" onClick={toggleMenu}>Adobe</MobileNavLink>
              <MobileNavLink href="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

const NavLink = ({ href, children }) => (
  <a 
    href={href} 
    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-cyan-600 rounded-md transition-colors"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, onClick, children }) => (
  <a 
    href={href} 
    className="px-4 py-3 text-base font-medium text-gray-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg block transition-colors"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Header;
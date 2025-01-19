import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged Out Successfully");
    localStorage.clear();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 py-4 px-4 sm:px-6 lg:px-8">
      <Toaster richColors />
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold neon-text font-Brittany">
          <Link to="/">Neon Loop</Link>
        </div>
        
        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="lg:hidden text-white">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLinks />
          <AuthButtons token={token} handleLogout={handleLogout} />
        </div>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4">
          <NavLinks mobile />
          <div className="mt-4">
            <AuthButtons token={token} handleLogout={handleLogout} mobile />
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks = ({ mobile = false }) => (
  <div className={`${mobile ? 'flex flex-col space-y-4' : 'flex items-center space-x-6'}`}>
    <a
      href="#products"
      className="hover:text-[#0077be] transition-colors subtle-neon-text"
    >
      Products
    </a>
    <a
      href="#about"
      className="hover:text-[#0077be] transition-colors subtle-neon-text"
    >
      About
    </a>
    <a
      href="#contact"
      className="hover:text-[#0077be] transition-colors subtle-neon-text"
    >
      Contact
    </a>
  </div>
);

const AuthButtons = ({ token, handleLogout, mobile = false }) => (
  <div className={`${mobile ? 'flex flex-col space-y-4' : 'flex items-center space-x-4'}`}>
    {token !== null ? (
      <>
        <Link to="/cart">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-700"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </Link>
        <Button
          variant="outline"
          className="text-black w-full"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </>
    ) : (
      <>
        <Link to="/signin" className="w-full">
          <Button
            variant="destructive"
            className="bg-gray-900 text-base w-full"
          >
            SignIn
          </Button>
        </Link>
        <Link to="/signup" className="w-full">
          <Button variant="outline" className="text-black w-full">
            Sign UP
          </Button>
        </Link>
      </>
    )}
  </div>
);

export default Header;


import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="mb-4 sm:mb-0 subtle-neon-text">
          &copy; 2023 NeonWave. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a
            href="#"
            className="hover:text-[#0077be] transition-colors subtle-neon-text"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-[#0077be] transition-colors subtle-neon-text"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

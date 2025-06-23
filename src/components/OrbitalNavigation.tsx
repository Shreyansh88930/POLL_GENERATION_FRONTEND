import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface OrbitalNavigationProps {
  currentPath?: string;
}

const OrbitalNavigation: React.FC<OrbitalNavigationProps> = ({ currentPath }) => {
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/host', label: 'Classic Dashboard', angle: 0 },
    { path: '/host/orbital', label: 'Orbital Dashboard', angle: 90 },
  ];

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4">
      <div className="flex items-center space-x-1 sm:space-x-2 bg-black/20 backdrop-blur-xl rounded-full p-1 sm:p-2 border border-white/10">
        {navigationItems.map((item) => (
          <motion.button
            key={item.path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(item.path)}
            className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              currentPath === item.path
                ? 'bg-purple-500 text-white'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {item.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default OrbitalNavigation;
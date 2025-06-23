import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Mic,
  Brain,
  Users,
  Trophy,
  FileText,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onToggle }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/host', icon: Home, label: 'Dashboard' },
    { path: '/host/audio', icon: Mic, label: 'Audio Capture' },
    { path: '/host/ai-questions', icon: Brain, label: 'AI Questions' },
    { path: '/host/participants', icon: Users, label: 'Participants' },
    { path: '/host/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/host/reports', icon: FileText, label: 'Reports' },
    { path: '/host/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: isOpen ? 0 : -100,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 z-40 lg:translate-x-0 lg:opacity-100"
      >
        <div className="p-4 sm:p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3 mb-6 sm:mb-8"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-base sm:text-lg">Poll System</h1>
              <p className="text-gray-400 text-xs sm:text-sm">AI-Powered</p>
            </div>
          </motion.div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => onToggle && onToggle()}
                    className={`flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm sm:text-base">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-2 h-2 bg-primary-400 rounded-full"
                      />
                    )}
                  </NavLink>
                </motion.div>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Logout</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
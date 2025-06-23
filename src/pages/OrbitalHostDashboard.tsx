import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Mic, 
  Users, 
  Trophy, 
  FileText, 
  BarChart3, 
  Settings,
  Play,
  Pause,
  Volume2,
  Activity,
  Zap,
  Command
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GlassCard from '../components/GlassCard';

const OrbitalHostDashboard = () => {
  const { user } = useAuth();
  const [selectedOrbit, setSelectedOrbit] = useState<string | null>(null);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [showCommandBar, setShowCommandBar] = useState(false);
  const [audioWaveform, setAudioWaveform] = useState<number[]>(Array(20).fill(0));

  // Orbital features configuration
  const orbitalFeatures = [
    {
      id: 'audio',
      title: 'Audio Capture',
      icon: Mic,
      angle: 0,
      radius: 200,
      color: 'from-red-500 to-pink-600',
      description: 'Real-time transcription',
      stats: { active: isAudioActive, value: '2.3s avg' }
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: BarChart3,
      angle: 72,
      radius: 200,
      color: 'from-blue-500 to-cyan-600',
      description: 'Performance insights',
      stats: { active: true, value: '87.5% accuracy' }
    },
    {
      id: 'participants',
      title: 'Participants',
      icon: Users,
      angle: 144,
      radius: 200,
      color: 'from-green-500 to-emerald-600',
      description: 'Manage users',
      stats: { active: true, value: '342 active' }
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      icon: Trophy,
      angle: 216,
      radius: 200,
      color: 'from-yellow-500 to-orange-600',
      description: 'Top performers',
      stats: { active: true, value: 'Top: 95.1%' }
    },
    {
      id: 'reports',
      title: 'Reports',
      icon: FileText,
      angle: 288,
      radius: 200,
      color: 'from-purple-500 to-indigo-600',
      description: 'Export data',
      stats: { active: false, value: '1,247 polls' }
    }
  ];

  // Secondary orbit for settings and AI
  const secondaryOrbit = [
    {
      id: 'ai-brain',
      title: 'AI Brain',
      icon: Brain,
      angle: 45,
      radius: 120,
      color: 'from-violet-500 to-purple-600',
      description: 'Question generation',
      stats: { active: true, value: '23 pending' }
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      angle: 135,
      radius: 120,
      color: 'from-gray-500 to-slate-600',
      description: 'System config',
      stats: { active: false, value: 'Configure' }
    },
    {
      id: 'energy',
      title: 'System Energy',
      icon: Zap,
      angle: 225,
      radius: 120,
      color: 'from-amber-500 to-yellow-600',
      description: 'Performance',
      stats: { active: true, value: '98% uptime' }
    },
    {
      id: 'activity',
      title: 'Live Activity',
      icon: Activity,
      angle: 315,
      radius: 120,
      color: 'from-teal-500 to-cyan-600',
      description: 'Real-time events',
      stats: { active: true, value: '12 events/min' }
    }
  ];

  // Animate audio waveform when active
  useEffect(() => {
    if (isAudioActive) {
      const interval = setInterval(() => {
        setAudioWaveform(prev => prev.map(() => Math.random() * 100));
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isAudioActive]);

  // Handle command input
  const handleCommand = (command: string) => {
    console.log('Processing command:', command);
    // Process commands like "/create poll", "/start audio", etc.
    setCommandInput('');
    setShowCommandBar(false);
  };

  // Calculate orbital position with responsive scaling
  const getOrbitalPosition = (angle: number, radius: number, scale: number = 1) => {
    const radian = (angle * Math.PI) / 180;
    const scaledRadius = radius * scale;
    return {
      x: Math.cos(radian) * scaledRadius,
      y: Math.sin(radian) * scaledRadius
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Orbital rings */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
          <defs>
            <radialGradient id="orbitGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.03)" />
            </radialGradient>
          </defs>
          
          {/* Primary orbit ring */}
          <motion.circle
            cx="400"
            cy="300"
            r="200"
            fill="none"
            stroke="rgba(139, 92, 246, 0.2)"
            strokeWidth="1"
            strokeDasharray="5,5"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="hidden sm:block"
          />
          
          {/* Secondary orbit ring */}
          <motion.circle
            cx="400"
            cy="300"
            r="120"
            fill="none"
            stroke="rgba(59, 130, 246, 0.2)"
            strokeWidth="1"
            strokeDasharray="3,3"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="hidden sm:block"
          />
          
          {/* Energy field */}
          <circle cx="400" cy="300" r="300" fill="url(#orbitGradient)" />
        </svg>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Central Pivot Core */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative"
        >
          {/* Core Avatar/Control Panel */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-purple-500 via-blue-600 to-teal-500 rounded-full flex items-center justify-center relative overflow-hidden cursor-pointer"
            style={{
              boxShadow: '0 0 50px rgba(139, 92, 246, 0.5), inset 0 0 50px rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Audio waveform ring when active */}
            {isAudioActive && (
              <div className="absolute inset-0 flex items-center justify-center">
                {audioWaveform.map((height, index) => (
                  <motion.div
                    key={index}
                    className="absolute bg-white/60"
                    style={{
                      width: '2px',
                      height: `${height * 0.3}px`,
                      transform: `rotate(${index * 18}deg) translateY(-${30 + height * 0.15}px)`,
                      transformOrigin: 'center 30px',
                    }}
                    animate={{ height: `${height * 0.3}px` }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </div>
            )}
            
            {/* User Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center z-10">
              <span className="text-white font-bold text-lg sm:text-xl">
                {user?.fullName?.split(' ').map(n => n[0]).join('') || 'HC'}
              </span>
            </div>
            
            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Core Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center"
          >
            <h2 className="text-white font-bold text-base sm:text-lg">Host Control</h2>
            <p className="text-purple-300 text-xs sm:text-sm">System Active</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Primary Orbital Features - Hidden on mobile, shown as grid instead */}
      <div className="hidden lg:block">
        {orbitalFeatures.map((feature, index) => {
          const position = getOrbitalPosition(feature.angle, feature.radius);
          return (
            <motion.div
              key={feature.id}
              className="absolute top-1/2 left-1/2 z-10"
              style={{
                transform: `translate(${position.x - 50}px, ${position.y - 50}px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.2, 
                  rotateY: 15,
                  z: 50
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedOrbit(feature.id)}
                className="relative cursor-pointer"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  rotate: { duration: 120, repeat: Infinity, ease: "linear" }
                }}
              >
                <GlassCard className="w-24 h-24 p-4 hover:shadow-2xl transition-all duration-300">
                  <div className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center relative overflow-hidden`}>
                    <feature.icon className="w-8 h-8 text-white z-10" />
                    
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-lg"
                      animate={{ opacity: [0, 0.3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    
                    {/* Status indicator */}
                    <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                      feature.stats.active ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                  </div>
                </GlassCard>
                
                {/* Feature label */}
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white text-xs font-medium whitespace-nowrap">{feature.title}</p>
                  <p className="text-purple-300 text-xs">{feature.stats.value}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Secondary Orbital Features - Hidden on mobile */}
      <div className="hidden md:block">
        {secondaryOrbit.map((feature, index) => {
          const position = getOrbitalPosition(feature.angle, feature.radius, 0.8);
          return (
            <motion.div
              key={feature.id}
              className="absolute top-1/2 left-1/2 z-10"
              style={{
                transform: `translate(${position.x - 30}px, ${position.y - 30}px)`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
            >
              <motion.div
                whileHover={{ scale: 1.3, rotateZ: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedOrbit(feature.id)}
                className="relative cursor-pointer"
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  rotate: { duration: 80, repeat: Infinity, ease: "linear" }
                }}
              >
                <GlassCard className="w-16 h-16 p-3">
                  <div className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center relative`}>
                    <feature.icon className="w-5 h-5 text-white" />
                    
                    {/* Mini status indicator */}
                    <div className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full ${
                      feature.stats.active ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile Feature Grid */}
      <div className="lg:hidden absolute bottom-20 left-4 right-4 z-20">
        <div className="grid grid-cols-3 gap-3">
          {[...orbitalFeatures, ...secondaryOrbit].slice(0, 6).map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedOrbit(feature.id)}
              className="cursor-pointer"
            >
              <GlassCard className="p-3 aspect-square">
                <div className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-lg flex flex-col items-center justify-center relative`}>
                  <feature.icon className="w-6 h-6 text-white mb-1" />
                  <span className="text-white text-xs font-medium text-center leading-tight">{feature.title}</span>
                  <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${
                    feature.stats.active ? 'bg-green-400' : 'bg-gray-400'
                  }`} />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Command Bar */}
      <AnimatePresence>
        {showCommandBar && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-4 right-4 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-30"
          >
            <GlassCard className="p-4 w-full sm:min-w-96">
              <div className="flex items-center space-x-3">
                <Command className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCommand(commandInput)}
                  placeholder="Enter command... (/create poll, /start audio, /export data)"
                  className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                  autoFocus
                />
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions HUD */}
      <div className="fixed top-4 right-4 z-20">
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsAudioActive(!isAudioActive)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 ${
              isAudioActive ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-gray-400'
            }`}
          >
            {isAudioActive ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCommandBar(!showCommandBar)}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-purple-500/20 text-purple-400 backdrop-blur-xl border border-purple-500/30"
          >
            <Command className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </div>

      {/* Live Stats Overlay */}
      <div className="fixed top-4 left-4 z-20">
        <GlassCard className="p-3 sm:p-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-xs sm:text-sm">System Online</span>
            </div>
            <div className="text-gray-300 text-xs">
              <div>Active Polls: 12</div>
              <div>Participants: 342</div>
              <div className="hidden sm:block">Uptime: 99.8%</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Feature Detail Panel */}
      <AnimatePresence>
        {selectedOrbit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
            onClick={() => setSelectedOrbit(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <GlassCard className="p-4 sm:p-6">
                {(() => {
                  const feature = [...orbitalFeatures, ...secondaryOrbit].find(f => f.id === selectedOrbit);
                  if (!feature) return null;
                  
                  return (
                    <div className="text-center">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300 mb-4 text-sm sm:text-base">{feature.description}</p>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-purple-300 text-sm sm:text-base">{feature.stats.value}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 px-4 sm:px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm sm:text-base"
                        onClick={() => {
                          console.log(`Navigating to ${feature.id}`);
                          setSelectedOrbit(null);
                        }}
                      >
                        Open {feature.title}
                      </motion.button>
                    </div>
                  );
                })()}
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-4 left-4 z-20 hidden sm:block">
        <GlassCard className="p-3">
          <div className="text-gray-400 text-xs">
            <div>Press <kbd className="bg-white/10 px-1 rounded">Cmd+K</kbd> for commands</div>
            <div>Press <kbd className="bg-white/10 px-1 rounded">Space</kbd> to toggle audio</div>
          </div>
        </GlassCard>
      </div>

      {/* Keyboard shortcuts */}
      <div className="sr-only">
        <button
          onClick={() => setShowCommandBar(true)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
              e.preventDefault();
              setShowCommandBar(true);
            }
            if (e.key === ' ') {
              e.preventDefault();
              setIsAudioActive(!isAudioActive);
            }
          }}
        />
      </div>
    </div>
  );
};

export default OrbitalHostDashboard;
import React from 'react';
import { motion } from 'framer-motion';
import { Medal, Award, Crown, TrendingUp, Clock } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import GlassCard from '../components/GlassCard';

const Leaderboard = () => {

  // Mock leaderboard data
  const meetingLeaderboard = [
    {
      id: 1,
      name: 'Diana Prince',
      pollsAttempted: 127,
      avgTime: 1.8,
      points: 2847,
      streak: 23,
      rank: 1,
      change: 0
    },
    {
      id: 2,
      name: 'Alice Johnson',
      pollsAttempted: 134,
      avgTime: 2.1,
      points: 2634,
      streak: 18,
      rank: 2,
      change: 1
    },
    {
      id: 3,
      name: 'Bob Smith',
      pollsAttempted: 156,
      avgTime: 2.4,
      points: 2456,
      streak: 12,
      rank: 3,
      change: -1
    },
    {
      id: 4,
      name: 'Charlie Brown',
      pollsAttempted: 142,
      avgTime: 2.8,
      points: 2298,
      streak: 8,
      rank: 4,
      change: 2
    },
    {
      id: 5,
      name: 'Ethan Hunt',
      pollsAttempted: 119,
      avgTime: 2.6,
      points: 2187,
      streak: 15,
      rank: 5,
      change: -1
    }
  ];


  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-lg font-bold text-gray-400">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-orange-500';
      case 2:
        return 'from-gray-400 to-gray-600';
      case 3:
        return 'from-orange-500 to-red-500';
      default:
        return 'from-primary-500 to-secondary-500';
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-400" />;
    } else if (change < 0) {
      return <TrendingUp className="w-4 h-4 text-red-400 transform rotate-180" />;
    }
    return <div className="w-4 h-4" />;
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 overflow-x-hidden"
      >
        {/* Header with Current Meeting Tag */}
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6">
  {/* Heading */}
  <div>
    <h1 className="text-3xl font-bold text-white mb-1 sm:mb-0">Leaderboard</h1>
    <p className="text-gray-400">Top performing participants</p>
  </div>

  {/* Responsive Current Meeting Tag */}
  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-center w-max self-start sm:self-auto">
    CURRENT MEETING
  </div>
</div>


        {/* Top 3 Podium */}
        <GlassCard className="p-8">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Top Performers</h3>
          <div className="flex flex-col md:flex-row items-end justify-center md:gap-12 gap-8">
            {/* Second Place */}
            {meetingLeaderboard[1] && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center text-center order-1 md:order-2 w-full md:w-auto"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-lg">
                      {meetingLeaderboard[1].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Medal className="w-8 h-8 text-gray-300" />
                  </div>
                </div>
                <div className="bg-gradient-to-t from-gray-600 to-gray-400 rounded-t-lg p-4 h-24 flex flex-col justify-end">
                  <h4 className="font-bold text-white text-sm">{meetingLeaderboard[1].name}</h4>
                  <p className="text-gray-200 text-xs">{meetingLeaderboard[1].points} pts</p>
                </div>
              </motion.div>
            )}

            {/* First Place */}
            {meetingLeaderboard[0] && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center text-center order-2 md:order-1 w-full md:w-auto"
              >
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-glow">
                    <span className="text-white font-bold text-xl">
                      {meetingLeaderboard[0].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -top-3 -right-3">
                    <Crown className="w-10 h-10 text-yellow-400" />
                  </div>
                </div>
                <div className="bg-gradient-to-t from-orange-600 to-yellow-500 rounded-t-lg p-4 h-32 flex flex-col justify-end">
                  <h4 className="font-bold text-white">{meetingLeaderboard[0].name}</h4>
                  <p className="text-yellow-100 text-sm">{meetingLeaderboard[0].points} pts</p>
                </div>
              </motion.div>
            )}

            {/* Third Place */}
            {meetingLeaderboard[2] && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center text-center order-3 md:order-3 w-full md:w-auto"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-lg">
                      {meetingLeaderboard[2].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Award className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
                <div className="bg-gradient-to-t from-red-600 to-orange-500 rounded-t-lg p-4 h-20 flex flex-col justify-end">
                  <h4 className="font-bold text-white text-sm">{meetingLeaderboard[2].name}</h4>
                  <p className="text-orange-100 text-xs">{meetingLeaderboard[2].points} pts</p>
                </div>
              </motion.div>
            )}
          </div>
        </GlassCard>
        {/* Full Leaderboard */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-bold text-white mb-6">
            Meeting Rankings
          </h3>
          <div className="space-y-4">
            {meetingLeaderboard.map((participant, index) => {
              const maxTime = 60; // Maximum time for normalization
              const barPercent = Math.min((participant.avgTime / maxTime) * 100, 100);

              return (
                <motion.div
                  key={participant.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg border ${participant.rank <= 3
                      ? 'bg-gradient-to-r from-white/10 to-white/5 border-white/20'
                      : 'bg-white/5 border-white/10'
                    } hover:border-white/20 transition-colors duration-200`}
                >
                  {/* Left Section: Rank Icon, Change Icon, Avatar, Name */}
                  <div className="flex items-center space-x-4">
                    {/* Rank and Change */}
                    <div className="flex items-center space-x-2">
                      {getRankIcon(participant.rank)}
                      {getChangeIcon(participant.change)}
                    </div>

                    {/* Avatar */}
                    <div className={`w-10 h-10 bg-gradient-to-r ${getRankColor(participant.rank)} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>

                    {/* Name */}
                    <h4 className="text-white font-semibold">{participant.name}</h4>
                  </div>

                  {/* Right Section: Timer + Visual Bar */}
                  <div className="flex items-center space-x-2 text-sm text-gray-400 w-32">
                    <Clock className="w-4 h-4" />
                    <span>{participant.avgTime}s</span>
                    <div className="relative flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full"
                        style={{ width: `${barPercent}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

      </motion.div>
    </DashboardLayout>
  );
};

export default Leaderboard;
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Medal, TrendingUp, TrendingDown, Crown, Zap, Target, Clock, Users, Star } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import GlassCard from "../GlassCard"

interface LeaderboardEntry {
  id: number
  name: string
  pollsAttempted: number
  avgTime: number
  points: number
  rank: number
  change: number
  isCurrentUser?: boolean
}

const StudentLeaderboard: React.FC = () => {
  const { user } = useAuth()

  const leaderboardData: LeaderboardEntry[] = [
    {
      id: 1,
      name: 'Diana Prince',
      pollsAttempted: 127,
      avgTime: 1.8,
      points: 2847,
      rank: 1,
      change: 0
    },
    {
      id: 2,
      name: "Sarah Chen",
      pollsAttempted: 115,
      avgTime: 2.1,
      points: 2650,
      rank: 2,
      change: 1
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      pollsAttempted: 132,
      avgTime: 1.9,
      points: 2580,
      rank: 3,
      change: -1
    },
    {
      id: 4,
      name: "Emma Wilson",
      pollsAttempted: 98,
      avgTime: 2.3,
      points: 2480,
      rank: 4,
      change: 2
    },
    {
      id: 5,
      name: "David Kim",
      pollsAttempted: 142,
      avgTime: 2.5,
      points: 2350,
      rank: 5,
      change: -1
    },
    {
      id: 6,
      name: "Lisa Thompson",
      pollsAttempted: 89,
      avgTime: 2.0,
      points: 2280,
      rank: 6,
      change: 1
    },
    {
      id: 7,
      name: user?.email || "You",
      pollsAttempted: 105,
      avgTime: 2.2,
      points: 2150,
      rank: 7,
      change: 1,
      isCurrentUser: true
    },
    {
      id: 8,
      name: "James Brown",
      pollsAttempted: 78,
      avgTime: 2.8,
      points: 2050,
      rank: 8,
      change: -2
    },
  ]

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-400"
    if (change < 0) return "text-red-400"
    return "text-gray-400"
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />
    if (change < 0) return <TrendingDown className="w-4 h-4" />
    return <div className="w-4 h-4" />
  }

  const getRankBackground = (rank: number, isCurrentUser?: boolean) => {
    if (isCurrentUser) return "bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border-2 border-primary-500/30"
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30"
    if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-slate-400/20 border border-gray-400/30"
    if (rank === 3) return "bg-gradient-to-r from-amber-600/20 to-orange-500/20 border border-amber-600/30"
    return "bg-white/5 hover:bg-white/10 border border-white/10"
  }

  const currentUser = leaderboardData.find((user) => user.isCurrentUser)

  return (
    <div className="space-y-6">
      {/* Header with Current Meeting Tag */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🏆 Leaderboard</h1>
          <p className="text-gray-400">Compete with fellow students and climb the ranks!</p>
        </div>

        {/* Responsive Current Meeting Tag */}
        <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-center w-max self-start sm:self-auto">
          Current Meeting
        </div>
      </div>

      {/* Your Rank Spotlight */}
      {currentUser && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-6 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-primary-500/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="text-5xl">👤</div>
                  <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    #{currentUser.rank}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Your Current Rank</h3>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {currentUser.avgTime}s avg
                    </span>
                    <span>{currentUser.pollsAttempted} polls</span>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-right">
                <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
                  <span className="text-3xl font-bold text-white">{currentUser.points.toLocaleString()}</span>
                  <span className="text-sm text-gray-400">pts</span>
                </div>
                <div
                  className={`flex items-center justify-center md:justify-end space-x-1 ${getChangeColor(currentUser.change)}`}
                >
                  {getChangeIcon(currentUser.change)}
                  <span className="font-medium">
                    {currentUser.change > 0 ? `+${currentUser.change}` : currentUser.change === 0 ? "0" : currentUser.change}
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Top 3 Podium */}
      <GlassCard className="p-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
          Top Performers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {leaderboardData.slice(0, 3).map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-xl text-center ${getRankBackground(student.rank)} ${
                index === 0 ? "md:order-2 transform md:scale-105" : index === 1 ? "md:order-1" : "md:order-3"
              }`}
            >
              {/* Crown for #1 */}
              {student.rank === 1 && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
              )}

              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-white text-lg mb-1">{student.name}</h3>
              <p className="text-2xl font-bold text-white mb-2">{student.points.toLocaleString()}</p>
              <div className="text-sm text-gray-400 flex items-center justify-center space-x-2">
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {student.avgTime}s
                </span>
                <span>•</span>
                <span>{student.pollsAttempted} polls</span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

export default StudentLeaderboard
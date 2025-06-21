"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, Users, Zap, CheckCircle, AlertCircle, Loader2, Video, Globe, Calendar } from "lucide-react"
import GlassCard from "../GlassCard"

interface JoinPollPageProps {
  onJoinPoll?: (meetingLink: string) => void
}

const JoinPollPage: React.FC<JoinPollPageProps> = ({ onJoinPoll }) => {
  const [meetingLink, setMeetingLink] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const validateMeetingLink = (link: string): boolean => {
    if (!link.trim()) return false

    // Basic URL validation for common meeting platforms
    const meetingPatterns = [
      /^https?:\/\/.*\.zoom\.us\/j\/\d+/,
      /^https?:\/\/meet\.google\.com\/[a-z-]+/,
      /^https?:\/\/.*\.webex\.com\/meet\/[a-zA-Z0-9-]+/,
      /^https?:\/\/teams\.microsoft\.com\/l\/meetup-join/,
      /^https?:\/\/.*\.gotomeeting\.com\/join\/\d+/,
    ]

    return meetingPatterns.some((pattern) => pattern.test(link)) || link.includes("meet") || link.includes("zoom")
  }

  const handleJoinPoll = async () => {
    setError("")

    if (!meetingLink.trim()) {
      setError("Please enter a meeting link")
      return
    }

    if (!validateMeetingLink(meetingLink)) {
      setError("Please enter a valid meeting link (Zoom, Google Meet, Teams, etc.)")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)

      // Navigate to poll questions after success animation
      setTimeout(() => {
        onJoinPoll?.(meetingLink)
      }, 1500)
    } catch (err) {
      setError("Failed to join poll session. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleJoinPoll()
    }
  }

  const platformIcons = [
    { name: "Zoom", icon: Video, color: "from-blue-500 to-blue-600" },
    { name: "Google Meet", icon: Globe, color: "from-green-500 to-green-600" },
    { name: "Teams", icon: Users, color: "from-purple-500 to-purple-600" },
    { name: "WebEx", icon: Calendar, color: "from-orange-500 to-orange-600" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-6">
          <Link className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Join a Poll Session</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Enter your meeting link to connect and participate in live polls during your session
        </p>
      </motion.div>

      {/* Supported Platforms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Supported Platforms</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {platformIcons.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center mb-2`}
                >
                  <platform.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-gray-300 font-medium">{platform.name}</span>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Main Join Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <GlassCard className="p-8">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {/* Input Section */}
              <div className="space-y-4">
                <label className="block text-lg font-semibold text-white">Meeting Link</label>
                <div className="relative">
                  <input
                    type="url"
                    value={meetingLink}
                    onChange={(e) => {
                      setMeetingLink(e.target.value)
                      setError("")
                      setSuccess(false)
                    }}
                    onKeyPress={handleKeyPress}
                    placeholder="https://meet.google.com/abc-defg-hij or https://zoom.us/j/123456789"
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    disabled={isLoading || success}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <Link className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success Message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center space-x-2 text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Successfully connected! Redirecting to poll questions...</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Join Button */}
              <motion.button
                onClick={handleJoinPoll}
                disabled={isLoading || success}
                whileHover={{ scale: success ? 1 : 1.02 }}
                whileTap={{ scale: success ? 1 : 0.98 }}
                className={`
                  w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200
                  ${
                    success
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : isLoading
                        ? "bg-gray-500/20 text-gray-400 border border-gray-500/30 cursor-not-allowed"
                        : "bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-lg hover:shadow-xl"
                  }
                `}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting...</span>
                  </div>
                ) : success ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Connected! Redirecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Join Poll Session</span>
                  </div>
                )}
              </motion.button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">How to Join</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Copy Link</h4>
              <p className="text-sm text-gray-400">Copy your meeting link from Zoom, Google Meet, or Teams</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Paste & Join</h4>
              <p className="text-sm text-gray-400">Paste the link above and click "Join Poll Session"</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold text-white mb-2">Start Polling</h4>
              <p className="text-sm text-gray-400">Answer questions and compete with your classmates</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

export default JoinPollPage

"use client"

import type React from "react"
import { useAuth } from "../../contexts/AuthContext"

const WelcomeSection: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()

  

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name || "Student"}! 🎉</h1>
        <p className="text-gray-400 text-lg">Ready to participate in today's polls and climb the leaderboard?</p>
      </div>
      {children && <div>{children}</div>}
    </div>
  )
}

export default WelcomeSection

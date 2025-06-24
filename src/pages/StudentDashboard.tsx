"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import StudentSidebar from "../components/StudentSidebar"
import WelcomeSection from "../components/student/WelcomeSection"
import QuickAccessCards from "../components/student/QuickAccessCards"
import StudentLeaderboard from "../components/student/StudentLeaderboard"
import GlassCard from "../components/GlassCard"
import JoinPollPage from "../components/student/JoinPollPage"
import PollHistoryPage from "../components/student/PollHistoryPage"
import PollQuestionsPage from "../components/student/PollQuestionsPage"
import StudentProfilePage from "../components/student/StudentProfilePage"
import AchievementPage from "../components/student/AchievementPage"
import NotificationPage from "../components/student/NotificationPage"
import Settings from "../components/student/Settings"

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentMeetingLink, setCurrentMeetingLink] = useState("")

  const handleJoinPoll = (meetingLink: string) => {
    setCurrentMeetingLink(meetingLink)
    setActiveSection("poll-questions")
  }

  const handlePollComplete = () => {
    // Navigate back to dashboard or show results
    setActiveSection("dashboard")
    setCurrentMeetingLink("")
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <WelcomeSection />
            <QuickAccessCards onSectionChange={setActiveSection} />

            {/* Recent Activity */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: "Completed Math Quiz", time: "2 minutes ago", points: "+50 points" },
                  { action: "Joined History Poll", time: "15 minutes ago", points: "+25 points" },
                  { action: 'Achieved "Speed Demon" badge', time: "1 hour ago", points: "+100 points" },
                  { action: "Ranked up to #7", time: "2 hours ago", points: "Rank change" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                    <div className="text-sm text-green-400">{activity.points}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )
      case "join-poll":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <JoinPollPage onJoinPoll={handleJoinPoll} />
          </motion.div>
        )
      case "poll-questions":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <PollQuestionsPage meetingLink={currentMeetingLink} onComplete={handlePollComplete} />
          </motion.div>
        )
      case "leaderboard":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <StudentLeaderboard />
          </motion.div>
        )
      case "history":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <PollHistoryPage />
          </motion.div>
        )
      case "profile":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <StudentProfilePage />
          </motion.div>
        )
      case "achievements":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <AchievementPage />
          </motion.div>
        )
      case "notifications":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <NotificationPage />
          </motion.div>
        )
      case "settings":
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Settings />
          </motion.div>
        )
      default:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <WelcomeSection />
            <QuickAccessCards onSectionChange={setActiveSection} />
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <div className="flex">
        {/* Sidebar */}
        <StudentSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 md:ml-0">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl border-b border-white/10">
            <h1 className="text-xl font-bold text-white">Student Dashboard</h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard

import React, { createContext, useContext, useState, type ReactNode } from 'react'

interface NotificationContextType {
  unreadCount: number
  setUnreadCount: (count: number) => void
  updateUnreadCount: (change: number) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0)

  const updateUnreadCount = (change: number) => {
    setUnreadCount(prev => Math.max(0, prev + change))
  }

  return (
    <NotificationContext.Provider value={{ unreadCount, setUnreadCount, updateUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider')
  }
  return context
}

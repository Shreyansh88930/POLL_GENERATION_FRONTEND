"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, Upload, Users, Mail, FileText, Check, AlertCircle, X, Eye, EyeOff } from "lucide-react"
import GlassCard from "../components/GlassCard"
import DashboardLayout from "../components/DashboardLayout"
import * as XLSX from "xlsx"

interface StudentInvite {
  name: string
  email: string
}

const CreatePollPage: React.FC = () => {
  const [meetingLink, setMeetingLink] = useState("")
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [students, setStudents] = useState<StudentInvite[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [errors, setErrors] = useState<{ link?: string; csv?: string }>({})

  // Validate meeting link
  const validateMeetingLink = (link: string): boolean => {
    const meetingRegex = /(https?:\/\/)?(meet\.google\.com|zoom\.us|teams\.microsoft\.com)/i
    return meetingRegex.test(link)
  }

  // Handle meeting link change
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMeetingLink(value)

    if (value && !validateMeetingLink(value)) {
      setErrors((prev) => ({ ...prev, link: "Please enter a valid meeting link" }))
    } else {
      setErrors((prev) => ({ ...prev, link: undefined }))
    }
  }

  // Parse CSV content
  const parseCSV = (content: string): StudentInvite[] => {
    const lines = content.split("\n").filter((line) => line.trim())
    const headers = lines[0]
      .toLowerCase()
      .split(",")
      .map((h) => h.trim())

    const emailIndex = headers.findIndex((h) => h.includes("email"))
    const nameIndex = headers.findIndex((h) => h.includes("name"))

    if (emailIndex === -1) {
      throw new Error("CSV must contain an 'email' column")
    }

    return lines
      .slice(1)
      .map((line) => {
        const values = line.split(",").map((v) => v.trim())
        return {
          name: nameIndex !== -1 ? values[nameIndex] || "Unknown" : "Unknown",
          email: values[emailIndex] || "",
        }
      })
      .filter((student) => student.email)
  }

  // Handle file upload (CSV or Excel)
  const handleFileUpload = useCallback(async (file: File) => {
    const isCSV = file.name.endsWith(".csv")
    const isXLS = file.name.endsWith(".xls") || file.name.endsWith(".xlsx")

    if (!isCSV && !isXLS) {
      setErrors((prev) => ({ ...prev, csv: "Please upload a .csv or .xls/.xlsx file" }))
      return
    }

    setIsLoading(true)
    setErrors((prev) => ({ ...prev, csv: undefined }))

    try {
      let parsedStudents: StudentInvite[] = []

      if (isCSV) {
        const content = await file.text()
        parsedStudents = parseCSV(content)
      } else if (isXLS) {
        const data = await file.arrayBuffer()
        const workbook = XLSX.read(data, { type: "array" })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][]

        const headers = rows[0].map((h) => h.toLowerCase().trim())
        const emailIndex = headers.findIndex((h) => h.includes("email"))
        const nameIndex = headers.findIndex((h) => h.includes("name"))

        if (emailIndex === -1) {
          throw new Error("File must contain an 'email' column")
        }

        parsedStudents = rows
          .slice(1)
          .filter((row) => row[emailIndex])
          .map((row) => ({
            name: nameIndex !== -1 ? row[nameIndex]?.toString().trim() || "Unknown" : "Unknown",
            email: row[emailIndex]?.toString().trim() || "",
          }))
      }

      if (parsedStudents.length === 0) {
        throw new Error("No valid student records found")
      }

      setStudents(parsedStudents)
      setCsvFile(file)
      setShowPreview(true)
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        csv: error instanceof Error ? error.message : "Failed to parse the file",
      }))
      setStudents([])
      setCsvFile(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [handleFileUpload]
  )

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  // Remove uploaded file
  const removeFile = () => {
    setCsvFile(null)
    setStudents([])
    setShowPreview(false)
    setErrors((prev) => ({ ...prev, csv: undefined }))
  }

  // Check if form is valid
  const isFormValid = meetingLink && validateMeetingLink(meetingLink) && students.length > 0

  // Handle form submission
  const handleSubmit = () => {
    if (!isFormValid) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log("Poll created with:", { meetingLink, students })
    }, 2000)
  }


  return (
    <DashboardLayout>
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Create A New Poll Session</h1>
          <p className="text-gray-400 text-lg">Set up your meeting and invite students to participate</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Section 1: Meeting Link Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Link className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">Enter Meeting Link</h2>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="url"
                    value={meetingLink}
                    onChange={handleLinkChange}
                    placeholder="https://meet.google.com/xyz-abc-def"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.link
                        ? "border-red-500/50 focus:ring-red-500/50"
                        : "border-white/10 focus:ring-primary-500/50 focus:border-primary-500/50"
                    }`}
                  />
                  {meetingLink && validateMeetingLink(meetingLink) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <Check className="w-5 h-5 text-green-400" />
                    </motion.div>
                  )}
                </div>

                <AnimatePresence>
                  {errors.link && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center space-x-2 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.link}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>This link will be shared with all participants</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Section 2: Invite Students via CSV */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard className="p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">Invite Students</h2>
              </div>

              <div className="space-y-4">
                {/* File Upload Area */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                    isDragOver
                      ? "border-primary-500/50 bg-primary-500/10"
                      : errors.csv
                        ? "border-red-500/50 bg-red-500/5"
                        : "border-white/20 hover:border-white/30"
                  }`}
                >
                  <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <div className="space-y-4">
                    <motion.div animate={{ scale: isDragOver ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    </motion.div>

                    <div>
                      <p className="text-white font-medium">
                        {isDragOver ? "Drop your CSV file here" : "Drag & drop your CSV or Excel file"}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">or click to browse files</p>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {errors.csv && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center space-x-2 text-red-400 text-sm"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.csv}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* File Info */}
                <AnimatePresence>
                  {csvFile && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-white text-sm font-medium">{csvFile.name}</p>
                          <p className="text-gray-400 text-xs">{students.length} students found</p>
                        </div>
                      </div>
                      <button onClick={removeFile} className="p-1 hover:bg-white/10 rounded transition-colors">
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CSV Format Info */}
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <FileText className="w-4 h-4" />
                  <span>CSV must contain 'email' column (optional: 'name' column and 'S No.' column)</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Student Preview */}
        <AnimatePresence>
          {students.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Student Preview ({students.length})</h3>
                  </div>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {showPreview ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {showPreview && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        {students.slice(0, 10).map((student, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{student.name}</p>
                              <p className="text-gray-400 text-xs truncate">{student.email}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {students.length > 10 && (
                        <p className="text-gray-400 text-sm text-center">+{students.length - 10} more students</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              isFormValid
                ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating Poll...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Send Invites & Create Poll Session</span>
              </div>
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default CreatePollPage

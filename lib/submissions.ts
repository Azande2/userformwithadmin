import type { Submission, FormType, FormDataUnion } from "./types"
import fs from 'fs'
import path from 'path'

// File-based storage path
const DB_PATH = path.join(process.cwd(), 'data', 'submissions.json')

// Ensure data directory exists
function ensureDbDirectory(): void {
  const dir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Read submissions from file
function readSubmissionsFromFile(): Submission[] {
  try {
    ensureDbDirectory()
    if (!fs.existsSync(DB_PATH)) {
      return []
    }
    const data = fs.readFileSync(DB_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading submissions:', error)
    return []
  }
}

// Write submissions to file
function writeSubmissionsToFile(submissions: Submission[]): void {
  try {
    ensureDbDirectory()
    fs.writeFileSync(DB_PATH, JSON.stringify(submissions, null, 2))
  } catch (error) {
    console.error('Error writing submissions:', error)
  }
}

// Initialize submissions from file
let submissions: Submission[] = readSubmissionsFromFile()

export function getSubmissions(): Submission[] {
  return [...submissions].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )
}

// Add isRead: false to new submissions
export function addSubmission(submission: Submission): void {
  // Add isRead flag to track new/unread submissions
  const newSubmission = {
    ...submission,
    isRead: false, // New submissions start as unread
  }
  submissions.push(newSubmission)
  
  // Persist to file
  writeSubmissionsToFile(submissions)
  
  // Optional: Log for debugging
  console.log(`🔔 New submission from ${submission.submittedBy}: ${submission.formTitle}`)
}

export function getSubmissionById(id: string): Submission | undefined {
  return submissions.find((s) => s.id === id)
}

export function getSubmissionsByType(formType: string): Submission[] {
  return submissions
    .filter((s) => s.formType === formType)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
}

export function getDefectSubmissions(): Submission[] {
  return submissions
    .filter((s) => s.hasDefects)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
}

// Mark a submission as read
export function markAsRead(id: string): void {
  const submission = submissions.find((s) => s.id === id)
  if (submission) {
    submission.isRead = true
    submission.viewedAt = new Date().toISOString()
    
    // Persist to file
    writeSubmissionsToFile(submissions)
  }
}

// Mark multiple submissions as read
export function markMultipleAsRead(ids: string[]): void {
  let changed = false
  ids.forEach(id => {
    const submission = submissions.find((s) => s.id === id)
    if (submission && !submission.isRead) {
      submission.isRead = true
      submission.viewedAt = new Date().toISOString()
      changed = true
    }
  })
  
  // Persist to file if changes were made
  if (changed) {
    writeSubmissionsToFile(submissions)
  }
}

// Get count of unread submissions
export function getUnreadCount(): number {
  return submissions.filter((s) => !s.isRead).length
}

// Get all unread submissions
export function getUnreadSubmissions(): Submission[] {
  return submissions
    .filter((s) => !s.isRead)
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
}

// Get filtered submissions
export function getFilteredSubmissions(options?: {
  formType?: string
  hasDefects?: boolean
  unreadOnly?: boolean
  search?: string
}): Submission[] {
  let filtered = [...submissions]
  
  if (options?.formType && options.formType !== 'all') {
    filtered = filtered.filter((s) => s.formType === options.formType)
  }
  
  if (options?.hasDefects !== undefined) {
    filtered = filtered.filter((s) => s.hasDefects === options.hasDefects)
  }
  
  if (options?.unreadOnly) {
    filtered = filtered.filter((s) => !s.isRead)
  }
  
  if (options?.search) {
    const searchLower = options.search.toLowerCase()
    filtered = filtered.filter((s) => 
      s.submittedBy.toLowerCase().includes(searchLower) ||
      s.formTitle.toLowerCase().includes(searchLower) ||
      s.formType.toLowerCase().includes(searchLower)
    )
  }
  
  return filtered.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  )
}

// Get today's submissions
export function getTodaysSubmissions(): Submission[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return submissions.filter((s) => {
    const subDate = new Date(s.submittedAt)
    subDate.setHours(0, 0, 0, 0)
    return subDate.getTime() === today.getTime()
  })
}

// Get weekly submissions (last 7 days)
export function getWeeklySubmissions(): Submission[] {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  return submissions.filter(
    (s) => new Date(s.submittedAt) >= weekAgo
  )
}

// Get monthly submissions (last 30 days)
export function getMonthlySubmissions(): Submission[] {
  const monthAgo = new Date()
  monthAgo.setDate(monthAgo.getDate() - 30)
  
  return submissions.filter(
    (s) => new Date(s.submittedAt) >= monthAgo
  )
}

// Get submissions statistics
export function getSubmissionStats(): {
  total: number
  unread: number
  withDefects: number
  clean: number
  today: number
  weekly: number
  monthly: number
  byType: Record<string, number>
} {
  const today = getTodaysSubmissions().length
  const weekly = getWeeklySubmissions().length
  const monthly = getMonthlySubmissions().length
  const unread = getUnreadCount()
  const withDefects = submissions.filter((s) => s.hasDefects).length
  const clean = submissions.filter((s) => !s.hasDefects).length
  
  // Group by form type
  const byType = submissions.reduce((acc, s) => {
    acc[s.formType] = (acc[s.formType] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    total: submissions.length,
    unread,
    withDefects,
    clean,
    today,
    weekly,
    monthly,
    byType,
  }
}

// Clear all submissions (useful for testing)
export function clearSubmissions(): void {
  submissions = []
  writeSubmissionsToFile(submissions)
  console.log('🧹 All submissions cleared')
}

// Refresh submissions from file (useful for API routes that need latest data)
export function refreshSubmissions(): void {
  submissions = readSubmissionsFromFile()
}

// Get submissions count
export function getSubmissionsCount(): number {
  return submissions.length
}

// Delete a submission by ID
export function deleteSubmission(id: string): boolean {
  const index = submissions.findIndex((s) => s.id === id)
  if (index !== -1) {
    submissions.splice(index, 1)
    writeSubmissionsToFile(submissions)
    console.log(`🗑️ Deleted submission: ${id}`)
    return true
  }
  return false
}

// Update submission data
export function updateSubmission(id: string, data: Partial<Submission>): Submission | null {
  const submission = submissions.find((s) => s.id === id)
  if (submission) {
    Object.assign(submission, data)
    writeSubmissionsToFile(submissions)
    console.log(`📝 Updated submission: ${id}`)
    return submission
  }
  return null
}

// Get submissions by date range
export function getSubmissionsByDateRange(startDate: Date, endDate: Date): Submission[] {
  return submissions
    .filter((s) => {
      const subDate = new Date(s.submittedAt)
      return subDate >= startDate && subDate <= endDate
    })
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
}

// Batch add submissions
export function addMultipleSubmissions(newSubmissions: Submission[]): void {
  const submissionsWithReadFlag = newSubmissions.map(sub => ({
    ...sub,
    isRead: false
  }))
  submissions.push(...submissionsWithReadFlag)
  writeSubmissionsToFile(submissions)
  console.log(`📦 Added ${newSubmissions.length} submissions`)
}
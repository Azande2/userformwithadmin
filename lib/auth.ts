// lib/auth.ts
export type UserRole = "admin" | "user"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  employeeId?: string
}

// Seed data - Admin users
export const seedUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@ringomode.co.za",
    role: "admin",
    department: "HSE",
    employeeId: "HSE-001"
  },
  {
    id: "2",
    name: "John Doe",
    email: "john.doe@ringomode.co.za",
    role: "user",
    department: "Operations",
    employeeId: "OP-123"
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane.smith@ringomode.co.za",
    role: "user",
    department: "Maintenance",
    employeeId: "MT-456"
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike.johnson@ringomode.co.za",
    role: "user",
    department: "Logistics",
    employeeId: "LG-789"
  }
]

// Simple session storage (in production, use proper auth like NextAuth)
let currentUser: User | null = null

export function login(email: string, password: string): User | null {
  // In production, verify password properly
  // For demo, any password works, we just check email exists
  const user = seedUsers.find(u => u.email === email)
  if (user) {
    currentUser = user
    return user
  }
  return null
}

export function logout(): void {
  currentUser = null
}

export function getCurrentUser(): User | null {
  return currentUser
}

export function isAuthenticated(): boolean {
  return currentUser !== null
}

export function isAdmin(): boolean {
  return currentUser?.role === "admin"
}

export function requireAuth(redirectTo: string = "/login"): User | null {
  if (!isAuthenticated()) {
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo
    }
    return null
  }
  return currentUser
}

export function requireAdmin(redirectTo: string = "/"): User | null {
  const user = requireAuth(redirectTo)
  if (user && user.role !== "admin") {
    if (typeof window !== 'undefined') {
      window.location.href = "/"
    }
    return null
  }
  return user
}
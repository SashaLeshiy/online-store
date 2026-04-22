export interface User {
  id: string
  username: string
  email: string
  role: 'user' | 'admin'
  avatar: string | null
  lastSeen: string
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface UpdateProfileData {
  username?: string
  avatar?: string | null
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

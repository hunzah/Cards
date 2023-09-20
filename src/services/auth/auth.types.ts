export type LoginArgs = { email: string; password: string; rememberMe?: boolean }
export type LoginResponse = { accessToken: string }
export type SingUpType = { email: string; password: string }
export type SingUpResponseType = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}
export type CustomerError = {
  data: { errorMessages: string[] }
  status: number
}
export type ForgetPasswordError = {
  data: { message: string; path: string; statusCode: number; timestamp: string }
  status: number
}

export type meResponseType = {
  avatar: string
  id: string
  email: string
  success: boolean
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
  success: boolean
}

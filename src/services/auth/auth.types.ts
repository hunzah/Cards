export type loginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type loginResponse = {
  accessToken: string
}


export interface RegisterUserDto {
    username: string
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  registrationCode: string
  loginAfterRegister: boolean | string
}

export interface LoginUserDto {
    username: string
  password: string
}

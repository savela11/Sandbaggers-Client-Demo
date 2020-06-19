export interface ISnackBar {
  message: string
  showSnackBar: boolean
  errorList: Array<IError>
}

export interface IError {
  code: string
  description: string
}

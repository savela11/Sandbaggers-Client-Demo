export interface ISnackBar {
  title: string
  class?: string
  message: string
  isSnackBarShowing: boolean
  errors?: Array<string> | string
}

export interface IError {
  code: string
  description: string
}

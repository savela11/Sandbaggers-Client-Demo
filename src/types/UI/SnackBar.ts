export interface ISnackBar {
  title?: string
  classInfo?: string
  message?: string
  isSnackBarShowing: boolean
  errors?: Array<string> | string
}


export interface IErrorToast {
  vInstance: Vue
  title: string
  message: string
  colorVariant?: string
  autoHideDelay?: number
  errors?: IError | IError[]
}

export interface ISuccessToast {
  vInstance: Vue
  title: string
  message: string
  colorVariant?: string
  autoHideDelay?: number
  errors?: IError | IError[]
}

export interface ISuccessToastWithTitleAndMessage {
  title: string
  message: string
}

interface IError {
  code: string
  description: string
}

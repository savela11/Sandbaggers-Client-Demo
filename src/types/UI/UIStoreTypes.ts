import { ISnackBar } from '@/types/UI/SnackBar'

export interface IUIState {
  header: IHeader
  dataLoading: boolean
  pageLoading: boolean
  isNavBarShowing: boolean
  isNavMenuShowing: boolean
  snackBar: ISnackBar
  deviceSize: string
}

export interface IPageLoadStatus {
  status: boolean
  timeout: number | null
}

export interface IHeader {
  current?: string
  title: string
  isShowing: boolean
}

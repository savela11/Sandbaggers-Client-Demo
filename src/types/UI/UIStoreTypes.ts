import { ISnackBar } from '@/types/UI/SnackBar'

export interface IUIState {
  headerTitle: string | null
  dataLoading: boolean
  pageLoading: boolean
  isNavBarShowing: boolean
  isHeaderShowing: boolean
  snackBar: ISnackBar
  deviceSize: string
}

export interface IPageLoadStatus {
  status: boolean
  timeout: number | null
}

export interface IHeaderInfo {
  isHeaderShowing: boolean
  title: string | null
}

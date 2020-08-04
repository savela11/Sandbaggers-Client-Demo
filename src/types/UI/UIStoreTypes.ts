import { ISnackBar } from '@/types/UI/SnackBar'

export interface IUIState {
  headerTitle: string | null
  dataLoading: boolean
  pageLoading: boolean
  isNavBarShowing: boolean
  snackBar: ISnackBar
}

export interface IPageLoadStatus {
  status: boolean
  timeout: number | null
}

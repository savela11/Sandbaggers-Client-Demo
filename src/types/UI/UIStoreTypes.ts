export interface IUIState {
  headerTitle: string | null
  pageLoading: boolean
  isNavBarShowing: boolean
}

export interface IPageLoadStatus {
  status: boolean
  timeout: number | null
}

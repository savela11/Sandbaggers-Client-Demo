export interface IUIState {
  headerTitle: string | null
  pageLoading: boolean
}

export interface IPageLoadStatus {
  status: boolean
  timeout: number | null
}

import store from '@/store/index'
import { ISnackBar } from '@/types/UI/SnackBar'
import { IHeader } from '@/types/UI/UIStoreTypes'

export default class UIHelper {
  static async SnackBar(snackBarData?: ISnackBar): Promise<void> {
    if (!snackBarData) {
      snackBarData = {
        title: '',
        message: '',
        isSnackBarShowing: false,
        class: '',
        errors: [],
      }
    }
    await store.dispatch('uiStore/_setSnackBar', snackBarData)
  }

  static async Header(headerInfo: IHeader): Promise<void> {
    await store.dispatch('uiStore/_setHeader', headerInfo)
  }

  static async PageLoading(status: boolean): Promise<void> {
    await store.dispatch('uiStore/_setPageLoading', status)
  }
}

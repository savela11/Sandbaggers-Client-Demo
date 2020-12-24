import store from '@/store/index'
import { ISnackBar } from '@/types/UI/SnackBar'
import { IHeader } from '@/types/vuexStore/UIStore'

export default class UIHelper {
  static SnackBar({ isSnackBarShowing, title, message, errors, classInfo }: ISnackBar): void {
    let snackBarData: ISnackBar = {
      title,
      classInfo,
      errors,
      isSnackBarShowing,
      message,
    }
    if (!snackBarData.isSnackBarShowing) {
      snackBarData = {
        title: '',
        message: '',
        isSnackBarShowing: false,
        classInfo: '',
        errors: [],
      }
    }
    store.dispatch('uiStore/_setSnackBar', snackBarData).then()
  }

  /**
   * @type {IHeader} headerInfo
   * @property {!string} headerInfo.title - title of header
   * @property {?string} headerInfo.current - "main" or "auth"
   * @property {?string} headerInfo.bgColor - set background color of header - example in dashboard
   * @property {!boolean} header.isShowing - toggle showing status
   * @description - UI Header Component - toggle status
   * @example UIStore.Header({title: "testTitle", isShowing: true, current: "main", bgColor: "white", })
   */
  static Header({ title, isShowing, current, bgColor }: IHeader): void {
    const headerInfo: IHeader = { title, isShowing, current, bgColor }
    store.dispatch('uiStore/_setHeader', headerInfo).then()
  }

  /**
   * @param elementId
   * @description - Create click effect on button
   * @example UIHelper.clickedButton(elementId)
   */
  static clickedButton(elementId: string): void {
    const clickedBTN = document.getElementById(elementId) as HTMLButtonElement
    clickedBTN.classList.add('clicked')
    setTimeout(() => {
      clickedBTN.classList.remove('clicked')
    }, 100)
  }

  static PageLoading(status: boolean): void {
    store.dispatch('uiStore/_setPageLoading', status).then()
  }




  static verticalSmoothScroll(time: number, where: string): void {
    const eTop = document.body.getBoundingClientRect().top
    const eAmt = eTop / 100
    let curTime = 0
    while (curTime <= time) {
      window.setTimeout(this.smoothScrollHelper, curTime, eAmt, where)
      curTime += time / 100
    }
  }

  static smoothScrollHelper(eAmt: number, where: string): void {
    if (where == 'center' || where == '') window.scrollBy(0, eAmt / 2)
    if (where == 'top') window.scrollBy(0, eAmt)
  }
}

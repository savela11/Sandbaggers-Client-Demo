import store from '@/store/index'
import { ISnackBar } from '@/types/UI/SnackBar'
import { IHeader } from '@/types/UI/UIStoreTypes'

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

  static async DataLoading(status: boolean): Promise<void> {
    await store.dispatch('uiStore/_setDataLoading', status)
  }

  static ToggleNavMenu(status: boolean): void {
    const navMenu = document.querySelector('.navMenu')
    const closeNavMenu = document.querySelector('.closeNavMenu')
    if (navMenu) {
      if (status) {
        store.dispatch('uiStore/_setNavMenuShowingStatus', status).then()
        navMenu.classList.remove('hide')
        navMenu.classList.add('show')
        closeNavMenu?.classList.add('show')
        document.body.style.position = 'fixed'
        document.body.style.overflowY = 'hidden'
        document.body.style.margin = '0'
      } else {
        navMenu.classList.remove('show')
        navMenu.classList.add('hide')
        closeNavMenu?.classList.remove('show')
        document.body.style.position = 'static'
        document.body.style.overflowY = 'auto'
        document.body.style.margin = '0 0 100px 0'
        setTimeout(() => {
          store.dispatch('uiStore/_setNavMenuShowingStatus', status).then()
        }, 500)
      }
    }
  }

  /**
   *
   * @param {boolean} status
   * @returns {Promise<void>}
   * @description UI NavBar component - bottom navigation menu toggle
   * @example UIHelper.ToggleNavBar(false)
   */
  static ToggleNavBar(status: boolean): void {
    const showNavBarBtn = document.querySelector('.showNavBarBtn')
    const navBar = document.querySelector('.navBar')
    if (status) {
      if (showNavBarBtn) {
        showNavBarBtn.classList.remove('show')
        showNavBarBtn.classList.add('hide')
      }
      if (navBar) {
        navBar.classList.remove('hide')
        navBar.classList.add('show')
      }
    } else {
      if (showNavBarBtn) {
        showNavBarBtn.classList.remove('hide')
        showNavBarBtn.classList.add('show')
      }
      if (navBar) {
        navBar.classList.remove('show')
        navBar.classList.add('hide')
      }
    }

    setTimeout(() => {
      store.dispatch('uiStore/_setNavBarShowingStatus', status).then()
    }, 500)
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

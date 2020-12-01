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
        errors: []
      }
    }
    await store.dispatch('uiStore/_setSnackBar', snackBarData)
  }

  /**
   * @param {IHeader} headerInfo
   * @param {!string} headerInfo.title - title of header
   * @param {?string} headerInfo.current - "main" or "auth"
   * @param {?string} headerInfo.bgColor - set background color of header - example in dashboard
   * @param {!boolean} header.isShowing - toggle showing status
   * @description - UI Header Component - toggle status
   * @example UIStore.Header({title: "testTitle", isShowing: true, current: "main", bgColor: "white", })
   */
  static async Header({ title, isShowing, current, bgColor }: IHeader): Promise<void> {
    const headerInfo: IHeader = { title, isShowing, current, bgColor }
    await store.dispatch('uiStore/_setHeader', headerInfo)
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

  static async PageLoading(status: boolean): Promise<void> {
    await store.dispatch('uiStore/_setPageLoading', status)
  }

  static async DataLoading(status: boolean): Promise<void> {
    await store.dispatch('uiStore/_setDataLoading', status)
  }

  static async ToggleNavMenu(status: boolean): Promise<void> {
    const navMenu = document.querySelector('.navMenu')
    const closeNavMenu = document.querySelector('.closeNavMenu')
    if (navMenu) {
      if (status) {

        await store.dispatch('uiStore/_setNavMenuShowingStatus', status)
        navMenu.classList.remove('hide')
        navMenu.classList.add('show')
        closeNavMenu?.classList.add('show')
        document.body.style.position = 'fixed'
        document.body.style.overflowY = 'hidden'
      } else {
        navMenu.classList.remove('show')
        navMenu.classList.add('hide')
        closeNavMenu?.classList.remove('show')
        document.body.style.position = 'static'
        document.body.style.overflowY = 'auto'
        setTimeout(() => {
          store.dispatch('uiStore/_setNavMenuShowingStatus', status)
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
  static async ToggleNavBar(status: boolean): Promise<void> {
    const showNavBarBtn = document.querySelector('.showNavBarBtn')
    const nav = document.querySelector('.nav')
    if (status) {
      if (showNavBarBtn) {
        showNavBarBtn.classList.remove('show')
        showNavBarBtn.classList.add('hide')
      }
      if (nav) {
        nav.classList.remove('hide')
        nav.classList.add('show')
      }
    } else {
      if (showNavBarBtn) {
        showNavBarBtn.classList.remove('hide')
        showNavBarBtn.classList.add('show')
      }
      if (nav) {
        nav.classList.remove('show')
        nav.classList.add('hide')
      }
    }

    setTimeout(() => {
      store.dispatch('uiStore/_setNavBarShowingStatus', status)
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

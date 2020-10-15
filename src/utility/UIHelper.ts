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

  static async ToggleNavMenu(status: boolean): Promise<void> {
    const navMenu = document.querySelector('.navMenu')
    if (navMenu) {
      if (status) {
        await store.dispatch('uiStore/_setNavMenuShowingStatus', status)

        navMenu.classList.remove('hide')
        navMenu.classList.add('show')
      } else {
        navMenu.classList.remove('show')
        navMenu.classList.add('hide')

        setTimeout(() => {
          store.dispatch('uiStore/_setNavMenuShowingStatus', status)
        }, 500)
      }
    }
  }

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
}

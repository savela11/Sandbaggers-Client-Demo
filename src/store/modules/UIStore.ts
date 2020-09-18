import { IRootState } from '@/store'
import { ActionContext } from 'vuex'
import { IHeader, IUIState } from '@/types/UI/UIStoreTypes'
import { ISnackBar } from '@/types/UI/SnackBar'

const state: IUIState = {
  header: {
    current: '',
    title: 'Test',
    isShowing: true,
  },

  dataLoading: false,
  pageLoading: false,
  isNavBarShowing: true,
  snackBar: {
    title: '',
    message: '',
    errors: '',
    class: '',
    isSnackBarShowing: false,
  } as ISnackBar,
  deviceSize: '',
}

const getters = {
  Header: (state: IUIState): IHeader => state.header,
  IsNavBarShowing: (state: IUIState): boolean => state.isNavBarShowing,
  SnackBarClass: (state: IUIState): string | undefined => state.snackBar.class,
  DataLoadingStatus: (state: IUIState): boolean => state.dataLoading,
}

const mutations = {
  SetHeader(state: IUIState, headerInfo: IHeader): void {
    if (headerInfo.isShowing) {
      state.header.isShowing = true
      state.header.title = headerInfo.title
      state.header.current = headerInfo.current
    } else {
      state.header.isShowing = false
      state.header.title = ''
      state.header.current = ''
    }
  },
  SetHeaderTitle(state: IUIState, title: string): void {
    state.header.title = title
  },

  SetPageLoadingStatus(state: IUIState, loadingStatus: boolean): void {
    let loadingTime = Math.floor(Math.random() * 4000)

    if (!loadingStatus) {
      if (loadingTime < 1000) {
        loadingTime = loadingTime + 1000
      }
      setTimeout(() => {
        state.pageLoading = loadingStatus
      }, loadingTime)
    } else {
      state.pageLoading = loadingStatus
    }
  },

  SetDataLoadingStatus(state: IUIState, dataLoadingStatus: boolean): void {
    state.dataLoading = dataLoadingStatus
  },

  SetNavBarShowingStatus(state: IUIState, showingStatus: boolean): void {
    state.isNavBarShowing = showingStatus
  },

  SetHeaderShowingStatus(state: IUIState, showingStatus: boolean): void {
    state.header.isShowing = showingStatus
  },

  SetSnackBar(state: IUIState, snackBar: ISnackBar): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    if (!snackBar.isSnackBarShowing) {
      state.snackBar = {
        title: '',
        message: '',
        class: '',
        errors: [],
        isSnackBarShowing: false,
      }
    } else {
      state.snackBar = snackBar
      setTimeout(() => {
        state.snackBar = {
          title: '',
          message: '',
          class: '',
          errors: [],
          isSnackBarShowing: false,
        }
      }, 6000)
    }
  },

  SetDeviceSize(state: IUIState, deviceSize: string): void {
    state.deviceSize = deviceSize
  },
}

const actions = {
  _setHeader(context: ActionContext<IUIState, IRootState>, headerInfo: IHeader): void {
    context.commit('SetHeader', headerInfo)
  },

  _setHeaderTitle(context: ActionContext<IUIState, IRootState>, title: string): void {
    context.commit('SetHeaderTitle', title)
  },
  _setHeaderShowingStatus(context: ActionContext<IUIState, IRootState>, showingStatus: boolean): void {
    context.commit('SetHeaderShowingStatus', showingStatus)
  },

  _setDataLoading(context: ActionContext<IUIState, IRootState>, dataLoadingStatus: boolean): void {
    context.commit('SetDataLoadingStatus', dataLoadingStatus)
  },

  _setPageLoading(context: ActionContext<IUIState, IRootState>, loadingStatus: boolean): void {
    context.commit('SetPageLoadingStatus', loadingStatus)
  },

  _setNavBarShowingStatus(context: ActionContext<IUIState, IRootState>, showingStatus: boolean): void {
    context.commit('SetNavBarShowingStatus', showingStatus)
  },

  _setSnackBar(context: ActionContext<IUIState, IRootState>, snackBar: ISnackBar): void {
    context.commit('SetSnackBar', snackBar)
  },

  _setDeviceSize(context: ActionContext<IUIState, IRootState>, deviceSize: string): void {
    context.commit('SetDeviceSize', deviceSize)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}

// @Module({
//   namespaced: true,
//   name: 'uiStore',
//   dynamic: true,
//   store: Store,
// })
// class UIModule extends VuexModule {
//   headerTitle = 'Title'
//
//
//   @Mutation
//   SetHeaderTitle(headerTitle: string): void {
//     this.headerTitle = headerTitle
//   }
//
//   @Action({ commit: 'SetHeaderTitle' })
//   _setHeaderTitle(newHeaderTitle: string): string {
//     return newHeaderTitle
//   }
//
//
// }
//
// export default getModule(UIModule, Store)

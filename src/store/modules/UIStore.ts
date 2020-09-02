import { IRootState } from '@/store'
import { ActionContext } from 'vuex'
import { IHeaderInfo, IUIState } from '@/types/UI/UIStoreTypes'
import { ISnackBar } from '@/types/UI/SnackBar'

const state: IUIState = {
  headerTitle: null,
  dataLoading: false,
  pageLoading: false,
  isNavBarShowing: true,
  isHeaderShowing: true,
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
  HeaderTitle: (state: IUIState): string | null => state.headerTitle,
  IsNavBarShowing: (state: IUIState): boolean => state.isNavBarShowing,
  IsHeaderShowing: (state: IUIState): boolean => state.isHeaderShowing,
  SnackBarClass: (state: IUIState): string | undefined => state.snackBar.class,
  DataLoadingStatus: (state: IUIState): boolean => state.dataLoading,
}

const mutations = {
  SetHeader(state: IUIState, headerInfo: IHeaderInfo): void {
    if (headerInfo.isHeaderShowing) {
      state.isHeaderShowing = true
      state.headerTitle = headerInfo.title
    } else {
      state.isHeaderShowing = false
      state.headerTitle = null
    }
  },
  SetHeaderTitle(state: IUIState, title: string): void {
    state.headerTitle = title
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
    state.isHeaderShowing = showingStatus
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
  _setHeader(context: ActionContext<IUIState, IRootState>, headerInfo: IHeaderInfo): void {
    context.commit('SetHeader', headerInfo)
  },

  _setHeaderTitle(context: ActionContext<IUIState, IRootState>, title: string): void {
    context.commit('SetHeaderTitle', title)
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
  _setHeaderShowingStatus(context: ActionContext<IUIState, IRootState>, showingStatus: boolean): void {
    context.commit('SetHeaderShowingStatus', showingStatus)
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

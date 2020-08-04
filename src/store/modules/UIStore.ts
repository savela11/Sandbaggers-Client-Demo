import { IRootState } from '@/store'
import { ActionContext } from 'vuex'
import { IUIState } from '@/types/UI/UIStoreTypes'
import { ISnackBar } from '@/types/UI/SnackBar'

const state: IUIState = {
  headerTitle: null,
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
}

const getters = {
  HeaderTitle: (state: IUIState): string | null => state.headerTitle,
  IsNavBarShowing: (state: IUIState): boolean => state.isNavBarShowing,
  SnackBarClass: (state: IUIState): string | undefined => state.snackBar.class,
  DataLoadingStatus: (state: IUIState): boolean => state.dataLoading,
}

const mutations = {
  SetHeaderTitle(state: IUIState, title: string): void {
    state.headerTitle = title
  },

  SetPageLoadingStatus(state: IUIState, loadingStatus: boolean): void {
    let loadingTime = Math.floor(Math.random() * 4000)

    if (loadingStatus === false) {
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

  SetSnackBar(state: IUIState, snackBar: ISnackBar) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    if (snackBar.isSnackBarShowing === false) {
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
}

const actions = {
  _setHeaderTitle(context: ActionContext<IUIState, IRootState>, title: string) {
    context.commit('SetHeaderTitle', title)
  },

  _setDataLoading(context: ActionContext<IUIState, IRootState>, dataLoadingStatus: boolean) {
    context.commit('SetDataLoadingStatus', dataLoadingStatus)
  },

  _setPageLoading(context: ActionContext<IUIState, IRootState>, loadingStatus: boolean) {
    context.commit('SetPageLoadingStatus', loadingStatus)
  },

  _setNavBarShowingStatus(context: ActionContext<IUIState, IRootState>, showingStatus: boolean) {
    context.commit('SetNavBarShowingStatus', showingStatus)
  },

  _setSnackBar(context: ActionContext<IUIState, IRootState>, snackBar: ISnackBar) {
    context.commit('SetSnackBar', snackBar)
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

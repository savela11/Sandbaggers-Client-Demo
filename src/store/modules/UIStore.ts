import { IRootState } from '@/store'
import { ActionContext } from 'vuex'
import { IUIState } from '@/types/UI/UIStoreTypes'

const state: IUIState = {
  headerTitle: null,
  pageLoading: false,
  isNavBarShowing: true,
}

const getters = {
  HeaderTitle: (state: IUIState): string | null => state.headerTitle,
  IsNavBarShowing: (state: IUIState): boolean => state.isNavBarShowing,
}

const mutations = {
  SetHeaderTitle(state: IUIState, title: string): void {
    state.headerTitle = title
  },

  SetLoadingStatus(state: IUIState, loadingStatus: boolean): void {
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

  SetNavBarShowingStatus(state: IUIState, showingStatus: boolean): void {
    state.isNavBarShowing = showingStatus
  },
}

const actions = {
  _setHeaderTitle(context: ActionContext<IUIState, IRootState>, title: string) {
    context.commit('SetHeaderTitle', title)
  },

  _setPageLoading(context: ActionContext<IUIState, IRootState>, loadingStatus: boolean) {
    context.commit('SetLoadingStatus', loadingStatus)
  },

  _setNavBarShowingStatus(context: ActionContext<IUIState, IRootState>, showingStatus: boolean) {
    context.commit('SetNavBarShowingStatus', showingStatus)
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

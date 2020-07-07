import Store, { IRootState } from '@/store'
import { ActionContext } from 'vuex'

export interface IUiState {
  headerTitle: string | null
  pageLoading: boolean
}

const state: IUiState = {
  headerTitle: null,
  pageLoading: false,
}

const getters = {
  HeaderTitle: (state: IUiState): string | null => state.headerTitle,
}

const mutations = {
  SetHeaderTitle(state: IUiState, title: string): void {
    state.headerTitle = title
  },

  SetLoadingStatus(state: IUiState, loadingStatus: boolean): void {
    state.pageLoading = loadingStatus
    setTimeout(() => {
      state.pageLoading = false
    }, 3000)
  },
}

const actions = {
  _setHeaderTitle(context: ActionContext<IUiState, IRootState>, title: string) {
    context.commit('SetHeaderTitle', title)
  },

  _setPageLoading(context: ActionContext<IUiState, IRootState>, loadingStatus: boolean) {
    context.commit('SetLoadingStatus', loadingStatus)
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

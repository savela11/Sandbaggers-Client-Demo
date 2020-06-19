import { ISnackBar } from '@/types/UI/SnackBar'
import { ActionContext } from 'vuex'
import { IRootState } from '@/store'
import { IAuthState } from '@/store/modules/AuthStore'

export interface IMessageState {
  snackBar: ISnackBar
}

const state: IMessageState = {
  snackBar: {
    message: '',
    showSnackBar: false,
    errorList: [],
  } as ISnackBar,
}

const getters = {
  showSnackBar(state: IMessageState): ISnackBar {
    return state.snackBar
  },
}

const mutations = {
  SetSnackBar(state: IMessageState, snackBar: ISnackBar): void {
    if (snackBar.showSnackBar === true) {
      state.snackBar.message = snackBar.message
      state.snackBar.showSnackBar = true
      if (snackBar.errorList) {
        state.snackBar.errorList = snackBar.errorList
      }
    } else {
      state.snackBar.message = ''
      state.snackBar.showSnackBar = false
    }
  },
}

const actions = {
  _setSnackBar(context: ActionContext<IAuthState, IRootState>, snackBar: ISnackBar) {
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

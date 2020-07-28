import { ISnackBar } from '@/types/UI/SnackBar'
import { ActionContext } from 'vuex'
import { IRootState } from '@/store'
import { IAuthState } from '@/store/modules/AuthStore'

export interface ISnackBarState {
  title: string
  isSnackBarShowing: boolean
  snackBar: ISnackBar
}

const state: ISnackBarState = {
  title: 'test',
  isSnackBarShowing: false,
  snackBar: {
    message: '',
    showSnackBar: false,
    errorList: [],
  } as ISnackBar,
}

const getters = {
  showSnackBar(state: ISnackBarState): ISnackBar {
    return state.snackBar
  },
}

const mutations = {
  SetSnackBar(state: ISnackBarState, snackBar: ISnackBar): void {
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

import router from '../../router'
import { ICurrentUser } from '@/types/User/AuthUser'
import SecureLS from 'secure-ls'
import AuthService from '../../services/AuthService'
import { ActionContext } from 'vuex'
import { IRootState } from '..'
import Toast from '@/utility/Toasts'
import { ISuccessToastWithTitleAndMessage } from '@/types/UI/IToast'

const ls = new SecureLS({ isCompression: false })

export interface IAuthState {
  currentUser: ICurrentUser | null
  isLoggedIn: boolean
}

const state: IAuthState = {
  currentUser: null,
  isLoggedIn: false,
}

const getters = {
  CurrentUser: (state: IAuthState): ICurrentUser | null => state.currentUser,
}

const mutations = {
  SetCurrentUser(state: IAuthState, currentUser: ICurrentUser): void {
    state.currentUser = currentUser
    state.isLoggedIn = true
  },

  LogoutCurrentUser(state: IAuthState): void {
    state.currentUser = null
    state.isLoggedIn = false
  },
}

const actions = {
  async LoginUser(context: ActionContext<IAuthState, IRootState>, { vm, loginUser }: any): Promise<void> {
    try {
      const res = await AuthService.loginUser(loginUser)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
        await context.commit('SetCurrentUser', res.data)
        await router.push('/dashboard')
      }
    } catch (e) {
      Toast.errorToast({ vInstance: vm, colorVariant: 'danger', title: 'Error', message: e })
      console.log(e)
    }
  },

  async Logout(context: ActionContext<IAuthState, IRootState>): Promise<void> {
    try {
      await AuthService.logout()

      await context.commit('LogoutCurrentUser')
      ls.removeAll()
      localStorage.clear()
      await router.push('/login').catch(() => {})
      // @ts-ignore
      if (this._vm) {
        // @ts-ignore
        Toast.successToast({ vInstance: this._vm, title: 'Success', message: 'You have been logged out' })
      }
    } catch (e) {
      console.log(e)
    }
  },

  async LogoutWithError(context: ActionContext<IAuthState, IRootState>, { title, message }: ISuccessToastWithTitleAndMessage): Promise<void> {
    try {
      await AuthService.logout()
      await context.commit('LogoutCurrentUser')
      ls.removeAll()
      localStorage.clear()
      // @ts-ignore
      if (this._vm) {
        // @ts-ignore
        Toast.successToast({ vInstance: this._vm, title: title, message: message, colorVariant: 'danger' })
      }
    } catch (e) {
      console.log(e)
    }

    return
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}

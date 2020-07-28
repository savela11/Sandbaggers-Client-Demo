import router from '../../router'
import { ICurrentUser } from '@/types/User/AuthUser'
import SecureLS from 'secure-ls'
import AuthService from '../../services/AuthService'
import { ActionContext } from 'vuex'
import { IRootState } from '../index'
import { ISnackBar } from '@/types/UI/SnackBar'

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
  async LoginUser(context: ActionContext<IAuthState, IRootState>, { loginUser }: any): Promise<void> {
    try {
      const res = await AuthService.loginUser(loginUser)
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
        await context.commit('SetCurrentUser', res.data)
        await router.push('/dashboard')
      }
    } catch (e) {
      const snackBar: ISnackBar = {
        message: 'Error logging in',
        showSnackBar: true,
        errorList: [],
      }
      snackBar.errorList.push({ code: 'errorCode', description: e.data.message })
    }
  },

  async Logout(context: ActionContext<IAuthState, IRootState>): Promise<void> {
    try {
      await AuthService.logout()

      await context.commit('LogoutCurrentUser')
      ls.removeAll()
      localStorage.clear()
      await router.push('/login').catch(() => {})
    } catch (e) {
      console.log(e)
    }
  },

  async LogoutWithError(context: ActionContext<IAuthState, IRootState>): Promise<void> {
    try {
      await AuthService.logout()
      await context.commit('LogoutCurrentUser')
      ls.removeAll()
      localStorage.clear()
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

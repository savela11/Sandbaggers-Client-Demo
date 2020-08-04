import router from '../../router'
import { ICurrentUser } from '@/types/User/AuthUser'
import SecureLS from 'secure-ls'
import AuthService from '../../services/AuthService'
import { ActionContext } from 'vuex'
import { IRootState } from '../index'
import { ISnackBar } from '@/types/UI/SnackBar'
import { IUserProfile } from '@/types/Profile'

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

  UpdateCurrentUserProfile(state: IAuthState, currentUser: IUserProfile): void {
    if (state.currentUser) {
      state.currentUser.fullName = currentUser.firstName + ' ' + currentUser.lastName
      state.currentUser.profile.firstName = currentUser.firstName
      state.currentUser.profile.lastName = currentUser.lastName
      state.currentUser.email = currentUser.email
    } else {
      return
    }
  },
}

const actions = {
  async LoginUser(context: ActionContext<IAuthState, IRootState>, { loginUser }: any): Promise<void> {
    try {
      const res = await AuthService.loginUser(loginUser)
      if (res.status === 200) {
        console.log('store', res.data)
        localStorage.setItem('token', res.data.token)
        await context.commit('SetCurrentUser', res.data)
        await router.push('/dashboard')
      }
    } catch (e) {
      const snackBar: ISnackBar = {
        title: 'Login Error',
        message: e.data.message,
        isSnackBarShowing: true,
        class: 'error',
        errors: [],
      }
      await context.dispatch('uiStore/_setSnackBar', snackBar, { root: true })
      await context.dispatch('uiStore/_setDataLoading', false, { root: true })
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

  async updateCurrentUserProfile(context: ActionContext<IAuthState, IRootState>, currentUserProfile: IUserProfile): Promise<void> {
    context.commit('UpdateCurrentUserProfile', currentUserProfile)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}

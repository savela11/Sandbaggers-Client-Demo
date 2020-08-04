import router from '../../router'
import { ICurrentUser } from '@/types/User/AuthUser'
import SecureLS from 'secure-ls'
import AuthService from '../../services/AuthService'
import { ActionContext } from 'vuex'
import { IRootState } from '../index'
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

  UpdateCurrentUserProfile(state: IAuthState, updatedUser: ICurrentUser): void {
    if (state.currentUser) {
      // state.currentUser.fullName = currentUser.profile.firstName + ' ' + currentUser.profile.lastName
      // state.currentUser.profile.firstName = currentUser.profile.firstName
      // state.currentUser.profile.lastName = currentUser.lastName
      // state.currentUser.email = currentUser.email
      state.currentUser = updatedUser
      state.currentUser.fullName = updatedUser.profile.firstName + ' ' + updatedUser.profile.lastName
    } else {
      return
    }
  },
}

const actions = {
  async SetCurrentUser(context: ActionContext<IAuthState, IRootState>, currentUser: ICurrentUser): Promise<void> {
    localStorage.setItem('token', currentUser.token)
    context.commit('SetCurrentUser', currentUser)
    await router.push('/dashboard')
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

  async updateCurrentUser(context: ActionContext<IAuthState, IRootState>, updatedUser: ICurrentUser): Promise<void> {
    context.commit('UpdateCurrentUserProfile', updatedUser)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}

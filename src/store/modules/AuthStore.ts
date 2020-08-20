import router from '../../router'
import { ICurrentUser, ILoggedInUser } from '@/types/User/AuthUser'
import SecureLS from 'secure-ls'
import AuthService from '../../services/AuthService'
import { ActionContext } from 'vuex'
import { IRootState } from '@/store'

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
  SetLoggedInUser(state: IAuthState, loggedInUser: ILoggedInUser): void {
    state.currentUser = loggedInUser
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
  async SetLoggedInUser(context: ActionContext<IAuthState, IRootState>, loggedInUser: ILoggedInUser): Promise<void> {
    localStorage.setItem('token', loggedInUser.token)
    context.commit('SetLoggedInUser', loggedInUser)
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

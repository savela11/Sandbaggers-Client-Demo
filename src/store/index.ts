import { Store } from 'vuex'
import { IUser } from '@/types/Test/TestStore'
import { IUserProfile } from '@/types/User/User'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import { IUIState } from '@/types/UI/UIStoreTypes'
import authStore, { IAuthState } from '@/store/modules/AuthStore'
import uiStore from '@/store/modules/UIStore'

Vue.use(Vuex)
const ls = new SecureLS({ isCompression: false })

interface ITestStore {
  profile: IUserProfile
  user: IUser
}
export interface IRootState {
  authStore: IAuthState
  uiStore: IUIState
  testSTore: ITestStore
}

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'User',
      paths: ['authStore'],
      storage: {
        getItem: (key): string => {
          return ls.get(key)
        },
        setItem: (key, value): void => {
          ls.set(key, value)
        },
        removeItem: (key): void => {
          ls.remove(key)
        },
      },
    }),
  ],
  modules: {
    uiStore,
    authStore,

    // TestStore,
  },
}) as Store<IRootState>

// export const testStore = getModule(TestStore, store)

import { Store } from 'vuex'

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
import { IUIState } from '@/types/vuexStore/UIStore'
import authStore from '@/store/modules/AuthStore'
import uiStore from '@/store/modules/UIStore'
import navigationStore from '@/store/modules/NavigationStore'
import { IAuthState } from "@/types/vuexStore/AuthStore";
import { NavigationStoreState } from "@/types/vuexStore/NavigationStore";

Vue.use(Vuex)
const ls = new SecureLS({ isCompression: false })

// interface ITestStore {
//   profile: IUserProfile
//   user: IUser
// }
export interface IRootState {
  authStore: IAuthState
  uiStore: IUIState
  navigationStore: NavigationStoreState

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
    navigationStore
  },
}) as Store<IRootState>

// export const testStore = getModule(TestStore, store)

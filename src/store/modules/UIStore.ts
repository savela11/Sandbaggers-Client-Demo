import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import Store from '@/store'

export interface IUiState {
  headerTitle: string
  isHeaderShowing: boolean
  toastTimer: number
}

@Module({
  namespaced: true,
  name: 'uiStore',
  dynamic: true,
  store: Store,
})
class UIModule extends VuexModule {
  headerTitle = 'Title'
  isHeaderShowing = true
  toastTimer = 4000

  @Mutation
  SetHeaderTitle(headerTitle: string): void {
    this.headerTitle = headerTitle
  }
  @Mutation
  SetHeaderShowing(isHeaderShowing: boolean): void {
    this.isHeaderShowing = isHeaderShowing
  }

  @Action({ commit: 'SetHeaderTitle' })
  _setHeaderTitle(newHeaderTitle: string): string {
    return newHeaderTitle
  }

  @Action({ commit: 'SetHeaderShowing' })
  setHeaderShowing(headerShowingStatus: boolean): boolean {
    return headerShowingStatus
  }
}

export default getModule(UIModule, Store)

// const actions = {
//   SuccessToast(context: any, toastPayload: IToast): void {
//     if (toastPayload.success) {
//       toastPayload.vueInstance.$bvToast.toast(toastPayload.message, {
//         title: toastPayload.title,
//         variant: 'success',
//         autoHideDelay: 4000,
//       })
//     }
//   },
//   ErrorToast(context: any, { vm, payload }: any): void {

//       return
//     }
//     if (payload.errors) {
//       const entries = Object.entries(payload.errors)
//       for (const [key, property] of entries) {
//         const error = `${key}: ${property}`

//         vm.$bvToast.toast(property, {
//           title: key,
//           variant: 'danger',
//           autoHideDelay: state.toastTimer,
//         })
//       }
//     }
//   },
// }

// export default {
//   namespaced: true,
//   state,
//   actions,
//   mutations,
//   getters
// }

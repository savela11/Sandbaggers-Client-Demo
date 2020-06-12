import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import Store from '@/store'

export interface IUiState {
  headerTitle: string
  isHeaderShowing: boolean
  toastTimer: number
}

interface IError {
  message: string
  showSnackBar: boolean
}

@Module({
  namespaced: true,
  name: 'uiStore',
  dynamic: true,
  store: Store,
})
class UIModule extends VuexModule {
  headerTitle = 'Title'
  message = ''
  showSnackBar = false

  @Mutation
  SetHeaderTitle(headerTitle: string): void {
    this.headerTitle = headerTitle
  }

  @Action({ commit: 'SetHeaderTitle' })
  _setHeaderTitle(newHeaderTitle: string): string {
    return newHeaderTitle
  }

  @Mutation
  SetSnackBar(error: IError): void {
    if (error.showSnackBar === true) {
      this.message = error.message
    } else {
      this.message = ''
      this.showSnackBar = false
    }
  }

  @Action({ commit: 'SetSnackBar' })
  _errorMessage(error: IError): IError {
    return error
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

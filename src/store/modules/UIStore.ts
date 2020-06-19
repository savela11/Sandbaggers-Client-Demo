import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import Store from '@/store'
import { ISnackBar } from '@/types/UI/SnackBar'

export interface IUiState {
  headerTitle: string
  snackBar: ISnackBar
}

@Module({
  namespaced: true,
  name: 'uiStore',
  dynamic: true,
  store: Store,
})
class UIModule extends VuexModule {
  headerTitle = 'Title'


  @Mutation
  SetHeaderTitle(headerTitle: string): void {
    this.headerTitle = headerTitle
  }

  @Action({ commit: 'SetHeaderTitle' })
  _setHeaderTitle(newHeaderTitle: string): string {
    return newHeaderTitle
  }


}

export default getModule(UIModule, Store)

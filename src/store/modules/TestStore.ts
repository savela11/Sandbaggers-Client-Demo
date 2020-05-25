import { IProfile, IUser } from '@/types/Test/TestStore'
import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import Store from '@/store'

@Module({
  namespaced: true,
  name: 'testStore',
  dynamic: true,
  store: Store,
})
class TestModule extends VuexModule {
  profile: IProfile | null = null
  user: IUser | null = null
  testTitle = 'Test Title'

  @Mutation
  setUser(user: IUser): void {
    this.user = user
  }
  @Mutation
  setTestTitle(testTitle: string): void {
    this.testTitle = testTitle
  }

  @Action({ commit: 'setUser' })
  changeName(user: IUser): IUser {
    return user
  }

  @Action({ commit: 'setTestTitle' })
  changeTestTitle(newTitle: string): string {
    console.log(newTitle)
    return newTitle
  }
}

export default getModule(TestModule)

// export default TestModule

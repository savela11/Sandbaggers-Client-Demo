<template>
  <div class="testvue">
    {{ title }}
    <button v-on:click="changeTestTitle">test</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import testStore from '@/store/modules/TestStore'
import { IUser } from '@/types/Test/TestStore'
@Component({ name: 'Test' })
export default class Test extends Vue {
  title: null | string = null
  mounted(): void {
    this.$store.dispatch('uiStore/SetHeaderTitle', 'dashboard')
    const newUser: IUser = {
      email: 'test@email.com',
      token: 'lkjfdasdjk',
      username: 'fddfdsd',
    }
    this.title = testStore.testTitle
    testStore.changeName(newUser)
  }
  changeTestTitle(): void {
    testStore.changeTestTitle('weeedle')
  }
}
</script>
<style scoped lang="scss"></style>

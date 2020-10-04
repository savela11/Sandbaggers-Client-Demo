<template>
  <div><h1>UserProfile</h1></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIHelper from '@/utility/UIHelper'

@Component({ name: 'UserProfile' })
export default class UserProfile extends Vue {
  mounted(): void {
    UIHelper.PageLoading(false)
    UIHelper.Header({ title: 'Dashboard', isShowing: true, current: 'main' })
  }
}
</script>

<style scoped lang="scss"></style>

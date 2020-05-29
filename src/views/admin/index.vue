<template>
  <div>
    <h1>Admin</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIStore from '@/store/modules/UIStore'
@Component({ name: 'Header' })
export default class ComponentName extends Vue {
  mounted(): void {
    UIStore._setHeaderTitle('Admin')
  }
}
</script>

<style scoped lang="scss"></style>

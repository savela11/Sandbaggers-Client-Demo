<template>
  <div class="settingsView"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'

@Component({ name: 'SettingsView' })
export default class SettingsView extends Vue {
  @Prop() currentUser!: ICurrentUser
}
</script>

<style scoped lang="scss"></style>

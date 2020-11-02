<template>
  <header class="mainHeader">
    <div class="mainHeader__container" :style="{ backgroundColor: bgColor }">
      <div class="sbLogo"><img src="@/assets/SBLogo.png" alt="Sandbagger Logo" /></div>
      <div class="profile" @click.prevent.stop="closeNavMenu">
        <router-link to="/UserProfile"><img :src="currentUserImage" alt="Profile Image" /></router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { ICurrentUser } from '@/types/User/AuthUser'
import { Component, Vue, Prop } from 'vue-property-decorator'
import UIHelper from '@/utility/UIHelper'

@Component({ name: 'MainHeader' })
export default class MainHeader extends Vue {
  @Prop() currentUser!: ICurrentUser
  @Prop({ default: 'white' }) bgColor?: string

  closeNavMenu(): void {
    UIHelper.ToggleNavMenu(false)
  }
  get currentUserImage(): string {
    if (this.currentUser.profile.image === null) {
      return require('@/assets/icons/avatar.svg')
    } else {
      return this.currentUser.profile.image
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/ui/_mainHeader.scss';
</style>

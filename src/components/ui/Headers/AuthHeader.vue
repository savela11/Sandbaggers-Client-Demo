<template>
  <header class='authHeader'>
    <div class='authHeader__container' :style='{ backgroundColor: Header.bgColor }'>
      <div class='sbLogo'><img src='@/assets/SBLogo.png' alt='Sandbagger Logo' /></div>
      <div class='userBar'>
        <div class='utilityBar'>
          <button @click.prevent.stop='toggleUtilityMenu' :class="[utilityBarStatus ? 'show' : 'hide']">
            <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M3.84375 5.84375L2 7.6875L12.3125 18L22.625 7.6875L20.7812 5.84375L12.3125 14.3125L3.84375 5.84375Z' fill='#17252A' />
            </svg>
          </button>

        </div>
        <div class='profile' @click.prevent.stop='closeNavMenu'>
          <router-link to='/UserProfile'><img :src='currentUserImage' alt='Profile Image' /></router-link>
        </div>
      </div>

    </div>
  </header>
</template>

<script lang='ts'>

import { Component, Vue, Prop } from 'vue-property-decorator'
import { LoggedInUserVm } from '@/types/ViewModels/Models/UserVm'
import { IHeader } from '@/types/vuexStore/UIStore'
import NavigationHelper from '@/utility/NavigationHelper'

@Component({
  name: 'AuthHeader', components: {
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue')

  }
})
export default class AuthHeader extends Vue {
  @Prop() currentUser!: LoggedInUserVm
  @Prop() utilityBarStatus!: boolean
  @Prop({ default: 'white' }) bgColor?: string

  closeNavMenu(): void {
    NavigationHelper.ToggleNavMenu(false)
  }

  toggleUtilityMenu(): void {
    const currentUtilityMenuStatus = this.$store.state.navigationStore.isUtilityMenuShowing
    NavigationHelper.ToggleUtilityMenu(!currentUtilityMenuStatus)
  }

  get currentUserImage(): string {
    if (this.currentUser.image == null) {
      return require('@/assets/icons/avatar.svg')
    } else {
      return this.currentUser.image
    }
  }

  get Header(): IHeader {
    return this.$store.getters['uiStore/Header']
  }

}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/components/_authHeader";
</style>

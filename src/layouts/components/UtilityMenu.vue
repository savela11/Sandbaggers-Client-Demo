<template>
  <div class='utilityMenu'>
    <div @click.prevent.stop='toggleUtilityMenu'>
      <IconBtn btn-text='My Bets' :link-btn='true' link='/MyBets'>
        <template v-slot:svg>
          <svg viewBox='0 0 24 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M21.6 17.5H2.4V2.5H21.6V17.5ZM21.6 0H2.4C1.068 0 0 1.1125 0 2.5V17.5C0 18.163 0.252856 18.7989 0.702944 19.2678C1.15303 19.7366 1.76348 20 2.4 20H21.6C22.2365 20 22.847 19.7366 23.2971 19.2678C23.7471 18.7989 24 18.163 24 17.5V2.5C24 1.83696 23.7471 1.20107 23.2971 0.732233C22.847 0.263392 22.2365 0 21.6 0V0ZM10.8 16.25H13.2V15H14.4C14.7183 15 15.0235 14.8683 15.2485 14.6339C15.4736 14.3995 15.6 14.0815 15.6 13.75V10C15.6 9.66848 15.4736 9.35054 15.2485 9.11612C15.0235 8.8817 14.7183 8.75 14.4 8.75H10.8V7.5H15.6V5H13.2V3.75H10.8V5H9.6C9.28174 5 8.97652 5.1317 8.75147 5.36612C8.52643 5.60054 8.4 5.91848 8.4 6.25V10C8.4 10.3315 8.52643 10.6495 8.75147 10.8839C8.97652 11.1183 9.28174 11.25 9.6 11.25H13.2V12.5H8.4V15H10.8V16.25Z' fill='#17252A' />
          </svg>
        </template>
      </IconBtn>
    </div>

  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import NavigationHelper from '@/utility/NavigationHelper'

@Component({
  name: 'UtilityMenu',
  components: {
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue')
  }
})


export default class UtilityMenu extends Vue {

  toggleUtilityMenu(): void {
    NavigationHelper.ToggleUtilityMenu(false)
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/layouts/components/_utilityMenu.scss";
</style>

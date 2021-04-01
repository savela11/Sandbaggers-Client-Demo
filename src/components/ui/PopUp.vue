<template>
  <div class='popUp' :class='{ showPopUp: showPopUp === true }'>
    <div class='popUp__backDrop' v-show='showPopUp'></div>
    <div v-if='!isPopUpLoading' class='popUp__container' :class="[showPopUp === true ? 'show' : 'hide', {centered: isCentered} ]">
      <div class='popUp__content' >
        <button class='popUp__btn popUp__btn--close btn btn--icon' v-on='$listeners'>
          <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z'
                fill='#9F0000'
            />
          </svg>
        </button>
        <div class='popUp__landmark popUp__landmark--header' v-if='isHeader'>
          <slot name='header'></slot>
        </div>
        <div class='popUp__landmark popUp__landmark--body'>
          <div class='popUp__landmark--body__container'>
            <slot name='body'></slot>
          </div>
        </div>
        <div class='popUp__landmark popUp__landmark--footer' v-if='isFooter'>
          <slot name='footer'></slot>
        </div>
      </div>
    </div>

    <div v-else class='popUp__content'>

      <Loading />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'PopUp',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue')
  }
})
export default class PopUp extends Vue {
  @Prop({ default: false }) showPopUp!: boolean
  @Prop({ default: true }) isHeader?: boolean
  @Prop({ default: true }) isFooter?: boolean
  @Prop({ default: false }) isPopUpLoading?: boolean
  @Prop({ default: false }) isCentered?: boolean

}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/components/_popUp";
</style>

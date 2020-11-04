<template>
  <div class="modal">
    <div class="modal__background" v-on="$listeners"></div>
    <div class="modal__container">
      <div class="modal__closeButton">
        <button class="btn btn--xs" v-on="$listeners">Close</button>
      </div>
      <div class="modal__header section" v-if="isHeader">
        <slot name="header"></slot>
      </div>
      <div class="modal__body section" v-if="isBody">
        <slot name="body"></slot>
      </div>
      <div class="modal__footer section" v-if="isFooter">
        <slot name="footer"></slot>
        <div class="btnContainer">
          <slot name="submitBtn"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'Modal' })
export default class Modal extends Vue {
  @Prop({ default: true }) isHeader?: boolean
  @Prop({ default: true }) isBody?: boolean
  @Prop({ default: true }) isFooter?: boolean
  deviceSize = 'mobile'
  mounted(): void {
    window.addEventListener('resize', this.handleDeviceSize)
    this.handleDeviceSize()
  }
  destroyed(): void {
    window.removeEventListener('resize', this.handleDeviceSize)
  }

  handleDeviceSize(): string | undefined {
    let deviceSize
    if (window.innerWidth > 300 && window.innerWidth < 768 && this.deviceSize !== 'mobile') {
      deviceSize = 'mobile'
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024 && this.deviceSize !== 'tablet') {
      deviceSize = 'tablet'
    } else if (window.innerWidth >= 1024 && this.deviceSize !== 'desktop') {
      deviceSize = 'desktop'
    } else {
      return
    }
    this.deviceSize = deviceSize
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/ui/modal';
</style>

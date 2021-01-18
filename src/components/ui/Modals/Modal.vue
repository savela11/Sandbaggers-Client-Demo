<template>
  <div class="modal">
    <div class="modal__background" v-on="$listeners"></div>
    <div class="modal__container">
      <div class="modal__closeButton">
        <IconBtn v-on="$listeners">
          <template v-slot:svg>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z" fill="#9F0000" />
            </svg>

          </template>
        </IconBtn>
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
          <slot name="submitBtn"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Modal", components: {
    IconBtn: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/IconBtn.vue")
  }
})
export default class Modal extends Vue {
  @Prop({ default: true }) isHeader?: boolean;
  @Prop({ default: true }) isBody?: boolean;
  @Prop({ default: true }) isFooter?: boolean;
  deviceSize = "mobile";

  mounted(): void {
    window.addEventListener("resize", this.handleDeviceSize);
    this.handleDeviceSize();
  }

  destroyed(): void {
    window.removeEventListener("resize", this.handleDeviceSize);
  }

  handleDeviceSize(): string | undefined {
    let deviceSize;
    if (window.innerWidth > 300 && window.innerWidth < 768 && this.deviceSize !== "mobile") {
      deviceSize = "mobile";
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024 && this.deviceSize !== "tablet") {
      deviceSize = "tablet";
    } else if (window.innerWidth >= 1024 && this.deviceSize !== "desktop") {
      deviceSize = "desktop";
    } else {
      return;
    }
    this.deviceSize = deviceSize;
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/components/_modal";
</style>

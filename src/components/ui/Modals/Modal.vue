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
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.3rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;


  &__closeButton {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    @include tablet {
      right: 1rem;
      top: 1rem;
    }

  }

  &__background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    opacity: 0.46;
    background-color: rgb(33, 33, 33);
    border-color: rgb(33, 33, 33);
  }

  &__container {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    border-color: #fff;
    border-width: thin;
    position: relative;
    z-index: 10;
    padding: 2rem 1rem 1rem 1rem;
    @include tablet {
      padding: 2rem 2rem 1rem 2rem;
      width: 75%;
      height: 60%;
    }
    @include tablet-landscape {
      padding: 2rem;
      width: 60%;
      height: 75%;
    }
  }

  .section {
    padding: 0.5rem;

    @include tablet {
      padding: 1rem;
    }
  }

  &__header {
    border-bottom: 1px solid lightgrey;
  }

  &__body {
    height: 100%;
    overflow-y: scroll;

    .form {
      padding: 0;
    }
  }

  &__footer {
    .btnContainer {
      display: flex;
      justify-content: flex-end;
      margin: 0;
    }
  }
}


</style>

<template>
  <div class="popUp">
    <div class="popUp__backDrop"></div>
    <div class="container" :class="classStatus">
      <div class="flexButton">
        <button class="closeBtn" v-on="$listeners">
          <img :src="require('@/assets/icons/cancel-red.svg')" alt="remove user X" />
        </button>
      </div>

      <div class="container__title">
        <h4>{{ title }}</h4>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
interface IPopUp {
  title?: string
  status?: 'hide' | 'show'
  isPopUpShowing: boolean
}
@Component({ name: 'PopUp' })
export default class PopUp extends Vue {
  @Prop({ default: 'hide' }) classStatus!: string
  @Prop({ default: 'default' }) title!: string
}
</script>

<style scoped lang="scss">
.popUp {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  &__backDrop {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: transparent;
    width: 100%;
    height: 100%;
  }
  .container {
    background-color: white;
    width: 80%;
    border: 1px solid $DarkBlue;
    border-radius: 5px;
    padding: 0.2rem;
    z-index: 11;
    position: relative;

    &.hide {
      transform: translateX(150%);
      animation: hidePopUp 0.5s linear forwards;
    }
    &.show {
      transform: translateX(0);
      animation: showPopUp 0.5s linear forwards;
    }

    .flexButton {
      display: flex;
      justify-content: flex-end;
      .closeBtn {
        background-color: white;
        padding: 0.2rem;
        border: none;
      }
    }

    &__title {
      padding: 0.5rem;
      h4 {
        font-size: 1rem;
        text-align: center;
        color: $DarkBlue;
      }
    }

    .content {
      padding: 1rem;
      max-height: 300px;
      overflow-y: auto;
      min-height: 100px;
    }
  }
}

@keyframes showPopUp {
  0% {
    transform: translateX(150%);
    opacity: 0;
  }
  //50% {
  //  transform: translateX(100%);
  //  opacity: 0.5;
  //}

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes hidePopUp {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  //50% {
  //  transform: translateX(100%);
  //  opacity: 0.5;
  //}

  100% {
    transform: translateX(150%);
  }
}
</style>

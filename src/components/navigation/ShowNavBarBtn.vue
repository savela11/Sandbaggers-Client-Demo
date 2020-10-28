<template>
  <div class="showNavBarBtn">
    <button @click="showNavBar"><img src="@/assets/icons/showEye.svg" alt="Show Nav Bar Btn" /></button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIHelper from '@/utility/UIHelper'

@Component({ name: 'ShowNavBarBtn' })
export default class ShowNavBarBtn extends Vue {
  showNavBar(): void {
    UIHelper.ToggleNavBar(true)
  }
}
</script>

<style scoped lang="scss">
.showNavBarBtn {
  position: fixed;
  bottom: 0;
  right: 0.5rem;
  transform: translateY(100%);

  &.show {
    animation: showBTN 0.3s linear forwards;
  }

  &.hide {
    animation: hideBTN 0.3s linear forwards;
  }

  button {
    border: none;
    height: 40px;
    width: 40px;
    padding: 0.3rem;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      background-color: white;
      border-radius: 50px;
    }
  }
}

@keyframes showBTN {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
    bottom: 0.5rem;
  }
}

@keyframes hideBTN {
  0% {
    transform: translateY(0);
    bottom: 0.5rem;
  }
  100% {
    transform: translateY(100%);
    bottom: 0;
  }
}
</style>

<template>
  <div class="loadingContainer">
    <!--  <div class="loading" :class="`loading&#45;&#45;${value}`"></div>-->
    <div class="loading" :class="`loading--${value}`"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'Loading' })
export default class Loading extends Vue {
  @Prop({ default: '5%' }) topMargin: string | undefined
  @Prop({ default: 'small' }) value: string | undefined
}
</script>

<style scoped lang="scss">
.loadingContainer {
  display: flex;
  justify-content: center;
  padding-top: 10%
}
.loading {
  display: inline-block;
  padding: 0.5rem;
  &--small {
    width: 100px;
    height: 100px;
  }

  &--medium {
    width: 150px;
    height: 150px;
  }

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    border: 6px solid $DarkBlue;
    width: 100%;
    height: 100%;
    border-color: $DarkBlue transparent $DarkBlue transparent;
    animation: loading 1.2s linear infinite;
  }
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

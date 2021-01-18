<template>
  <div class="loadingContainer">
    <!--  <div class="loading" :class="`loading&#45;&#45;${value}`"></div>-->
    <div class="loading" :class="`loading--${value}`"></div>
    <p v-if="text">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'Loading' })
export default class Loading extends Vue {
  @Prop({ default: '5%' }) topMargin: string | undefined
  @Prop({ default: 'small' }) value: string | undefined
  @Prop() text: string | undefined
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/components/_loading";
</style>

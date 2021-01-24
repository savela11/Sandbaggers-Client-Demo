<template>
  <header class="heading">
    <div class="heading__container" v-bind:style="{ backgroundColor: backgroundColor }">
      <div class="heading__image">
        <svg viewBox="0 0 34 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="31.6004" cy="2.4" r="2.4" fill="white" />
          <circle cx="17.2004" cy="2.4" r="2.4" fill="white" />
          <circle cx="2.80039" cy="2.4" r="2.4" fill="white" />
          <circle cx="2.80039" cy="12" r="2.4" fill="white" />
          <circle cx="17.2004" cy="12" r="2.4" fill="white" />
          <circle cx="31.6004" cy="12" r="2.4" fill="white" />
          <circle cx="2.80039" cy="21.6" r="2.4" fill="white" />
          <circle cx="17.2004" cy="21.6" r="2.4" fill="white" />
          <circle cx="31.6004" cy="21.6" r="2.4" fill="white" />
          <circle cx="2.80039" cy="31.2" r="2.4" fill="white" />
          <circle cx="17.2004" cy="31.2" r="2.4" fill="white" />
          <circle cx="31.6004" cy="31.2" r="2.4" fill="white" />
          <circle cx="2.80039" cy="40.8" r="2.4" fill="white" />
          <circle cx="17.2004" cy="40.8" r="2.4" fill="white" />
          <circle cx="31.6004" cy="40.8" r="2.4" fill="white" />
          <circle cx="2.80039" cy="50.4" r="2.4" fill="white" />
          <circle cx="17.2004" cy="50.4" r="2.4" fill="white" />
          <circle cx="31.6004" cy="50.4" r="2.4" fill="white" />
          <circle cx="2.80039" cy="60" r="2.4" fill="white" />
          <circle cx="17.2004" cy="60" r="2.4" fill="white" />
          <circle cx="31.6004" cy="60" r="2.4" fill="white" />
        </svg>
      </div>
      <div class="heading__title">
        <h1>{{ title }}</h1>
      </div>
      <img class="heading__bgImg" :src="require('@/assets/test.jpg')" alt="" />
    </div>
    <div class="heading__smallText">
      <p>{{ smallText }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'DefaultHeader' })
export default class DefaultHeader extends Vue {
  @Prop({ default: 'Sandbaggers' }) private smallText: string | undefined
  @Prop({ default: 'Default' }) private title!: string
  @Prop({ default: '#425a41' }) private backgroundColor: string | undefined
  @Prop() private fontSize: string | undefined
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@use "~@/assets/styles/components/_defaultHeader.scss";
</style>

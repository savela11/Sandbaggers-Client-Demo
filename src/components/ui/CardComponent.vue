<template>
  <div class='card'>
    <div class='card__container'>
      <div class='card__section'>
        <slot name='sectionOne'></slot>
      </div>
      <div class='card__section'>
        <slot name='sectionTwo'></slot>
      </div>
      <div class='card__section'>
        <slot name='sectionThree'></slot>
      </div>
      <div class='card__section card__section--additional' v-if='additional'>
        <slot name='additional'></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'CardComponent',
  components: {}
})


export default class CardComponent extends Vue {
  @Prop({ default: false }) additional!: boolean
}
</script>

<style scoped lang='scss'>

@use "~@/assets/styles/components/_cardComponent.scss";

</style>

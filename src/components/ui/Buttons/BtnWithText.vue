<template>
  <div class="flex flex--column flex--iCenter">
    <button v-on="$listeners"><img :src="setImage" :alt="altText" /></button>
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'BtnWithText' })
export default class BtnWithText extends Vue {
  @Prop({ default: 'Default Alt Text' }) altText!: string
  @Prop({ default: 'addCircle' }) img!: string
  @Prop({ default: 'Default' }) text!: string

  get setImage(): string {
    return require('@/assets/icons/' + this.img + '.svg')
  }
}
</script>

<style scoped lang="scss">
button {
  border: none;
  background-color: transparent;
  padding: 0.2rem;
  img {
    height: 20px;
    width: 20px;
    object-fit: contain;
  }
}
p {
  font-size: 0.6rem;
}

@media (min-width: 375px) {
  button {
    img {
      height: 25px;
      width: 25px;
    }
  }
  p {
    font-size: 0.7rem;
  }
}
</style>

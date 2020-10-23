<template>
  <form class="form">
    <div class="form__field">
      <slot name="fieldOne"></slot>
    </div>
    <div class="form__field" v-if="numOfFields > 1">
      <slot name="fieldTwo"></slot>
    </div>
    <div class="form__field" v-if="numOfFields > 2">
      <slot name="fieldThree"></slot>
    </div>
    <div class="btnContainer">
      <slot name="button"></slot>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({ name: 'FormComponent' })
export default class FormComponent extends Vue {
  @Prop({ default: 1 }) numOfFields?: number
}
</script>

<style scoped lang="scss"></style>

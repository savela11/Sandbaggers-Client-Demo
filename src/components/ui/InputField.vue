<template>
  <div class="c-field-container">
    <div class="c-field" :class="[className, {active: isActive}]">
      <slot name="field"></slot>
    </div>
  </div>


</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "InputField", inheritAttrs: false })
export default class InputField extends Vue {
  @Prop({ default: "default" }) className?: string;
  @Prop({ default: false }) isActive?: boolean;


}
</script>

<style scoped lang="scss">
@import '~@/assets/styles/components/_InputField.scss';
</style>

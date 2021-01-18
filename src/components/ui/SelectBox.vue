<template>
  <div class="select-wrapper" v-on="$listeners">
    <div class="select" :class="{open: showOptions}">
      <div class="select__trigger">
        <div class="selectedSpan">
          <slot name="selected">
            <span>Selected</span>
          </slot>
        </div>
        <div class="arrow"></div>
      </div>
      <div class="options" v-show="showOptions">
        <slot name="options">
          <span class="option">Two</span>
          <span class="option">Three</span>
          <span class="option">Four</span>
        </slot>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({ name: "Header" })
export default class ComponentName extends Vue {
  @Prop({ default: false }) showOptions = false;

  @Emit("toggleOptions")
  toggleOptions(): void {
    const select = document.querySelector(".select");
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/components/_selectBox";
</style>

<template>
  <div class="ViewBtns">
    <button v-for="(btn, index) in viewButtons" class="viewBtn text text--sm" :class="{'active': activeViewBtn === btn}" :key="index" @click.prevent.stop="selectedBtn(btn)">{{ btn }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "ViewBtns" })


export default class ViewBtns extends Vue {
  @Prop() viewButtons!: Array<string>;
  @Prop() activeViewBtn!: string;

  selectedBtn(btn: string): void {
    this.$emit("selected-btn", btn);
  }
}
</script>

<style scoped lang="scss">

</style>

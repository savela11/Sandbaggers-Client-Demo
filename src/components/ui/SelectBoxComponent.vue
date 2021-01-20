<template>
  <div class='SelectBoxComponent'>
    <div class="select-wrapper" v-on="$listeners">
      <div class="select" :class="{open: showSelectOptions}">
        <div class="trigger">
          <div class="selectedSpan">
            <span v-if="selected" class="text text--sm">{{ selected[selectedValue] }}</span>
          </div>
          <div class="arrow"></div>
        </div>
        <div class="options" v-show="showSelectOptions">
          <span  class="option option--disabled text text--sm">{{ selected[selectedValue] }}</span>
          <span @click.prevent.stop="selectOption(option)" class="option text text--sm" v-for="(option, index) in options" :key="index">{{ option[optionValue] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "SelectBoxComponent" })


export default class SelectBoxComponent extends Vue {
  @Prop({ default: false }) showSelectOptions!: boolean;
  @Prop() selected?: any;
  @Prop() selectedValue?: string| number;
  @Prop() options!: Array<any>;
  @Prop() keyValue!: string | number;
  @Prop() optionValue!: string | number;

  selectOption(option: any): void {
    this.$emit("select-option", option);
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/components/_selectBox";


</style>

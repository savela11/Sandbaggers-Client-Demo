<template>
  <div class='SelectBoxComponent'>
    <div class='closeBg' v-show='showSelectOptions' v-on='$listeners'></div>
    <div class='select-wrapper' v-on='$listeners'>
      <div class='select' :class='{open: showSelectOptions}'>
        <div class='trigger'>
          <div class='selected'>
            <span v-if='selected' class='selected__span'>{{ selectedValue ? selected[selectedValue] : selected }}</span>
          </div>
          <div class='arrow'></div>
        </div>
        <div class='options' v-show='showSelectOptions'>
          <div v-if='displayOptionValues.length > 0' class='options__container'>
            <span class='option option--disabled '>{{ selectedValue ? selected[selectedValue] : selected }}</span>
            <span @click.prevent.stop='selectOption(option)' class='option' v-for='(option, index) in displayOptionValues'
                  :key='index'>{{ optionValue ? option[optionValue] : option }}</span>
          </div>
          <div v-else class='options__container'>
            <span class='option option--disabled '>No Options Available</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'SelectBoxComponent' })


export default class SelectBoxComponent extends Vue {
  @Prop({ default: false }) showSelectOptions!: boolean
  @Prop() selected?: any
  @Prop() selectedValue?: string | number
  @Prop() options!: Array<any>
  @Prop() optionValue?: string | number

  get displayOptionValues(): Array<any> {
    if (!this.optionValue && !this.selectedValue) {

      return this.options.filter(o => {
        return o !== this.selected
      })
    } else if (this.optionValue !== undefined && this.selectedValue) {
      const optionVal = this.optionValue
      const selectedVal = this.selectedValue
      return this.options.filter(o => {
        return o[optionVal] !== this.selected[selectedVal]
      })
    } else {
      return this.options
    }

  }

  selectOption(option: any): void {
    this.$emit('select-option', option)
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/components/_selectBox";


</style>

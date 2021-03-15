<template>
  <div class='paginationBtns'>
      <button  v-on:click.prevent.stop="changePage('previous')" :disabled='pageNumber === 0'>Previous</button>
      <button  v-on:click.prevent.stop="changePage('next')" :disabled='pageNumber >= itemsCount - 1'>Next</button>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'PaginationBtns',
  components: {}
})


export default class PaginationBtns extends Vue {
  @Prop() pageNumber!: number
  @Prop() itemsCount!: number
  @Prop() size!: number

  changePage(status: string): void {
    this.$emit('change-page', status)

  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/components/_paginationBtns.scss";
</style>

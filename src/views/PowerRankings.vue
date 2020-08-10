<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'PowerRankings' })
export default class PowerRankings extends Vue {
  mounted() {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Power Rankings')
    this.$store.dispatch('uiStore/_setPageLoading', false)
  }
}
</script>

<style scoped lang="scss"></style>

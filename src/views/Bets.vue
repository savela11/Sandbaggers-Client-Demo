<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIStore from '@/store/modules/UIStore'

@Component({ name: 'Bets' })
export default class Bets extends Vue {
  mounted() {
    UIStore._setHeaderTitle('Bets')
  }
}
</script>

<style scoped lang="scss"></style>

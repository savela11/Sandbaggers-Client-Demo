<template>
  <div class="loading" :style="`marginTop: ${topMargin}`">
    <v-progress-circular :size="100" color="secondary" indeterminate></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'Loading' })
export default class Loading extends Vue {
  @Prop({ default: '5%' }) topMargin: string | undefined
}
</script>

<style scoped lang="scss"></style>

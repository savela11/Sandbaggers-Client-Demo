<template>
  <div class="EventManager">
    <h2 class="text text--title color--primary">Being Built....</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'EventManager' })
export default class EventManager extends Vue {}
</script>

<style scoped lang="scss">
.EventManager {
}
</style>

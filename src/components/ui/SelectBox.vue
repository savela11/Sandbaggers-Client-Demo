<template>
  <div class="selectBox">
    <label for="year">Year</label>
    <select id="year" v-model="selectedYear">
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'Header' })
export default class ComponentName extends Vue {}
</script>

<style scoped lang="scss"></style>

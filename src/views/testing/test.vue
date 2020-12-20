<template>
  <div class="testvue">

    <h1 class="text text--tiny">Test tiny</h1>
    <h1 class="text text--tiny text--bold">Test tiny Bold</h1>
    <h1 class="text text--xs">Test xs</h1>
    <h1 class="text text--xs text--bold">Test xs Bold</h1>
    <h1 class="text text--sm">Test sm</h1>
    <h1 class="text text--sm text--bold">Test sm Bold</h1>
    <h1 class="text text--md">Test md </h1>
    <h1 class="text text--md text--bold">Test md Bold</h1>
    <h1 class="text text--lg">Test lg</h1>
    <h1 class="text text--lg text--bold">Test lg Bold</h1>
    <h1 class="text text--xl">Test xl</h1>
    <h1 class="text text--xl text--bold">Test xl Bold</h1>
    <h1 class="text text--title">Test title</h1>
    <h1 class="text text--title text--bold">Test title Bold</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "Test" })
export default class Test extends Vue {

}
</script>
<style scoped lang="scss"></style>

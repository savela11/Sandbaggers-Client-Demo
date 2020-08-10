<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'MockDrafts' })
export default class MockDrafts extends Vue {
  mounted() {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Mock Drafts')
    this.$store.dispatch('uiStore/_setPageLoading', false)
  }
}
</script>

<style scoped lang="scss"></style>

<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IHeader } from '@/types/UI/UIStoreTypes'

@Component({ name: 'MockDrafts' })
export default class MockDrafts extends Vue {
  mounted(): void {
    this.$store.dispatch('uiStore/_setHeader', { current: 'main', isShowing: true, title: 'Mock Drafts' } as IHeader)

    this.$store.dispatch('uiStore/_setPageLoading', false)
  }
}
</script>

<style scoped lang="scss"></style>

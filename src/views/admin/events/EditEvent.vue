<template>
  <div><h1>Edit Event</h1></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIHelper from '@/utility/UIHelper'

@Component({ name: 'EditEvent' })
export default class EditEvent extends Vue {
  mounted() {
    UIHelper.Header({ title: 'Edit Event', isShowing: true, current: 'main' })
  }
}
</script>

<style scoped lang="scss"></style>

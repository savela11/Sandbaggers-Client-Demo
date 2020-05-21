<template>
  <b-list-group-item v-on="$listeners" class="d-flex justify-content-between align-items-center mb-1">
    {{ fullName }}
    <b-badge class="btn" variant="primary" pill>{{ handicap }}</b-badge>
  </b-list-group-item>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({ name: 'sandbaggersListvue' })
export default class SandbaggerListItem extends Vue {
  @Prop() public fullName!: string
  @Prop() public id!: string
  @Prop() public profileId!: number
  @Prop() public handicap!: number
}
</script>
<style scoped lang="scss"></style>

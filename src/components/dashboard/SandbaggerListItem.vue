<template>
  <div></div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IUserWithProfile } from '@/types/User/User'
@Component({ name: 'sandbaggersListvue' })
export default class SandbaggerListItem extends Vue {
  // @Prop() public fullName!: string
  // @Prop() public id!: string
  // @Prop() public profileId!: number
  // @Prop() public handicap!: number
  @Prop() public sb!: IUserWithProfile

  items = [
    { text: 'Real-Time', icon: 'mdi-clock' },
    { text: 'Audience', icon: 'mdi-account' },
    { text: 'Conversions', icon: 'mdi-flag' },
  ]
}
</script>
<style scoped lang="scss"></style>

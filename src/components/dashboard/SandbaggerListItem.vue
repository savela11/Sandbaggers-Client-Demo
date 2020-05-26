<template>
  <v-list-item >
    <v-list-item-icon>
      <v-icon>mdi-account</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-row>
        <v-col>
          <v-list-item-title v-text="sb.fullName"></v-list-item-title>
        </v-col>
        <v-col>
          <v-list-item-title v-text="sb.profile.handicap"></v-list-item-title>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
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

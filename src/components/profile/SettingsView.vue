<template>
  <v-list three-line subheader>
    <v-list-item>
      <v-list-item-action>
        <v-checkbox v-model="currentUser.settings.updateHandicapOnLogin"></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>Update Profile</v-list-item-title>
        <v-list-item-subtitle>Open profile upon login to update handicap / settings.</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'

@Component({ name: 'SettingsView' })
export default class SettingsView extends Vue {
  @Prop() currentUser!: ICurrentUser
}
</script>

<style scoped lang="scss"></style>

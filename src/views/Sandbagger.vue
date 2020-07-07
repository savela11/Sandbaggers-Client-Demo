<template>
  <div class="Sandbagger">
    <div>
      <h1>{{ Sandbagger.fullName }}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserService from '../services/UsersService'
import UIStore from '@/store/modules/UIStore'
import { ICurrentUser } from '@/types/User/AuthUser'

@Component({ name: 'Sandbagger' })
export default class Sandbagger extends Vue {
  Sandbagger = {} as ICurrentUser

  mounted(): void {

    this.$store.dispatch('uiStore/_setHeaderTitle', 'Users Page')

    this.getUserInfo()
  }

  async getUserInfo(): Promise<void> {
    try {
      const res = await UserService.getUserByProfileId(this.$route.params.profileId.toString())
      if (res.data) {
        this.Sandbagger = res.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}
</script>
<style scoped lang="scss"></style>

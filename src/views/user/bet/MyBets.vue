<template>
  <div class='myBets'>
    <div v-if='!loading'>
      <h1>My Bets</h1>
      <div>
        <div v-for='bet in myBets' :key='bet.betId'>
          <p>{{ bet.title }}</p>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import BetService from '@/services/User/BetService'
import { BetVm } from '@/types/ViewModels/Models/BetVm'

@Component({
  name: 'MyBets',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue')
  }
})


export default class MyBets extends Vue {
  loading = true
  myBets: Array<BetVm> = []

  mounted(): void {
    this.getMyBets()
  }

  async getMyBets(): Promise<void> {
    const userId = this.$store.state.authStore.currentUser.id
    if (!userId) {
      return this.$router.go(-1)
    }

    try {
      const res = await BetService.MyBets(userId)
      if (res.status === 200) {
        this.myBets = res.data
      }

    } catch (e) {
      console.log(e)

    } finally {
      setTimeout(() => {
        this.loading = false

      }, 2000)
    }
  }
}
</script>

<style scoped lang='scss'>
.myBets {

}
</style>

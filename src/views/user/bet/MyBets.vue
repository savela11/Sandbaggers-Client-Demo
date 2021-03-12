<template>
  <div class='myBets'>
    <div v-if='!loading'>
      <h1>My Bets</h1>
      <div class='bet-list'>
        <Card v-for='bet in myBets' :key='bet.betId' :additional='true'>
          <template v-slot:sectionOne>
            <p class='card__text card__text--alt'>Created: {{ formatDate(bet.createdOn) }}</p>
            <p class='card__text card__text--alt'>Accepted:
              <span>{{ bet.acceptedBy.length }} of {{ bet.canAcceptNumber }}</span>
            </p>
          </template>
          <template v-slot:sectionTwo>
            <h3 class='card__text card__text--title'>{{ bet.title }}</h3>
          </template>
          <template v-slot:sectionThree>
          </template>
          <template v-slot:additional>
            <button>Edit</button>
          </template>
        </Card>

      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import BetService from '@/services/User/BetService'
import { BetVm } from '@/types/ViewModels/Models/BetVm'
import Helper from '@/utility/Helper'

@Component({
  name: 'MyBets',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    Card: (): Promise<typeof import('*.vue')> => import('@/components/ui/CardComponent.vue')
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

  formatDate(date: string): string {
    return Helper.formatDate(date)
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/user/bet/myBets.scss";
</style>

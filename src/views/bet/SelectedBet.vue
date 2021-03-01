<template>
  <div class="selectedBet">
    <!--    <BtnWithText class="backBtn" @click="$router.back()" v-bind="{ img: 'backArrow', text: 'Back' }" />-->
    <div v-if="selectedBet && !loading">
      <h2>{{ selectedBet.title }}</h2>
      <div class="createdBy section">
        <p>Created: {{ formatDate(selectedBet.createdOn) }}</p>
        <p>By: {{ selectedBet.createdBy.fullName }}</p>
      </div>
      <div class="acceptedBy section">
        <div class="one">
          <div>
            <h3 class="propTitle">Accepted:</h3>
            <span>{{ selectedBet.acceptedBy.length }} / {{ selectedBet.canAcceptNumber }}</span>
          </div>
          <div>
            <button v-if="canUserAcceptBet" @click.stop.prevent="acceptBet">Accept Bet</button>
          </div>
        </div>
        <div class="two">
          <div v-if="selectedBet.acceptedBy.length === 0" class="notAccepted">
            <p>No one has accepted this bet.</p>
          </div>
          <div v-else class="acceptedUsers">
            <div class="user" v-for="(user, index) in this.selectedBet.acceptedBy" :key="user.userId">
              <span class="indexNum">{{ index + 1 }}</span>
              <h4>{{ user.fullName }}</h4>
            </div>
          </div>
        </div>
      </div>

      <div class="description section">
        <h3>Description:</h3>

        <div class="descriptionBorder">
          <div class="inner">
            <p>{{ selectedBet.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BetService from '@/services/BetService'
import Helper from '@/utility/Helper'
import { LoggedInUserVm } from '@/types/ViewModels/Models/UserVm'
import { BetVm } from '@/types/ViewModels/Models/BetVm'
import { UserAcceptsBetDto } from '@/types/DTO/Bets/UserAcceptsBetDto'
import UIHelper from '@/utility/UIHelper'

@Component({
  name: 'SelectedBet',
  components: { Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue') },
})
export default class SelectedBet extends Vue {
  loading = true
  currentUser = {} as LoggedInUserVm
  selectedBet: BetVm | null = null

  mounted(): void {
    this.getSelectedBet()
    this.currentUser = this.$store.state.authStore.currentUser
  }

  get canUserAcceptBet(): boolean {
    const userIds = this.selectedBet?.acceptedBy.map((b) => {
      return b.id
    })
    // if the selected bet is the person who made the bet
    // or if user already accepted the bet
    // return false

    if (this.selectedBet && this.selectedBet.createdBy.id === this.currentUser.id) {
      return false
    } else if (userIds && userIds.includes(this.currentUser.id)) {
      return false
    } else return !(this.selectedBet && this.selectedBet.acceptedBy.length === this.selectedBet.canAcceptNumber)
  }

  formatDate(date: string): string {
    return Helper.formatDate(date)
  }

  async getSelectedBet(): Promise<void> {
    this.loading = true
    try {
      const res = await BetService.GetBetById(parseInt(this.$route.params.betId))
      if (res.status === 200) {
        this.selectedBet = res.data
      }
    } catch (e) {
      console.log(e)
      this.$router.go(-1)
    } finally {
      setTimeout(() => {
        this.loading = false
      }, Math.floor(Math.random() * 2000))
    }
  }

  async acceptBet(): Promise<void> {
    this.loading = true
    if (this.selectedBet) {
      const userAcceptsBet: UserAcceptsBetDto = {
        userId: this.currentUser.id,
        betId: this.selectedBet.betId,
      }
      try {
        const res = await BetService.UserAcceptsBet(userAcceptsBet)
        if (res.status === 200) {
          this.selectedBet.acceptedBy.push(res.data)
          UIHelper.SnackBar({ title: 'Success', message: 'Your bet was accepted.', isSnackBarShowing: true, classInfo: 'primary' })
        }
      } catch (e) {
        console.log(e)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, Math.floor(Math.random() * 3000))
      }
    }
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/bet/_selectedBet";
</style>

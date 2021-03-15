<template>
  <div class='myBet'>
    <div v-if='!loading'>

      <div class='myBet__section'>
        <div class='myBet__updated-on'>
          <p class='myBet__text myBet__text--small-text'><strong>Last updated:</strong> {{ formatDate(Bet.updatedOn) }}
          </p>
        </div>
        <InputField :isActive="Bet.title !== ''">
          <template v-slot:field>
            <label for='title'>Title</label>
            <input type='text' id='title' v-model.trim='Bet.title' />
          </template>
        </InputField>
      </div>
      <div class='myBet__section'>
        <h2 class='myBet__text myBet__text--secondary-title'>Active</h2>

      </div>
      <div class='myBet__section'>
        <h2 class='myBet__text myBet__text--secondary-title'>Requires Passcode</h2>

      </div>
      <div class='myBet__section'>
        <h2 class='myBet__text myBet__text--secondary-title'>How many can accept?</h2>

      </div>
      <div class='myBet__section'>
        <InputField :isActive="Bet.description !== ''" class-name='textArea'>
          <template v-slot:field>
            <label for='description'>Description</label>
            <textarea type='text' id='description' v-model.trim='Bet.description' />
          </template>
        </InputField>
      </div>

      <div class='myBet__section'>
        <button>Update</button>
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
  name: 'MyBet',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue')
  }
})


export default class MyBet extends Vue {
  loading = true
  Bet: BetVm | null = null

  mounted(): void {
    this.myBet()
  }


  formatDate(date: string): string {
    return Helper.formatDate(date)
  }

  async myBet(): Promise<void> {
    const betId = parseInt(this.$route.params.betId)
    try {
      const res = await BetService.BetVmById(betId)
      if (res.status === 200) {
        this.Bet = res.data

        this.loading = false
      }

    } catch (e) {
      console.log(e)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/user/bet/myBet.scss";

</style>

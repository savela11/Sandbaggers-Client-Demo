<template>
  <div class="betsView">
    <div class="bet" v-for="bet in Bets" :key="bet.betId">
      <div class="bet__title">
        <h3>{{ bet.title }}</h3>
      </div>

      <div class="activeStatus">
        <div>
          <h4>Active</h4>
          <div class="inputs">
            <div>
              <p>Yes</p>
              <input id="bet" type="radio" v-model="bet.isActive" v-bind:value="true" />
            </div>
            <div>
              <p>No</p>
              <input type="radio" v-model="bet.isActive" v-bind:value="false" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BetService from '../../services/BetService'
import { ICurrentUser } from '@/types/User/AuthUser'
import { IBetDto } from '@/types/Bets/Bet'
@Component({ name: 'BetsView', components: { Loading: (): Promise<object> => import('@/components/ui/Loading.vue') } })
export default class BetsView extends Vue {
  activeButton = 'All'
  viewButtons = ['All', 'Accepted', 'Not Accepted']
  selectedBet: number | null = null
  loading = false
  isEditMode = false
  @Prop() cUserID!: string
  Bets = [] as IBetDto[]
  textAreaHeight = '0'
  mounted(): void {
    this.getUserBets()
  }

  get resizeTextArea() {
    return {
      'min-height': this.textAreaHeight,
    }
  }
  resizeEditTextArea() {
    this.$nextTick(() => {
      const textArea = this.$refs.textRef as HTMLElement[]
      this.textAreaHeight = `${textArea[0].scrollHeight}px`
    })
  }

  get filterBets(): IBetDto[] {
    if (this.activeButton === 'Accepted') {
      return this.Bets.filter((bet) => {
        if (bet.acceptedBy.length > 0) {
          return bet
        }
      })
    } else if (this.activeButton === 'Not Accepted') {
      return this.Bets.filter((bet) => {
        if (bet.acceptedBy.length < 1) {
          return bet
        }
      })
    } else {
      return this.Bets
    }
  }

  formatDate(date: string): string {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    const year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [month, day, year].join('-')
  }

  toggleEditBet(bet: IBetDto): void {
    this.textAreaHeight = '0'

    if (this.isEditMode === true) {
      this.isEditMode = false
      this.selectedBet = null
    } else {
      this.selectedBet = bet.betId
      this.isEditMode = true

      this.resizeEditTextArea()
    }
  }

  selectBet(betId: number): void {
    if (this.selectedBet === betId) {
      this.selectedBet = null
      return
    }
    this.selectedBet = betId
  }

  async getUserBets(): Promise<void> {
    this.loading = true
    try {
      const res = await BetService.GetUserBets(this.cUserID)
      this.Bets = res.data
      this.loading = false
    } catch (error) {
      this.loading = false
      console.log(error)
    }
  }

  async updateBet(bet: IBetDto): Promise<void> {
    this.loading = true
    try {
      this.selectedBet = null
      this.isEditMode = false
      const res = await BetService.UpdateBet(bet)
      if (res.status === 200) {
        this.loading = false
      }
      console.log(res.data)
    } catch (e) {
      console.log(e)
      this.loading = false
    }
  }

  cancelBet() {
    this.selectedBet = null
    this.isEditMode = false
  }
}
</script>

<style scoped lang="scss">
.betsView {
  .bet {
    border: 1px solid grey;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    height: 100px;
    border-radius: 5px;

    &__title {
      h3 {
        font-size: 1rem;
      }
    }

    .activeStatus {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      align-items: flex-end;
      h4 {
        font-size: 0.9rem;
        font-weight: normal;
        text-align: center;
      }
      p {
        font-size: 0.6rem;
        text-align: center;
      }

      .inputs {
        display: flex;
        margin-top: 0.3rem;
        input {
          width: 20px;
          height: 20px;
        }

        & > div {
          &:first-child {
            margin-right: 1rem;
          }
        }
      }
    }
  }
}
</style>

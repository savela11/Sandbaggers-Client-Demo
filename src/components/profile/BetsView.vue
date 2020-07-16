﻿<template>
  <div class="betsView"></div>
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
  @Prop() currentUser!: ICurrentUser
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
      const res = await BetService.GetUserBets(this.currentUser.id)
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
.userBets {
  .formField {
    margin-bottom: 1rem;

    &__message {
      font-size: 0.7rem;
      color: red;
      margin: 0;
    }
  }
  .buttons {
    display: flex;
    margin-bottom: 1rem;

    button {
      flex: 1;
      margin-right: 0.2rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
  .card {
    max-width: 344px;
    margin: 0 auto 1.4rem auto;
    box-shadow: 3px 3px 10px $DarkGreen;
    .editMode {
      &--description {
        background-color: rgba(211, 211, 211, 0.6);
        padding: 0.2rem 0.5rem;

        input,
        textarea {
          width: 100%;
          padding: 0.3rem 0.2rem;
          outline: none;
          resize: none;
          height: 0;

          &:disabled {
            opacity: 0.1;
            background-color: rgba(211, 211, 211, 0.2);
          }
        }
      }
    }

    .betStatus {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      p {
        margin: 0;
        text-align: center;
      }
      .betStatusButtons {
        margin-left: 1rem;
        display: flex;
        align-items: center;
        button {
          border: 1px solid $DarkBlue;
          height: auto;
          flex: 0 1 50%;
          padding: 0.1rem 0.6rem;
          border-radius: 5px;

          &.isActive {
            color: white;

            background-color: green;
          }
          &.notActive {
            color: white;

            background-color: #8b2635;
          }

          &:disabled {
            opacity: 0.2;
            cursor: not-allowed;
          }

          &:first-child {
            margin-right: 0.3rem;
          }
        }
      }
    }

    .titleContainer {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      align-items: flex-start;

      & > div:nth-child(1) {
        font-size: 1rem;
      }

      .betAmount {
        display: flex;
        justify-content: flex-end;
        flex: 1 0 20%;

        .circle {
          border: 1px solid black;
          padding: 0.2rem 0.2rem;
          min-width: 40px;
          min-height: 40px;
          border-radius: 100%;
          p {
            margin: 0;
            font-size: 0.8rem;
            text-align: center;
          }
        }
      }
    }
  }
}

@media (min-width: 375px) {
  .userBets {
    .formField {
      &__message {
      }
    }
    .buttons {
      button {
        &:last-child {
        }
      }
    }
    &__card {
    }
    .editMode {
      &--description {
        input,
        textarea {
          &:disabled {
          }
        }
      }
    }

    .betStatus {
      p {
      }
      .betStatusButtons {
        button {
          &.isActive {
          }
          &.notActive {
          }

          &:disabled {
          }

          &:first-child {
          }
        }
      }
    }

    .titleContainer {
      & > div:nth-child(1) {
      }

      .betAmount {
        .circle {
          p {
          }
        }
      }
    }
  }
}
</style>

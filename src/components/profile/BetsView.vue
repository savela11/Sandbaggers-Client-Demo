﻿<template>
  <div class="userBets">
    <div v-if="!loading">
      <div class="buttons">
        <v-btn class="caption" v-for="button in viewButtons" :key="button" :class="{ secondary: button === activeButton }" @click="activeButton = button">{{ button }} </v-btn>
      </div>

      <v-card class="mx-auto mb-5" max-width="344" v-for="bet in filterBets" :key="bet.betId">
        <v-card-title class="titleContainer">
          <div>
            {{ bet.title }}
          </div>
          <div class="betAmount">
            <div class="circle">
              <p>${{ bet.amount }}</p>
            </div>
          </div>
        </v-card-title>

        <v-card-subtitle class="">
          <div>
            <p class="ma-0">Last Updated: {{ formatDate(bet.updatedOn) }}</p>
            <p class="ma-0">Accepted by: {{ bet.acceptedBy.length > 0 ? bet.acceptedBy.length : 0 }}</p>
          </div>
          <div class="betStatus" v-if="isEditMode && bet.betId === selectedBet">
            <p>Active:</p>
            <div class="betStatusButtons">
              <button :class="{ isActive: bet.isActive === true && bet.betId === selectedBet }" @click="bet.isActive = true">Yes</button>
              <button :class="{ notActive: bet.isActive === false && bet.betId === selectedBet }" @click="bet.isActive = false">No</button>
            </div>
          </div>
        </v-card-subtitle>

        <v-card-actions>
          <div>
            <v-btn color="red" text @click.prevent.stop="toggleEditBet(bet)" v-if="!isEditMode">
              Edit
            </v-btn>
            <div v-if="isEditMode && bet.betId === selectedBet" class="d-flex">
              <v-btn color="green" text @click="updateBet(bet)">Update</v-btn>
              <v-btn color="black" text @click="cancelBet">Cancel</v-btn>
            </div>
          </div>

          <v-spacer></v-spacer>

          <v-btn icon @click="selectBet(bet.betId)" v-if="!isEditMode">
            <v-icon>{{ bet.betId === selectedBet ? 'mdi-chevron-down' : 'mdi-chevron-up' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="selectedBet === bet.betId">
            <v-divider></v-divider>

            <v-card-text class="pa-2">
              <div v-if="!isEditMode" class="notEditMode">
                <p class="ma-0">
                  {{ bet.description }}
                </p>
              </div>

              <div class="formField" v-if="isEditMode && selectedBet === bet.betId">
                <div class="withErrorMessage">
                  <label for="amount">Amount</label>
                  <p v-if="bet.acceptedBy.length > 0" class="formField__message">Unable to change amount when bet has been accepted.</p>
                </div>
                <div class="editMode editMode--description">
                  <input id="amount" class="inputField" type="number" v-bind:disabled="bet.acceptedBy.length > 0" ref="textRef" v-model="bet.amount" :style="resizeTextArea" />
                </div>
              </div>

              <div class="formField" v-if="isEditMode && selectedBet === bet.betId">
                <label for="title">Title</label>
                <div class="editMode editMode--description">
                  <textarea id="title" class="textArea" type="text" ref="textRef" v-model="bet.title" :style="resizeTextArea"> </textarea>
                </div>
              </div>
              <div class="formField" v-if="isEditMode && selectedBet === bet.betId">
                <label for="description">Description</label>
                <div class="editMode editMode--description">
                  <textarea id="description" class="textArea" type="text" ref="textRef" v-model="bet.description" :style="resizeTextArea"> </textarea>
                </div>
              </div>
            </v-card-text>
          </div>
        </v-expand-transition>
      </v-card>
    </div>

    <Loading v-if="loading" value="large" />
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
  &__card {
    border: 1px solid grey;
    height: 100px;
    border-radius: 10px;
  }
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

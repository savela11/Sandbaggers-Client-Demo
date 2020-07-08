<template>
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

        <v-card-subtitle class="d-flex justify-space-between">
          <div>
            <p class="ma-0">Last Updated: {{ formatDate(bet.updatedOn) }}</p>
            <p class="ma-0">Accepted by: {{ bet.acceptedBy.length > 0 ? bet.acceptedBy.length : 0 }}</p>
          </div>
          <div class="betStatus" v-if="isEditMode && bet.betId === editSelectedBet.betId">
            <p>Active</p>
            <div class="betStatusButtons">
              <button :class="{ isActive: bet.isActive === true && bet.betId === editSelectedBet.betId }" @click="toggleActiveStatus(true)">Yes</button>
              <button :class="{ notActive: bet.isActive === false && bet.betId === editSelectedBet.betId }">No</button>
            </div>
          </div>
        </v-card-subtitle>

        <v-card-actions>
          <div>
            <v-btn color="red" text @click="toggleEditBet(bet)">
              {{ isEditMode && bet.betId === editSelectedBet.betId ? 'Done' : 'Edit' }}
            </v-btn>
          </div>

          <v-spacer></v-spacer>

          <v-btn icon @click="selectBet(bet.betId)">
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="selectedBet === bet.betId">
            <v-divider></v-divider>

            <v-card-text>
              <div v-if="!isEditMode">
                <p class="ma-0">
                  {{ bet.description }}
                </p>
              </div>

              <div v-if="isEditMode" class="editMode editMode--description">
                <input type="text" v-model="editSelectedBet.description" />
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
import { IBetDto, IUserAcceptedBet } from '@/types/Bets/Bet'

@Component({ name: 'BetsView', components: { Loading: () => import('@/components/ui/Loading.vue') } })
export default class BetsView extends Vue {
  activeButton = 'All'
  show = false
  isEditMode = false
  viewButtons = ['All', 'Accepted', 'Not Accepted']
  editSelectedBet = {} as IBetDto | null
  selectedBet: number | null = null
  loading = false
  @Prop() currentUser!: ICurrentUser
  Bets = [] as IBetDto[]

  mounted(): void {
    this.getUserBets()
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

  toggleActiveStatus(status: boolean) {}

  toggleEditBet(bet: IBetDto): void {
    this.isEditMode = !this.isEditMode

    if (this.isEditMode) {
      this.editSelectedBet = bet
    } else {
      this.editSelectedBet = null
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
}
</script>

<style scoped lang="scss">
.userBets {
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
      background-color: lightgrey;
      padding: 0.5rem 0.8rem;

      input {
        width: 100%;
        height: 100%;
        padding: 0.3rem 0.5rem;
        outline: none;
      }
    }
  }
  .betStatus {
    p {
      margin: 0;
      text-align: center;
    }
    .betStatusButtons {
      display: flex;
      align-items: center;
      button {
        border: 1px solid $DarkBlue;
        height: auto;
        flex: 0 1 50%;
        padding: 0.1rem 0.6rem;
        border-radius: 5px;

        &:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }

        &:first-child {
          margin-right: 0.3rem;
          background-color: green;
          color: white;
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
        padding: 0.3rem 0.2rem;
        border-radius: 100%;
        p {
          margin: 0;
          font-size: 1rem;
        }
      }
    }
  }

  &__searchBar {
    display: flex;
    justify-content: flex-end;

    .bar {
      border: 1px solid $DarkBlue;
      padding: 0.2rem 0.8rem;
      border-radius: 5px;
      flex: 0 1 60%;
      position: relative;
      height: 40px;
      display: flex;

      .search {
        position: relative;
        flex: 1;
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0.3rem 0.5rem;
        outline: none;
      }

      .search {
      }
    }
  }
}
</style>

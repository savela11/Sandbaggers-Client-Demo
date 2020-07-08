<template>
  <div class="bet">
    <div class="bet__buttons flex">
      <v-text-field v-model="search" label="Search Bets"></v-text-field>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="btn" outlined color="secondary" small dark v-bind="attrs" v-on="on">
            {{ currentView }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(view, index) in views" :key="index" @click="currentView = view">
            <v-list-item-title>{{ view }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <div class="bet__list">
      <v-card class="mb-2" outlined v-for="bet in filterBets" :key="bet.betId">
        <v-list-item>
          <v-list-item-content>
            <div class="mb-4 d-flex justify-space-between">
              <p class="overline ma-0">Created by: {{ bet.createdBy }}</p>
              <div>
                <p class="ma-0">${{ bet.amount }}</p>
              </div>
            </div>
            <v-list-item-title class="headline mb-1">{{ bet.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ bet.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions class="justify-end">
          <v-btn text class="text--secondary">View</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIStore from '@/store/modules/UIStore'
import BetService from '@/services/BetService'
import { IBetDto } from '@/types/Bets/Bet'

@Component({ name: 'Bets' })
export default class Bets extends Vue {
  currentView = 'All'
  Bets = [] as Array<IBetDto>
  search = ''
  views = ['All', 'By Name']
  mounted() {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Bets')
    this.getBets()
  }

  get filterBets(): Array<IBetDto> {
    if (this.currentView === 'All') {
      return this.Bets
    } else if (this.currentView === 'By Name') {
      return this.Bets.filter((bet) => {
        return bet.title.toLowerCase().includes(this.search.toLowerCase())
      })
    } else {
      return this.Bets
    }
  }

  async getBets() {
    try {
      const res = await BetService.AllActiveBets()
      if (res.status === 200) {
        await this.$store.dispatch('uiStore/_setPageLoading', false)
        this.Bets = res.data
      }
    } catch (e) {
      console.log(e)

      await this.$store.dispatch('uiStore/_setPageLoading', false)
    }
  }
}
</script>

<style scoped lang="scss">
.bet {
  &__buttons {
    display: flex;
    align-items: center;

    .btn {
      margin-left: 1rem;
      min-width: 75px;
    }
  }
}
</style>

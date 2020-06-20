<template>
  <div>
    <div class="bets__buttons flex justify-around">
      <v-btn :class="{ active: createBet === false }" small>My Bets</v-btn>
      <v-btn :class="{ active: createBet === true }" @click="toggleCreateBet()" small>Create Bet</v-btn>
    </div>
    <hr class="my-5" />
    <div v-if="createBet">
      <div class="">
        <form class="bg-white shadow-md rounded mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
              Title
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'BetsView' })
export default class BetsView extends Vue {
  createBet = false

  toggleCreateBet(): void {
    this.createBet = !this.createBet
  }
}
</script>

<style scoped lang="scss">
.bet__buttons {
  .active {
    background-color: $DarkBlue;
  }
}
</style>

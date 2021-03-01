<template>
  <div class="sandbagger" v-if="Sandbagger">
    <div class="top">
      <div class="imageContainer">
        <img v-if="Sandbagger.image" :src="Sandbagger.image" alt="User Profile Image" />
        <img v-else src="@/assets/SBLogo.png" alt="User Profile Image" />
      </div>
      <div class="userInfo">
        <h2>{{ Sandbagger.fullName }}</h2>
        <p>Handicap: {{ Sandbagger.handicap }}</p>
      </div>
    </div>
    <div class="viewButtons">
      <button v-for="view in views" :key="view" :class="{ active: view === currentView }" @click="setCurrentView(view)">{{ view }}</button>
    </div>

    <div class="bottom">
      <div class="container">
        <div class="handicapHistory" v-if="currentView === 'Handicaps'">
          <div class="title">
            <p>Date</p>
            <p>Handicap</p>
          </div>
          <div v-if="Sandbagger.handicapHistory && Sandbagger.handicapHistory.length > 0" class="handicapList">
            <div class="handicap" v-for="(history, index) in Sandbagger.handicapHistory" :key="index">
              <p>{{ formatDate(history.date) }}</p>
              <p>{{ history.handicap }}</p>
            </div>
          </div>
          <div v-else class="noHistory">
            <p>No Handicap history found</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormatMixins from "@/mixins/FormatMixins.vue";
import UserHistoryService from "@/services/UserHistoryService";
import UIHelper from "@/utility/UIHelper";
import { UserHistoryVm } from "@/types/ViewModels/Models/UserHistoryVm";

@Component({ name: "Sandbagger", mixins: [FormatMixins] })
export default class Sandbagger extends Vue {
  Sandbagger = {} as UserHistoryVm;
  views = ["Handicaps", "Bets", "Stats"];
  currentView = "Handicaps";

  mounted(): void {
    this.getUserInfo();
  }

  // get userHandicapHistory(): IHandicapHistory[] | null {
  //   if (this.Sandbagger && this.Sandbagger.handicapHistory.length > 0) {
  //     return this.Sandbagger.handicapHistory.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  //   } else {
  //     return null
  //   }
  // }

  async getUserInfo(): Promise<void> {
    try {
      const res = await UserHistoryService.sandBaggerWithHistory(this.$route.params.id.toString());
      if (res.data) {
        this.Sandbagger = res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  setCurrentView(view: string): void {
    this.currentView = view;
  }
}
</script>
<style scoped lang="scss">
@use "~@/assets/styles/views/_sandbagger";
</style>

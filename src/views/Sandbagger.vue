<template>
  <div class="sandbagger" v-if="Sandbagger">
    <div class="top">
      <div class="backButton" @click.prevent="setBackToDashboard">
        <router-link to="/dashboard" class="btn btn--borderGreen btn--xs btn--borderBottom">Back</router-link>
      </div>
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
import { UserHistoryVm } from "@/types/ViewModels/UserHistoryVm";

@Component({ name: "Sandbagger", mixins: [FormatMixins] })
export default class Sandbagger extends Vue {
  Sandbagger = {} as UserHistoryVm;
  views = ["Handicaps", "Bets", "Stats"];
  currentView = "Handicaps";

  mounted(): void {
    this.getUserInfo();
  }

  setBackToDashboard(): void {
    UIHelper.ToggleNavBar(true);
  }

  // get userHandicapHistory(): IHandicapHistory[] | null {
  //   if (this.Sandbagger && this.Sandbagger.handicapHistory.length > 0) {
  //     return this.Sandbagger.handicapHistory.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  //   } else {
  //     return null
  //   }
  // }

  async getUserInfo(): Promise<void> {
    await UIHelper.ToggleNavBar(false);
    try {
      const res = await UserHistoryService.sandBaggerWithHistory(this.$route.params.id.toString());
      if (res.data) {
        this.Sandbagger = res.data;
      }
    } catch (error) {
      console.log(error);
    } finally {
      await UIHelper.Header({ title: "Sandbagger", isShowing: false });
    }
  }

  setCurrentView(view: string): void {
    this.currentView = view;
  }
}
</script>
<style scoped lang="scss">
.sandbagger {


  .top {
    padding: 2rem 0 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;

    .backButton {
      position: absolute;
      top: 1rem;
      left: 1rem;
    }

    .imageContainer {
      width: 150px;
      height: 150px;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        border-radius: 10px;
      }
    }

    .userInfo {
      margin-top: 0.5rem;

      h2 {
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        letter-spacing: 1.5px;
        color: #0b080f;
        margin-bottom: 0.5rem;
        @include mobile {
          font-size: 1.4rem;
        }
      }

      p {
        font-size: 1rem;
        color: grey;
        text-align: center;
      }
    }
  }

  .viewButtons {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 0.2rem 0;
    scroll-behavior: smooth;
    @include tablet {
      padding: 0.2rem 1rem;
      display: flex;
    }

    button {
      display: inline-block;
      font-size: 0.8rem;
      padding: 0.2rem 0.6rem;
      height: 80px;
      width: 100px;
      white-space: normal;
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
      color: $DarkBlue;
      border-radius: 5px;
      border-right: 1px solid black;
      outline: none;
      margin: 0 0.2rem 0 0;
      @include tablet {
        width: 125px;
        height: 100px;
        font-size: 1rem;
        margin: 0 0.5rem 0 0;
      }

      &.active {
        font-weight: bold;

        color: white;
        background-color: lighten($DarkBlue, 10%);
      }

      &:last-child {
        margin: 0;
      }
    }
  }

  .bottom {
    position: relative;
    z-index: 25;
    padding-top: 0.2rem;
    height: 250px;
    overflow: hidden;
    transform: translateY(-25px);

    .container {
      border-top: 3px solid $DarkBlue;
      border-radius: 25px;
      height: 100%;
      background-color: white;

      @include tablet {
        transform: translateY(-5px);
      }

      .handicapHistory {
        height: 100%;
        padding: 2rem;

        .title {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;

          p {
            color: grey;
          }
        }

        .handicapList {
          padding: 0 .8rem 0 0;
          overflow-y: auto;
          max-height: 100%;
        }

        .handicap {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid lightgrey;
          margin-bottom: 0.4rem;
        }

        .noHistory {
          margin-top: 2rem;

          p {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>

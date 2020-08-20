<template>
  <div class="sandbagger" v-if="Sandbagger && Sandbagger.profile">
    <div class="top">
      <div class="backButton" @click.prevent="setBackToDashboard"><router-link to="/dashboard" class="btn btn--borderGreen btn--xs btn--borderBottom">Back</router-link></div>
      <div class="imageContainer">
        <img v-if="Sandbagger.profile.image" :src="Sandbagger.profile.image" alt="User Profile Image" />
        <img v-else src="@/assets/SBLogo.png" alt="User Profile Image" />
      </div>
      <div class="userInfo">
        <h2>{{ Sandbagger.fullName }}</h2>
        <p>Handicap: {{ Sandbagger.profile.handicap }}</p>
      </div>
    </div>
    <div class="viewButtons">
      <button v-for="view in views" :key="view" :class="{ active: view === currentView }" @click="setCurrentView(view)">{{ view }}</button>
    </div>

    <div class="bottom">
      <div class="container">
        <div class="handicapHistory" v-if="currentView === 'Handicap History'">
          <div class="title">
            <p>Date</p>
            <p>Handicap</p>
          </div>
          <div v-if="userHandicapHistory">
            <div class="handicap" v-for="(history, index) in userHandicapHistory" :key="index">
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
import { Component, Vue } from 'vue-property-decorator'
import UserService from '../services/UsersService'
import FormatMixins from '@/mixins/FormatMixins.vue'
import { IHandicapHistory, IUserWithHistory } from '@/types/User/User'

@Component({ name: 'Sandbagger', mixins: [FormatMixins] })
export default class Sandbagger extends Vue {
  Sandbagger = {} as IUserWithHistory
  views = ['Handicap History', 'Bet History', 'Stat History']
  currentView = 'Handicap History'
  mounted(): void {
    this.getUserInfo()
  }

  setBackToDashboard(): void {
    this.$store.dispatch('uiStore/_setHeaderShowingStatus', true)
    this.$store.dispatch('uiStore/_setNavBarShowingStatus', true)
  }

  get userHandicapHistory(): IHandicapHistory[] | null {
    if (this.Sandbagger && this.Sandbagger.handicapHistory.length > 0) {
      return this.Sandbagger.handicapHistory
    } else {
      return null
    }
  }

  async getUserInfo(): Promise<void> {
    await this.$store.dispatch('uiStore/_setNavBarShowingStatus', false)
    try {
      const res = await UserService.getUserWithHistory(this.$route.params.id.toString())
      if (res.data) {
        this.Sandbagger = res.data
      }
    } catch (error) {
      console.log(error)
    } finally {
      await this.$store.dispatch('uiStore/_setHeaderShowingStatus', false)
      await this.$store.dispatch('uiStore/_setPageLoading', false)
    }
  }

  setCurrentView(view: string): void {
    this.currentView = view
  }
}
</script>
<style scoped lang="scss">
.sandbagger {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr 80px 1fr;

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
        font-size: 1.6rem;
        font-weight: bold;
        text-align: center;
        letter-spacing: 1.5px;
        color: #0b080f;
        margin-bottom: 0.5rem;
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

    button {
      display: inline-block;
      font-size: 0.8rem;
      padding: 0.2rem 0.6rem;
      height: 80px;
      width: 80px;
      white-space: normal;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
      color: $DarkBlue;
      border-radius: 5px;
      border-right: 1px solid black;
      outline: none;
      margin-right: 0.2rem;
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

    .container {
      border-top: 3px solid $DarkBlue;
      border-radius: 25px;
      height: 100%;
      background-color: white;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      transform: translateY(-15px);
      padding: 2rem;

      .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;

        p {
          color: grey;
        }
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
</style>

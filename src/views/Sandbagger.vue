<template>
  <div class="sandbagger" v-if="Sandbagger && Sandbagger.profile">
    <div class="top">
      <div class="imageContainer">
        <img v-if="Sandbagger.profile.image" :src="Sandbagger.profile.image" alt="User Profile Image" />
        <img v-else src="@/assets/SBLogo.png" alt="User Profile Image" />
      </div>
      <div class="userInfo">
        <h2>{{ Sandbagger.fullName }}</h2>
        <p>Handicap: {{ Sandbagger.profile.handicap }}</p>
      </div>
    </div>
    <div class="middle">
      <div class="viewButtons">
        <button>one</button>
        <button>two</button>
        <button>three</button>
        <button>four</button>
        <button>five</button>
      </div>
    </div>

    <div class="bottom">
      <div class="container"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserService from '../services/UsersService'
import { ICurrentUser } from '@/types/User/AuthUser'

@Component({ name: 'Sandbagger' })
export default class Sandbagger extends Vue {
  Sandbagger = {} as ICurrentUser

  mounted(): void {
    this.getUserInfo()
  }

  async getUserInfo(): Promise<void> {
    await this.$store.dispatch('uiStore/_setNavBarShowingStatus', false)
    try {
      const res = await UserService.getUserByProfileId(this.$route.params.profileId.toString())
      if (res.data) {
        this.Sandbagger = res.data
        await this.$store.dispatch('uiStore/_setPageLoading', false)
      }
    } catch (error) {
      console.log(error)
    }
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
    background-color: $DarkBlue;

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
        color: white;
        margin-bottom: 0.5rem;
      }

      p {
        font-size: 1rem;
        color: white;
        text-align: center;
      }
    }
  }

  .middle {
    overflow-x: hidden;
    position: relative;
    overflow-y: hidden;
    z-index: 10;
    background-color: $DarkBlue;
    .viewButtons {
      position: relative;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      padding: 0.2rem 0;
      scroll-behavior: smooth;

      button {
        display: inline-block;
        font-size: 0.9rem;
        font-weight: bold;
        padding: 0.2rem 0.6rem;
        height: 80px;
        width: 80px;
        background-color: lighten($DarkBlue, 10%);
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 5px;
        border-right: 1px solid black;
        outline: none;

        &.active {
          border-bottom: 1px outset white;
        }

        &:last-child {
          margin: 0;
        }
      }
    }
  }
  .bottom {
    position: relative;
    z-index: 25;
    padding-top: 0.2rem;

    .container {
      border-radius: 25px;
      height: 100%;
      background-color: white;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      transform: translateY(-15px);
    }
  }
}
</style>

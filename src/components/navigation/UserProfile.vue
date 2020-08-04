<template>
  <div class="userProfile" v-if="currentUser.profile">
    <div class="userProfile__closeBar">
      <button class="btn btn--xs" @click="closeUserProfile">Close</button>
    </div>

    <div class="userProfile__top">
      <div class="img">
        <img v-if="currentUser.profile.image" :src="currentUser.profile.image" alt="User Profile Image" />
        <img v-else src="@/assets/SBLogo.png" alt="User Profile Image" />
      </div>
      <div class="info">
        <h2>{{ currentUser.fullName }}</h2>
        <p class="handicap">
          Handicap <span>{{ currentUser.profile.handicap }}</span>
        </p>
      </div>
    </div>

    <div class="userProfile__bottom">
      <div class="currentViewTitle">
        <div v-if="currentView">
          <h3>{{ currentView }}</h3>
        </div>
        <div v-if="currentView">
          <button @click="setCurrentViewOption(null)" class="btn btn--xs btn--white">Close</button>
        </div>
      </div>
      <div class="viewButtons">
        <button v-for="view in viewOptions" :key="view" @click="setCurrentViewOption(view)" :id="view" :class="{ active: currentView === view }">{{ view }}</button>
      </div>

      <div class="currentView">
        <ProfileView v-if="currentView === 'Profile' && !loading" :cUser="currentUser" @updateCurrentUserProfile="updateCurrentUserProfile" />
        <Loading v-if="loading" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import UsersService from '@/services/UsersService'
import { ICurrentUser } from '@/types/User/AuthUser'
import ProfileService from '@/services/ProfileService'
import { IUserProfile } from '@/types/Profile'
@Component({
  name: 'UserProfile',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
    ProfileView: (): Promise<object> => import('@/components/profile/ProfileView.vue'),
    BetsView: (): Promise<object> => import('@/components/profile/BetsView.vue'),
    SettingsView: (): Promise<object> => import('@/components/profile/SettingsView.vue'),
  },
})
export default class UserProfile extends Vue {
  @Prop({ default: false }) dialog!: boolean
  loading = false
  viewOptions = ['Profile', 'Settings', 'Bets', 'Posts']
  currentView: string | null = null
  mounted(): void {}

  @Emit('closeUserProfile')
  closeUserProfile(): boolean {
    return false
  }

  get currentUser(): ICurrentUser {
    return this.$store.getters['authStore/CurrentUser']
  }
  setCurrentViewOption(view: string | null) {
    this.currentView = view
    const bottom = document.querySelector('.userProfile__bottom') as HTMLElement

    if (view) {
      bottom.classList.add('show')
    } else {
      bottom.classList.remove('show')
      bottom.classList.add('hide')

      setTimeout(() => {
        bottom.classList.remove('hide')
      }, 300)
    }
  }

  async updateCurrentUserProfile(userProfile: IUserProfile): Promise<void> {
    this.loading = true

    await this.$store.dispatch('authStore/updateCurrentUserProfile', userProfile)

    try {
      const res = await ProfileService.UpdateCurrentUserProfile(this.currentUser)
      if (res.status === 200) {
        setTimeout(() => {
          this.setCurrentViewOption('')
          this.loading = false
        }, 3000)
      } else {
        this.loading = false
      }
    } catch (e) {
      console.log(e)
      setTimeout(() => {
        this.loading = false
      }, 3000)
    }
  }

  Logout(): void {
    this.$store.dispatch('authStore/Logout', { vm: this })
    this.closeUserProfile()
  }
}
</script>
<style scoped lang="scss">
.userProfile {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;

  &__closeBar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0.5rem 1rem;

    button {
    }
  }

  &__top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    .img {
      width: 150px;
      height: 150px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }

    .info {
      margin-top: 1rem;
      h2 {
        font-size: 1.6rem;
        font-weight: bold;
        text-align: center;
        letter-spacing: 1.5px;
        color: #0b080f;
      }
      p {
        margin-top: 0.5rem;
        text-align: center;
      }

      .handicap {
        color: grey;
      }
    }
  }

  &__bottom {
    background-color: $DarkBlue;
    height: 100%;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    padding: 1rem 0 0 0;
    max-height: 125px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    &.show {
      max-height: 450px;
      animation: showBottomMenu 0.3s linear forwards;
    }

    &.hide {
      max-height: 125px;
      animation: hideBottomMenu 0.3s linear forwards;
    }

    .currentViewTitle {
      padding: 1rem 1rem 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        color: white;
      }
    }
    .viewButtons {
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      padding: 0 1rem 1rem 1rem;
      scroll-behavior: smooth;
      max-width: 100%;
      button {
        display: inline-block;
        font-size: 0.9rem;
        font-weight: bold;
        padding: 0.2rem 0.6rem;
        height: 50px;
        width: 80px;
        margin-right: 1rem;
        background-color: lighten($DarkBlue, 10%);
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 10px;
        border: none;
        outline: none;

        &.active {
          border-bottom: 1px outset white;
        }

        &:last-child {
          margin: 0;
        }
      }
    }

    .currentView {
      padding: 0.5rem 0.5rem 0 0.5rem;
      height: 100%;
      & > div {
        background-color: white;
        max-height: 400px;
        overflow-y: scroll;
        border-radius: 10px;
      }

      .loadingContainer {
        height: 100%;
      }
    }
  }
}

.logoutButton {
  color: white;
  margin-top: 10rem;
}

@keyframes showBottomMenu {
  0% {
    max-height: 125px;
  }
  100% {
    max-height: 450px;
  }
}

@keyframes hideBottomMenu {
  0% {
    max-height: 450px;
  }
  100% {
    max-height: 125px;
  }
}
</style>

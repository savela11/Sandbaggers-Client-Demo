<template>
  <div class="userProfile" v-if="currentUser.profile">
    <div class="userProfile__closeBar">
      <button class="btn btn--xs" @click="closeUserProfile">Close</button>
    </div>

    <div class="userProfile__top">
      <button class="editButton" @click="toggleEditMode">
        <div v-if="!isEditMode">
          <img src="@/assets/icons/editPencil.svg" alt="Edit Pencil" />
          <span> Edit</span>
        </div>
        <div v-if="isEditMode">
          <img src="@/assets/icons/cloudSave.svg" alt="Cloud Save" />
          Save
        </div>
      </button>
      <div class="img">
        <img v-if="currentUser.profile.image" :src="currentUser.profile.image" alt="User Profile Image" />
        <img v-else src="@/assets/SBLogo.png" alt="User Profile Image" />
      </div>
      <div class="updateProfileImage" v-if="isEditMode">
        <label for="profileImage">Profile Image</label>
        <input type="text" id="profileImage" v-model="profileImage" />
      </div>
      <div class="info">
        <h2>{{ currentUser.fullName }}</h2>
        <div class="handicap">
          <p>Handicap</p>
          <span v-if="!isEditMode">{{ currentUser.profile.handicap }}</span>
          <input v-else type="number" step=".1" v-model.number="handicap" />
        </div>
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

      <div class="currentView" v-if="isBottomMenuShowing">
        <ProfileView v-if="currentView === 'Profile' && !loading" :cUser="currentUser" @updateCurrentUserProfile="updateCurrentUser" />
        <BetsView v-if="currentView === 'Bets' && !loading" :cUser="currentUser" />
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
  isEditMode = false
  currentUser = {} as ICurrentUser

  handicap: number | null = null
  profileImage: string | null = null
  debounce: number | undefined
  isBottomMenuShowing = false
  mounted(): void {
    this.getCurrentUser()
  }

  @Emit('closeUserProfile')
  closeUserProfile(): boolean {
    return false
  }

  updateHandicap(e: any) {
    this.handicap = null
    clearTimeout(this.debounce)
    this.debounce = setTimeout(() => {
      this.handicap = e.target.value
      if (this.handicap) {
        this.currentUser.profile.handicap = this.handicap
        this.updateCurrentUser(this.currentUser)
        this.handicap = null
      }
    }, 5000)
  }

  updateProfileImage(e: any) {
    this.profileImage = null
    clearTimeout(this.debounce)
    this.debounce = setTimeout(() => {
      this.profileImage = e.target.value
      if (this.profileImage) {
        this.currentUser.profile.image = this.profileImage
        this.updateCurrentUser(this.currentUser)
        this.profileImage = null
      }
    }, 5000)
  }

  setCurrentViewOption(view: string | null) {
    this.currentView = view
    const bottom = document.querySelector('.userProfile__bottom') as HTMLElement

    if (view) {
      this.isBottomMenuShowing = true
      bottom.classList.add('show')
    } else {
      bottom.classList.remove('show')
      bottom.classList.add('hide')

      setTimeout(() => {
        bottom.classList.remove('hide')
        this.isBottomMenuShowing = false
      }, 300)
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode
    if (this.isEditMode === true) {
      this.handicap = this.currentUser.profile.handicap
      this.profileImage = this.currentUser.profile.image
    } else {
      this.currentUser.profile.image = this.profileImage
      this.currentUser.profile.handicap = this.handicap || 0

      this.updateCurrentUser(this.currentUser)
    }
  }

  async updateCurrentUser(updatedUser: ICurrentUser): Promise<void> {
    this.currentUser = updatedUser
    await this.$store.dispatch('authStore/updateCurrentUser', updatedUser)
    if (this.currentView !== null) {
      this.loading = true
      try {
        const res = await ProfileService.UpdateCurrentUserProfile(this.currentUser)
        if (res.status === 200) {
          setTimeout(() => {
            this.setCurrentViewOption(null)
            this.loading = false
          }, 3000)
        } else {
          this.loading = false
        }
      } catch (e) {
        setTimeout(() => {
          this.loading = false
        }, 3000)
      }
    } else {
      try {
        this.isBottomMenuShowing = false
        const res = await ProfileService.UpdateCurrentUserProfile(this.currentUser)
        if (res.status === 200) {
          this.isBottomMenuShowing = true
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  getCurrentUser() {
    this.currentUser = this.$store.state.authStore.currentUser
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
    position: relative;

    .editButton {
      border: none;
      position: absolute;
      top: 1rem;
      left: 1rem;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      span {
        font-size: 0.8rem;
        color: grey;
      }
      img {
        height: 30px;
        width: 30px;
        object-fit: contain;
      }
    }

    .img {
      width: 150px;
      height: 150px;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        border-radius: 10px;
      }
    }

    .updateProfileImage {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      label {
        margin-bottom: 0.3rem;
        font-size: 0.8rem;
        color: grey;
      }
      input {
        padding: 0.3rem;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid lightgrey;
        outline: none;
        background-color: transparent;
        width: 100%;
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

      .handicap {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        height: 20px;
        p {
          color: grey;
          margin-right: 0.3rem;
          text-align: center;
        }
        span {
          color: grey;
        }
        input {
          width: 50px;
          height: 100%;
          padding: 0.3rem;
          font-size: 1rem;
          border-radius: 10px;
          border: none;
          border-bottom: 2px solid $DarkGreen;
          outline: none;
          background-color: transparent;

          &:focus {
            font-weight: bold;
          }
        }
      }
    }
  }

  &__bottom {
    background-color: $DarkBlue;
    height: 100%;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    padding: 1rem 0 0 0;
    max-height: 100px;
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
      padding: 0 0.5rem 0.5rem 0.5rem;
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
        padding: 1rem;
        background-color: white;
        max-height: 280px;
        overflow-y: scroll;
        border-radius: 10px;
        height: 100%;
        overflow-y: auto;
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

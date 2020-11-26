<template>
  <div class="userProfile" v-if="currentUser.profile">
    <div class="userProfile__backBar">
      <button @click="() => this.$router.back()" class="btn btn--xs">Back</button>
    </div>

    <div class="userProfile__top">
      <button class="editButton" @click="toggleEditMode">
        <span v-if="!isEditMode">
          <img src="@/assets/icons/editPencil.svg" alt="Edit Pencil" />
          <span> Edit</span>
        </span>
        <span v-if="isEditMode">
          <img src="@/assets/icons/cloudSave.svg" alt="Cloud Save" />
          Save
        </span>
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
          <p>Handicap:</p>
          <span v-if="!isEditMode">{{ currentUser.profile.handicap }}</span>
          <label v-if="isEditMode" for="handicap" class="hideLabel">Handicap</label>
          <input v-if="isEditMode" id="handicap" type="number" step=".1" v-model.number="handicap" />
        </div>
      </div>
    </div>

    <div class="userProfile__bottom">
      <div class="currentViewTitle" v-if="currentView">
        <div>
          <h3>{{ currentView }}</h3>
        </div>
        <div>
          <button @click="setCurrentViewOption(null)" class="btn btn--xs btn--white">Close</button>
        </div>
      </div>
      <div class="viewButtons">
        <button v-for="view in viewOptions" :key="view" @click="setCurrentViewOption(view)" :id="view" :class="{ active: currentView === view }">{{ view }}</button>
      </div>

      <div class="currentView" v-if="isBottomMenuShowing">
        <ProfileView v-show="currentView === 'Profile'" :cUser="currentUser" @updateCurrentUserProfile="updateCurrentUser" />
        <SettingsView
          v-show="currentView === 'Settings' && !loading"
          :cUserSettings="currentUser.settings"
          :cUserRoles="currentUser.roles"
          @toggleFavoriteLinks="toggleFavoriteLinks"
        />
        <BetsView v-show="currentView === 'Bets'" :cUserID="currentUser.id" />
        <!--        <IdeasView v-if="currentView === 'Ideas' && !loading" :cUser="currentUser" />-->
        <Loading v-if="loading" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'
import ProfileService from '@/services/ProfileService'
import { AddRemoveFavLink } from '@/components/profile/SettingsView.vue'

@Component({
  name: 'UserProfile',
  components: {
    ProfileView: (): Promise<object> => import('@/components/profile/ProfileView.vue'),
    SettingsView: (): Promise<object> => import('@/components/profile/SettingsView.vue'),
    BetsView: (): Promise<object> => import('@/components/profile/BetsView.vue'),
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
  },
})
export default class UserProfile extends Vue {
  @Prop({ default: false }) dialog!: boolean
  loading = false
  viewOptions = ['Profile', 'Settings', 'Bets']
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

  updateHandicap(e: any): void {
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

  updateProfileImage(e: any): void {
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

  setCurrentViewOption(view: string | null): void {
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
        this.currentView = view
      }, 300)
    }
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode
    if (this.isEditMode) {
      this.handicap = this.currentUser.profile.handicap
      this.profileImage = this.currentUser.profile.image
    } else {
      this.currentUser.profile.image = this.profileImage
      this.currentUser.profile.handicap = this.handicap || 0

      this.updateCurrentUser(this.currentUser)
    }
  }

  toggleFavoriteLinks(linkData: AddRemoveFavLink): void {
    if (linkData.status === 'add') {
      this.currentUser.settings.favoriteLinks.push(linkData.fLink)
    } else if (linkData.status === 'remove') {
      const foundLinkIndex = this.currentUser.settings.favoriteLinks.findIndex((l) => {
        return l.name === linkData.fLink.name
      })

      this.currentUser.settings.favoriteLinks.splice(foundLinkIndex, 1)
    }

    this.updateCurrentUser(this.currentUser)
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

  getCurrentUser(): void {
    this.currentUser = this.$store.state.authStore.currentUser
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/userProfile/_userProfile.scss';
</style>

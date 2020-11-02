<template>
  <div class="settingsView">
    <div class="container">
      <!--      UPDATE HANDICAP-->
      <div class="updateHandicap section">
        <p>Update Handicap on Login?</p>
        <label class="hideLabel" for="tValue">Yes</label>
        <input id="tValue" type="checkbox" v-model="cUserSettings.updateHandicapOnLogin" />
      </div>
      <!--      FAVORITES-->
      <div class="favorites section">
        <div class="title">
          <div class="left">
            <p>
              Favorite Links
            </p>
            <div class="viewButtons">
              <button :class="{ active: favoriteLinksView === 'Available' }" @click="favoriteLinksView = 'Available'">Available</button>
              <button :class="{ active: favoriteLinksView === 'Current' }" @click="favoriteLinksView = 'Current'">Current</button>
            </div>
          </div>
          <div class="right">
            <p>{{ cUserSettings.favoriteLinks.length }} / 3</p>
          </div>
        </div>

        <div class="list">
          <div class="favorite" v-for="route in favoriteRoutes" :key="route.name">
            <button class="btn btn--xs" @click="toggleFavoriteLinks(route)" :disabled="cUserSettings.favoriteLinks.length >= 3 && favoriteLinksView === 'Available'">
              {{ route.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { IFavoriteLink, IUserSettings } from '@/types/User/User'

export interface AddRemoveFavLink {
  fLink: IFavoriteLink
  status: string
}
@Component({ name: 'SettingsView' })
export default class SettingsView extends Vue {
  @Prop() cUserSettings!: IUserSettings
  @Prop() cUserRoles!: string[]

  favoriteLinksView = 'Available'

  mounted(): void {}

  get favoriteRoutes(): IFavoriteLink[] {
    if (this.favoriteLinksView === 'Available') {
      // @ts-ignore
      return this.$router.options.routes.filter((route) => {
        if (route.meta && route.meta.canFavorite) {
          // return route
          return this.cUserSettings.favoriteLinks.every((fr) => {
            if (route.name !== fr.name) {
              return route
            }
          })
        }
      })
    } else {
      return this.cUserSettings.favoriteLinks
    }
  }

  @Emit('toggleFavoriteLinks')
  toggleFavoriteLinks(route: any): AddRemoveFavLink {
    let fLink: IFavoriteLink
    let status: string
    if (this.favoriteLinksView === 'Available') {
      fLink = {
        name: route.name,
        link: route.path,
      }
      status = 'add'
    } else {
      fLink = {
        name: route.name,
        link: route.link,
      }
      status = 'remove'
    }

    return { fLink, status: status }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/userProfile/_settingsView.scss';
</style>

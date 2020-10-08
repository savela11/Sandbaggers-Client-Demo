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
        <p>Favorites</p>
        <div class="list">
          <div class="favorite" v-for="route in favoriteRoutes" :key="route.name">
            <button class="btn btn--xs">{{ route.name }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IUserSettings } from '@/types/User/User'

@Component({ name: 'SettingsView' })
export default class SettingsView extends Vue {
  @Prop() cUserSettings!: IUserSettings
  @Prop() cUserRoles!: string[]

  mounted(): void {
    console.log(this.$router)
  }

  get favoriteRoutes(): void {
    // let routes
    // if (this.cUserRoles.includes('Admin')) {
    //   routes = this.$router.options.routes.map((route) => {
    //     if (route.meta && route.meta.canFavorite) {
    //       return route
    //     } else {
    //       return
    //     }
    //   })
    // } else {
    //   routes = this.$router.options.routes.map((route) => {
    //     if (route.meta && route.meta.canFavorite) {
    //       return route
    //     } else {
    //       return
    //     }
    //   })
    // }
    // return routes.filter((route) => {
    //   return route !== undefined
    // })
  }
}
</script>

<style scoped lang="scss">
.settingsView {
  .container {
    input {
      width: auto;
    }
    p {
      font-size: 0.9rem;
    }

    .section {
      padding: 1rem 0;
      border-bottom: 1px dotted $DarkBlue;
    }

    .updateHandicap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        height: 20px;
        width: 20px;
      }
    }

    .favorites {
      .list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 45px;
        gap: 10px;
        .favorite {
          button {
            padding: 0;
            width: 100%;
            height: 100%;
            font-size: 0.7rem;
          }
        }
      }
    }
  }
}
</style>

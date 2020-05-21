<template>
  <div class="profile p-2">
    <div v-if="!loading" class="container">
      <div class="card border-0 row">
        <b-card-header class="bg-transparent">
          <b-form-row class="justify-content-end">
            <b-form-group id="currentSettingsGroup" label="" class="m-0" label-for="currentSetting">
              <b-form-select id="currentSetting" v-model="currentOption" :options="buttonOptions"
                             required></b-form-select>
            </b-form-group>
          </b-form-row>
        </b-card-header>
        <b-card-body v-if="currentOption === 'Profile'" body-text-variant="secondary">
          <b-form v-if="show && currentUser.profile">
            <b-form-group id="input-group-1" label="First Name:" label-for="firstName">
              <b-form-input id="firstName" v-model="currentUser.profile.firstName" type="text"></b-form-input>
            </b-form-group>
            <b-form-group id="lastName" label="Last Name:" label-for="lastName">
              <b-form-input id="lastName" v-model="currentUser.profile.lastName" type="text"></b-form-input>
            </b-form-group>
            <b-form-group id="pImg" label="Image:" label-for="img">
              <b-form-input id="img" v-model="currentUser.profile.image" type="text"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Handicap:" label-for="handicap">
              <b-form-input id="handicap" v-model.number="currentUser.profile.handicap" step="any" min="0.00"
                            max="100.00" type="number"></b-form-input>
            </b-form-group>
          </b-form>
        </b-card-body>
        <b-card-body v-if="currentOption === 'Settings'" body-text-variant="secondary">
          <b-form v-if="show && currentUser.settings">
            <b-form-group label="Update handicap on login:">
              <b-form-radio-group button-variant="outline-secondary"
                                  v-model="currentUser.settings.updateHandicapOnLogin" buttons>
                <b-form-radio :value="true">On</b-form-radio>
                <b-form-radio :value="false">Off</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
          </b-form>
        </b-card-body>
        <b-card-body v-if="currentOption === 'Bets'" body-text-variant="secondary">
          bets
        </b-card-body>
        <b-card-body v-if="currentOption === 'Posts'" body-text-variant="secondary">
          posts
        </b-card-body>
        <b-card-footer class="bg-transparent border-0">
          <div class="container">
            <div class="row justify-content-end">
              <b-button class="px-4" type="button" v-on:click.prevent.stop="updateUserProfile" variant="primary">
                Update
              </b-button>
            </div>
          </div>
        </b-card-footer>
      </div>
    </div>

    <div v-if="loading">
      <div class="loading loading--half" v-if="loading">
        <b-spinner class="loading__spinner" label="Large Spinner"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {ICurrentUser} from '@/types/User/AuthUser'
import UIStore from '@/store/modules/UIStore'
import UsersService from '@/services/UsersService'
import Toast from '@/utility/Toasts'

interface IOption {
    name: string
}

@Component({name: 'Profile'})
export default class Profile extends Vue {
    loading = false
    // buttonOptions: IOption[] = [{name: 'Profile'}, {name: 'Settings'}, {name: 'Bets'}, {name: 'Posts'}]
    buttonOptions = ['Profile', 'Settings', 'Bets', 'Posts']
    currentOption = 'Profile'
    currentUser = {} as ICurrentUser
    show = true

    mounted(): void {
        UIStore._setHeaderTitle('Update Settings')
        this.getUserWithSettings()
    }

    async updateUserProfile(): Promise<void> {
        this.loading = true;
        try {
            const res = await UsersService.updateUserProfileAndSettings(this.currentUser)
            if (res.status === 200) {
                Toast.successToast({vInstance: this, title: "Success", message: "Your user settings have been updated"})
            }
            setTimeout(() => {
                this.loading = false

            }, 3000)
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                this.loading = false

            }, 3000)
        }
    }

    async getUserWithSettings(): Promise<void> {
        this.loading = true
        try {
            const res = await UsersService.getUserWithSettings(this.$store.state.authStore.currentUser.id)
            this.currentUser = res.data
            this.loading = false;
        } catch (e) {
            console.log(e)
            setTimeout(() => {
                this.loading = false

            }, 3000)
        }
    }
}
</script>

<style scoped lang="scss">
  .profile {
    .activeButton {
      font-weight: bold;
    }
  }
</style>

<template>
  <div class="container">
    <div v-if="!loading" class="mt-3">
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="username" label="Username" label-for="username">
          <b-form-input id="username" v-model="LoginForm.username" required></b-form-input>
        </b-form-group>

        <b-form-group id="password" label="Password" label-for="password">
          <b-form-input id="password" type="password" v-model="LoginForm.password" required></b-form-input>
        </b-form-group>

        <b-button type="submit" class="px-4 mt-3" variant="secondary">Login</b-button>
      </b-form>

      <div class="mt-5 row no-gutters justify-content-end">
        <b-link to="/register">Need an account?</b-link>
      </div>
    </div>

    <div class="loading loading--half" v-if="loading">
      <b-spinner class="loading__spinner" label="Large Spinner"></b-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ILoginUser } from '@/types/User/AuthUser'
import Toast from '@/utility/Toasts'
import UIStore from '@/store/modules/UIStore'

@Component({ name: 'Login' })
export default class Login extends Vue {
  loading = false
  LoginForm: ILoginUser = {
    username: '',
    password: '',
  }

  mounted(): void {
    UIStore._setHeaderTitle('Login')
  }

  async onSubmit(): Promise<void> {
    this.loading = true

    try {
      await this.$store.dispatch('authStore/LoginUser', { vm: this, loginUser: this.LoginForm })
      if (this.$store.state.authStore.currentUser) {
        Toast.successToast({
          vInstance: this,
          message: `Welcome back ${this.$store.state.authStore.currentUser.profile.firstName}`,
          title: 'Success',
        })
      }
      this.loading = false
    } catch (e) {
      console.log(e)
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss"></style>

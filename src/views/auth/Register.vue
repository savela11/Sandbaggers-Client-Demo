<template>
  <div class="container">
    <div v-if="!loading" class="mt-3">
      <b-form @submit.prevent="onSubmit" @reset.prevent="resetForm" v-if="show">
        <b-form-group id="username" label="Username" label-for="username">
          <b-form-input id="username" v-model="form.username" required></b-form-input>
        </b-form-group>

        <b-form-group id="password" label="Password" label-for="password">
          <b-form-input id="password" type="password" v-model="form.password" required></b-form-input>
        </b-form-group>
        <b-form-group id="confirmPassword" label="Confirm Password" label-for="confirmPassword">
          <b-form-input id="confirmPassword" type="password" v-model="form.confirmPassword" required></b-form-input>
        </b-form-group>

        <b-form-group id="email" label="Email address" label-for="email">
          <b-form-input id="email" v-model="form.email" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group id="firstName" label="First name" label-for="firstName">
          <b-form-input id="firstName" v-model="form.firstName" required></b-form-input>
        </b-form-group>
        <b-form-group id="registrationCode" label="Registration Code" label-for="registrationCode">
          <b-form-input id="registrationCode" v-model="form.registrationCode" required></b-form-input>
        </b-form-group>

        <b-form-group id="loginAfterRegister">
          <b-form-checkbox unchecked-value="false" v-model="form.loginAfterRegister" value="true">
            Login after registering?
          </b-form-checkbox>
        </b-form-group>

        <b-button type="submit" class="mr-3" variant="secondary">Register</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>

      <div class="mt-5 row no-gutters justify-content-end">
        <b-link to="/login">Already have an account?</b-link>
      </div>
    </div>

    <div class="loading loading--half" v-if="loading">
      <b-spinner class="loading__spinner" label="Large Spinner"></b-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IRegisterUser } from '../../types/User/AuthUser'
import AuthService from '../../services/AuthService'
import UIStore from '../../store/modules/UIStore'
import Toast from '@/utility/Toasts'

@Component({ name: 'Register' })
export default class Login extends Vue {
  loading = false

  form: IRegisterUser = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    registrationCode: '',
    loginAfterRegister: false,
  }
  show = true

  mounted(): void {
    UIStore._setHeaderTitle('Register')
  }

  async onSubmit(): Promise<void> {
    this.loading = true
    if (this.form.loginAfterRegister === 'true') {
      this.form.loginAfterRegister = true
    }
    if (this.form.password !== this.form.confirmPassword) {
      this.loading = false
      return Toast.errorToast({ vInstance: this, message: 'Passwords do not match', title: 'Password Error' })
    }
    try {
      const res = await AuthService.registerUser(this.form)

      if (this.form.loginAfterRegister && res.data.succeeded) {
        Toast.successToast({
          vInstance: this,
          title: 'Redirecting to dashboard',
          message: 'Account Created!',
          colorVariant: 'success',
        })
        const loginUser = {
          username: this.form.username,
          password: this.form.password,
        }
        setTimeout(() => {
          this.loading = true
          this.$store.dispatch('authStore/LoginUser', { vm: this, loginUser })
        }, 4000)
      } else {
        Toast.successToast({
          vInstance: this,
          title: 'Redirecting to login',
          message: 'Account Created!',
          colorVariant: 'success',
        })
        setTimeout(() => {
          this.loading = true
          this.$router.push('/login')
        }, 3000)
      }
    } catch (e) {
      return Toast.errorToast({ vInstance: this, errors: e, title: 'Error', message: 'message' })
    }
  }

  resetForm(): void {
    this.form.email = ''
    this.form.username = ''
    this.form.password = ''
    this.form.confirmPassword = ''
    this.form.firstName = ''
    this.form.registrationCode = ''
    this.form.loginAfterRegister = false
    this.show = false
    this.$nextTick(() => {
      this.show = true
    })
  }
}
</script>

<style scoped lang="scss"></style>

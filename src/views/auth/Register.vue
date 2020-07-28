<template>
  <div class="register">
    <form v-if="!loading" class="form form--login">
      <div class="form__field">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="registerForm.username" />
      </div>
      <div class="form__field">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="registerForm.email" />
      </div>
      <div class="form__field">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model="registerForm.firstName" />
      </div>
      <div class="form__field">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="registerForm.lastName" />
      </div>
      <div class="form__field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="registerForm.password" />
      </div>
      <div class="form__field">
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" v-model="registerForm.confirmPassword" />
      </div>
      <div class="form__field">
        <label for="registrationCode">Registration Code</label>
        <input type="text" id="registrationCode" v-model="registerForm.registrationCode" />
      </div>
      <div class="btnContainer">
        <button @click.prevent.stop="onSubmit" class="btn btn--blue">Register</button>
      </div>
    </form>
    <div class="greyLinks" v-if="!loading">
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IRegisterUser } from '@/types/User/AuthUser'
import AuthService from '../../services/AuthService'
import UIStore from '../../store/modules/UIStore'
import { ISnackBar } from '@/types/UI/SnackBar'

@Component({ name: 'Register', components: { Loading: () => import('@/components/ui/Loading.vue') } })
export default class Login extends Vue {
  loading = false

  registerForm: IRegisterUser = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    registrationCode: '',
    loginAfterRegister: false,
  }
  show = true
  showPassword = false
  showConfirmPassword = false
  mounted(): void {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Register')
  }

  async onSubmit(): Promise<void> {
    this.loading = true
    if (this.validateForm()) {
      try {
        const res = await AuthService.registerUser(this.registerForm)

        if (this.registerForm.loginAfterRegister && res.data.succeeded && res.status === 200) {
          const loginUser = {
            username: this.registerForm.username,
            password: this.registerForm.password,
          }
          setTimeout(() => {
            this.loading = true
            this.$store.dispatch('authStore/LoginUser', { loginUser })
          }, 4000)
        } else {
          setTimeout(() => {
            this.loading = true
            this.$router.push('/login')
          }, 3000)
        }
      } catch (e) {
        this.loading = false
      }
    }
  }

  validateForm(): boolean {
    let validForm = true
    const snackBar: ISnackBar = {
      message: '',
      showSnackBar: true,
      errorList: [],
    }
    if (this.registerForm.loginAfterRegister === 'true') {
      this.registerForm.loginAfterRegister = true
    }
    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      validForm = false
      snackBar.errorList.push({ code: 'NonMatchingPasswords', description: 'Passwords must match' })
    }
    if (this.registerForm.firstName === '') {
      validForm = false
      snackBar.errorList.push({ code: 'RequireFirstName', description: 'Must provide a first name' })
    }

    if (this.registerForm.password === '') {
      validForm = false
      snackBar.errorList.push({ code: 'RequirePassword', description: 'Must provide a password' })
    }
    if (this.registerForm.email === '') {
      validForm = false
      snackBar.errorList.push({ code: 'RequireEmail', description: 'Must Provide an email' })
    }

    if (this.registerForm.registrationCode === '') {
      validForm = false
      snackBar.errorList.push({ code: 'RequireRegistrationCode', description: 'Must provide a registration code' })
    }

    if (validForm === false) {
      this.loading = false
      if (snackBar.errorList.length > 1) {
        snackBar.message = 'Multiple Registration Errors:'
      } else {
        snackBar.message = 'Registration Error'
      }
    }

    this.$store.dispatch('messageStore/_setSnackBar', snackBar)
    return validForm
  }
  resetForm(): void {
    this.registerForm.email = ''
    this.registerForm.username = ''
    this.registerForm.password = ''
    this.registerForm.confirmPassword = ''
    this.registerForm.firstName = ''
    this.registerForm.registrationCode = ''
    this.registerForm.loginAfterRegister = false
    this.show = false
    this.$nextTick(() => {
      this.show = true
    })
  }
}
</script>

<style scoped lang="scss">
.register {
  .btn {
    border-radius: 25px;
  }
}
</style>

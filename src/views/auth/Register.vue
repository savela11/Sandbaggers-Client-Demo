<template>
  <div class="register pa-2 mt-4">
    <form>
      <v-text-field v-model="form.username" outlined label="Username" required></v-text-field>
      <v-text-field v-model="form.email" outlined label="Email" required></v-text-field>
      <v-text-field v-model="form.firstName" outlined label="First Name" required></v-text-field>
      <v-text-field
        @click:append="showPassword = !showPassword"
        v-model="form.password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        outlined
        label="Password"
        required
      ></v-text-field>
      <v-text-field
        @click:append="showConfirmPassword = !showConfirmPassword"
        v-model="form.confirmPassword"
        :type="showConfirmPassword ? 'text' : 'password'"
        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        outlined
        label="Confirm Password"
        required
      ></v-text-field>
      <v-text-field v-model="form.registrationCode" outlined label="Registration Code" required></v-text-field>
      <v-checkbox v-model="form.loginAfterRegister" :label="`Login After Registering?`"></v-checkbox>
      <v-btn color="secondary" :loading="loading" large @click="onSubmit">Register</v-btn>
    </form>

    <div class="mt-10 body-2">
      <router-link to="/login">Already have an account?</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IRegisterUser } from '@/types/User/AuthUser'
import AuthService from '../../services/AuthService'
import UIStore from '../../store/modules/UIStore'
import { ISnackBar } from '@/types/UI/SnackBar'

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
  showPassword = false
  showConfirmPassword = false
  mounted(): void {

    this.$store.dispatch('uiStore/_setHeaderTitle', 'Register')
  }

  async onSubmit(): Promise<void> {
    this.loading = true
    if (this.validateForm()) {
      try {
        const res = await AuthService.registerUser(this.form)

        if (this.form.loginAfterRegister && res.data.succeeded && res.status === 200) {
          const loginUser = {
            username: this.form.username,
            password: this.form.password,
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
        console.log(e)
        const snackBar: ISnackBar = {
          message: e.data.message,
          showSnackBar: true,
          errorList: e.data.data.errors,
        }
        await this.$store.dispatch('messageStore/_setSnackBar', snackBar)
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
    if (this.form.loginAfterRegister === 'true') {
      this.form.loginAfterRegister = true
    }
    if (this.form.password !== this.form.confirmPassword) {
      validForm = false
      snackBar.errorList.push({ code: 'NonMatchingPasswords', description: 'Passwords must match' })
    }
    if (this.form.firstName === '') {
      validForm = false
      snackBar.errorList.push({ code: 'RequireFirstName', description: 'Must provide a first name' })
    }

    if (this.form.password === '') {
      validForm = false
      snackBar.errorList.push({ code: 'RequirePassword', description: 'Must provide a password' })
    }
    if (this.form.email === '') {
      validForm = false
      snackBar.errorList.push({ code: 'RequireEmail', description: 'Must Provide an email' })
    }

    if (this.form.registrationCode === '') {
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

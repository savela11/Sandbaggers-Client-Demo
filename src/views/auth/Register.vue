<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IRegisterUser } from '@/types/User/AuthUser'
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

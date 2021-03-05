<template>
  <div class="login">
    <div class="form" v-if="!loading">
      <form @submit.prevent.stop="onSubmit">
        <InputField :isActive="LoginForm.username !== ''">
          <template v-slot:field>
            <label for="Username">Username</label>
            <input type="text" id="Username" name="username" v-model.lazy="LoginForm.username" />
          </template>
        </InputField>
        <InputField :isActive="LoginForm.password !== ''">
          <template v-slot:field>
            <label for="Password">Password</label>
            <input type="password" id="Password" name="password" autocomplete="new-password" v-model.lazy="LoginForm.password" />
          </template>
        </InputField>

        <input type="submit" class="btn submit btn--bg-darkBlue btn--sm" id="loginBTN" value="Login" />
      </form>
    </div>
    <div class="greyLinks" v-if="!loading">
      <p class="text text--xs color--grey">
        Need an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ISnackBar } from '@/types/UI/SnackBar'
import AuthService from '@/services/Auth/AuthService'
import UIHelper from '@/utility/UIHelper'
import { LoginUserDto } from '@/types/DTO/AuthDto'

@Component({
  name: 'Login',
  components: {
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue'),
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
  },
})
export default class Login extends Vue {
  loading = false
  LoginForm: LoginUserDto = {
    username: '',
    password: '',
  }
  showPassword = false

  mounted(): void {}

  updateLoginForm(val: string): void {
    this.LoginForm.username = val
  }

  validateForm(): boolean {
    if (this.LoginForm.username === '' || this.LoginForm.password === '') {
      UIHelper.SnackBar({
        title: 'Login Error',
        message: 'Please provide a username and password',
        isSnackBarShowing: true,
        classInfo: 'error',
        errors: [],
      })
      return false
    } else {
      return true
    }
  }

  async onSubmit(): Promise<void> {
    UIHelper.clickedButton('loginBTN')
    this.loading = true
    const validForm = this.validateForm()
    if (validForm) {
      try {
        const res = await AuthService.loginUser(this.LoginForm)
        if (res.status === 200) {
          await this.$store.dispatch('authStore/SetLoggedInUser', res.data)
        }
      } catch (e) {
        this.loading = false
        if (e.response.data) {
          UIHelper.SnackBar({ title: 'Login Error', message: `${e.response.data.message}`, classInfo: `error`, isSnackBarShowing: true, errors: undefined })
        } else {
          UIHelper.SnackBar({ title: 'Login Error', message: `Issue Logging in`, classInfo: `error`, isSnackBarShowing: true, errors: undefined })
        }
      }
    } else {
      this.loading = false
      return
    }
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/auth/_authBase.scss";
</style>

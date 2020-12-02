<template>
  <div class="login">
    <form v-if="!DataLoading" class="form form--login">
      <div class="form__field">
        <label for="username">Username</label>
        <input type="text" id="username" v-model.trim="LoginForm.username" />
      </div>
      <div class="form__field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="LoginForm.password" />
      </div>
      <div class="btnContainer">
        <button @click.prevent.stop="onSubmit" class="btn btn--blue btn--sm" id="loginBTN">Login</button>
      </div>
    </form>
    <div class="greyLinks" v-if="!DataLoading">
      <p>Need an account? <router-link to="/register">Register</router-link></p>
    </div>
    <Loading v-if="DataLoading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ILoginUser } from '@/types/User/AuthUser'
import { ISnackBar } from '@/types/UI/SnackBar'
import AuthService from '@/services/AuthService'
import UIHelper from '@/utility/UIHelper'

@Component({
  name: 'Login',
  components: { Loading: (): Promise<typeof import('*.vue')>  => import('@/components/ui/Loading.vue') },
})
export default class Login extends Vue {
  loading = false
  LoginForm: ILoginUser = {
    username: '',
    password: '',
  }
  showPassword = false

  mounted(): void {}

  get DataLoading(): boolean {
    return this.$store.getters['uiStore/DataLoadingStatus']
  }

  validateForm(): boolean {
    if (this.LoginForm.username === '' || this.LoginForm.password === '') {
      const snackBar: ISnackBar = {
        title: 'Login Error',
        message: 'Please provide username and password',
        isSnackBarShowing: true,
        classInfo: 'error',
        errors: [],
      }

      this.$store.dispatch('uiStore/_setSnackBar', snackBar)
      return false
    } else {
      return true
    }
  }
  async onSubmit(): Promise<void> {
    UIHelper.clickedButton('loginBTN')
    const validForm = this.validateForm()
    if (validForm) {
      await this.$store.dispatch('uiStore/_setDataLoading', true)
      try {
        const res = await AuthService.loginUser(this.LoginForm)
        if (res.status === 200) {
          await this.$store.dispatch('authStore/SetLoggedInUser', res.data)
        }
        await this.$store.dispatch('uiStore/_setDataLoading', false)
      } catch (e) {
        if (e.data) {
          const snackBar: ISnackBar = {
            title: 'Login Error',
            message: e.data.message,
            isSnackBarShowing: true,
            classInfo: 'error',
            errors: [],
          }
          await this.$store.dispatch('uiStore/_setSnackBar', snackBar, { root: true })
        }

        await this.$store.dispatch('uiStore/_setDataLoading', false, { root: true })
      }
    } else {
      await this.$store.dispatch('uiStore/_setDataLoading', false)
      return
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  .btn {
    border-radius: 25px;
  }
}
</style>

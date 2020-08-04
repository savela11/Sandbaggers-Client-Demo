<template>
  <div class="login">
    <form v-if="!DataLoading" class="form form--login">
      <div class="form__field">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="LoginForm.username" />
      </div>
      <div class="form__field">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="LoginForm.password" />
      </div>
      <div class="btnContainer">
        <button @click.prevent.stop="onSubmit" class="btn btn--blue" id="loginBTN">Login</button>
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
import UIStore from '@/store/modules/UIStore'
import Helper from '@/utility/Helper'
import { ISnackBar } from '@/types/UI/SnackBar'

@Component({
  name: 'Login',
  components: { Loading: () => import('@/components/ui/Loading.vue') },
})
export default class Login extends Vue {
  loading = false
  LoginForm: ILoginUser = {
    username: '',
    password: '',
  }
  showPassword = false

  mounted(): void {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Login')
  }

  get DataLoading(): boolean {
    return this.$store.getters['uiStore/DataLoadingStatus']
  }

  validateForm(): boolean {
    if (this.LoginForm.username === '' || this.LoginForm.password === '') {
      const snackBar: ISnackBar = {
        title: 'Login Error',
        message: 'Please provide username and password',
        isSnackBarShowing: true,
        class: 'error',
        errors: [],
      }

      this.$store.dispatch('uiStore/_setSnackBar', snackBar)
      return false
    } else {
      return true
    }
  }
  async onSubmit(): Promise<void> {
    Helper.clickedButton('loginBTN')
    const validForm = this.validateForm()
    if (validForm) {
      await this.$store.dispatch('uiStore/_setDataLoading', true)
      try {
        setTimeout(() => {
          this.$store.dispatch('authStore/LoginUser', { vm: this, loginUser: this.LoginForm })
        }, 3000)
      } catch (e) {
        console.log(e)
      }
    } else {
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

<template>
  <div class="login">
    <form v-if="!loading" class="form form--login">
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
    <div class="greyLinks" v-if="!loading">
      <p>Need an account? <router-link to="/register">Register</router-link></p>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ILoginUser } from '@/types/User/AuthUser'
import UIStore from '@/store/modules/UIStore'
import Helper from '@/utility/Helper'

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

  async onSubmit(): Promise<void> {
    Helper.clickedButton('loginBTN')
    this.loading = true
    try {
      setTimeout(() => {
        this.$store.dispatch('authStore/LoginUser', { vm: this, loginUser: this.LoginForm })
      }, 3000)
    } catch (e) {
      this.loading = false
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

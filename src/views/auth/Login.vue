<template>
  <v-container class="login pa-6 mt-5">
    <form>
      <v-text-field v-model="LoginForm.username" outlined label="Username" required></v-text-field>
      <v-text-field
        @click:append="showPassword = !showPassword"
        v-model="LoginForm.password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        outlined
        label="Password"
        required
      ></v-text-field>
      <v-btn color="secondary" large :loading="loading" @click="onSubmit">Login</v-btn>
    </form>

    <div class="mt-10 body-2">
      <router-link to="/register">Need an account?</router-link>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ILoginUser } from '@/types/User/AuthUser'
import UIStore from '@/store/modules/UIStore'

@Component({
  name: 'Login',
  components: {},
})
export default class Login extends Vue {
  loading = false
  LoginForm: ILoginUser = {
    username: '',
    password: '',
  }
  showPassword = false

  mounted(): void {
    UIStore._setHeaderTitle('Login')
  }

  async onSubmit(): Promise<void> {
    this.loading = true
    try {
      setTimeout(() => {
        this.$store.dispatch('authStore/LoginUser', { vm: this, loginUser: this.LoginForm })
      }, 3000)
    } catch (e) {
      console.log(e)
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss"></style>

<template>
  <div></div>
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

<template>
  <div class="login">
    <form class="form">
      <InputField v-bind="{ inputId: 'username', label: 'Username', inputValue: 'username' }" :inputValue.sync="LoginForm.username" />
      <InputField v-bind="{ inputId: 'password', label: 'Password', inputType: 'password', inputValue: 'password' }" :inputValue.sync="LoginForm.password" />
    </form>
    <VBtn value="Login" :classes="'btn-secondary'" @btnClick="onSubmit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ILoginUser } from '@/types/User/AuthUser'
import Toast from '@/utility/Toasts'
import UIStore from '@/store/modules/UIStore'

@Component({
  name: 'Login',
  components: { InputField: (): Promise<object> => import('@/components/ui/Forms/InputField.vue'), VBtn: (): Promise<object> => import('@/components/ui/Buttons/VButton.vue') },
})
export default class Login extends Vue {
  loading = false
  LoginForm: ILoginUser = {
    username: '',
    password: '',
  }

  mounted(): void {
    UIStore._setHeaderTitle('Login')
  }

  testClick() {
    console.log('test')
  }

  async onSubmit(): Promise<void> {
    this.loading = true

    try {
      await this.$store.dispatch('authStore/LoginUser', { vm: this, loginUser: this.LoginForm })

      this.loading = false
    } catch (e) {
      console.log(e)
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  padding: 2rem 4rem;
}
</style>

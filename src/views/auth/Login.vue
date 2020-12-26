<template>
  <div class="login">
    <form class="form" v-if="!loading" @submit.prevent.stop="onSubmit">
      <InputField :isActive="LoginForm.username !== ''">
        <template v-slot:field>
          <label for="Username">Username</label>
          <input type="text" id="Username" v-model="LoginForm.username">
        </template>
      </InputField>
      <InputField :isActive="LoginForm.password !== ''">
        <template v-slot:field>
          <label for="Password">Password</label>
          <input type="password" id="Password" v-model="LoginForm.password">
        </template>
      </InputField>
      <input type="submit" value="Login" @click.prevent.stop="onSubmit" class="btn submit btn--blue btn--sm" id="loginBTN" />
    </form>
    <div class="greyLinks" v-if="!loading">
      <p>Need an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ISnackBar } from "@/types/UI/SnackBar";
import AuthService from "@/services/AuthService";
import UIHelper from "@/utility/UIHelper";
import { LoginUserDto } from "@/types/DTO/AuthDto";

@Component({
  name: "Login",
  components: {
    NewForm: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/NewForm.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/InputField.vue"),
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue")
  }
})
export default class Login extends Vue {
  loading = false;
  LoginForm: LoginUserDto = {
    username: "",
    password: ""
  };
  showPassword = false;

  mounted(): void {
  }


  validateForm(): boolean {
    if (this.LoginForm.username === "" || this.LoginForm.password === "") {
      UIHelper.SnackBar({
        title: "Login Error",
        message: "Please provide a username and password",
        isSnackBarShowing: true,
        classInfo: "error",
        errors: []
      });
      return false;
    } else {
      return true;
    }
  }

  async onSubmit(): Promise<void> {
    UIHelper.clickedButton("loginBTN");
    this.loading = true;
    const validForm = this.validateForm();
    if (validForm) {
      try {
        const res = await AuthService.loginUser(this.LoginForm);
        if (res.status === 200) {
          await this.$store.dispatch("authStore/SetLoggedInUser", res.data);
        }
      } catch (e) {
        this.loading = false;
        if (e.data) {
          const snackBar: ISnackBar = {
            title: "Login Error",
            message: e.data.message,
            isSnackBarShowing: true,
            classInfo: "error",
            errors: []
          };
          await this.$store.dispatch("uiStore/_setSnackBar", snackBar, { root: true });
        } else {
          const snackBar: ISnackBar = {
            title: "Login Error",
            message: e.data.message,
            isSnackBarShowing: true,
            classInfo: "error",
            errors: []
          };
          await this.$store.dispatch("uiStore/_setSnackBar", snackBar, { root: true });
        }


      }
    } else {
      this.loading = false;
      return;
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  padding: 0;
}

.loginForm {
  padding: 2rem;
}

</style>

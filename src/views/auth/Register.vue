<template>
  <div class="register">
    <AuthHeader title="Register" />
    <NewForm v-if="!loading" class="registerForm">
      <template v-slot:fields>
        <InputField type="text" label="Username" v-model.trim="registerForm.username" />
        <InputField type="email" label="Email" v-model.trim="registerForm.email" />
        <InputField type="text" label="First Name" v-model.trim="registerForm.firstName" />
        <InputField type="text" label="Last Name" v-model.trim="registerForm.lastName" />
        <InputField type="password" label="Password" v-model.trim="registerForm.password" />
        <InputField type="password" label="Confirm Password" v-model.trim="registerForm.confirmPassword" />
        <InputField type="text" label="Registration Code" v-model.trim="registerForm.registrationCode" />
      </template>
      <template v-slot:button>
        <button @click.prevent.stop="onSubmit" class="btn btn--blue btn--sm" id="registerBtn">Register</button>
      </template>
    </NewForm>
    <div class="greyLinks" v-if="!loading">
      <p>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthService from "../../services/AuthService";
import { ISnackBar } from "@/types/UI/SnackBar";
import { RegisterUserDto } from "@/types/DTO/AuthDto";

@Component({
  name: "Register",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    AuthHeader: (): Promise<typeof import("*.vue")> => import("@/components/ui/Headers/AuthHeader.vue"),
    NewForm: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/NewForm.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/InputField.vue"),
  }
})
export default class Login extends Vue {
  loading = false;

  registerForm: RegisterUserDto = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    registrationCode: "",
    loginAfterRegister: false
  };
  show = true;
  showPassword = false;
  showConfirmPassword = false;

  mounted(): void {
  }

  async onSubmit(): Promise<void> {
    this.loading = true;
    if (this.validateForm()) {
      try {
        const res = await AuthService.registerUser(this.registerForm);

        if (this.registerForm.loginAfterRegister && res.status === 200) {
          const loginUser = {
            username: this.registerForm.username,
            password: this.registerForm.password
          };
          setTimeout(() => {
            this.loading = true;
            this.$store.dispatch("authStore/LoginUser", { loginUser });
          }, 4000);
        } else {
          setTimeout(() => {
            this.loading = true;
            this.$router.push("/login");
          }, 3000);
        }
      } catch (e) {
        const errorList: string[] = [];
        const snackBar: ISnackBar = {
          title: "Error Registering Username",
          message: "",
          isSnackBarShowing: true,
          classInfo: "error",
          errors: []
        };
        const parsedErrors = JSON.parse(e.data.message);
        if (e.data.message) {
          parsedErrors.forEach((error: any) => {
            errorList.push(error.Description);
          });
          snackBar.errors = errorList;
        }

        await this.$store.dispatch("uiStore/_setSnackBar", snackBar);
        this.loading = false;
      }
    }
  }

  validateForm(): boolean {
    let validForm = true;
    const errorList: string[] = [];
    const snackBar: ISnackBar = {
      title: "",
      message: "",
      isSnackBarShowing: true,
      classInfo: "error",
      errors: []
    };

    if (this.registerForm.username === "") {
      validForm = false;
      errorList.push("Must provide a username");
    }
    if (this.registerForm.loginAfterRegister === "true") {
      this.registerForm.loginAfterRegister = true;
    }
    if (this.registerForm.password !== this.registerForm.confirmPassword) {
      validForm = false;
      errorList.push("Passwords must match");
    }
    if (this.registerForm.firstName === "") {
      validForm = false;
      errorList.push("Must provide a first name");
    }

    if (this.registerForm.password === "") {
      validForm = false;
      errorList.push("Must provide a password");
    }
    if (this.registerForm.email === "") {
      validForm = false;
      errorList.push("Must Provide an email");
    }

    if (this.registerForm.registrationCode === "") {
      validForm = false;
      errorList.push("Must provide a registration code");
    }

    if (!validForm) {
      this.loading = false;
      if (errorList.length > 1) {
        snackBar.title = "Registration Errors";
      } else {
        snackBar.title = "Registration Error";
      }
    }
    snackBar.errors = errorList;
    if (!validForm) {
      this.$store.dispatch("uiStore/_setSnackBar", snackBar);
    }
    return validForm;
  }

  resetForm(): void {
    this.registerForm.email = "";
    this.registerForm.username = "";
    this.registerForm.password = "";
    this.registerForm.confirmPassword = "";
    this.registerForm.firstName = "";
    this.registerForm.registrationCode = "";
    this.registerForm.loginAfterRegister = false;
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }
}
</script>

<style scoped lang="scss">
.registerForm {
  padding: 2rem;
}
</style>

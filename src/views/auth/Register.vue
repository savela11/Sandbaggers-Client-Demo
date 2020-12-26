<template>
  <div class="register">
    <form v-if="!loading" class="form" @submit.prevent.stop="onSubmit">
      <!--      <InputField type="text" label="Username" v-model.trim="registerForm.username" />-->
      <!--      <InputField type="email" label="Email" v-model.trim="registerForm.email" />-->
      <!--      <InputField type="text" label="First Name" v-model.trim="registerForm.firstName" />-->
      <!--      <InputField type="text" label="Last Name" v-model.trim="registerForm.lastName" />-->
      <!--      <InputField type="password" label="Password" v-model.trim="registerForm.password" />-->
      <!--      <InputField type="password" label="Confirm Password" v-model.trim="registerForm.confirmPassword" />-->
      <!--      <InputField type="text" label="Registration Code" v-model.trim="registerForm.registrationCode" />-->

      <InputField :isActive="registerForm.username !== ''">
        <template v-slot:field>
          <label for="Username">Username</label>
          <input type="text" id="Username" v-model.trim="registerForm.username">
        </template>
      </InputField>
      <InputField :isActive="registerForm.email !== ''">
        <template v-slot:field>
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="registerForm.email">
        </template>
      </InputField>
      <InputField :isActive="registerForm.firstName !== ''">
        <template v-slot:field>
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model.trim="registerForm.firstName" />
        </template>
      </InputField>
      <InputField :isActive="registerForm.lastName !== ''">
        <template v-slot:field>
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model.trim="registerForm.lastName" />
        </template>
      </InputField>
      <InputField :isActive="registerForm.password !== ''">
        <template v-slot:field>
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="registerForm.password" />
        </template>
      </InputField>

      <InputField :isActive="registerForm.confirmPassword !== ''">
        <template v-slot:field>
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model.trim="registerForm.confirmPassword" />
        </template>
      </InputField>

      <InputField :isActive="registerForm.registrationCode !== ''">
        <template v-slot:field>
          <label for="registrationCode">Registration Code</label>
          <input type="text" id="registrationCode" v-model.trim="registerForm.registrationCode" />
        </template>
      </InputField>


      <input type="submit" value="Register" class="btn submit btn--blue btn--sm" id="registerBtn" />

    </form>
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
import UIHelper from "@/utility/UIHelper";

@Component({
  name: "Register",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    AuthHeader: (): Promise<typeof import("*.vue")> => import("@/components/ui/Headers/DefaultHeader.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/InputField.vue")
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
  showConfirmPassword = false;

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

        const parsedErrors = JSON.parse(e.data.message);
        if (e.data.message) {
          parsedErrors.forEach((error: any) => {
            errorList.push(error.Description);
          });
        }
        UIHelper.SnackBar({
          title: "Error Registering",
          message: "",
          classInfo: "error",
          isSnackBarShowing: true,
          errors: errorList
        });
        this.loading = false;
      }
    }
  }

  validateForm(): boolean {
    let validForm = true;
    const errorList: string[] = [];


    if (this.registerForm.username === "") {
      validForm = false;
      errorList.push("Must provide a username");
    }
    if (this.registerForm.loginAfterRegister === "true") {
      this.registerForm.loginAfterRegister = true;
    }
    if (this.registerForm.password.length < 6) {
      validForm = false;
      errorList.push("Password must be at least 6 characters long");
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


    let errorTitle;
    if (!validForm) {
      this.loading = false;
      if (errorList.length > 1) {
        errorTitle = "Registration Errors";
      } else {
        errorTitle = "Registration Error";
      }
    }
    if (!validForm) {
      UIHelper.SnackBar({
        title: errorTitle,
        message: "",
        isSnackBarShowing: true,
        errors: errorList,
        classInfo: "error"
      });
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
.register {
  padding: 0;
}

.registerForm {
  width: 90%;
  margin: 0 auto;
  padding: 1rem;

}
</style>

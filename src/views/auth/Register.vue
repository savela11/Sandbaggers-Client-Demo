<template>
    <div class="register">
        <form v-if="!loading" class="form" @submit.prevent.stop="onSubmit">
            <div class="flex--md">
                <InputField class="flexItem" :isActive="registerForm.username !== ''">
                    <template v-slot:field>
                        <label for="Username">Username</label>
                        <input type="text" id="Username" v-model.trim="registerForm.username" />
                    </template>
                </InputField>
                <InputField class="flexItem" :isActive="registerForm.email !== ''">
                    <template v-slot:field>
                        <label for="email">Email</label>
                        <input type="email" id="email" v-model.trim="registerForm.email" />
                    </template>
                </InputField>
            </div>
            <div class="flex--md">
                <InputField class="flexItem" :isActive="registerForm.firstName !== ''">
                    <template v-slot:field>
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" v-model.trim="registerForm.firstName" />
                    </template>
                </InputField>
                <InputField class="flexItem" :isActive="registerForm.lastName !== ''">
                    <template v-slot:field>
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" v-model.trim="registerForm.lastName" />
                    </template>
                </InputField>
            </div>
            <div class="flex--md">
                <InputField class="flexItem" :isActive="registerForm.password !== ''">
                    <template v-slot:field>
                        <label for="password">Password</label>
                        <input type="password" id="password" v-model.trim="registerForm.password" />
                    </template>
                </InputField>
                <InputField class="flexItem" :isActive="registerForm.confirmPassword !== ''">
                    <template v-slot:field>
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" v-model.trim="registerForm.confirmPassword" />
                    </template>
                </InputField>
            </div>
            <InputField class="flexItem" :isActive="registerForm.registrationCode !== ''">
                <template v-slot:field>
                    <label for="registrationCode">Registration Code</label>
                    <input type="text" id="registrationCode" v-model.trim="registerForm.registrationCode" />
                </template>
            </InputField>
            <input type="submit" value="Register" class="btn submit btn--bg-darkBlue btn--sm" id="registerBtn" />
        </form>
        <div class="greyLinks" v-if="!loading">
            <p class="text text--xs color--grey">
                Already have an account?
                <router-link to="/login">Login</router-link>
            </p>
        </div>
        <Loading v-if="loading" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthService from '../../services/AuthService'
import { ISnackBar } from '@/types/UI/SnackBar'
import { RegisterUserDto } from '@/types/DTO/AuthDto'
import UIHelper from '@/utility/UIHelper'

@Component({
    name: 'Register',
    components: {
        Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
        AuthHeader: (): Promise<typeof import('*.vue')> => import('@/components/ui/Headers/DefaultHeader.vue'),
        InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue'),
    },
})
export default class Login extends Vue {
    loading = false
    registerForm: RegisterUserDto = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        registrationCode: '',
        loginAfterRegister: false,
    }
    show = true
    showConfirmPassword = false

    async onSubmit(): Promise<void> {
        this.loading = true
        if (this.validateForm()) {
            try {
                const res = await AuthService.registerUser(this.registerForm)
                if (res.status === 200) {
                    UIHelper.SnackBar({ title: 'Success', message: `Username ${res.data.username} has been registered`, classInfo: `primary`, isSnackBarShowing: true, errors: undefined })

                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 3000)
                }
            } catch (e) {
                const errorList: string[] = []

                if (e.response.data) {
                    if (e.response.data.errors.length > 0) {
                        e.response.data.errors.forEach((error: any) => {
                            errorList.push(error)
                        })
                    }

                    UIHelper.SnackBar({
                        title: 'Error',
                        message: e.response.data.message,
                        classInfo: 'error',
                        isSnackBarShowing: true,
                        errors: errorList,
                    })
                } else {
                    UIHelper.SnackBar({ title: 'Error', message: `There was an error registering`, classInfo: `error`, isSnackBarShowing: true, errors: undefined })
                }

                this.loading = false
            }
        }
    }

    validateForm(): boolean {
        let validForm = true
        const errorList: string[] = []

        if (this.registerForm.username === '') {
            validForm = false
            errorList.push('Must provide a username')
        }
        if (this.registerForm.loginAfterRegister === 'true') {
            this.registerForm.loginAfterRegister = true
        }
        if (this.registerForm.password.length < 6) {
            validForm = false
            errorList.push('Password must be at least 6 characters long')
        }
        if (this.registerForm.password !== this.registerForm.confirmPassword) {
            validForm = false
            errorList.push('Passwords must match')
        }
        if (this.registerForm.firstName === '') {
            validForm = false
            errorList.push('Must provide a first name')
        }

        if (this.registerForm.password === '') {
            validForm = false
            errorList.push('Must provide a password')
        }
        if (this.registerForm.email === '') {
            validForm = false
            errorList.push('Must Provide an email')
        }

        if (this.registerForm.registrationCode === '') {
            validForm = false
            errorList.push('Must provide a registration code')
        }

        let errorTitle
        if (!validForm) {
            this.loading = false
            if (errorList.length > 1) {
                errorTitle = 'Registration Errors'
            } else {
                errorTitle = 'Registration Error'
            }
        }
        if (!validForm) {
            UIHelper.SnackBar({
                title: errorTitle,
                message: '',
                isSnackBarShowing: true,
                errors: errorList,
                classInfo: 'error',
            })
        }
        return validForm
    }

    resetForm(): void {
        this.registerForm.email = ''
        this.registerForm.username = ''
        this.registerForm.password = ''
        this.registerForm.confirmPassword = ''
        this.registerForm.firstName = ''
        this.registerForm.registrationCode = ''
        this.registerForm.loginAfterRegister = false
        this.show = false
        this.$nextTick(() => {
            this.show = true
        })
    }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/auth/_authBase.scss";
</style>

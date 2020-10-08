<template>
  <div class="profileView">
    <form class="form form--profile">
      <div class="form__field">
        <label for="fName">First name</label>
        <input type="text" id="fName" v-model.trim="profileForm.firstName" />
      </div>
      <div class="form__field">
        <label for="lName">Last name</label>
        <input type="text" id="lName" v-model.trim="profileForm.lastName" />
      </div>

      <div class="form__field">
        <label for="email">Email</label>
        <input type="email" id="email" v-model.trim="profileForm.email" />
      </div>

      <div class="btnContainer">
        <button @click.prevent.stop="updateCurrentUserProfile" class="btn btn--xs btn--blue" id="updateBtn">Update</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { IUserProfile } from '@/types/Profile'
import { ICurrentUser } from '@/types/User/AuthUser'

@Component({ name: 'ProfileView' })
export default class ProfileView extends Vue {
  @Prop() cUser!: ICurrentUser

  profileForm: IUserProfile = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  }

  mounted(): void {
    this.setCurrentUser()
  }

  setCurrentUser(): void {
    this.profileForm.id = this.cUser.id
    this.profileForm.firstName = this.cUser.profile.firstName
    this.profileForm.lastName = this.cUser.profile.lastName
    this.profileForm.email = this.cUser.email
  }

  @Emit('updateCurrentUserProfile')
  updateCurrentUserProfile(): ICurrentUser {
    const updatedUser = this.cUser
    updatedUser.profile.firstName = this.profileForm.firstName
    updatedUser.profile.lastName = this.profileForm.lastName
    updatedUser.email = this.profileForm.email
    return updatedUser
  }
}
</script>

<style scoped lang="scss">
.profileView {
  .btnContainer {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }
  .form {
    padding: 0;
    &__field {
      padding: 0 0 0.5rem 0;
      label {
        margin: 0 0 0.3rem 0.3rem;
        font-size: 0.9rem;
        font-weight: bold;
      }

      input {
        font-size: 0.9rem;
      }
    }
  }
}
</style>

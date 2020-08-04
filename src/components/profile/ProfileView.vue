<template>
  <div class="profileView">
    <form class="form form--profile">
      <div class="form__field">
        <label for="fName">First name</label>
        <input type="text" id="fName" v-model="profileForm.firstName" />
      </div>
      <div class="form__field">
        <label for="lName">Last name</label>
        <input type="text" id="lName" v-model="profileForm.lastName" />
      </div>

      <div class="form__field">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="profileForm.email" />
      </div>

      <div class="btnContainer">
        <button @click.prevent.stop="updateCurrentUserProfile" class="btn btn--sm btn--blue" id="updateBtn">Update</button>
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

  mounted() {
    this.setCurrentUser()
  }

  setCurrentUser(): void {
    this.profileForm.id = this.cUser.id
    this.profileForm.firstName = this.cUser.profile.firstName
    this.profileForm.lastName = this.cUser.profile.lastName
    this.profileForm.email = this.cUser.email
  }

  @Emit('updateCurrentUserProfile')
  updateCurrentUserProfile(): IUserProfile {
    return this.profileForm
  }
}
</script>

<style scoped lang="scss">
.profileView {
  background-color: white;

  .btnContainer {
    display: flex;
    justify-content: flex-end;
  }
  .form {
    &__field {
      padding: 0 0 0.5rem 0;
      label {
        margin: 0 0 0.3rem 0.3rem;
      }
    }
  }
}
</style>

<template>
  <header class="mainHeader">
    <div class="mainHeader__container">
      <div class="sbLogo"><img src="@/assets/SBLogo.png" alt="Sandbagger Logo" /></div>
      <router-link to="/UserProfile" class="profile"><img :src="currentUserImage" alt="Profile Image" /></router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { ICurrentUser } from '@/types/User/AuthUser'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({ name: 'MainHeader' })
export default class MainHeader extends Vue {
  @Prop() currentUser!: ICurrentUser

  get currentUserImage(): string {
    if (this.currentUser.profile.image === null) {
      return require('@/assets/icons/avatar.svg')
    } else {
      return this.currentUser.profile.image
    }
  }
}
</script>

<style scoped lang="scss">
.mainHeader {
  box-shadow: 0 1px 6px rgba(102, 102, 102, 0.8);

  &__container {
    padding: 0.6rem 1rem;
    background-color: white;
    border-bottom: 1px solid $DarkBlue;
    height: 60px;
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 0.9rem;
      font-weight: normal;
      color: lightgrey;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: scale-down;
    }
    .sbLogo {
      width: 60px;
    }

    .profile {
      width: 80px;
      height: 80px;
    }
  }
}
</style>

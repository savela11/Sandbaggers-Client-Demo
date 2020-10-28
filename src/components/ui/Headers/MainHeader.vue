<template>
  <header class="mainHeader">
    <div class="mainHeader__container" :style="{ backgroundColor: bgColor }">
      <div class="sbLogo"><img src="@/assets/SBLogo.png" alt="Sandbagger Logo" /></div>
      <div class="profile" @click.prevent.stop="closeNavMenu">
        <router-link to="/UserProfile"><img :src="currentUserImage" alt="Profile Image" /></router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { ICurrentUser } from '@/types/User/AuthUser'
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({ name: 'MainHeader' })
export default class MainHeader extends Vue {
  @Prop() currentUser!: ICurrentUser
  @Prop({ default: 'white' }) bgColor?: string
  @Emit('closeNavMenu')
  closeNavMenu(): boolean {
    return false
  }
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
    position: relative;
    padding: 0.4rem 1rem;
    border-bottom: 1px solid $DarkBlue;
    height: 60px;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    h1 {
      font-size: 0.9rem;
      font-weight: normal;
      color: lightgrey;
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
    .sbLogo {
      width: 60px;
    }

    .profileContainer {
      display: flex;
      align-items: flex-end;

      .buttons {
        display: flex;
        margin-right: 0.5rem;
      }
      button {
        width: 25px;
        border-radius: 50%;
        height: 25px;
        margin: 0 0.3rem 0 0;
      }
    }

    .profile {
      transform: translateY(20px);
      position: relative;
      width: 60px;
      height: 60px;
      padding: 0.3rem;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 3px 5px rgba(102, 102, 102, 0.5);
      a {
        display: block;
        height: 100%;
        width: 100%;

        img {
          object-fit: cover;
          border-radius: 3px;
        }
      }
    }
  }
}

@media (min-width: 375px) {
  .mainHeader {
    &__container {
      padding: 0.8rem 1rem;
      h1 {
      }
      img {
      }
      .sbLogo {
      }

      .profile {
        a {
          img {
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .mainHeader {
    &__container {
      height: 100px;
      align-items: center;
      padding: 1rem 2rem;

      h1 {
      }
      img {
      }
      .sbLogo {
      }

      .profile {
        width: 80px;
        height: 80px;
        transform: translateY(20px);
        a {
          img {
          }
        }
      }
    }
  }
}
</style>

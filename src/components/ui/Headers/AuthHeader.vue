<template>
  <header class="authHeader">
    <div class="authHeader__container" :style="{ backgroundColor: Header.bgColor }">
      <div class="sbLogo"><img src="@/assets/SBLogo.png" alt="Sandbagger Logo" /></div>
      <div class="profile" @click.prevent.stop="closeNavMenu">
        <router-link to="/UserProfile"><img :src="currentUserImage" alt="Profile Image" /></router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator'
import { LoggedInUserVm } from "@/types/ViewModels/UserVm";
import { IHeader } from "@/types/vuexStore/UIStore";
import NavigationHelper from "@/utility/NavigationHelper";

@Component({ name: 'AuthHeader' })
export default class AuthHeader extends Vue {
  @Prop() currentUser!: LoggedInUserVm
  @Prop({ default: 'white' }) bgColor?: string

  closeNavMenu(): void {
    NavigationHelper.ToggleNavMenu(false)
  }
  get currentUserImage(): string {
    if (this.currentUser.image == null) {
      return require('@/assets/icons/avatar.svg')
    } else {
      return this.currentUser.image
    }
  }
  get Header(): IHeader {
    return this.$store.getters["uiStore/Header"];
  }

}
</script>

<style scoped lang="scss">
.authHeader {
  box-shadow: 0 1px 3px rgba(102, 102, 102, 0.5);
  position: relative;
  z-index: 3;
  &__container {
    position: relative;
    padding: 0.4rem 1rem;
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
      transform: translateY(10px);
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
      height: 80px;
      padding: 0.8rem 1rem;
      h1 {
      }
      img {
      }
      .sbLogo {
      }

      .profile {
        width: 70px;
        height: 70px;
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

<template>
  <div class="navBar">
    <div class="navBar__container" v-show="isNavBarShowing">
      <div class="navBar__favorites">
        <router-link v-for="link in favoriteLinks" :key="link.link" :to="link.link">
          <!--              <img :src="favoriteLinkImg(link.name)" alt="" />-->
          <div class="svgContainer" v-html="favoriteLinkImg(link.name)"></div>
          <span>{{ link.name }}</span>
        </router-link>
      </div>
      <div class="navBar__menu">
        <button class="toggleMenuBtn" @click="toggleNavMenu">
          <img src="@/assets/icons/bottomBar-menu.svg" alt="menu" />
        </button>
        <button class="hideNavBarBtn" @click="toggleNavBar(false)">
          <img src="@/assets/icons/hideEye.svg" alt="hide navbar red eye." />
        </button>
      </div>
    </div>
    <div class="showNavBarBtn" v-show="!isNavBarShowing">
      <button @click="toggleNavBar(true)"><img src="@/assets/icons/showEye.svg" alt="Show Nav Bar Btn" /></button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NavigationHelper from "@/utility/NavigationHelper";
import { FavoriteLinkVm } from "@/types/ViewModels/UserVm";

@Component({ name: "NavBar" })
export default class NavBar extends Vue {
  @Prop() isNavBarShowing!: boolean;
  @Prop() isNavMenuShowing!: boolean;
  @Prop() favoriteLinks!: Array<FavoriteLinkVm>;

  toggleNavBar(status: boolean): void {
    NavigationHelper.ToggleNavBar(status);
  }

  toggleNavMenu(status: boolean): void {
    NavigationHelper.ToggleNavMenu(status);
  }

  favoriteLinkImg(name: string): string {
    let svgImg;
    switch (name) {
      case "Dashboard":
        svgImg =
          "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
          "<path d=\"M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z\" fill=\"#17252A\"/>\n" +
          "</svg>\n";
        break;
      case "MockDrafts":
        svgImg =
          "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M19 5V19H5V5H19ZM20.1 3H3.9C3.4 3 3 3.4 3 3.9V20.1C3 20.5 3.4 21 3.9 21H20.1C20.5 21 21 20.5 21 20.1V3.9C21 3.4 20.5 3 20.1 3V3ZM11 7H17V9H11V7ZM11 11H17V13H11V11ZM11 15H17V17H11V15ZM7 7H9V9H7V7ZM7 11H9V13H7V11ZM7 15H9V17H7V15Z\" fill=\"#17252A\"/>\n</svg>";
        break;
      case "Ideas":
        svgImg =
          "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
          "<path d=\"M3.55 5.46L4.96 4.05L6.75 5.85L5.34 7.26L3.55 5.46ZM11 1.55H13V4.5H11V1.55ZM4 13.5H1V11.5H4V13.5ZM15 17.69V22.5H9V17.69C7.21 16.65 6 14.72 6 12.5C6 9.19 8.69 6.5 12 6.5C15.31 6.5 18 9.19 18 12.5C18 14.72 16.79 16.65 15 17.69ZM20 13.5V11.5H23V13.5H20ZM17.24 5.84L19.03 4.04L20.44 5.45L18.64 7.24L17.24 5.84Z\" fill=\"#17252A\"/>\n" +
          "</svg>\n";
        break;
      case "Sandbaggers":
        svgImg =
          "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
          "<path d=\"M19.5 21C20.3284 21 21 20.3284 21 19.5C21 18.6716 20.3284 18 19.5 18C18.6716 18 18 18.6716 18 19.5C18 20.3284 18.6716 21 19.5 21Z\" fill=\"#17252A\"/>\n" +
          "<path d=\"M17 5.92L9 2V20H7V18.27C5.21 18.62 4 19.26 4 20C4 21.1 6.69 22 10 22C13.31 22 16 21.1 16 20C16 19.01 13.84 18.19 11 18.03V8.98L17 5.92Z\" fill=\"#17252A\"/>\n" +
          "</svg>\n";
        break;
      case "PowerRankings":
        svgImg =
          "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 25 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
          "<path d=\"M25 7.8125C25 9.22852 24.6501 10.5387 23.9502 11.7432C23.2503 12.9476 22.3022 13.8957 21.106 14.5874C19.9097 15.2791 18.6035 15.625 17.1875 15.625H16.4062C14.8438 16.3249 14.0625 17.3665 14.0625 18.75C14.0625 20.4102 14.7135 21.5413 16.0156 22.1436C16.862 22.29 17.5293 22.4772 18.0176 22.7051C18.5059 22.9329 18.75 23.1771 18.75 23.4375C18.75 23.877 18.1396 24.2472 16.9189 24.5483C15.6982 24.8494 14.2253 25 12.5 25C10.7747 25 9.30176 24.8494 8.08105 24.5483C6.86035 24.2472 6.25 23.877 6.25 23.4375C6.25 23.1771 6.49414 22.9329 6.98242 22.7051C7.4707 22.4772 8.13802 22.29 8.98438 22.1436C10.2865 21.5413 10.9375 20.4102 10.9375 18.75C10.9375 17.3665 10.1562 16.3249 8.59375 15.625H7.8125C6.39648 15.625 5.09033 15.2791 3.89404 14.5874C2.69775 13.8957 1.74967 12.9476 1.0498 11.7432C0.349935 10.5387 0 9.22852 0 7.8125C0 6.25 0.427246 4.89909 1.28174 3.75977C2.13623 2.62044 3.27962 1.80664 4.71191 1.31836C4.69564 0.813802 4.6875 0.374349 4.6875 0H20.3125C20.3125 0.390625 20.3044 0.830078 20.2881 1.31836C21.7204 1.80664 22.8638 2.62044 23.7183 3.75977C24.5728 4.89909 25 6.25 25 7.8125ZM5.00488 4.58984C3.75163 5.28971 3.125 6.36393 3.125 7.8125C3.125 9.06576 3.56038 10.144 4.43115 11.0474C5.30192 11.9507 6.35579 12.4268 7.59277 12.4756C6.32324 10.5062 5.46061 7.8776 5.00488 4.58984ZM13.916 4.71191L12.5 1.5625L11.084 4.71191L7.8125 5.15137L10.2295 7.51953L9.59473 10.9375L12.5 9.27734L15.4053 10.9375L14.7705 7.51953L17.1875 5.15137L13.916 4.71191ZM19.9951 4.58984C19.5394 7.8776 18.6768 10.5062 17.4072 12.4756C18.6442 12.4268 19.6981 11.9507 20.5688 11.0474C21.4396 10.144 21.875 9.06576 21.875 7.8125C21.875 6.36393 21.2484 5.28971 19.9951 4.58984Z\" fill=\"#17252A\"/>\n" +
          "</svg>\n";
        break;
      case "Bets":
        svgImg =
          "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
          "<path d=\"M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11.41 16.09V18H8.74V16.07C7.03 15.71 5.58 14.61 5.47 12.67H7.43C7.53 13.72 8.25 14.54 10.08 14.54C12.04 14.54 12.48 13.56 12.48 12.95C12.48 12.12 12.04 11.34 9.81 10.81C7.33 10.21 5.63 9.19 5.63 7.14C5.63 5.42 7.02 4.3 8.74 3.93V2H11.41V3.95C13.27 4.4 14.2 5.81 14.26 7.34H12.3C12.25 6.23 11.66 5.47 10.08 5.47C8.58 5.47 7.68 6.15 7.68 7.11C7.68 7.95 8.33 8.5 10.35 9.02C12.37 9.54 14.53 10.41 14.53 12.93C14.52 14.76 13.15 15.76 11.41 16.09Z\" fill=\"#17252A\"/>\n" +
          "</svg>\n";
        break;

      case "Contacts":
        svgImg = `<svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 0H4C3.46957 0 2.96086 0.210714 2.58579 0.585786C2.21071 0.960859 2 1.46957 2 2V5H0V7H2V9H0V11H2V13H0V15H2V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V1C20 0.734784 19.8946 0.48043 19.7071 0.292893C19.5196 0.105357 19.2652 0 19 0ZM11 2.999C12.648 2.999 14 4.35 14 5.999C13.9971 6.79385 13.6801 7.55533 13.1182 8.11747C12.5562 8.67962 11.7948 8.99684 11 9C9.353 9 8 7.647 8 5.999C8 4.35 9.353 2.999 11 2.999ZM17 16H5V15.25C5 13.031 7.705 10.75 11 10.75C14.295 10.75 17 13.031 17 15.25V16Z" fill="#17252A"/>
      </svg>`;
        break;
      default:
        svgImg =
          "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
          "<path d=\"M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z\" fill=\"#17252A\"/>\n" +
          "</svg>\n";
    }
    return svgImg;
  }
}
</script>

<style scoped lang="scss">
.navBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 1rem 1rem 1rem;
  background-color: transparent;
  @include tablet {
    padding: 0 0 1.5rem 0;
  }
  @include tablet-landscape {
    padding: 0 0 1rem 0;
  }

  &__container {
    height: 50px;
    background-color: white;
    box-shadow: 2px 2px 3px $DarkBlue;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 1.5rem;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    @include tablet {
      width: 60%;
      height: 60px;
      padding: 0.2rem 2rem;
    }
    @include tablet-landscape {
      width: 50%;
    }
    @include desktopSmall {
      width: 40%;
      height: 75px;
    }
    @include desktopLarge {
      width: 30%;
    }

    &.show {
      animation: showNavBar 0.3s linear forwards;
    }

    &.hide {
      animation: hideNavBar 0.3s linear forwards;
    }

    .toggleMenuBtn {
      border: none;
      background-color: transparent;
      width: 40px;
      height: 40px;
      padding: 0;
      @include tablet-landscape {
        height: 45px;
        width: 45px;
      }
      @include desktop {
        height: 50px;
        width: 50px;
      }

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }

    .hideNavBarBtn {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(35px, -35px);
      border: none;
      height: 40px;
      width: 40px;
      padding: 0.3rem;
      @include tablet-landscape {
        height: 45px;
        width: 45px;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        background-color: white;
        border-radius: 50px;
      }
    }
  }

  &__menu {
    width: 60px;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @include tablet-landscape {
      width: 65px;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 50%;
      transform: translateY(50%);
      height: 80%;
      width: 2px;
      background-color: #17252a;
    }
  }

  &__favorites {
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    @include tablet-landscape {
    }
    @include desktop {
    }

    a {
      flex: auto;
      margin-right: 1.5rem;
      font-size: 0.5rem;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: $DarkBlue;
      @include mobile {
        font-size: 0.6rem;
      }
      @include tablet {
        font-size: 0.8rem;
        margin-right: 2rem;
      }
      @include desktop {
        font-size: 0.9rem;
      }

      img {
        object-fit: contain;
        height: 25px;
        width: 25px;
        @include tablet {
          width: 30px;
          height: 30px;
        }
      }

      span {
        margin-top: 0.1rem;
        @include tablet {
          margin-top: 0.3rem;
        }
      }
    }
  }

  .svgContainer {
    height: 20px;
    width: 20px;
    @include tablet {
      height: 25px;
      width: 25px;
    }
    @include desktop {
      height: 30px;
      width: 30px;
    }

    svg {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .showNavBarBtn {
    //transform: translateY(100%);
    right: .5rem;
    bottom: .5rem;
    position: absolute;

    &.show {
      animation: showBTN 0.3s linear forwards;
    }

    &.hide {
      animation: hideBTN 0.3s linear forwards;
    }

    button {
      border: none;
      height: 40px;
      width: 40px;
      padding: 0.3rem;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        background-color: white;
        border-radius: 50px;
      }
    }


  }


}

@keyframes showBTN {
  0% {
    transform: translateY(150%);
  }
  100% {
    transform: translateY(0);
    bottom: 0.5rem;
  }
}

@keyframes hideBTN {
  0% {
    transform: translateY(0);
    bottom: 0.5rem;
  }
  100% {
    transform: translateY(150%);
    bottom: 0;
  }
}

@keyframes showNavBar {
  0% {
    transform: translate(-50%, 200%);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

@keyframes hideNavBar {
  0% {
    transform: translate(-50%, 0);
  }
  100% {
    transform: translate(-50%, 200%);
  }
}
</style>

<template>
  <div class="userProfile" v-if="currentUser && currentUser.profile">

    <section class="section section__top">
      <button class="backBtn btn btn--borderGreen btn--xs btn--borderBottom" @click="goBack">Back</button>
      <div class="imageContainer">
        <img v-bind:src="userProfileImage" alt="User profile image" />
      </div>
      <div class="userInfo">
        <h1>{{ currentUser.fullName }}</h1>
        <div class="handicapContainer">
          <div class="flexHandicap">
            <p>Handicap: </p>
            <label class="hideLabel" for="userHandicap"></label>
            <input id="userHandicap" class="input" type="text" v-model.lazy.number.trim="currentUser.profile.handicap">
          </div>
        </div>
      </div>
    </section>

    <section class="section section__middle">

    </section>

    <section class="section section__bottom" v-if="!loading">
      <!--      Profile-->
      <form v-show="currentView.title === 'Profile'" class="view profile">
        <div class="form__field">
          <label for="firstName">First</label>
          <input type="text" id="firstName" v-model="currentUser.profile.firstName" />
        </div>
        <div class="form__field">
          <label for="lastName">Last</label>
          <input type="text" id="lastName" v-model="currentUser.profile.lastName" />
        </div>
        <div class="form__field">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="currentUser.email" />
        </div>
        <!-- TODO add formatter for phone number -->
        <div class="form__field">
          <label for="phone">Phone</label>
          <input type="tel" id="phone" v-model="currentUser.phoneNumber" @input="formatPhone" />
        </div>
      </form>
      <!--      Settings -->
      <div v-show="currentView.title === 'Settings'" class="view settings">
        <h2>Favorite Links</h2>
        <div class="favoriteLink">
          <p>One</p>
          <label class="hideLabel" for="favoriteLinkOne"></label>
          <select id="favoriteLinkOne">
            <option v-for="link in selectableFavoriteLinks" :key="link.name">{{ link.name }}</option>
          </select>
        </div>
        <div class="favoriteLink"><p>Two</p></div>
        <div class="favoriteLink"><p>Three</p></div>
      </div>
      <!--      Update Button-->
      <div class="updateBtnContainer">
        <button @click.stop.prevent="updateCurrentUser" class="btn btn--borderGreen" v-show="currentView.title">
          Update
        </button>
      </div>
    </section>

    <div class="menuContainer">
      <button class="toggleMenuBtn" @click="toggleOptionMenu(!isOptionMenuShowing)">
        <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 7.5H7.13213V0.514709H0V7.5ZM8.93393 7.5H16.0661V0.514709H8.93393V7.5ZM17.8303 7.5H25V0.514709H17.8303V7.5ZM0 16.25H7.13213V9.26471H0V16.25ZM8.93393 16.25H16.0661V9.26471H8.93393V16.25ZM17.8303 16.25H25V9.26471H17.8303V16.25ZM0 25H7.13213V17.9779H0V25ZM8.93393 25H16.0661V17.9779H8.93393V25ZM17.8303 25H25V17.9779H17.8303V25Z"
            fill="#17252A"
          />
        </svg>
      </button>
      <div class="optionMenu" v-show="isOptionMenuShowing">
        <h2>Edit</h2>
        <div class="optionMenu__grid">
          <button v-for="option in optionViews" :key="option.title" @click="toggleEditView(option)">
            <span class="imageSpan" v-html="option.image"></span>
            <span>{{ option.title }}</span>
          </button>
        </div>
      </div>
    </div>


    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import UIHelper from "@/utility/UIHelper";
import UsersService from "@/services/UsersService";
import Helper from "@/utility/Helper";
import { FavorLinkVm, LoggedInUserVm, UserVm } from "@/types/ViewModels/UserVm";

interface IOptionView {
  title: string
  image: string
}

@Component({
  name: "UserProfile",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue")
  }
})
export default class UserProfile extends Vue {
  loading = false;
  optionViews: Array<IOptionView> = [
    {
      title: "Profile",
      image:
        "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">" +
        "<path d=\"M13.5 0H1.5C0.675 0 0 0.675 0 1.5V14.5C0 15.325 0.675 16 1.5 16H13.5C14.325 16 15 15.325 15 14.5V1.5C15 0.675 14.325 0 13.5 0ZM13 14H2V2H13V14ZM4 9H11V10H4V9ZM4 11H11V12H4V11ZM5 4.5C5.00007 4.30295 5.03894 4.10785 5.11441 3.92582C5.18988 3.7438 5.30046 3.57842 5.43984 3.43913C5.57922 3.29984 5.74467 3.18937 5.92675 3.11403C6.10882 3.03868 6.30395 2.99993 6.501 3C6.69805 3.00007 6.89315 3.03894 7.07518 3.11441C7.2572 3.18988 7.42258 3.30046 7.56187 3.43984C7.70116 3.57922 7.81163 3.74467 7.88697 3.92675C7.96232 4.10882 8.00107 4.30395 8.001 4.501C8.00087 4.89896 7.84265 5.28056 7.56116 5.56187C7.27967 5.84317 6.89796 6.00113 6.5 6.001C6.10204 6.00087 5.72044 5.84265 5.43913 5.56116C5.15783 5.27967 4.99987 4.89796 5 4.5ZM7.5 6H5.5C4.675 6 4 6.45 4 7V8H9V7C9 6.45 8.325 6 7.5 6Z\" fill=\"#17252A\"/>" +
        "</svg>"
    },
    {
      title: "Settings",
      image:
        "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 25 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<path d=\"M7.70833 12.5C7.70833 15.2083 9.86111 17.3611 12.5694 17.3611C15.2778 17.3611 17.4306 15.2083 17.4306 12.5C17.4306 9.79166 15.2778 7.63889 12.5694 7.63889C9.86111 7.63889 7.70833 9.79166 7.70833 12.5V12.5ZM16.0417 12.5C16.0417 14.4444 14.5139 15.9722 12.5694 15.9722C10.625 15.9722 9.09722 14.4444 9.09722 12.5C9.09722 10.5556 10.625 9.02777 12.5694 9.02777C14.5139 9.02777 16.0417 10.5556 16.0417 12.5Z\" fill=\"#17252A\"/>\n" +
        "<path d=\"M22.7778 10.2083L20.8333 9.58333L20.7639 9.375C20.2083 9.375 19.6528 9.23611 19.0972 9.09722C19.3056 9.51389 19.5139 10 19.6528 10.4167L19.7222 10.7639L22.2222 11.5278V13.4722L19.7222 14.2361L19.6528 14.5833L19.0278 16.0417L18.8194 16.3889L20.0694 18.6806L18.6806 20.0694L16.3889 18.8194L16.0417 19.0278C15.5556 19.3056 15.0694 19.5139 14.5833 19.6528L14.2361 19.7222L13.4722 22.2222H11.5278L10.7639 19.7222L10.4167 19.6528L8.95833 19.0278L8.61111 18.8194L6.31944 20.0694L4.93056 18.6806L6.18056 16.3889L5.97222 16.0417C5.69444 15.5556 5.48611 15.0694 5.34722 14.5833L5.27778 14.2361L2.77778 13.4722V11.5278L5.13889 10.8333L5.27778 10.4861C5.41667 9.93055 5.625 9.44444 5.90278 8.95833L6.11111 8.61111L4.93056 6.31944L6.31944 4.93055L8.54167 6.18055L8.88889 5.97222C9.375 5.69444 9.86111 5.48611 10.4167 5.34722L10.7639 5.20833L11.5278 2.77777H13.4722L14.2361 5.20833L14.5833 5.34722C15.0694 5.48611 15.4861 5.69444 15.9028 5.90277C15.6944 5.34722 15.625 4.79166 15.625 4.16666L15.3472 4.02777L14.7222 2.08333C14.5833 1.73611 14.1667 1.38889 13.6806 1.38889H11.3194C10.8333 1.38889 10.4167 1.73611 10.3472 2.22222L9.72222 4.16666C9.30556 4.23611 8.95833 4.375 8.61111 4.58333L6.80556 3.61111C6.38889 3.40277 5.83333 3.47222 5.48611 3.81944L3.81944 5.48611C3.47222 5.83333 3.40278 6.38889 3.61111 6.80555L4.51389 8.54166C4.375 8.88889 4.23611 9.30555 4.09722 9.65277L2.15278 10.2778C1.73611 10.4167 1.38889 10.8333 1.38889 11.3194V13.6806C1.38889 14.1667 1.73611 14.5833 2.22222 14.7222L4.16667 15.3472L4.58333 16.3889L3.61111 18.1944C3.40278 18.6111 3.47222 19.1667 3.81944 19.5139L5.48611 21.1806C5.83333 21.5278 6.38889 21.5972 6.80556 21.3889L8.61111 20.4167L9.65278 20.8333L10.2778 22.8472C10.4167 23.2639 10.8333 23.6111 11.3194 23.6111H13.6806C14.1667 23.6111 14.5833 23.2639 14.7222 22.8472L15.3472 20.8333L16.3889 20.4167L18.1944 21.3889C18.6111 21.5972 19.1667 21.5278 19.5139 21.1806L21.1806 19.5139C21.5278 19.1667 21.5972 18.6111 21.3889 18.1944L20.4167 16.3889L20.8333 15.3472L22.8472 14.7222C23.2639 14.5833 23.6111 14.1667 23.6111 13.6806V11.3194C23.6111 10.8333 23.2639 10.3472 22.7778 10.2083V10.2083Z\" fill=\"#17252A\"/>\n" +
        "<path d=\"M20.8333 7.6389C22.751 7.6389 24.3056 6.08434 24.3056 4.16668C24.3056 2.24902 22.751 0.694458 20.8333 0.694458C18.9157 0.694458 17.3611 2.24902 17.3611 4.16668C17.3611 6.08434 18.9157 7.6389 20.8333 7.6389Z\" fill=\"#17252A\"/>\n" +
        "</svg>\n"
    },
    {
      title: "Bets",
      image:
        "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 20 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">" +
        "<path d=\"M18 14H2V2H18V14ZM18 0H2C0.89 0 0 0.89 0 2V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H18C18.5304 16 19.0391 15.7893 19.4142 15.4142C19.7893 15.0391 20 14.5304 20 14V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0V0ZM9 13H11V12H12C12.2652 12 12.5196 11.8946 12.7071 11.7071C12.8946 11.5196 13 11.2652 13 11V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7H9V6H13V4H11V3H9V4H8C7.73478 4 7.48043 4.10536 7.29289 4.29289C7.10536 4.48043 7 4.73478 7 5V8C7 8.26522 7.10536 8.51957 7.29289 8.70711C7.48043 8.89464 7.73478 9 8 9H11V10H7V12H9V13Z\" fill=\"#17252A\"/>" +
        "</svg>"
    },
    {
      title: "History",
      image:
        "<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 25 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "<path d=\"M7.70833 12.5C7.70833 15.2083 9.86111 17.3611 12.5694 17.3611C15.2778 17.3611 17.4306 15.2083 17.4306 12.5C17.4306 9.79166 15.2778 7.63889 12.5694 7.63889C9.86111 7.63889 7.70833 9.79166 7.70833 12.5V12.5ZM16.0417 12.5C16.0417 14.4444 14.5139 15.9722 12.5694 15.9722C10.625 15.9722 9.09722 14.4444 9.09722 12.5C9.09722 10.5556 10.625 9.02777 12.5694 9.02777C14.5139 9.02777 16.0417 10.5556 16.0417 12.5Z\" fill=\"#17252A\"/>\n" +
        "<path d=\"M22.7778 10.2083L20.8333 9.58333L20.7639 9.375C20.2083 9.375 19.6528 9.23611 19.0972 9.09722C19.3056 9.51389 19.5139 10 19.6528 10.4167L19.7222 10.7639L22.2222 11.5278V13.4722L19.7222 14.2361L19.6528 14.5833L19.0278 16.0417L18.8194 16.3889L20.0694 18.6806L18.6806 20.0694L16.3889 18.8194L16.0417 19.0278C15.5556 19.3056 15.0694 19.5139 14.5833 19.6528L14.2361 19.7222L13.4722 22.2222H11.5278L10.7639 19.7222L10.4167 19.6528L8.95833 19.0278L8.61111 18.8194L6.31944 20.0694L4.93056 18.6806L6.18056 16.3889L5.97222 16.0417C5.69444 15.5556 5.48611 15.0694 5.34722 14.5833L5.27778 14.2361L2.77778 13.4722V11.5278L5.13889 10.8333L5.27778 10.4861C5.41667 9.93055 5.625 9.44444 5.90278 8.95833L6.11111 8.61111L4.93056 6.31944L6.31944 4.93055L8.54167 6.18055L8.88889 5.97222C9.375 5.69444 9.86111 5.48611 10.4167 5.34722L10.7639 5.20833L11.5278 2.77777H13.4722L14.2361 5.20833L14.5833 5.34722C15.0694 5.48611 15.4861 5.69444 15.9028 5.90277C15.6944 5.34722 15.625 4.79166 15.625 4.16666L15.3472 4.02777L14.7222 2.08333C14.5833 1.73611 14.1667 1.38889 13.6806 1.38889H11.3194C10.8333 1.38889 10.4167 1.73611 10.3472 2.22222L9.72222 4.16666C9.30556 4.23611 8.95833 4.375 8.61111 4.58333L6.80556 3.61111C6.38889 3.40277 5.83333 3.47222 5.48611 3.81944L3.81944 5.48611C3.47222 5.83333 3.40278 6.38889 3.61111 6.80555L4.51389 8.54166C4.375 8.88889 4.23611 9.30555 4.09722 9.65277L2.15278 10.2778C1.73611 10.4167 1.38889 10.8333 1.38889 11.3194V13.6806C1.38889 14.1667 1.73611 14.5833 2.22222 14.7222L4.16667 15.3472L4.58333 16.3889L3.61111 18.1944C3.40278 18.6111 3.47222 19.1667 3.81944 19.5139L5.48611 21.1806C5.83333 21.5278 6.38889 21.5972 6.80556 21.3889L8.61111 20.4167L9.65278 20.8333L10.2778 22.8472C10.4167 23.2639 10.8333 23.6111 11.3194 23.6111H13.6806C14.1667 23.6111 14.5833 23.2639 14.7222 22.8472L15.3472 20.8333L16.3889 20.4167L18.1944 21.3889C18.6111 21.5972 19.1667 21.5278 19.5139 21.1806L21.1806 19.5139C21.5278 19.1667 21.5972 18.6111 21.3889 18.1944L20.4167 16.3889L20.8333 15.3472L22.8472 14.7222C23.2639 14.5833 23.6111 14.1667 23.6111 13.6806V11.3194C23.6111 10.8333 23.2639 10.3472 22.7778 10.2083V10.2083Z\" fill=\"#17252A\"/>\n" +
        "<path d=\"M20.8333 7.6389C22.751 7.6389 24.3056 6.08434 24.3056 4.16668C24.3056 2.24902 22.751 0.694458 20.8333 0.694458C18.9157 0.694458 17.3611 2.24902 17.3611 4.16668C17.3611 6.08434 18.9157 7.6389 20.8333 7.6389Z\" fill=\"#17252A\"/>\n" +
        "</svg>\n"
    }
  ];
  currentUser = {} as LoggedInUserVm;
  isOptionMenuShowing = false;
  currentView = {} as IOptionView;
  selectableFavoriteLinks: FavorLinkVm[] = [{ name: "Dashboard", link: "/dashboard" }];

  mounted(): void {
    this.currentView = this.optionViews[0];
    this.getCurrentUser();
    UIHelper.ToggleNavBar(false);
  }

  @Watch("currentUser.profile.handicap", { immediate: true }) onHandicapChange(newVal: number, oldVal: number): void {
    if (oldVal != undefined) {
      const debounce = Helper.debounce(this.updateUserHandicap, 3000);
      debounce(newVal, oldVal);
    }
  }


  async updateUserHandicap(val: number, oldVal: number): Promise<void> {
    if (val !== oldVal) {
      this.loading = true;
      try {
        const res = await UsersService.UpdateUser(this.currentUser);
        if (res.status === 200) {
          console.log(res);
          await this.$store.dispatch("authStore/updateCurrentUser", this.currentUser);
          this.currentUser = res.data;
          await UIHelper.SnackBar({
            isSnackBarShowing: true,
            title: "Handicap Updated",
            message: `Your handicap has been updated from ${oldVal} to ${val}`,
            classInfo: "primary"
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 3000);

      }
    }
  }


  async updateCurrentUser(): Promise<void> {
    this.loading = true;
    try {
      const res = await UsersService.UpdateUser(this.currentUser);
      if (res.status === 200) {
        setTimeout(() => {
          this.$store.dispatch("authStore/updateCurrentUser", this.currentUser);
          this.currentUser = res.data;
          UIHelper.SnackBar({
            isSnackBarShowing: true,
            title: "Updated",
            message: "Your settings have been updated",
            classInfo: "primary"
          });
        }, Math.floor(Math.random() * 3000));

      }
    } catch (e) {
      console.log(e);

    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 3000);

    }
  }

  /**
   * @description Returns user profile image or defaults to SBLogo.png
   * @returns {string} currentUser.profile.image
   */
  get userProfileImage(): string {
    if (this.currentUser.profile && this.currentUser.profile.image) {
      return this.currentUser.profile.image;
    } else {
      return require("@/assets/SBLogo.png");
    }
  }

  /**
   * @description sets currentUser form Vuex Store
   */
  getCurrentUser(): void {
    this.currentUser = this.$store.getters["authStore/CurrentUser"] as LoggedInUserVm;
    UIHelper.Header({ title: "profile", isShowing: false });
  }

  toggleOptionMenu(status: boolean): void {
    this.isOptionMenuShowing = status;
  }

  toggleEditView(opt: IOptionView): void {
    this.currentView = opt;
    this.toggleOptionMenu(false);
  }

  formatPhone(): void {
    this.currentUser.phoneNumber = Helper.formatPhone(this.currentUser.phoneNumber);
  }

  goBack(): void {
    this.$router.back();
    UIHelper.ToggleNavBar(true);
  }
}
</script>

<style scoped lang="scss">
$--userFullNameFS: (
  null: 1.6rem,
  $mobile: 1.8rem,
);
$--userHandicapFS: (
  null: .9rem,
  $mobile: 1.1rem
);

$--optionBtnFS: (
  null: 0.8rem,
  $mobile: 0.9rem,
);

$--editTitleFS: (
  null: 1.2rem,
  $mobile: rem,
);


$--bottomTitleFS: (
  null: 1rem,
  $mobile: rem,
);

$--labelFS: (
  null: 1.2rem,
  $mobile:rem,
  $tablet:rem,
  $tablet-landscape:rem,
  $desktopSmall:rem,
  $desktop:rem,
  $desktopLarge: rem,
);
$--inputFS: (
  null: 1rem,
  $mobile:1.2rem,
  $tablet:rem,
  $tablet-landscape:rem,
  $desktopSmall:rem,
  $desktop:rem,
  $desktopLarge: rem,
);

.userProfile {
  padding: 0;
}

.section {
  &__top {
    position: relative;
    z-index: 2;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background-color: white;
  }

  &__middle {
    position: relative;
    z-index: 1;
    height: 25px;
    transform: translateY(-20px);
    background-color: $DarkBlue;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 1rem 2rem;
    overflow-x: auto;
    overflow-y: hidden;
    flex-wrap: nowrap;

  }

  &__bottom {
    padding: 0 1rem;

    h2 {
      @include font-size($--bottomTitleFS);
    }
  }
}

.backBtn {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
}

.imageContainer {
  height: 125px;
  width: 125px;
  background-color: white;
  border-radius: 10px;
  padding: 0.5rem;

  @include mobile {
    height: 150px;
    width: 150px;
  }

  img {
    object-position: center center;
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
}

.userInfo {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    @include font-size($--userFullNameFS);
    color: $DarkBlue;
    letter-spacing: 0;
  }

  .handicapContainer {
    margin: .5rem 0;


    .flexHandicap {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    p {
      color: $SecondaryFS;
      text-align: center;
      @include font-size($--userHandicapFS);
      font-weight: 500;

    }

    input {
      flex: 0 0 25%;
      margin-left: .3rem;
      background-color: transparent;
      line-height: 1;
      border: none;
      border-bottom: 1px solid $SecondaryFS;
    }
  }

}


.menuContainer {
  z-index: 2;
  position: fixed;
  bottom: 1rem;
  right: 0.5rem;
  height: 50px;
  width: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggleMenuBtn {
  height: 40px;
  width: 40px;
  border: none;
  padding: 0.3rem;

  svg {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.optionMenu {
  position: absolute;
  padding: 0.8rem;
  bottom: 0;
  right: 0;
  transform: translate(-20px, -60px);
  border: 1px solid lightgrey;
  background-color: white;
  z-index: 5;
  box-shadow: 0 5px 5px rgba(128, 128, 128, 0.6);
  border-radius: 10px;

  h2 {
    margin: 0.5rem;
    @include font-size($--editTitleFS);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 75px);
    grid-auto-rows: 60px;
    gap: 0.4rem;
    padding: 0.8rem 0;
    @include mobile {
      grid-template-columns: repeat(3, 90px);
      grid-auto-rows: 80px;
    }

    button {
      box-shadow: 0 3px 3px grey;
      border: none;
      padding: 0.2rem;
      @include font-size($--optionBtnFS);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

  .imageSpan {
    height: 25px;
    width: 25px;
    margin-bottom: 0.1rem;

    @include mobile {
      height: 30px;
      width: 30px;
      margin-bottom: 0.2rem;
    }
  }
}

.view {
  padding: 0 1rem;

  @include mobile {
    padding: 0 2rem;
  }

  label {
    @include font-size($--labelFS);
    margin-left: .5rem;
  }

  input {
    @include font-size($--inputFS);
  }
}

.settings {
  .favoriteLink {
    display: flex;
    margin: 1rem;
  }

  select {
    margin-left: 1rem;
  }
}

.updateBtnContainer {
  padding: 2rem 1rem;
  @include mobile {
    padding: 2rem;
  }

  button {
    font-weight: bold;
    color: $DarkGreen;
  }
}
</style>

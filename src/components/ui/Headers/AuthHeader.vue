<template>
  <header class="authHeader">
    <div class="authHeader__container" :style="{ backgroundColor: Header.bgColor }">
      <div class="sbLogo"><img src="@/assets/SBLogo.png" alt="Sandbagger Logo" /></div>
      <div class="userBar">
        <div class="messages">
          <IconBtn class="messages__message" class-name="circle white">
            <template v-slot:svg>
              <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.2439 0.777198C7.16546 0.652962 1.49345 5.65668 0.861177 11.7163C0.193005 16.8412 3.00256 22.2468 7.68973 24.4802C12.1157 26.7074 17.8548 26.0367 21.5255 22.6567C25.2323 19.401 26.781 13.8611 25.0661 9.19525C23.4893 4.59632 19.0795 1.09372 14.2019 0.813563C13.8832 0.790013 13.5635 0.776927 13.2439 0.776927L13.2439 0.777198ZM13.1024 2.12584C18.6761 1.91565 23.9146 6.57004 24.3514 12.1435C24.8878 17.059 21.7995 22.1513 17.0997 23.7712C12.5312 25.4629 6.92323 23.8183 4.16398 19.7489C1.332 15.7764 1.44448 9.91255 4.65779 6.18562C6.71442 3.70483 9.87005 2.13788 13.1024 2.12585V2.12584ZM13.3237 3.34146C8.16761 3.17718 3.42402 7.71045 3.33088 12.8742C3.10359 17.5403 6.55693 22.1195 11.1702 23.0083C15.4446 23.9453 20.2206 21.7462 22.1277 17.7646C24.1001 13.8761 23.218 8.70123 19.8528 5.86073C18.0696 4.27901 15.7111 3.34408 13.3237 3.34146V3.34146ZM13.263 4.66696C17.8083 4.54661 21.948 8.6429 21.8751 13.1992C21.9554 17.4112 18.5702 21.4144 14.3471 21.8391C10.3822 22.3604 6.20175 19.8143 5.06182 15.9299C3.86695 12.2291 5.4368 7.77153 8.88029 5.86596C10.2006 5.08707 11.73 4.66447 13.263 4.66696V4.66696ZM8.64504 8.95105L13.3649 12.7855L18.0848 8.95105H8.64507H8.64504ZM7.59777 9.84086V17.6031H18.9372V9.99912C17.0798 11.5083 15.2223 13.0172 13.3649 14.5264C11.4471 12.9683 9.51559 11.399 7.59779 9.84086L7.59777 9.84086Z"
                  fill="#17252A" />
              </svg>
            </template>
          </IconBtn>
        </div>
        <div class="profile" @click.prevent.stop="closeNavMenu">
          <router-link to="/UserProfile"><img :src="currentUserImage" alt="Profile Image" /></router-link>
        </div>
      </div>

    </div>
  </header>
</template>

<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { LoggedInUserVm } from "@/types/ViewModels/Models/UserVm";
import { IHeader } from "@/types/vuexStore/UIStore";
import NavigationHelper from "@/utility/NavigationHelper";

@Component({
  name: "AuthHeader", components: {
    IconBtn: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/IconBtn.vue")

  }
})
export default class AuthHeader extends Vue {
  @Prop() currentUser!: LoggedInUserVm;
  @Prop({ default: "white" }) bgColor?: string;

  closeNavMenu(): void {
    NavigationHelper.ToggleNavMenu(false);
  }

  get currentUserImage(): string {
    if (this.currentUser.image == null) {
      return require("@/assets/icons/avatar.svg");
    } else {
      return this.currentUser.image;
    }
  }

  get Header(): IHeader {
    return this.$store.getters["uiStore/Header"];
  }

}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/components/_authHeader";
</style>

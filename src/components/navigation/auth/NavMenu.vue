<template>
  <div class="navMenu">
    <div class="adminButtons" v-if="userRoles.includes('Admin')">
      <button class="btn btn--xs text text--sm btn--borderBottom btn--border-darkBlue" @click="toggleLinksView('Main')" :class="{ active: currentLinkView === 'Main' }">Main
      </button>
      <button class="btn btn--xs text text--sm btn--borderBottom btn--border-darkBlue" @click="toggleLinksView('Admin')" :class="{ active: currentLinkView === 'Admin' }">Admin
      </button>
    </div>
    <nav>
      <transition name="slide-fade">
        <ul v-show="currentLinkView === 'Main'">
          <li v-for="link in UserLinks" :key="link.name" @click.prevent.stop="closeNavMenu">
            <router-link :to="link.link">
              <!--                <img :src="link.icon" :alt="`${link.name} route}`" />-->
              <div class="svgContainer" v-html="link.icon"></div>
              <span class="text text--xs">{{ link.name }}</span>
            </router-link>
          </li>
        </ul>
      </transition>
      <transition name="slide-fade">
        <ul v-show="currentLinkView === 'Admin'">
          <li v-for="link in AdminLinks" :key="link.name" @click.prevent.stop="closeNavMenu">
            <router-link :to="link.link">
              <div class="svgContainer" v-html="link.icon"></div>
              <span class="text text--xs">{{ link.name }}</span>
            </router-link>
          </li>
        </ul>
      </transition>
    </nav>
    <div class="extra">
      <div>
        <button id="logoutBTN" @click="logout" class="btn btn--xs btn--border-red btn--borderBottom text text--xs">Logout</button>
      </div>
      <div class="closeNavMenu">
        <button class="btn btn--xs btn--borderBottom btn--border-darkBlue text text--xs" @click="closeNavMenu">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UIHelper from "@/utility/UIHelper";
import { UserLink } from "@/types/vuexStore/NavigationStore";
import NavigationHelper from "@/utility/NavigationHelper";

@Component({ name: "NavMenu" })
export default class NavMenu extends Vue {
  @Prop() userRoles!: Array<string>;

  currentLinkView = "Main";

  get UserLinks(): Array<UserLink> {
    return this.$store.getters["navigationStore/UserLinks"];
  }

  get AdminLinks(): Array<UserLink> {
    return this.$store.getters["navigationStore/AdminLinks"];
  }

  toggleLinksView(view: string): void {
    this.currentLinkView = view;
  }

  closeNavMenu(): void {
    NavigationHelper.ToggleNavMenu(false);
  }

  logout(): void {
    UIHelper.clickedButton("logoutBTN");
    NavigationHelper.ToggleNavMenu(false);
    this.$store.dispatch("authStore/Logout");
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/components/_navMenu";
</style>

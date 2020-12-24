<template>
  <div class="admin">
    <div class="linkGrid">
      <router-link v-for="route in adminLinks" :key="route.name" outlined color="primary" class="btn btn--xs btn--borderBlue" :to="route.link">{{ route.name }}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IAdminLink } from "@/types/Navigation/INavBar";
import { IHeader } from "@/types/vuexStore/UIStore";

@Component({ name: "Admin" })
export default class Admin extends Vue {
  activeAdminLink = "Admin dashboard";
  adminLinks: IAdminLink[] = [
    { name: "Users", link: "/admin/users", icon: "golf" },
    { name: "Roles", link: "/admin/roles", icon: "golf" },
    { name: "Events", link: "/admin/events", icon: "golf" }
  ];

  mounted(): void {

  }

  setHeader(): void {
  }
}
</script>

<style scoped lang="scss">
.admin {
  .linkGrid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;

    a {
      text-align: center;
    }
  }
}
</style>

<template>
  <div class="snackBar" @click="closeSnackBar">
    <div class="snackBar__wrapper" :class="snackBarClass">
      <div class="title">
        <strong class="title__text ">{{ this.$store.state.uiStore.snackBar.title }}</strong>
      </div>
      <div class="content">
        <p class="content__text ">{{ this.$store.state.uiStore.snackBar.message }}</p>

        <ul class="errorList">
          <li class="errorList__item" v-for="(error, index) in this.$store.state.uiStore.snackBar.errors" :key="index">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UIHelper from "@/utility/UIHelper";

@Component({ name: "SnackBar" })
export default class SnackBar extends Vue {
  closeSnackBar(): void {
    UIHelper.SnackBar({ isSnackBarShowing: false });
  }

  get snackBarClass(): void {
    return this.$store.getters["uiStore/SnackBarClass"];
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/components/_snackBar";
</style>

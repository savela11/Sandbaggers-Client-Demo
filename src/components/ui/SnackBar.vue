<template>
  <div class="snackBar" @click="closeSnackBar">
    <div class="snackBar__wrapper" :class="snackBarClass">
      <div class="title">
        <strong>{{ this.$store.state.uiStore.snackBar.title }}</strong>
      </div>
      <div class="content">
        <p>{{ this.$store.state.uiStore.snackBar.message }}</p>

        <ul>
          <li v-for="(error, index) in this.$store.state.uiStore.snackBar.errors" :key="index">{{ error }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIHelper from '@/utility/UIHelper'

@Component({ name: 'SnackBar' })
export default class SnackBar extends Vue {
  closeSnackBar(): void {
    UIHelper.SnackBar({ isSnackBarShowing: false })
  }

  get snackBarClass(): void {
    return this.$store.getters['uiStore/SnackBarClass']
  }
}
</script>

<style scoped lang="scss">
.snackBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.3rem;
  z-index: 99999;

  &__wrapper {
    overflow: hidden;
    font-size: 0.875rem;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    background-color: grey;
    border-radius: 0.25rem;
    max-width: 350px;
    z-index: 2;

    & > div {
      font-size: 0.875rem;
    }

    .title {
      background-color: $DarkBlue;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      color: white;
      border-bottom: 1px solid rgba(0, 0, 0, 0.125);
      padding: 0.75rem 1.25rem;
      position: relative;
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
    }

    .content {
      background-color: rgba(255, 255, 255, 0.85);
      padding: 1.25rem;

      ul {
        padding: 0 0 0 1.5rem;
        margin: 0.3rem 0;

        li {
          margin-bottom: 0.3rem;
        }
      }
    }
  }

  .error {
    .title {
      background-color: rgba(165, 1, 1, 0.8);
      color: white;
    }
  }

  .primary {
    .title {
      background-color: #425a41;
      color: white;
    }
  }
}
</style>

<template>
  <div class="snackBar" v-if="this.$store.state.snackBar.isSnackBarShowing">
    <div class="snackBar__wrapper">
      <div class="title">
        <strong>{{ this.$store.state.snackBar.title }}</strong>
      </div>
      <div class="content">this is some content</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'SnackBar' })
export default class SnackBar extends Vue {
  vertical = true

  get showSnackBar() {
    return this.$store.getters['snackBarStore/showSnackBar']
  }

  closeSnackBar() {
    this.$store.dispatch('snackBar/_setSnackBar', { showSnackBar: false })
  }
}
</script>

<style scoped lang="scss">
.snackBar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 200px;
  padding: 0 0.5rem;
  z-index: 1;

  &__wrapper {
    overflow: hidden;
    font-size: 0.875rem;
    background-color: rgba(255, 255, 255, 0.85);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    background-color: grey;
    border-radius: 0.25rem;
    max-width: 350px;

    & > div {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    }

    .title {
      background-color: rgba(255, 255, 255, 0.85);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      color: #6c757d;
    }

    .content {
      background-color: rgba(255, 255, 255, 0.85);
    }
  }
}
</style>

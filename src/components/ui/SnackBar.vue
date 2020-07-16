<template>
  <div class="snackBar"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'SnackBar' })
export default class SnackBar extends Vue {
  vertical = true

  get showSnackBar() {
    return this.$store.getters['messageStore/showSnackBar']
  }

  closeSnackBar() {
    this.$store.dispatch('messageStore/_setSnackBar', { showSnackBar: false })
  }
}
</script>

<style scoped lang="scss"></style>

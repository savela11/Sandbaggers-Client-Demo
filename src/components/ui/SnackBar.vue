<template>
  <v-snackbar :timeout="6000" v-model="showSnackBar.showSnackBar" :vertical="vertical" color="white" class="text--secondary font-weight-bold body-2" top right>
    <p class="snackbar">{{ showSnackBar.message }}</p>
    <div v-if="showSnackBar.errorList.length > 0">
      <p v-for="error in showSnackBar.errorList" :key="error.code" class="caption">{{ error.description }}</p>
    </div>
    <v-btn color="error" text @click="closeSnackBar">
      Close
    </v-btn>
  </v-snackbar>
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

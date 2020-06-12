<template>
  <v-snackbar :timeout="timeout" v-model="snackbar" :vertical="vertical" color="white" class="text--secondary font-weight-bold body-1" top right>
    <span class="snackbar"> {{ message }}</span>
    <v-btn color="error" text @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'SnackBar' })
export default class SnackBar extends Vue {
  @Prop({ default: 'Message' }) message!: string
  @Prop({ default: 5000 }) timeout!: number
  vertical = true
  snackbar = true
}
</script>

<style scoped lang="scss"></style>

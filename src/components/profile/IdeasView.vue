<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'

@Component({ name: 'IdeasView' })
export default class IdeasView extends Vue {
  @Prop() cUser!: ICurrentUser
}
</script>

<style scoped lang="scss"></style>

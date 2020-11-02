<template> </template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { IEventDto, IRegisteredUser } from '@/types/Admin/Event'

@Component({ name: 'ResultsView' })
export default class ResultsView extends Vue {
  @Prop() selectedEvent!: IEventDto

  @Emit('updateScrambleChamp')
  updateScrambleChamp(sChamp: IRegisteredUser): IRegisteredUser {
    return sChamp
  }

  @Emit('toggleActiveScrambleChamps')
  toggleActiveScrambleChamps(status: boolean): boolean {
    return status
  }
}
</script>

<style scoped lang="scss"></style>

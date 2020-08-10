<template>
  <form class="form">
    <div class="form__field">
      <label for="eventName">Name</label>
      <input type="text" id="eventName" v-model.trim="AddEvent.name" />
    </div>
    <div class="form__field">
      <label for="eventYear">Year</label>
      <input type="text" id="eventYear" v-model.trim="AddEvent.year" />
    </div>
    <div class="btnContainer">
      <button @click.prevent.stop="addEvent" class="btn btn--blue btn--sm" id="addEvent">Add</button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { AddEventDto } from '@/types/Events/SandbaggerEvents'

@Component({ name: 'AddEvent' })
export default class AddEvent extends Vue {
  AddEvent = {
    name: '',
    year: '',
  } as AddEventDto

  @Emit('addEvent')
  addEvent(): AddEventDto {
    return this.AddEvent
  }
}
</script>

<style scoped lang="scss">
.form {
  padding: 1rem;
}
</style>

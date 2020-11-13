<template>
  <div class="createEvent">
    <div class="title">
      <h1>Create Sandbagger Event</h1>

    </div>
    <FormComponent :formFields="formFields" :btnText="'Create'" @submit="createEvent" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AddEventDto } from '@/types/Events/SandbaggerEvents'
import UIHelper from '@/utility/UIHelper'
import EventService from '@/services/EventService'
import { IFormField } from '@/types/UI/Forms'

@Component({
  name: 'CreateEvent',
  components: {
    FormComponent: (): Promise<typeof import('*.vue')> => import('@/components/ui/Forms/Form.vue')
  }
})
export default class CreateEvent extends Vue {
  AddEvent = {
    name: '',
    year: ''
  } as AddEventDto

  formFields: Array<IFormField> = [
    {
      id: 'name',
      type: 'text',
      label: 'Name'
    },
    {
      id: 'year',
      type: 'text',
      label: 'Year'
    }
  ]

  mounted(): void {
    UIHelper.Header({ current: 'main', isShowing: true, title: 'Create Event' })
  }

  async createEvent(event: AddEventDto): Promise<void> {
    try {
      const res = await EventService.createEvent(event)
      if (res.status === 200) {
        await UIHelper.SnackBar({
          class: 'primary',
          isSnackBarShowing: true,
          title: 'Success',
          message: `${res.data.name} has been created!`
        })
        setTimeout(() => {
          this.$router.back()
        }, 3000)
      }
    } catch (e) {
      await UIHelper.SnackBar({
        class: 'error',
        isSnackBarShowing: true,
        title: 'Failed to create event',
        message: `${e.data.message}!`
      })
      console.log(e)
    } finally {
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  padding: .5rem;
  @include tablet {
    width: 75%;
    padding: 1rem;
    margin: 0 auto;
  }
}

h1 {
  font-size: 1.2rem;
  color: $DarkBlue;
  margin-bottom: 1rem;
}
</style>

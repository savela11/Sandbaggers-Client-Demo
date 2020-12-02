<template>
  <div v-if="event.name">
    <PopUp v-show="popUp.isPopUpShowing" :title="popUp.title" :classStatus="popUp.classStatus" @click="togglePopUp(false, 'hide')">
      <template v-slot:content>
        <div class="popUpBtns">
          <button class="btn btn--green" @click="deleteEvent">Yes</button>
          <button class="btn btn--red">No</button>
        </div>
      </template>
    </PopUp>

    <div class="titleBar">
      <h1>Edit {{ event.name }} Event</h1>
      <BtnWithText v-if="event.registeredUsers.length < 1" v-bind="{ img: 'trash', text: 'Delete' }" @click="togglePopUp(true, 'show')" />
    </div>

    <div class="buttonFlex">
      <div class="section currentYearBtns">
        <h2>Current Year</h2>
        <div class="btns">
          <button class="btn btn--xs" v-bind:class="{active: event.isCurrentYear === true}" @click.prevent.stop="event.isCurrentYear = true">Yes</button>
          <button class="btn btn--xs" v-bind:class="{active: event.isCurrentYear === false}" @click.prevent.stop="event.isCurrentYear = false">No</button>
        </div>
      </div>

      <div class="section isEventActive">
        <h2>Active</h2>
        <div class="btns">
          <button class="btn btn--xs" v-bind:class="{active: event.isPublished === true}" @click.prevent.stop="event.isPublished = true">Yes</button>
          <button class="btn btn--xs" v-bind:class="{active: event.isPublished === false}" @click.prevent.stop="event.isPublished = false">No</button>
        </div>
      </div>
    </div>

    <form class="form" v-if="event">
      <div class="form__field">
        <label for="eventName">Name</label>
        <input type="text" id="eventName" v-model.trim="event.name" />
      </div>
      <div class="form__field">
        <label for="eventYear">Year</label>
        <input type="text" id="eventYear" v-model.trim="event.year" />
      </div>

      <div class="location">
        <h2>Location</h2>
        <div class="form__field">
          <label for="locationName">Name</label>
          <input type="text" id="locationName" v-model.trim="event.location.name" />
        </div>
        <div class="form__field">
          <label for="city">City</label>
          <input type="text" id="city" v-model.trim="event.location.city" />
        </div>

        <div class="flex">
          <div class="form__field ">
            <label for="streetNumbers">Street Numbers</label>
            <input type="text" id="streetNumbers" v-model.trim="event.location.streetNumbers" />
          </div>
          <div class="form__field">
            <label for="zip">Zip</label>
            <input type="text" id="zip" v-model.trim="event.location.postalCode" />
          </div>
        </div>
        <div class="form__field">
          <label for="streetName">Street Name</label>
          <input type="text" id="streetName" v-model.trim="event.location.streetName" />
        </div>
      </div>

      <div class="btnContainer">
        <button class="backBtn btn btn--xs btn--red" @click.prevent.stop="() => $router.back()">Cancel</button>
        <button class="btn btn--green btn--xs" @click.prevent.stop="updateEvent">Update</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIHelper from '@/utility/UIHelper'
import EventService from '@/services/EventService'
import { IEventDto } from '@/types/Admin/Event'
import { IPopUp } from '@/types/UI/PopUp'

@Component({
  name: 'EditEvent',
  components: {
    BtnWithText: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/BtnWithText.vue'),
    PopUp: (): Promise<typeof import('*.vue')> => import('@/components/ui/PopUp.vue')
  }
})
export default class EditEvent extends Vue {
  event = {} as IEventDto
  isDeletingEvent = false
  popUp: IPopUp = {
    title: 'Are you sure you want to delete?',
    classStatus: undefined,
    isPopUpShowing: false
  }

  mounted(): void {

    this.getEvent()
  }

  togglePopUp(status: boolean): void {
    this.popUp.isPopUpShowing = status
    if (status) {
      this.isDeletingEvent = true
      this.popUp.classStatus = 'show'
    } else {
      this.isDeletingEvent = false
      this.popUp.classStatus = 'hide'

    }
  }

  async getEvent(): Promise<void> {
    try {
      const res = await EventService.getEventById(this.$route.params.id)
      console.log(res)
      if (res.status === 200) {
        this.event = res.data
      }
    } catch (e) {
      console.log(e)
      this.$router.back()
    } finally {

    }
  }

  async updateEvent(): Promise<void> {
    try {
      const res = await EventService.UpdateEvent(this.event)
      if (res.status === 200) {
        this.$router.back()
      }
    } catch (e) {
      console.log(e)
      await UIHelper.SnackBar({
        classInfo: 'error',
        isSnackBarShowing: true,
        title: 'Error with updating event',
        message: `${e.data.message} Please check current year and active status for other years.`
      })
    } finally {
      setTimeout(() => {
      }, 3000)
    }

  }

  async deleteEvent(): Promise<void> {
    try {
      const res = await EventService.deleteEvent(this.event.eventId.toString())
      if (res.status === 200) {

        await UIHelper.SnackBar({
          classInfo: 'primary',
          isSnackBarShowing: true,
          title: 'Success',
          message: `${this.event.name} has been deleted`
        })

        setTimeout(() => {
          this.$router.back()
        }, 4000)
      }
    } catch (e) {
      console.log(e)
    } finally {

    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 1.2rem;
  color: $DarkBlue;
  @include tablet {
    padding: 1rem;
    font-size: 1.4rem;
  }

}

h2 {
  font-size: .8rem;
  @include tablet {
    font-size: 1rem;
  }
}

.titleBar {
  display: flex;
  justify-content: space-between;
  align-items: center;

  @include tablet {
    width: 75%;
    margin: 0 auto;
  }
}

.buttonFlex {
  display: flex;
  padding: .5rem;
  align-items: center;

  .btns {
    margin-top: .5rem;
    display: flex;
  }

  button {
    margin-right: .3rem;

    &:last-child {
      margin: 0;

    }
  }

  .section {
    flex: 0 0 50%;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }


}


.location {
  margin-top: .5rem;

  h2 {
  }

  .flex {
    align-items: center;

    .form__field {
      padding-right: .5rem;
      flex: 0 0 50%;

      &:last-child {
        padding: 0;
      }
    }

  }
}

.btnContainer {
  display: flex;
  justify-content: space-between;
}

.popUpBtns {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin-bottom: .5rem;
    width: 50%;

    &:last-child {
      margin: 0;
    }
  }
}
</style>

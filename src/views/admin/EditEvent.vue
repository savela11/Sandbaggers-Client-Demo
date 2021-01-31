<template>
  <div class='EditEvent'>
    <div v-if='!loading && Event.eventId'>
      <div class='flex--xs flex--end flex--iCenter'>
        <SelectBoxComponent :selected='currentView' :options='views' :showSelectOptions='showSelectOptions' @click.prevent.stop='toggleSelectBox' @select-option='selectOption' />
      </div>
      <div class='views'>
        <div v-if="currentView === 'main'" class='view main'>
          <form class='main__form' @submit.prevent.stop='UpdateEvent'>
            <InputField class-name='noBorder title' :isActive="Event.name !== ''">
              <template v-slot:field><label for='name'>Event Name</label> <input type='text' id='name' v-model.trim='Event.name' /></template>
            </InputField>
            <div class='toggle'>
              <h2 class='text text--sm text--bold color--primary'>Current Event:</h2>
              <div class='toggle__buttons'>
                <button class='btn btn--tiny btn--border-darkBlue mr-02' :class='{ active: Event.isCurrentYear === true }' @click.prevent.stop='Event.isCurrentYear = true'>Yes
                </button>
                <button class='btn btn--tiny btn--border-darkBlue' :class='{ active: Event.isCurrentYear === false }' @click.prevent.stop='Event.isCurrentYear = false'>No</button>
              </div>
            </div>
            <div class='toggle'>
              <h2 class='text text--sm text--bold color--primary'>Active:</h2>
              <div class='toggle__buttons'>
                <button class='btn btn--tiny btn--border-darkBlue mr-02' :class='{ active: Event.isPublished === true }' @click.prevent.stop='Event.isPublished = true'>Yes</button>
                <button class='btn btn--tiny btn--border-darkBlue' :class='{ active: Event.isPublished === false }' @click.prevent.stop='Event.isPublished = false'>No</button>
              </div>
            </div>

            <input type='submit' value='Update' class='btn btn--sm my-1 btn--bg-darkBlue' />
          </form>
        </div>
        <div v-if="currentView === 'registration'" class='view registration'>
          <div class='users'>
            <div class='registered'>
              <h3 class='text text--base color--secondary'>Registered</h3>
              <div class='users__wrapper'>
                <div class='user' v-for='user in Event.registeredUsers' :key='user.id'>
                  <div class='user__container'>
                    <p class='user__fullName'>{{ user.fullName }}</p>
                    <IconBtn @click='registration(user)'>
                      <template v-slot:svg>
                        <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M12.5 0C5.5971 0 0 5.5971 0 12.5C0 19.4029 5.5971 25 12.5 25C19.4029 25 25 19.4029 25 12.5C25 5.5971 19.4029 0 12.5 0ZM17.8571 13.1696C17.8571 13.2924 17.7567 13.3929 17.6339 13.3929H7.36607C7.2433 13.3929 7.14286 13.2924 7.14286 13.1696V11.8304C7.14286 11.7076 7.2433 11.6071 7.36607 11.6071H17.6339C17.7567 11.6071 17.8571 11.7076 17.8571 11.8304V13.1696Z'
                            fill='#9F0000'
                          />
                        </svg>
                      </template>
                    </IconBtn>
                  </div>
                </div>
              </div>
            </div>
            <div class='notRegistered'>
              <h3 class='text text--base color--secondary'>Not Registered</h3>
              <div class='users__wrapper'>
                <div class='user' v-for='user in Event.unRegisteredUsers' :key='user.id'>
                  <div class='user__container'>
                    <p class='user__fullName'>{{ user.fullName }}</p>
                    <IconBtn @click="registration(user, 'register')">
                      <template v-slot:svg>
                        <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 0 12.5 0ZM18.75 13.75H13.75V18.75H11.25V13.75H6.25V11.25H11.25V6.25H13.75V11.25H18.75V13.75Z'
                            fill='#167230'
                          />
                        </svg>
                      </template>
                    </IconBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentView === 'itinerary'" class='view'>
          <div class='flex--xs' :class="[isAddingItineraries === true ? 'flex--between' : 'flex--end']">
            <IconBtn v-if='isAddingItineraries' btn-text='Cancel' class='ml-04' @click.prevent.stop="addItinerary('cancel')">
              <template v-slot:svg>
                <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M12.5 0C5.625 0 0 5.625 0 12.5C0 19.375 5.625 25 12.5 25C19.375 25 25 19.375 25 12.5C25 5.625 19.375 0 12.5 0ZM12.5 2.77778C14.6528 2.77778 16.6667 3.54167 18.3333 4.72222L4.72222 18.3333C3.54167 16.6667 2.77778 14.6528 2.77778 12.5C2.77778 7.15278 7.15278 2.77778 12.5 2.77778ZM12.5 22.2222C10.3472 22.2222 8.33333 21.4583 6.66667 20.2778L20.2778 6.66667C21.4583 8.33333 22.2222 10.3472 22.2222 12.5C22.2222 17.8472 17.8472 22.2222 12.5 22.2222Z'
                    fill='#9F0000'
                  />
                </svg>
              </template>
            </IconBtn>
            <IconBtn btn-text='Add' @click.prevent.stop="addItinerary('add')">
              <template v-slot:svg>
                <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z' fill='#17252A' />
                </svg>
              </template>
            </IconBtn>
          </div>
          <div class='itineraries itineraries--toBeAdded' v-if='isAddingItineraries'>
            <div class='flex--md flex--wrap'>
              <div class='itinerary itinerary--toBeAdded' v-for='(itinerary, index) in addedItinerary' :key='index'>
                <div class='itinerary__container itinerary__container--toBeAdded'>
                  <h3 class='text text--sm color--primary text--bold px-04'>Added Itinerary #{{ index + 1 }}</h3>
                  <div class='flexContainer--md'>
                    <InputField class='flexItem' :isActive="itinerary.day !== ''">
                      <template v-slot:field>
                        <label :for="'Day' + index">Day</label>
                        <input type='text' :id="'Day' + index" v-model.trim='itinerary.day' />
                      </template>
                    </InputField>
                    <InputField class='flexItem' :isActive="itinerary.time !== ''">
                      <template v-slot:field>
                        <label for='time'>Time</label>
                        <input type='text' id='time' v-model.trim='itinerary.time' />
                      </template>
                    </InputField>
                  </div>
                  <div class='itinerary__bottom toBeAdded__bottom'>
                    <InputField class-name='textArea' :isActive="itinerary.description !== ''">
                      <template v-slot:field>
                        <label for='description'>Description</label>
                        <textarea type='text' id='description' v-model.trim='itinerary.description'></textarea>
                      </template>
                    </InputField>
                  </div>
                </div>
              </div>
            </div>
            <button class='btn btn--sm my-1 btn--bg-darkBlue' @click.prevent.stop="addItinerary('save')">Update</button>
          </div>
          <div class='itineraries' v-else-if='!isAddingItineraries && Event.itineraries.length > 0'>
            <div class='flex--md flex-wrap'>
              <div class='itinerary' v-for='(itinerary, index) in Event.itineraries' :key='index'>
                <div class='itinerary__container'>
                  <IconBtn class='itinerary__editBtn' btn-text='Edit' @click.prevent.stop='selectItinerary(itinerary)'>
                    <template v-slot:svg>
                      <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z'
                          fill='#17252A'
                        />
                      </svg>
                    </template>
                  </IconBtn>
                  <div class='itinerary__top'>
                    <div class='itinerary__bar'>
                      <p class='itinerary__title'>Day:</p>
                      <p class='itinerary__val'>{{ itinerary.day }}</p>
                    </div>
                    <div class='itinerary__bar'>
                      <p class='itinerary__title'>Time:</p>
                      <p class='itinerary__val'>{{ itinerary.time }}</p>
                    </div>
                  </div>
                  <div class='itinerary__bottom'>
                    <p class='itinerary__title'>Description:</p>
                    <p class='itinerary__val itinerary__val--description text--noWrap text--ellipsis'>{{ itinerary.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EditTeam
          v-if="currentView === 'teams'"
          class='view'
          v-bind='{ showCaptainOptions: showCaptainOptions, teams: Event.teams, registeredUsers: Event.registeredUsers, loading: loading }'
          @show-captain-options='(status) => (showCaptainOptions = status)'
          @toggle-select-captain='(status) => (showCaptainOptions = status)'
          @update-teams='UpdateTeams'
          @add-team='addTeam'
        />

        <div v-if="currentView === 'location'" class='view location'>
          <form class='location__form' @submit.prevent.stop='UpdateEvent'>
            <div class='flex--md'>
              <InputField class='flexItem' :isActive="Event.location.name !== ''">
                <template v-slot:field>
                  <label for='lName'>Location Name</label>
                  <input type='text' id='lName' v-model.trim='Event.location.name' />
                </template>
              </InputField>
              <InputField class='flexItem' :isActive="Event.location.city !== ''">
                <template v-slot:field>
                  <label for='city'>City</label>
                  <input type='text' id='city' v-model.trim='Event.location.city' />
                </template>
              </InputField>
              <InputField class='flexItem' :isActive="Event.location.postalCode !== ''">
                <template v-slot:field>
                  <label for='zip'>Zip Code</label>
                  <input type='text' id='zip' v-model.trim='Event.location.postalCode' />
                </template>
              </InputField>
            </div>
            <div class='flex--md'>
              <InputField class='flexItem' :isActive="Event.location.streetName !== ''">
                <template v-slot:field>
                  <label for='sName'>Street Name</label>
                  <input type='text' id='sName' v-model.trim='Event.location.streetName' />
                </template>
              </InputField>
              <InputField class='flexItem' :isActive="Event.location.streetNumbers !== ''">
                <template v-slot:field>
                  <label for='sNum'>Street Numbers</label>
                  <input type='text' id='sNum' v-model.trim='Event.location.streetNumbers' />
                </template>
              </InputField>
            </div>

            <input type='submit' value='Update' class='btn btn--sm my-1 btn--bg-darkBlue' />
          </form>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import EventService from '@/services/EventService'
import { AdminEventManagerVm, ItineraryVm, RegisteredUserVm, TeamMemberVm, TeamVm } from '@/types/ViewModels/EventVm'
import UIHelper from '@/utility/UIHelper'

import { AddRemoveTeamFromEvent, RegisterUserForEventDto } from '@/types/DTO/EventDto'
import TeamService from '@/services/TeamService'

@Component({
  name: 'EditEvent',
  components: {
    EditTeam: (): Promise<typeof import('*.vue')> => import('@/views/admin/editEvent/EditTeam.vue'),
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue'),
    BackBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/BackBtn.vue'),
    ViewBtns: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/ViewBtns.vue'),
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue'),
    SelectBoxComponent: (): Promise<typeof import('*.vue')> => import('@/components/ui/SelectBoxComponent.vue')
  }
})
export default class EditEvent extends Vue {
  loading = true
  Event = {} as AdminEventManagerVm
  addedItinerary = [] as ItineraryVm[]
  views: Array<string> = ['main', 'registration', 'itinerary', 'teams', 'location']
  currentView = 'main'
  isAddingItineraries = false

  editItinerary = null
  showSelectOptions = false

  showCaptainOptions = false

  mounted(): void {
    this.getEvent()
  }

  toggleSelectBox(): void {
    this.showSelectOptions = !this.showSelectOptions
  }

  selectOption(option: string): void {
    this.currentView = option
    this.showSelectOptions = false
  }

  selectedView(btnView: string): void {
    this.currentView = btnView
  }

  addItinerary(status: string): void {
    if (status === 'add') {
      this.isAddingItineraries = true
      this.addedItinerary.push({ day: '', time: '', description: '' })
      return
    } else if (status === 'cancel') {
      this.isAddingItineraries = false
      this.addedItinerary = []
      return
    } else if (status === 'save') {
      this.addedItinerary.forEach((itn) => {
        if (itn.day !== '' || itn.description !== '' || itn.time !== '') {
          this.Event.itineraries.push(itn)
        }
      })
      this.UpdateEvent()
      this.addItinerary('cancel')
    }
  }

  async addTeam(): Promise<void> {
    try {
      const res = await TeamService.CreateTeamForEvent(this.Event.eventId)
    } catch (e) {
      console.log(e)
    } finally {
    }
  }

  async UpdateTeams(teams: Array<TeamVm>): Promise<void> {
    this.loading = true
    try {
      const res = await TeamService.UpdateTeams(teams)
      if(res.status === 200) {
        UIHelper.SnackBar({ title: 'success', message: `Teams have been updated`, classInfo: `primary`, isSnackBarShowing: true, errors: undefined })
        setTimeout(() => {
          this.loading = false;
        }, Math.floor(Math.random() * 2000))

      }
      console.log(res)
    } catch (e) {
      console.log(e)
this.loading = false;
    }
  }

  selectItinerary(itinerary: ItineraryVm): void {
    console.log(itinerary)
  }

  async UpdateEvent(): Promise<void> {
    this.loading = true
    try {
      const res = await EventService.UpdateEvent(this.Event)
      if (res.status === 200) {
        UIHelper.SnackBar({
          title: 'Success',
          message: `${this.Event.name} has been updated`,
          classInfo: `primary`,
          isSnackBarShowing: true,
          errors: undefined
        })
      }
    } catch (e) {
      console.log(e)
      UIHelper.SnackBar({
        title: 'Error',
        message: `${e.data.message}`,
        classInfo: `error`,
        isSnackBarShowing: true,
        errors: undefined
      })
    } finally {
      setTimeout(() => {
        this.loading = false
      }, Math.floor(Math.random() * 3000))
    }
  }

  async getEvent(): Promise<void> {
    try {
      const res = await EventService.EventForEventManager(parseInt(this.$route.params.id))
      if (res.status === 200) {
        this.Event = res.data
      }
    } catch (e) {
      console.log(e)
      UIHelper.SnackBar({
        title: 'Error',
        message: `No Event Found`,
        classInfo: `error`,
        isSnackBarShowing: true,
        errors: undefined
      })

      setTimeout(() => {
        this.$router.go(-1)
      }, Math.floor(Math.random() * 3000))
    } finally {
      setTimeout(() => {
        this.loading = false
      }, Math.floor(Math.random() * 3000))
    }
  }

  async registration(user: RegisteredUserVm, status?: string): Promise<void> {
    const registerUserForEventDto: RegisterUserForEventDto = {
      eventId: this.Event.eventId,
      userId: user.id
    }
    try {
      let res
      let userIndex
      // let registerOrUnRegister = status === "register" ? "unRegisteredUsers" : "registeredUsers";
      if (status === 'register') {
        res = await EventService.RegisterUserForEvent(registerUserForEventDto)
        userIndex = this.Event.unRegisteredUsers.findIndex((u) => u.id === registerUserForEventDto.userId)
      } else {
        res = await EventService.UnRegisterUserFromEvent(registerUserForEventDto)

        userIndex = this.Event.registeredUsers.findIndex((u) => u.id === registerUserForEventDto.userId)
      }

      if (res.status === 200) {
        if (status === 'register') {
          const user = this.Event.unRegisteredUsers.splice(userIndex, 1)
          console.log(user[0])
          this.Event.registeredUsers.unshift(user[0])
          UIHelper.SnackBar({
            classInfo: 'primary',
            isSnackBarShowing: true,
            title: `Success`,
            message: `${user[0].fullName} has been registered for this event`,
            errors: undefined
          })
        } else {
          const user = this.Event.registeredUsers.splice(userIndex, 1)
          console.log(user[0])
          this.Event.unRegisteredUsers.unshift(user[0])
          UIHelper.SnackBar({
            classInfo: 'primary',
            isSnackBarShowing: true,
            title: `Success`,
            message: `${user[0].fullName} has been un-registered for this event`,
            errors: undefined
          })
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
    }
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/admin/_editEvent.scss";
</style>

<template>
  <div class='eventManager'>
    <div v-if='!loading'>
      <div class='app__title-bar'>
        <h1 class='app__text app__text--title'>Event Manager</h1>
      </div>
      <div class='utility'>
        <IconBtn btn-text='Add Event' :link-btn='true' link='/Admin/CreateEvent'>
          <template v-slot:svg>
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z' fill='#17252A' />
            </svg>
          </template>
        </IconBtn>
        <SelectBoxComponent
            v-if='selectedYear'
            :selected='selectedYear'
            :options='Events'
            selected-value='year'
            optionValue='year'
            :showSelectOptions='showSelectOptions'
            @click.prevent.stop='toggleSelectBox'
            @select-option='selectOption'
        />
      </div>
      <div class='eventList'>
        <div class='selectedEvent' v-if='selectedYear'>
          <div class='flex--xs flex--iCenter flex--between'>
            <h2 class='text text--secondary-title'>{{ selectedYear.name }}</h2>
            <IconBtn btn-text='Edit' :link-btn='true' :link='`/Admin/EditEvent/${selectedYear.eventId}`'>
              <template v-slot:svg>
                <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                      d='M3.125 17.9688V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9688ZM21.5729 7.33334C21.9792 6.92709 21.9792 6.27084 21.5729 5.86459L19.1354 3.42709C18.7292 3.02084 18.0729 3.02084 17.6667 3.42709L15.7604 5.33334L19.6667 9.23959L21.5729 7.33334V7.33334Z'
                      fill='#17252A'
                  />
                </svg>
              </template>
            </IconBtn>
          </div>

          <div class='selectedEvent__container'>
            <div class='flex--md'>
              <div class='section section--location'>
                <h3 class='text text--section-title'>Location</h3>
                <p class='text text--section-value'>{{ selectedYear.location.name }}</p>
                <div class='flex--xs flex--iCenter'>
                  <p class='text text--section-value'>{{ selectedYear.location.streetNumbers }}</p>
                  <p class='text text--section-value'>{{ selectedYear.location.streetName }}</p>
                </div>
                <div class='flex--xs flex--iCenter'>
                  <p class='text text--section-value'>{{ selectedYear.location.city }}</p>
                  <p class='text text--section-value'>{{ selectedYear.location.postalCode }}</p>
                </div>
              </div>
              <div class='section section--registeredUsers'>
                <div class='section__titleBar'>
                  <h3 class='text text--section-title text text--section-title--registered'>Registered</h3>
                  <button class='section__btn-toggle' @click.prevent.stop='toggleViewRegisteredUsers(!showRegisteredUsers)'>
                    view
                    <span class='section__btn-circle'>{{ selectedYear.registeredUsers.length }}</span>
                  </button>
                </div>

                <PopUp class='popUp' v-if='showRegisteredUsers' :is-footer='false' :showPopUp='showPopUp' :is-centered='true' @click.prevent.stop='toggleViewRegisteredUsers(!showRegisteredUsers)'>
                  <template v-slot:header>
                    <h2 class='popUp__text popUp__text--title'>Registered</h2>
                  </template>
                  <template v-slot:body>
                      <ul v-if='selectedYear.registeredUsers.length > 0' class='popUp__list popUp__list--style-type-none pl-05 m-0'>
                        <li v-for='(user, index) in selectedYear.registeredUsers' :key='user.id' class='popUp__list--item'>
                            <span class='popUp__text popUp__text--number'>{{ index + 1 }}.</span> {{ user.fullName }}
                        </li>
                      </ul>
                      <div v-else>
                        <p class='text-notRegistered'>No Sandbaggers Registered</p>
                      </div>
                  </template>
                </PopUp>
              </div>
            </div>
            <div class='section section--teams'>
              <h3 class='text text--section-title'>
                Teams <span class='text text--section-count'>{{ selectedYear.teams.length }}</span>
              </h3>
              <div class='section--teams__list'>
                <div v-for='team in selectedYear.teams' :key='team.teamId' class='team'>
                  <div class='team__container' :style="'borderBottom: 5px solid ' + team.color.toLowerCase()">
                    <h4 class='team__text--team-name'>{{ team.name }}</h4>
                    <h5 class='team__text--secondary captain'>Captain: {{ team.captain.fullName }}</h5>
                    <h5 class='team__text--secondary'>
                      Team Members: <strong>{{ team.teamMembers.length }} </strong>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { EventVm } from '@/types/ViewModels/Models/EventVm'
import EventManagerService from '@/services/Admin/EventManagerService'

@Component({
  name: 'EventManager',
  components: {
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue'),
    SelectBoxComponent: (): Promise<typeof import('*.vue')> => import('@/components/ui/SelectBoxComponent.vue'),
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    PopUp: (): Promise<typeof import('*.vue')> => import('@/components/ui/PopUp.vue')
  }
})
export default class EventManager extends Vue {
  loading = true
  Events: Array<EventVm> = []
  selectedYear = {} as EventVm
  showSelectOptions = false
  showRegisteredUsers = false
  showPopUp = false

  mounted(): void {
    this.getEvents()
  }

  toggleViewRegisteredUsers(status: boolean): void {
    if (status) {
      this.showRegisteredUsers = true
      document.body.style.position = 'fixed'
    } else {
      document.body.style.position = 'static'

      setTimeout(() => {
        this.showRegisteredUsers = false
      }, 1000)
    }

    this.$nextTick(() => {
      this.showPopUp = status
    })
  }

  toggleSelectBox(): void {
    this.showSelectOptions = !this.showSelectOptions
  }

  selectOption(option: EventVm): void {
    this.selectedYear = option
    this.showSelectOptions = false
    this.showRegisteredUsers = false
  }

  async getEvents(): Promise<void> {
    try {
      const res = await EventManagerService.EventVmList()
      this.Events = res.data
      const currentYear = this.Events.find((e) => e.isCurrentYear)
      if (currentYear) {
        this.selectedYear = currentYear
      } else {
        this.selectedYear = this.Events[0]
      }
      setTimeout(() => {
        this.loading = false
      }, Math.floor(Math.random() * 3000))
    } catch (e) {
      console.log(e)
      this.loading = false
    }
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/admin/_eventManager";
</style>

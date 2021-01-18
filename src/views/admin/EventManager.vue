<template>
  <div class="EventManager">
    <div v-if="!loading">
      <div class="utility">
        <IconBtn btn-text="Add Event" :link-btn="true" link="/Admin/CreateEvent">
          <template v-slot:svg>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="#17252A" />
            </svg>
          </template>
        </IconBtn>
        <SelectBoxComponent v-if="selectedYear" :selected="selectedYear.year" :options="Events" keyValue="eventId" optionValue="year" :showSelectOptions="showSelectOptions"
                            @click.prevent.stop="toggleSelectBox" @select-option="selectOption" />
      </div>
      <div class="eventList">
        <div class="selectedEvent" v-if="selectedYear">
          <div class="title">
            <h2 class="text text--lg text--bold color--primary">{{ selectedYear.name }}</h2>
            <IconBtn btn-text="Edit" :link-btn="true" :link="`/Admin/EditEvent/${selectedYear.eventId}`">
              <template v-slot:svg>
                <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.125 17.9688V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9688ZM21.5729 7.33334C21.9792 6.92709 21.9792 6.27084 21.5729 5.86459L19.1354 3.42709C18.7292 3.02084 18.0729 3.02084 17.6667 3.42709L15.7604 5.33334L19.6667 9.23959L21.5729 7.33334V7.33334Z"
                    fill="#17252A" />
                </svg>
              </template>
            </IconBtn>
          </div>


          <div class="selectedEvent__grid">
            <div class="location">
              <h3 class="text text--md text--bold color--secondary">Location</h3>
              <p class="text text--sm color--secondary my-03">{{ selectedYear.location.name }}</p>
              <div class="flex flex--iCenter">
                <p class="text text--sm color--secondary mr-03 my-03">{{ selectedYear.location.streetNumbers }}</p>
                <p class="text text--sm color--secondary my-03">{{ selectedYear.location.streetName }}</p>
              </div>
              <div class="flex flex--iCenter">
                <p class="text text--sm color--secondary mr-03 my-03">{{ selectedYear.location.city }}</p>
                <p class="text text--sm color--secondary my-03">{{ selectedYear.location.postalCode }}</p>
              </div>
            </div>
            <div class="registeredUsers">

            </div>

          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EventService from "@/services/EventService";
import { EventVm } from "@/types/ViewModels/EventVm";
import IconBtn from "@/components/ui/Buttons/IconBtn.vue";

@Component({
  name: "EventManager", components: {
    IconBtn,
    SelectBoxComponent: (): Promise<typeof import("*.vue")> => import("@/components/ui/SelectBoxComponent.vue"),
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue")
  }
})
export default class EventManager extends Vue {
  loading = true;
  Events: Array<EventVm> = [];
  selectedYear = {} as EventVm;
  showSelectOptions = false;

  mounted(): void {
    this.getEvents();
  }

  toggleSelectBox(): void {
    this.showSelectOptions = !this.showSelectOptions;
  }

  selectOption(option: EventVm): void {
    this.selectedYear = option;
    this.showSelectOptions = false;
  }

  async getEvents(): Promise<void> {
    try {
      const res = await EventService.GetEventsByYear();
      this.Events = res.data;
      this.selectedYear = res.data[0];
      setTimeout(() => {
        this.loading = false;
      }, Math.floor(Math.random() * 3000));

    } catch (e) {
      console.log(e);
      this.loading = false;
    }
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/admin/_eventManager";
</style>

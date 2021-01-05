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
        <SelectBoxComponent :selected="selectedYear.year" :options="Events" keyValue="eventId" optionValue="year" :showSelectOptions="showSelectOptions"
                            @click.prevent.stop="toggleSelectBox" />
      </div>
      <div class="eventList">
        <div class="selectedEvent" v-if="selectedYear">
          <h2 class="text text--lg text--bold color--primary">{{ selectedYear.name }}</h2>
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
.EventManager {
  .utility {
    display: flex;
    justify-content: space-between;
  }
}
</style>

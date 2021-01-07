<template>
  <div class='EditEvent'>
    <div v-if="!loading && Event.eventId">
      <BackBtn />
      <ViewBtns :view-buttons="views" :active-view-btn="currentView" @selected-btn="selectedView" />
      <div class="views">

        <div v-show="currentView === 'main'" class="view">
          <form class="form" @submit.prevent.stop="UpdateEvent">
            <InputField :isActive="Event.name !== ''">
              <template v-slot:field><label for="name">Event Name</label> <input type="text" id="name" v-model.trim="Event.name" /></template>
            </InputField>
            <input type="submit" value="Update" class="btn btn--sm my-1 btn--bg-darkBlue">
          </form>
        </div>
        <div v-show="currentView === 'itinerary'" class="view">
        </div>
        <div v-show="currentView === 'teams'" class="view">

        </div>
        <div v-show="currentView === 'location'" class="view">
          <form class="form" @submit.prevent.stop="UpdateEvent">
            <InputField :isActive="Event.location.name !== ''">
              <template v-slot:field>
                <label for="lName">Location Name</label>
                <input type="text" id="lName" v-model.trim="Event.location.name" />
              </template>
            </InputField>
            <InputField :isActive="Event.location.city !== ''">
              <template v-slot:field>
                <label for="city">City</label>
                <input type="text" id="city" v-model.trim="Event.location.city" />
              </template>
            </InputField>
            <InputField :isActive="Event.location.streetName !== ''">
              <template v-slot:field>
                <label for="sName">Street Name</label>
                <input type="text" id="sName" v-model.trim="Event.location.streetName" />
              </template>
            </InputField>
            <InputField :isActive="Event.location.streetNumbers !== ''">
              <template v-slot:field>
                <label for="sNum">Street Numbers</label>
                <input type="text" id="sNum" v-model.trim="Event.location.streetNumbers" />
              </template>
            </InputField>
            <InputField :isActive="Event.location.postalCode !== ''">
              <template v-slot:field>
                <label for="zip">Zip Code</label>
                <input type="text" id="zip" v-model.trim="Event.location.postalCode" />
              </template>
            </InputField>
            <input type="submit" value="Update" class="btn btn--sm my-1 btn--bg-darkBlue">
          </form>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>
<script lang="ts"> import { Component, Vue } from "vue-property-decorator";
import EventService from "@/services/EventService";
import { EventVm } from "@/types/ViewModels/EventVm";
import UIHelper from "@/utility/UIHelper";

@Component({
  name: "EditEvent",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/InputField.vue"),
    BackBtn: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/BackBtn.vue"),
    ViewBtns: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/ViewBtns.vue")
  }
}) export default class EditEvent extends Vue {
  loading = true;
  Event = {} as EventVm;
  views: Array<string> = ["main", "itinerary", "teams", "location"];
  currentView = "main";

  mounted(): void {
    this.getEvent();
  }

  selectedView(btnView: string): void {
    this.currentView = btnView;
  }

  async UpdateEvent(): Promise<void> {
    this.loading = true;
    try {
      const res = await EventService.UpdateEvent(this.Event);
      if (res.status === 200) {
        UIHelper.SnackBar({ title: "Success", message: `${this.Event.name} has been updated`, classInfo: `primary`, isSnackBarShowing: true, errors: undefined });
        setTimeout(() => {
          this.$router.push("/Admin/EventManager");
        }, Math.floor(Math.random() * 3000));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getEvent(): Promise<void> {
    try {
      const res = await EventService.GetEventById(this.$route.params.id);
      if (res.status === 200) {
        this.Event = res.data;
      }

    } catch (e) {
      console.log(e);
      UIHelper.SnackBar({ title: "Error", message: `No Event Found`, classInfo: `error`, isSnackBarShowing: true, errors: undefined });

      setTimeout(() => {
        this.$router.go(-1);
      }, Math.floor(Math.random() * 3000));


    } finally {
      setTimeout(() => {
        this.loading = false;
      }, Math.floor(Math.random() * 3000));
    }
  }
}
</script>

<style scoped lang="scss">
.EditEvent {

}

.views {
  margin: 1rem 0;
}


</style>

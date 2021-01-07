<template>
  <div class='CreateEvent'>
    <div v-if="!loading">
      <BackBtn />


      <form class="form" @submit.prevent.stop="createEvent">
        <fieldset>
          <legend class="text text--lg text--fw-600 color--primary my-1">Create Event</legend>
          <InputField :isActive="createEventForm.name !== ''">
            <template v-slot:field>
              <label for="name">Event Name</label>
              <input type="text" id="name" v-model.trim="createEventForm.name" />
            </template>
          </InputField>

          <InputField :isActive="createEventForm.year !== ''">
            <template v-slot:field>
              <label for="year">Year</label>
              <input type="text" id="year" v-model.trim="createEventForm.year" />
            </template>
          </InputField>
        </fieldset>
        <input type="submit" value="Submit" class="btn btn--sm btn--bg-darkBlue mt-1 text text--fw-500">
      </form>

    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CreateEventDto } from "@/types/DTO/EventDto";
import EventService from "@/services/EventService";
import UIHelper from "@/utility/UIHelper";

@Component({
  name: "CreateEvent", components: {
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/InputField.vue"),
    BackBtn: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/BackBtn.vue"),
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue")
  }
})


export default class CreateEvent extends Vue {
  loading = false;
  createEventForm: CreateEventDto = {
    name: "",
    year: ""
  };

  async createEvent(): Promise<void> {
    if (this.createEventForm.year === "" || this.createEventForm.name === "") {
      UIHelper.SnackBar({
        title: "Error",
        message: `Event not created....`,
        classInfo: `error`,
        isSnackBarShowing: true,
        errors: ["Required - Event Name", "Required - Event Year"]
      });
      return;
    }
    this.loading = true;
    try {
      const res = await EventService.CreateEvent(this.createEventForm);
      if (res.status === 200) {
        UIHelper.SnackBar({ title: "Success", message: `${res.data.name} Event has been created`, classInfo: "primary", isSnackBarShowing: true, errors: [] });
        this.loading = false;
        setTimeout(() => {
          this.$router.push("/admin/EventManager");
        }, Math.floor(Math.random() * 4000));

      }
    } catch (e) {
      console.log(e);
      this.loading = false;
      if (e.data && e.data.message) {
        UIHelper.SnackBar({ title: "Error", message: `${e.data.message}`, classInfo: `error`, isSnackBarShowing: true, errors: undefined });
        this.resetForm();
      }
    }
  }

  resetForm(): void {
    this.createEventForm.name = "";
    this.createEventForm.year = "";
  }
}
</script>

<style scoped lang="scss">
.CreateEvent {
  padding: 1rem;
}
</style>

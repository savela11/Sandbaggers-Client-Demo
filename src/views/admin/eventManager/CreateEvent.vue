<template>
  <div class='CreateEvent'>
    <div v-if="!loading">
      <form class="form" @submit.prevent.stop="createEvent">
        <fieldset>
          <legend class="text text--xl text--fw-600 color--primary text--bold">Create Event</legend>
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
        <input type="submit" value="Submit" class="btn btn--sm btn--darkBlue mt-1 text text--fw-500">
      </form>

    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component,  Vue } from "vue-property-decorator";
import { CreateEventDto } from "@/types/DTO/EventDto";
import UIHelper from "@/utility/UIHelper";
import EventManagerService from '@/services/Admin/EventManagerService'

@Component({
  name: "CreateEvent", components: {
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/InputField.vue"),
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
      const res = await EventManagerService.CreateEvent(this.createEventForm);
      if (res.status === 200) {
        UIHelper.SnackBar({ title: "Success", message: `Event has been created`, classInfo: "primary", isSnackBarShowing: true, errors: [] });
        await this.$router.push("/admin/EventManager");

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
@use "~@/assets/styles/views/admin/_createEvent";
</style>

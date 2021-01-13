<template>
  <div class='EditPowerRanking'>
    <div v-if="!loading && PowerRanking.eventId">
      <h1 class="text text--title text--bold color--primary">{{ PowerRanking.eventName }}</h1>
      <ViewBtns :viewButtons="viewButtons" :activeViewBtn="activeViewBtn" @selected-btn="toggleActiveView" />
      <div class="views py-05">
        <div class="view" v-if="activeViewBtn === 'Main'">
          <InputField :isActive="PowerRanking.disclaimer !== ''">
            <template v-slot:field>
              <label for="disclaimer">Disclaimer</label>
              <textarea type="text" id="disclaimer" v-model.trim="PowerRanking.disclaimer" />
            </template>
          </InputField>
        </div>
        <div class="view" v-if="activeViewBtn === 'Registered'">

        </div>
        <div class="updateBtn my-1">
          <button class="btn btn--sm text--sm btn--bg-darkGreen text--bold ">Update</button>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PowerRankingService from "@/services/PowerRankingService";
import { EventPowerRankingVm } from "@/types/ViewModels/EventPowerRankingVm";
import UIHelper from "@/utility/UIHelper";
import NavigationHelper from "@/utility/NavigationHelper";

@Component({
  name: "EditPowerRanking",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/InputField.vue"),
    ViewBtns: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/ViewBtns.vue")

  }
})


export default class EditPowerRanking extends Vue {
  loading = true;
  PowerRanking = {} as EventPowerRankingVm;
  viewButtons = ["Main", "Registered"];
  activeViewBtn = "Main";

  mounted(): void {
    this.getPowerRanking();
  }

  toggleActiveView(view: string): void {
    this.activeViewBtn = view;
  }
async updatePowerRanking():Promise<void> {
    try {
    const res = await PowerRankingService.UpdatePowerRanking(this.PowerRanking);

    } catch(e) {
    console.log(e)

    } finally {


    }
}
  async getPowerRanking(): Promise<void> {
    try {
      const res = await PowerRankingService.PowerRanking(this.$route.params.eventId);
      if (res.status === 200) {
        this.PowerRanking = res.data;
        setTimeout(() => {
          this.loading = false;
        }, Math.floor(Math.random() * 3000));
      }

    } catch (e) {
      UIHelper.SnackBar({ title: "Error", message: `No Power Ranking Found for this Event`, classInfo: `error`, isSnackBarShowing: true, errors: undefined });
      setTimeout(() => {

        this.$router.go(-1);
      }, Math.floor(Math.random() * 3000));

    }
  }
}
</script>

<style scoped lang="scss">
.EditPowerRanking {
  @include tablet {
    width: 80%;
    margin: 0 auto;
  }

  .view {
    textarea {
      @include tablet {
        min-height: 300px;
      }
    }
  }
}
</style>

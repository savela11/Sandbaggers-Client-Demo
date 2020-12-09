<template>
  <div class="profileBets">

    <div class="doneLoading" v-if="!loadingProfileBets">
      <div class="profileBets__list" v-if="currentUserBets.length > 0">
        <h2>My Bets</h2>
        <div class="card" v-for="bet in currentUserBets" :key="bet.betId">
          <div class="card__top">
            <div class="card__top__title">
              <h3>{{ bet.title }}</h3>
              <p>Created: {{ formatDate(bet.createdOn) }}</p>
            </div>
          </div>
          <div class="card__bottom">
            <button class="btn btn--tiny btn--borderGreen">View</button>
          </div>
        </div>
      </div>
      <div v-else class="noBets">
        <p>No Bets Created...</p>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProfileService from "@/services/ProfileService";
import { BetVm } from "@/types/ViewModels/BetVm";
import Helper from "@/utility/Helper";

@Component({
  name: "ProfileBets", components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue")
  }
})
export default class ProfileBets extends Vue {
  @Prop() userId!: string;
  loadingProfileBets = true;
  currentUserBets: Array<BetVm> = [];

  mounted(): void {
    this.getUserBets();
  }

  async getUserBets(): Promise<void> {
    try {
      const res = await ProfileService.UserBets(this.userId);
      if (res.status === 200) {
        console.log(res.data);
        this.currentUserBets = res.data;
      }
    } catch (e) {
      console.log(e);
    } finally {

      setTimeout(() => {
        this.loadingProfileBets = false;
      }, 3000);

    }
  }

  formatDate(date: string): string {
    return Helper.formatDate(date);
  }

}
</script>


<style scoped lang="scss">
$--profileBetsTitleFS: (
    null: 1.4rem,
    $mobile: 1.5rem
);

$--betTitleFS: (
    null: .9rem,
    $mobile: 1rem
);
$--betCreatedOnFS: (
    null: rem,
    $mobile: rem
);
$--noBetsCreatedFS: (
    null: 1rem,
    $mobile: 1.2rem
);

.profileBets {
  .noBets {
    display: flex;
    justify-content: center;
    padding: 3rem;

    p {
      color: $SecondaryFS;
      @include font-size($--noBetsCreatedFS);
    }

  }

  &__list {
    h2 {
      @include font-size($--profileBetsTitleFS);
      margin: 1rem 0;
      color: $PrimaryFS;
    }

    .card {
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      border-radius: 5px;
      padding: 1rem;
      border-left: 5px solid $DarkGreen;
      height: 100px;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      @include mobile {
        margin-bottom: 1.5rem;
      }

      @include tablet {
        margin: 0;
      }

      &__top {

        &__title {
          h3 {
            margin: 0 0 .3rem 0;
            @include font-size($--betTitleFS);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

          }
        }

      }

      &__bottom {
        display: flex;
        justify-content: flex-end;
      }


    }
  }
}
</style>

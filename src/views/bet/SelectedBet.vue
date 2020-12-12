<template>
  <div class="selectedBet">
    <BtnWithText class="backBtn" @click="$router.back()" v-bind="{ img: 'backArrow', text: 'Back' }" />
    <div v-if="selectedBet && !loading">
      <h2>{{ selectedBet.title }}</h2>
      <div class="createdBy section">
        <p>Created: {{ formatDate(selectedBet.createdOn) }}</p>
        <p>By: {{ selectedBet.createdBy.fullName }}</p>
      </div>
      <div class="acceptedBy section">
        <div class="one">
          <div>
            <h3 class="propTitle">Accepted:</h3>
            <span>{{ selectedBet.acceptedBy.length }} / {{ selectedBet.canAcceptNumber }}</span>
          </div>
          <div>
            <button v-if="canUserAcceptBet" @click.stop.prevent="acceptBet">Accept Bet</button>
          </div>
        </div>
        <div class="two">
          <div v-if="selectedBet.acceptedBy.length === 0" class="notAccepted">
            <p>No one has accepted this bet.</p>
          </div>
          <div v-else class="acceptedUsers">
            <div class="user" v-for="(user, index) in this.selectedBet.acceptedBy" :key="user.userId">
              <span class="indexNum">{{ index + 1 }}</span>
              <h4>{{ user.fullName }}</h4>
            </div>
          </div>
        </div>
      </div>

      <div class="description section">
        <h3>Description:</h3>

        <div class="descriptionBorder ">
          <div class="inner">
            <p>{{ selectedBet.description }}</p>

          </div>
        </div>
      </div>

    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BetService from "@/services/BetService";
import Helper from "@/utility/Helper";
import BtnWithText from "@/components/ui/Buttons/BtnWithText.vue";
import { LoggedInUserVm } from "@/types/ViewModels/UserVm";
import { BetVm } from "@/types/ViewModels/BetVm";
import { UserAcceptsBetDto } from "@/types/DTO/Bets/UserAcceptsBetDto";
import UIHelper from "@/utility/UIHelper";

@Component({
  name: "SelectedBet",
  components: { BtnWithText, Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue") }
})
export default class SelectedBet extends Vue {
  loading = true;
  currentUser = {} as LoggedInUserVm;
  selectedBet: BetVm | null = null;

  mounted(): void {
    this.getSelectedBet();
    this.currentUser = this.$store.state.authStore.currentUser;
  }

  get canUserAcceptBet(): boolean {
    const userIds = this.selectedBet?.acceptedBy.map((b) => {
      return b.id;
    });
    // if the selected bet is the person who made the bet
    // or if user already accepted the bet
    // return false

    if (this.selectedBet && this.selectedBet.createdBy.id === this.currentUser.id) {
      return false;
    } else if (userIds && userIds.includes(this.currentUser.id)) {
      return false;
    } else return !(this.selectedBet && this.selectedBet.acceptedBy.length === this.selectedBet.canAcceptNumber);

  }

  formatDate(date: string): string {
    return Helper.formatDate(date);
  }

  async getSelectedBet(): Promise<void> {
    this.loading = true;
    try {
      const res = await BetService.GetBetById(parseInt(this.$route.params.betId));
      if (res.status === 200) {
        this.selectedBet = res.data;
      }
    } catch (e) {
      console.log(e);
      this.$router.back();
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, Math.floor(Math.random() * 2000));
    }
  }

  async acceptBet(): Promise<void> {
    this.loading = true;
    if (this.selectedBet) {
      const userAcceptsBet: UserAcceptsBetDto = {
        userId: this.currentUser.id,
        betId: this.selectedBet.betId
      };
      try {
        const res = await BetService.UserAcceptsBet(userAcceptsBet);
        if (res.status === 200) {
          this.selectedBet.acceptedBy.push(res.data);
          UIHelper.SnackBar({title: "Success", message: "Your bet was accepted.", isSnackBarShowing: true, classInfo: 'primary'})
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, Math.floor(Math.random() * 3000));
      }
    }
  }
}
</script>

<style scoped lang="scss">

$--betTitleFS: (
    null: 1rem,
    $mobile: 1.2rem
);
$--sectionTitleFS: (
    null: 1rem,
    $mobile: 1.2rem
);

$--createdByFS: (
    null: .8rem,
    $mobile: 1rem
);
$--descriptionParaFS: (
    null: .9rem,
    $mobile: 1rem
);

$--notAcceptedFS: (
    null: .8rem,
    $mobile: .9rem
);


$--acceptedByNameFS: (
    null: .8rem,
    $mobile: .9rem
);

$--acceptedCountSpanFS: (
    null: .9rem,
    $mobile: 1rem
);

.selectedBet {
  .backBtn {
    float: right;
    padding: 0 .5rem;

    button {
      height: 40px;
      width: 40px;
    }
  }

  h2 {
    color: $PrimaryFS;
    @include font-size($--betTitleFS);
    margin-bottom: 1.5rem;
  }

  h3 {
    @include font-size($--sectionTitleFS);
    margin: .5rem .5rem .5rem 0;
    color: $PrimaryFS;
  }


  .section {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;


  }

  .createdBy {
    justify-content: space-between;

    p {
      color: $SecondaryFS;
      @include font-size($--createdByFS);

    }
  }

  .acceptedBy {
    flex-direction: column;
    align-items: flex-start;

    span {
      @include font-size($--acceptedCountSpanFS);
      font-weight: 500;
      color: $SecondaryFS;
    }

    .one {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      & > div {
        flex: auto;
        display: flex;
        align-items: center;

        &:last-child {
          justify-content: flex-end;
        }
      }

    }

    .two {
      width: 100%;
      margin: .5rem 0;

      .notAccepted {
        p {
          color: $SecondaryFS;
          @include font-size($--notAcceptedFS);
        }
      }

      .acceptedUsers {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 80px;
        gap: .3rem;

        @include mobile {
          grid-auto-rows: 90px;
          gap: .5rem;
        }

        .user {
          padding: .5rem;
          border-radius: 5px;
          box-shadow: 0 3px 5px rgba(128, 128, 128, .6);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          h4 {
            font-weight: 500;
            @include font-size($--acceptedByNameFS);
          }

          .indexNum {
            position: absolute;
            top: .2rem;
            left: .5rem;
            color: $DarkGreen;
            font-weight: 600;
          }
        }
      }
    }


    button {
      color: green;
      font-weight: bold;
      border: none;
      text-decoration: underline;
    }


  }

  .description {
    display: block;

    .descriptionBorder {
      flex-direction: column;
      align-items: flex-start;
      border: 1px solid lightgrey;
      padding: 0;

      .inner {
        border: .8rem solid white;
        align-items: flex-start;
        border-radius: 5px;
        max-height: 350px;
        min-height: 300px;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;

        @include mobile {
          border: 1rem solid white;
        }


      }

      p {
        flex: auto;
        @include font-size($--descriptionParaFS);
        line-height: 1.6;
        color: $SecondaryFS;
        white-space: pre-wrap;
        padding: 0 .5rem 1rem .5rem;


      }
    }
  }

}
</style>

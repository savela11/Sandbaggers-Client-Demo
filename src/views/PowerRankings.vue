<template>
  <div class="view">


    <div class="powerRankings" v-if="!loading">
      <div class="title">
        <h1>Miller's Power Rankings</h1>
        <div class="search">
          <div class="top">
            <button @click="toggleSearch" class="searchButton"><img src="@/assets/icons/search.svg" alt="search icon" />
            </button>
            <SelectBoxComponent v-if="selectedYear " :selected="selectedYear.year" :options="powerRankings" keyValue="eventId" optionValue="year"
                                :showSelectOptions="showSelectOptions"
                                @click.prevent.stop="toggleSelectBox" @select-option="selectOption" />
            <!--            <div class="select-wrapper" @click="showSelectOptions = !showSelectOptions">-->
            <!--              <div class="select" :class="{open: showSelectOptions}">-->
            <!--                <div class="trigger">-->
            <!--                  <div class="selectedSpan">-->
            <!--                    <span v-if="selectedYear">{{ selectedYear.year }}</span>-->
            <!--                  </div>-->
            <!--                  <div class="arrow"></div>-->
            <!--                </div>-->
            <!--                <div class="options" v-show="showSelectOptions">-->
            <!--                  <span class="option" v-for="powerRanking in powerRankings" :key="powerRanking.eventId">{{ powerRanking.year }}</span>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>

          <transition name="fade">
            <div v-if="isSearchingUser" class="bottom">
              <div class="searchBar">
                <label for="searchUser"></label>
                <input type="text" id="searchUser" v-model="searchUser" />
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="editPowerRanking" v-if="$store.state.authStore.currentUser.roles.includes('MillerTime') && selectedYear">
        <IconBtn btn-text="Edit" :link-btn="true" :link="`/powerRanking/edit/${selectedYear.eventId}`">
          <template v-slot:svg>
            <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.125 17.9688V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9688ZM21.5729 7.33334C21.9792 6.92709 21.9792 6.27084 21.5729 5.86459L19.1354 3.42709C18.7292 3.02084 18.0729 3.02084 17.6667 3.42709L15.7604 5.33334L19.6667 9.23959L21.5729 7.33334V7.33334Z"
                fill="#17252A" />
            </svg>
          </template>
        </IconBtn>
      </div>

      <div class="views" v-if="selectedYear">
        <div class="view rankings">
          <div class="titleBar">
            <div>
              <p>Rank</p>
            </div>
            <div>
              <p>Sandbagger</p>
            </div>
          </div>
          <div class="user" :class="{ active: user.id === showUsersWriteUpID }" v-for="user in Users" :key="user.id">
            <div class="top">
              <div class="rank">
                <div class="circle">
                  <p>{{ user.rank }}</p>
                </div>
              </div>
              <div class="sandbagger">
                <div class="name">
                  <h3>{{ user.name }}</h3>
                </div>
                <div class="handicap">
                  <p>HDCP</p>

                  <span>{{ user.handicap }}</span>
                </div>
              </div>
            </div>
            <div class="bottom" v-if="showUsersWriteUpID && showUsersWriteUpID === user.id">
              <div class="images">
                <div class="image">
                  <img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="golf" />
                </div>
                <div class="image">
                  <img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="golf" />
                </div>
                <div class="image">
                  <img src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="golf" />
                </div>
              </div>
              <div class="writeUp">
                <p>{{ user.writeUp }}</p>
              </div>
            </div>
            <div class="toggleWriteup">
              <button @click="toggleShowUsersWriteUp(user.id)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8V8ZM8.5 5C8.5 4.86739 8.44732 4.74021 8.35355 4.64645C8.25979 4.55268 8.13261 4.5 8 4.5C7.86739 4.5 7.74021 4.55268 7.64645 4.64645C7.55268 4.74021 7.5 4.86739 7.5 5V9.793L5.354 7.646C5.30751 7.59951 5.25232 7.56264 5.19158 7.53748C5.13084 7.51232 5.06574 7.49937 5 7.49937C4.93426 7.49937 4.86916 7.51232 4.80842 7.53748C4.74768 7.56264 4.69249 7.59951 4.646 7.646C4.59951 7.69249 4.56264 7.74768 4.53748 7.80842C4.51232 7.86916 4.49937 7.93426 4.49937 8C4.49937 8.06574 4.51232 8.13084 4.53748 8.19158C4.56264 8.25232 4.59951 8.30751 4.646 8.354L7.646 11.354C7.69245 11.4006 7.74762 11.4375 7.80837 11.4627C7.86911 11.4879 7.93423 11.5009 8 11.5009C8.06577 11.5009 8.13089 11.4879 8.19163 11.4627C8.25238 11.4375 8.30755 11.4006 8.354 11.354L11.354 8.354C11.4479 8.26011 11.5006 8.13278 11.5006 8C11.5006 7.86722 11.4479 7.73989 11.354 7.646C11.2601 7.55211 11.1328 7.49937 11 7.49937C10.8672 7.49937 10.7399 7.55211 10.646 7.646L8.5 9.793V5Z"
                    fill="#17252A"
                  />
                </svg>
              </button>
            </div>
          </div>
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
import { EventVm } from "@/types/ViewModels/EventVm";
import IconBtn from "@/components/ui/Buttons/IconBtn.vue";

@Component({
  name: "PowerRankings", components: {
    IconBtn,
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    SelectBoxComponent: (): Promise<typeof import("*.vue")> => import("@/components/ui/SelectBoxComponent.vue")
  }
})
export default class PowerRankings extends Vue {
  loading = false;
  isSearchingUser = false;
  selectedYear: EventPowerRankingVm | null = null;
  showSelectOptions = false;
  searchUser = "";
  showUsersWriteUpID: null | string = null;
  Users = [
    {
      id: "1",
      name: "Andy Savela",
      rank: 1,
      images: [],
      trending: "+5",
      handicap: 15.1,
      writeUp: "Here is a test writeup"
    },
    { id: "2", name: "Mitch Howell", rank: 2, images: [], trending: "-2", handicap: 2.1, writeUp: "" },
    { id: "3", name: "Matt Miller", rank: 3, images: [], trending: "-2", handicap: 10.1, writeUp: "" }
  ];
  powerRankings = [] as Array<EventPowerRankingVm>;


  mounted(): void {
    this.getPowerRankings();
  }

  async getPowerRankings(): Promise<void> {
    try {
      const res = await PowerRankingService.PowerRankings();
      if (res.status === 200) {
        this.powerRankings = res.data;

        this.selectedYear = res.data[0];

      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  toggleShowUsersWriteUp(id: string): void {
    if (id === this.showUsersWriteUpID) {
      this.showUsersWriteUpID = null;
      return;
    }

    this.showUsersWriteUpID = id;
  }

  toggleSelectBox(): void {
    this.showSelectOptions = !this.showSelectOptions;
  }

  selectOption(option: EventPowerRankingVm): void {
    this.selectedYear = option;
    this.showSelectOptions = false;
  }

  toggleSearch(): void {
    this.isSearchingUser = !this.isSearchingUser;
  }
}
</script>

<style scoped lang="scss">
$--selectBoxOptionFS: (
  null: .8rem,
  $mobile: .9rem
);
$--powerRankingTitleFS: (
  null: 1.2rem,
  $mobile: 1.4rem
);
.powerRankings {
  h1 {
    color: $PrimaryFS;
    @include font-size($--powerRankingTitleFS);
  }
}

.currentViewBtns {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0.2rem 0.8rem 0.2rem 0;
  margin: 0;

  button {
    margin-right: 0.5rem;
    display: inline-block;
    min-width: 100px;
    font-size: 0.8rem;
    padding: 0.8rem 1rem;
    border: 2px solid #17252a;
    border-radius: 3px;
    background-color: white;
    font-weight: bold;
    color: #17252a;


    &.active {
      color: white;
      background-color: #17252a;
    }
  }
}

.createPowerRankingBtn {
  border: none;
  border-bottom: 1px solid $SecondaryFS;
  font-size: .8rem;
  font-weight: bold;
  text-decoration: none;
  color: $SecondaryFS;
}

.views {


}

.view {
  h2 {
    color: $DarkBlue;
    font-size: 1rem;
  }

  .titleBar {
    padding: 0.5rem;
    display: flex;

    & > div:nth-child(1) {
      flex: 0 0 25%;
    }

    & > div:nth-child(2) {
      flex: auto;
    }

    p {
      font-size: 0.8rem;
    }
  }

  .user {
    padding: 0.3rem;
    margin: 0 0 2rem 0;
    height: 75px;
    border: 1px solid $DarkBlue;
    border-radius: 5px;
    position: relative;

    &.active {
      height: auto;
      min-height: 125px;
      display: flex;
      flex-direction: column;

      .toggleWriteup {
        button {
          transform: rotate(180deg);
        }
      }
    }

    .top {
      display: flex;
      padding: 0.3rem;
      align-items: center;
      height: 100%;

      .rank {
        flex: 0 0 25%;
        display: flex;
        justify-content: flex-start;

        .circle {
          border-radius: 50%;
          border: 1px solid $DarkBlue;
          width: 25px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: $DarkBlue;

          p {
            font-weight: bold;
            color: white;
            font-size: 0.8rem;
          }
        }
      }

      .sandbagger {
        flex: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .name {
          h3 {
            font-size: 1rem;
            font-weight: normal;
          }
        }

        .handicap {
          display: flex;
          flex-direction: column;
          align-items: center;

          p {
            font-size: 0.6rem;
          }

          span {
            font-size: 0.6rem;
            font-weight: bold;
          }
        }
      }
    }

    .bottom {
      flex: 1;
      border-top: 1px solid lightgrey;

      .images {
        overflow: auto;
        white-space: nowrap;
        padding: 0.5rem;

        .image {
          height: 125px;
          width: 125px;
          display: inline-block;
          color: white;
          text-align: center;
          padding: 0.3rem;
          text-decoration: none;

          img {
            object-fit: cover;
            height: 100%;
            width: 100%;
            border-radius: 3px;
            box-shadow: 0 5px 5px grey;
          }
        }
      }

      .writeUp {
        padding: 0.5rem;

        p {
          font-size: 0.9rem;
        }
      }
    }

    .toggleWriteup {
      display: flex;
      position: absolute;
      justify-content: flex-end;
      padding: 0 1rem;
      bottom: 0;
      left: 0;
      right: 0;
      transform: translateY(16px);

      button {
        font-size: 0.6rem;
        border-radius: 3px;
        color: $DarkBlue;
        height: 25px;
        width: 25px;
        border: none;
        background-color: white;
        padding: 0;

        svg {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }

  &.registeredUsers {
    .user {
      .top {
        padding: .3rem .8rem;
      }
    }

  }

}

.title {

}

.editPowerRanking {
  display: flex;
  justify-content: flex-end;
}

.search {
  margin-top: 1rem;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    .searchButton {
      padding: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.5rem;
      height: 40px;
      width: 40px;
      border: none;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }

    .selectEvent {
      display: flex;
      flex-direction: column;

      label {
        padding-left: 0.3rem;
      }

      select {
        font-size: 0.8rem;
        display: block;
        padding: 0.6em 1.4em 0.5em 0.8em;
        width: 75px;
        max-width: 100%;
        box-sizing: border-box;
        margin: 0;
        border: 1px solid rgba(211, 211, 211, 0.8);
        border-radius: 3px;
        appearance: none;
        background-color: #fff;
      }
    }
  }

  .bottom {
    .searchBar {
      input {
        font-size: 1.1rem;
        width: 100%;
        padding: 0.5rem 0.8rem;
        border: 1px solid lightgrey;
        border-radius: 25px;
      }
    }
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

@media (min-width: 375px) {
  .powerRankings {


    .writeUps {

      .user {
        padding: 0.5rem;

        .top {
          padding: 0.5rem;

          .rank {
            .circle {
              height: 30px;
              width: 30px;

              p {
                font-size: 1.1rem;
              }
            }
          }

          .sandbagger {
            .name {
              h3 {
                font-size: 1.2rem;
              }
            }

            .handicap {
              p {
                font-size: 0.8rem;
              }

              span {
                font-size: 0.8rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>

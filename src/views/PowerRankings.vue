<template>
  <div class="powerRankings">
    <div class="title">
      <h1>Miller's Power Rankings</h1>
      <div class="search">
        <div class="top">
          <button @click="toggleSearch" class="searchButton"><img src="@/assets/icons/search.svg" alt="search icon" /></button>
          <div class="selectEvent">
            <label for="year">Year</label>
            <select id="year" v-model="selectedYear">
              <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
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

    <div class="writeUps">
      <h2>Write Ups</h2>
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
          </div>
          <p>Here is a writeup</p>
        </div>
        <div class="toggleWriteup">
          <button @click="toggleShowUsersWriteUp(user.id)">Show</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIHelper from '@/utility/UIHelper'

@Component({ name: 'PowerRankings' })
export default class PowerRankings extends Vue {
  isSearchingUser = false
  selectedYear = '2020'
  years = ['2020', '2021']
  searchUser = ''
  showUsersWriteUpID: null | number = null
  Users = [
    { id: 1, name: 'Andy Savela', rank: 1, images: [], trending: '+5', handicap: 15.1, writeUp: '' },
    { id: 2, name: 'Mitch Howell', rank: 2, images: [], trending: '-2', handicap: 2.1, writeUp: '' },
    { id: 3, name: 'Matt Miller', rank: 3, images: [], trending: '-2', handicap: 10.1, writeUp: '' },
  ]
  mounted() {
    UIHelper.Header({ title: 'Power Rankings', isShowing: true, current: 'main' })
    this.$store.dispatch('uiStore/_setPageLoading', false)
  }

  toggleShowUsersWriteUp(id: number) {
    if (id === this.showUsersWriteUpID) {
      this.showUsersWriteUpID = null
      return
    }
    this.showUsersWriteUpID = id
  }
  toggleSearch(): void {
    this.isSearchingUser = !this.isSearchingUser
  }
}
</script>

<style scoped lang="scss">
.powerRankings {
  .title {
    margin-bottom: 1rem;
    h1 {
      font-size: 1.5rem;
      color: $DarkBlue;
    }

    .search {
      margin-top: 1rem;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 0 0 50%;
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
  }

  .writeUps {
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
      margin: 0 0 1.5rem 0;
      height: 75px;
      border: 1px solid $DarkBlue;
      border-radius: 5px;
      position: relative;
      &.active {
        height: auto;
        min-height: 125px;
        display: flex;
        flex-direction: column;
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
          display: inline;
          .image {
            height: 150px;
            width: 150px;

            img {
              object-fit: cover;
              height: 100%;
              width: 100%;
            }
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
        transform: translateY(10px);
        button {
          font-size: 0.6rem;
          padding: 0.2rem;
          border-radius: 3px;
          background-color: white;
          color: $DarkBlue;
          border: 1px solid $DarkBlue;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media (min-width: 375px) {
  .powerRankings {
    .title {
      h1 {
        font-size: 1.6rem;
      }
    }

    .writeUps {
      h2 {
      }
      .titleBar {
        & > div:nth-child(1) {
        }
        & > div:nth-child(2) {
        }
        p {
        }
      }

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

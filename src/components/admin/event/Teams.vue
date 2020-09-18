<template>
  <div class="teams">
    <div class="title">
      <h3>Teams</h3>
      <div class="addTeam">
        <router-link :to="{ name: 'EventTeams', params: { eventId: eventId } }"><img src="@/assets/icons/editPencil.svg" alt="Edit Team Button" /></router-link>
        <p>Edit Teams</p>
      </div>
    </div>
    <div class="teamList">
      <div class="team" v-for="team in teams" :key="team.teamId">
        <div class="container">
          <div class="top">
            <h4 class="name">{{ team.name }}</h4>
          </div>
          <div class="middle">
            <div class="captainContainer">
              <h4>Captain:</h4>
              <p>{{ teamCaptain(team.captain) }}</p>
            </div>
          </div>
          <div class="bottom">
            <div class="teamMembers">
              <h4>Team Members</h4>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IEventTeam } from '@/types/Admin/Event'

@Component({ name: 'Teams' })
export default class Teams extends Vue {
  @Prop() eventId!: number
  @Prop() teams!: IEventTeam[]
  teamCaptain(teamCaptain: string): string {
    if (!teamCaptain) {
      return 'No Captain'
    } else {
      return teamCaptain
    }
  }
}
</script>

<style scoped lang="scss">
.teams {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .addTeam {
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        border: none;
      }
      p {
        font-size: 0.6rem;
        color: grey;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }
  }

  .teamList {
    margin: 0;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 1rem 1rem 1rem 0;
    .team {
      display: inline-block;
      width: 150px;
      margin-right: 0.5rem;
      min-height: 100px;
      border-radius: 5px;
      box-shadow: 2px 5px 5px rgb(103, 103, 103, 0.5);
      padding: 0.3rem;
      position: relative;
      &:last-child {
        margin-right: 0;
      }

      .container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        & > div {
        }

        .top {
          .name {
            text-decoration: underline;
          }
        }

        .middle {
          .captainContainer {
            display: flex;
            align-items: center;
            p {
              font-size: 0.7rem;
              margin-left: 0.2rem;
              color: grey;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="eventTeams">
    <div class="top" v-if="!isAddingTeam">
      <div class="container">
        <button @click="backOne" class="back"><img src="@/assets/icons/backArrow.svg" alt="Back Button" /></button>
        <p>Back</p>
      </div>
      <div class="container">
        <button @click="toggleAddingTeam(true)"><img src="@/assets/icons/addCircle.svg" alt="Add Team Button" /></button>
        <p>Add</p>
      </div>
    </div>

    <div class="addEventTeam" v-if="isAddingTeam && !loading">
      <form class="form">
        <div class="form__field">
          <label for="teamName">Team Name / Color</label>
          <input id="teamName" type="text" class="input" v-model.trim="addTeamForm.teamName" />
        </div>
      </form>
      <div class="btnContainer">
        <button @click="addTeamToEvent" class="btn btn--xs btn--green">Add</button>
        <button @click="toggleAddingTeam(false)" class="btn btn--xs btn--red">cancel</button>
      </div>
    </div>

    <div class="teamList" v-if="!isAddingTeam && !loading">
      <div class="team" :style="`borderRight: 3px solid ${teamColor(team.name)}`" v-for="team in teams" :key="team.teamId">
        <div class="flex flex--between">
          <div class="flex nameWithForm">
            <h2>Team</h2>
            <p :style="`color: ${teamColor(team.name)}`" v-if="editTeamId !== team.teamId">{{ team.name }}</p>
            <form class="editTeamName" v-if="editTeamId === team.teamId">
              <label class="hideLabel" for="cTeam">Team Name</label>
              <input type="text" id="cTeam" v-model="team.name" />
            </form>
          </div>
          <div :class="flexDirection" class="buttons">
            <BtnWithText v-if="editTeamId !== team.teamId" @click="editTeam(team.teamId)" v-bind="{ img: 'editPencil', altText: 'Edit Team Button', text: 'Edit' }" />
            <BtnWithText class="cancelButton" v-if="editTeamId === team.teamId" @click="editTeamId = null" v-bind="{ img: 'cancel', altText: 'Cancel Button', text: 'Cancel' }" />
            <BtnWithText v-if="editTeamId === team.teamId" @click="updateTeamInfo(team)" v-bind="{ img: 'cloudSave', altText: 'Save Button', text: 'Save' }" />

            <!--            <div class="flex flex&#45;&#45;column flex&#45;&#45;iCenter">-->
            <!--              <button @click="editTeam(team.teamId)">-->
            <!--                <img src="@/assets/icons/editPencil.svg" alt="Edit Team Button" />-->
            <!--              </button>-->
            <!--              <p>Edit</p>-->
            <!--            </div>-->
            <!--            <div v-if="editTeamId === team.teamId" class="flex flex&#45;&#45;column flex&#45;&#45;iCenter">-->
            <!--              <button @click="editTeamId = null">-->
            <!--                <img src="@/assets/icons/cancel.svg" alt="Cancel Button" />-->
            <!--              </button>-->
            <!--              <p>Cancel</p>-->
            <!--            </div>-->
            <!--            <div v-if="editTeamId === team.teamId" class="flex flex&#45;&#45;column flex&#45;&#45;iCenter">-->
            <!--              <button @click="editTeam(team.teamId)"><img src="@/assets/icons/cloudSave.svg" alt="Save Button" /></button>-->
            <!--              <p>Save</p>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>

    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIHelper from '@/utility/UIHelper'
import { AddTeamForm } from '@/types/Events/SandbaggerEvents'
import EventService from '@/services/EventService'
import { IEventTeam } from '@/types/Admin/Event'

@Component({
  name: 'EventTeams',
  components: { Loading: (): Promise<object> => import('@/components/ui/Loading.vue'), BtnWithText: (): Promise<object> => import('@/components/ui/Buttons/BtnWithText.vue') },
})
export default class EventTeams extends Vue {
  $store: any
  isAddingTeam = false
  loading = false
  flexDirection = ''
  eventId = ''
  editTeamId: number | null = null
  teams: IEventTeam[] = []
  addTeamForm: AddTeamForm = {
    teamName: '',
    eventId: '',
  }

  mounted(): void {
    this.eventId = this.$route.params.eventId
    this.eventTeams()
    UIHelper.Header({ title: 'Teams', isHeaderShowing: true })
    window.addEventListener('resize', this.handleFlexDirection)
    this.handleFlexDirection()
  }

  updateTeamInfo(team: IEventTeam): void {
    console.log(team)
  }

  handleFlexDirection(): void {
    if (window.innerWidth < 375) {
      this.flexDirection = 'flex flex--column'
    } else {
      this.flexDirection = 'flex flex--row flex--noWrap'
    }
  }

  editTeam(teamId: number): void {
    if (teamId === this.editTeamId) {
      this.editTeamId = null
      return
    }
    this.editTeamId = teamId
  }

  teamColor(teamName: string): string {
    const colors = ['red', 'blue', 'white', 'black', 'green']
    if (colors.includes(teamName.toLowerCase())) {
      return teamName.toLowerCase()
    } else {
      return 'grey'
    }
  }

  toggleAddingTeam(status: boolean): void {
    this.isAddingTeam = status
  }

  async addTeamToEvent(): Promise<void> {
    this.loading = true
    this.addTeamForm.eventId = this.eventId
    try {
      const res = await EventService.CreateEventTeam(this.addTeamForm)
      if (res.status === 200) {
        this.teams.push(res.data)
        this.toggleAddingTeam(false)
      }
      console.log(res)
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  async eventTeams(): Promise<void> {
    this.loading = true
    try {
      const res = await EventService.EventTeams(this.eventId)
      if (res.status === 200) {
        this.teams = res.data
        await UIHelper.PageLoading(false)
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  backOne(): void {
    this.$router.go(-1)
  }
}
</script>

<style scoped lang="scss">
.eventTeams {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 0.7rem;
      color: grey;
    }

    button {
      border: none;

      img {
        height: 30px;
        width: 30px;
        object-fit: contain;
      }
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .addEventTeam {
    .btnContainer {
      display: flex;
      justify-content: flex-end;

      button:first-child {
        margin-right: 0.5rem;
      }
    }
  }

  .teamList {
    margin-top: 2rem;
    padding: 0.5rem;

    .team {
      box-shadow: 5px 5px 5px lightgrey;
      min-height: 100px;
      border-radius: 5px;
      margin-bottom: 1rem;
      padding: 0.5rem;

      h2 {
        font-size: 1rem;
        font-weight: normal;
      }

      .nameWithForm {
        p {
          font-weight: bold;
        }
      }

      &.red {
        border-right: 3px solid red;

        p {
          color: red;
        }
      }

      .buttons {
        &.flex--column {
          .cancelButton {
            margin-bottom: 0.3rem;
          }
        }

        &.flex--row {
          .cancelButton {
            margin-right: 0.3rem;
          }
        }
      }

      .nameWithForm {
      }

      .editSave {
        p {
          color: grey;
          font-size: 0.6rem;
        }
      }

      .editTeamName {
        margin: 0 0.3rem;

        input {
          border: none;
          border-bottom: 1px solid grey;
          padding: 0.3rem 0.5rem;
          font-size: 0.8rem;
          border-radius: 3px;
          background-color: lightgrey;
          color: $DarkBlue;
          font-weight: bold;
        }
      }
    }
  }
}
</style>

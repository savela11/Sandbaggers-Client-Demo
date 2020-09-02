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
      <div v-for="team in teams" :key="team.teamId">
        <p>{{ team.name }}</p>
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
}
</script>

<style scoped lang="scss">
.teams {
  .title {
    display: flex;
    justify-content: space-between;
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
}
</style>

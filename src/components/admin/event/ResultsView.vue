<template>
  <div class="resultsView">
    <div class="viewButtons">
      <button v-for="resultView in viewButtons" :key="resultView" :class="{ active: currentView === resultView }">{{ resultView }}</button>
    </div>
    <div class="currentChamps section">
      <div>
        <h3>Current Champs?</h3>
        <button
          :class="{ activeChamps: selectedEvent.eventResults.isActive === true }"
          @click="toggleActiveScrambleChamps(true)"
          class="btn btn--xs btn--borderBottom btn--borderBlue"
        >
          Yes
        </button>
        <button
          :class="{ notActiveChamps: selectedEvent.eventResults.isActive === false }"
          @click="toggleActiveScrambleChamps(false)"
          class="btn btn--xs btn--borderBottom btn--borderBlue"
        >
          No
        </button>
      </div>

      <div class="champList">
        <div v-for="champ in selectedEvent.eventResults.scrambleChamps" :key="champ.userId" class="champ">
          <div class="imgContainer">
            <img :src="setScrambleChampProfileImage(champ.image)" :alt="champ.name + 'Profile picture.'" />
          </div>
          <p>{{ champ.fullName }}</p>
        </div>
      </div>
    </div>
    <div class="registeredUsers section">
      <h3>Scramble Champs</h3>
      <div class="list">
        <div class="user" v-for="user in selectedEvent.registeredUsers" :key="user.id">
          <div>
            <p>{{ user.fullName }}</p>
          </div>
          <div class="checkBox">
            <label class="hideLabel" for="user">{{ user.fullName }}</label>
            <input type="checkbox" id="user" v-model="user.isCurrentChamp" @change="updateScrambleChamp(user)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { IEventDto, IRegisteredUser } from '@/types/Admin/Event'

@Component({ name: 'ResultsView' })
export default class ResultsView extends Vue {
  @Prop() selectedEvent!: IEventDto
  currentView = 'Scramble Champs'
  viewButtons = ['Scramble Champs', 'Teams']

  @Emit('updateScrambleChamp')
  updateScrambleChamp(sChamp: IRegisteredUser): IRegisteredUser {
    return sChamp
  }

  @Emit('toggleActiveScrambleChamps')
  toggleActiveScrambleChamps(status: boolean): boolean {
    return status
  }
  setScrambleChampProfileImage(img: string | null): string {
    if (img === null) {
      return require('@/assets/SBLogo.png')
    } else {
      return img
    }
  }
}
</script>

<style scoped lang="scss">
.resultsView {
  h2 {
    font-size: 1.2rem;
    color: $DarkBlue;
  }

  h3 {
    font-size: 0.8rem;
  }

  .section {
    margin: 0 0 1rem 0;
  }
  .viewButtons {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 0.2rem;
    margin: 0 0 1rem 0;

    button {
      margin-right: 0.5rem;
      display: inline-block;
      height: 30px;
      min-width: 75px;
      font-size: 0.8rem;
      padding: 0.3rem 0.8rem;
      border: none;
      border-bottom: 2px solid $DarkBlue;

      &.active {
        background-color: $DarkBlue;
        color: white;
      }

      &:last-child {
        margin: 0;
      }
    }
  }

  .currentChamps {
    button {
      margin: 0.5rem 0.3rem 0 0;

      &:last-child {
        margin-right: 0;
      }

      &.activeChamps {
        background-color: $DarkBlue;
        color: white;
      }

      &.notActiveChamps {
        background-color: $danger;
        border-bottom: 1px solid $danger;
        color: white;
      }
    }

    .champList {
      margin: 1rem 0;
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      .champ {
        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 0.2rem;
        .imgContainer {
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        p {
          font-size: 0.7rem;
          text-align: center;
        }
      }
    }
  }

  .registeredUsers {
    .list {
      margin-top: 0.4rem;
      min-height: 250px;
      border-radius: 5px;
      .user {
        box-shadow: 3px 3px 3px grey;
        padding: 0.5rem 0.5rem;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .checkBox {
          input {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>

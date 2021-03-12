<template>
  <div>
    <button @click="$router.go(-1)">Back</button>

    <div class="createForm">
      <form class="form">
        <div class="form__field">
          <label for="username">Rank</label>
          <input type="text" id="username" v-model.trim.number="createPowerRankingForm.rank" />
        </div>
        <div class="form__field">
          <label for="trending">Trending</label>
          <input type="text" id="trending" v-model.trim="createPowerRankingForm.trending" />
        </div>
        <div class="form__field">
          <label for="writeUp">Writeup</label>
          <textarea type="text" id="writeUp" v-model.trim="createPowerRankingForm.writeUp"></textarea>
        </div>

        <div class="btnContainer">
          <button class="btn btn--bg-darkBlue btn--sm" id="createPowerRankingBtn">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PowerRankingService from '@/services/PowerRankingService'
import UIHelper from '@/utility/UIHelper'
import { RegisteredUserVm } from '@/types/ViewModels/Models/EventVm'

@Component({ name: 'CreatePowerRanking' })
export default class CreatePowerRanking extends Vue {
  createPowerRankingForm = {
    userId: '',
    rank: 0,
    trending: '',
    writeUp: '',
  }

  registeredUsers = [] as Array<RegisteredUserVm>

  mounted(): void {
    this.getRegisteredUsers()
  }

  async getRegisteredUsers(): Promise<void> {
    try {
      const res = await PowerRankingService.EventRegisteredUsers(parseInt(this.$route.params.eventId))
      if (res.data.length < 1) {
        UIHelper.SnackBar({
          title: 'Error',
          message: 'Not able to find registered user',
          isSnackBarShowing: true,
          classInfo: 'error',
        })
        return this.$router.go(-1)
      }
      if (res.status === 200) {
        this.registeredUsers = res.data
      }
    } catch (e) {
      console.log(e)
    } finally {
    }
  }
}
</script>

<style scoped lang="scss">
.createForm {
  margin: 1rem 0;
}

textarea {
  min-height: 150px;
}
</style>

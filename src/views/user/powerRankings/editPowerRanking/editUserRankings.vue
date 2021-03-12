<template>
  <div class='editUserRankings'>

    <div v-if='!editRanking.userId'>
      <div class='userRanking' v-for='ranking in rankings' :key='ranking.userId'>
        <div class='userRanking__container'>
          <p>{{ ranking.fullName }}</p>
          <IconBtn class='messages__message' class-name='circle white' @click.prevent.stop='selectRankingToEdit(ranking)'>
            <template v-slot:svg>
              <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z'
                  fill='#17252A' />
              </svg>
            </template>
          </IconBtn>
        </div>
      </div>
    </div>
    <div class='selectedRanking' v-else>
      <div class='flex--xs flex--iCenter flex--between'>
        <div class='selectedRanking__val fullName'>
          <h2>{{ editRanking.fullName }}</h2>
        </div>
        <div class='selectedRanking__val createdOn'>
          <p>Created On:</p>
          <p>{{ formatDate(editRanking.createdOn) }}</p>
        </div>
      </div>
      <div class='selectedRanking__val rank'>
        <p>{{ editRanking.rank }}</p>
      </div>
      <div class='selectedRanking__val handicap'>
        <p>{{ editRanking.handicap }}</p>
      </div>
      <div class='selectedRanking__val trending'>
        <p>{{ editRanking.trending }}</p>
      </div>

      <div class='selectedRanking__writeUp'>
        <label for='writeUp'>Writeup</label>
        <input id='writeUp' type='text' v-model='editRanking.writeup'>
      </div>

    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RankingVm } from '@/types/ViewModels/Models/EventPowerRankingVm'
import Helper from '@/utility/Helper'

@Component({
  name: 'editUserRankings',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue')
  }
})


export default class editUserRankings extends Vue {
  @Prop() rankings!: Array<RankingVm>
  loading = false
  editRanking = {} as RankingVm


  formatDate(date: string): string {
    return Helper.formatDate(date)
  }

  selectRankingToEdit(ranking: RankingVm): void {
    this.editRanking = ranking
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/powerRanking/_editUserRanking.scss";
</style>

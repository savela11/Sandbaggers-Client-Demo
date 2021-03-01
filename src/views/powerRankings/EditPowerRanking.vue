<template>
  <div class='editPowerRanking'>
    <div v-if='!loading && PowerRanking.eventId'>
      <div class='flex--xs flex--end'>
        <SelectBoxComponent
          :selected='activeViewBtn'
          :options='viewButtons'
          selected-value=''
          optionValue=''
          :showSelectOptions='showSelectOptions'
          @click.prevent.stop='toggleSelectBox'
          @select-option='selectOption'
        />
      </div>
      <div class='editPowerRanking__views'>
        <div v-if="activeViewBtn === 'Main'" class='view main'>
          <InputField class-name='textArea' :isActive="PowerRanking.disclaimer !== ''">
            <template v-slot:field>
              <label for='disclaimer'>Disclaimer</label>
              <textarea type='text' id='disclaimer' v-model.trim='PowerRanking.disclaimer' />
            </template>
          </InputField>
          <div class='updateBtn my-1'>
            <button class='btn btn--sm text--sm btn--bg-darkBlue text--bold '>Update</button>
          </div>
        </div>
        <EditUserRankings v-if="activeViewBtn === 'Edit Rankings'" class='view editRankings' v-bind='{rankings: PowerRanking.rankings}' />

        <div v-if="activeViewBtn === 'Registered'" class='view registered'>

          <div v-for='user in PowerRanking.registeredUsers' :key='user.id'>
            <p>{{ user.fullName }}</p>
          </div>
        </div>

      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import PowerRankingService from '@/services/PowerRankingService'
import { EventPowerRankingVm } from '@/types/ViewModels/Models/EventPowerRankingVm'
import UIHelper from '@/utility/UIHelper'


@Component({
  name: 'EditPowerRanking',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue'),
    SelectBoxComponent: (): Promise<typeof import('*.vue')> => import('@/components/ui/SelectBoxComponent.vue'),
    ViewBtns: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/ViewBtns.vue'),
    EditUserRankings: (): Promise<typeof import('*.vue')> => import('@/views/powerRankings/editPowerRanking/editUserRankings.vue')

  }
})


export default class EditPowerRanking extends Vue {
  loading = true
  PowerRanking = {} as EventPowerRankingVm
  viewButtons = ['Main', 'Edit Rankings', 'Registered']
  activeViewBtn = 'Main'

  showSelectOptions = false

  mounted(): void {
    this.getPowerRanking()
  }


  toggleSelectBox(): void {
    this.showSelectOptions = !this.showSelectOptions
  }

  selectOption(option: string): void {
    this.activeViewBtn = option
    this.showSelectOptions = false
  }

  async updatePowerRanking(): Promise<void> {
    try {
      const res = await PowerRankingService.UpdatePowerRanking(this.PowerRanking)

    } catch (e) {
      console.log(e)

    } finally {


    }
  }

  async getPowerRanking(): Promise<void> {
    try {
      const res = await PowerRankingService.PowerRanking(this.$route.params.eventId)
      if (res.status === 200) {
        this.PowerRanking = res.data
        setTimeout(() => {
          this.loading = false
        }, Math.floor(Math.random() * 3000))
      }

    } catch (e) {
      UIHelper.SnackBar({ title: 'Error', message: `No Power Ranking Found for this Event`, classInfo: `error`, isSnackBarShowing: true, errors: undefined })
      setTimeout(() => {

        this.$router.go(-1)
      }, Math.floor(Math.random() * 3000))

    }
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/powerRanking/_editPowerRanking";
</style>

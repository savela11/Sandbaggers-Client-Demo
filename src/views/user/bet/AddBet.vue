<template>
  <div class='AddBet'>
    <form v-if='!loading' class='form form--addBet' @submit.prevent.stop='createBet'>
      <InputField :isActive="addBetForm.title !== ''" className='secondary'>
        <template v-slot:field>
          <label for='title'>Title</label>
          <input type='text' id='title' v-model.trim='addBetForm.title' />
        </template>
      </InputField>
      <div class='form__field form__field--active'>
        <p class='form-text form-text--title'>
          Active: <span id='spanActiveStatus'> {{ addBetForm.isActive ? 'Yes' : 'No' }}</span>
        </p>
        <div class='btns'>
          <button :class='{ clicked: addBetForm.isActive === true }' @click.prevent.stop='addBetForm.isActive = true'>Yes</button>
          <button :class='{ clicked: addBetForm.isActive === false }' @click.prevent.stop='addBetForm.isActive = false'>No</button>
        </div>
      </div>
      <div class='form__field form__field--amount'>
        <p class='form-text form-text--title'>
          Amount: <span id='spanAmt'>${{ addBetForm.amount }}</span>
        </p>
        <div class='btns'>
          <button v-for='(amount, index) in amounts' :key='amount' ref='amount' @click.prevent.stop='increaseBetAmount(amount, index)'>${{ amount }}</button>
        </div>
      </div>
      <div class='form__field form__field--canAccept'>
        <p class='form-text form-text--title'>
          How many can accept? <span id='spanAcceptNum'>{{ addBetForm.canAcceptNumber }}</span>
        </p>
        <div class='btns btns--acceptBetNum'>
          <button
              v-for='acceptedBets in numOfAcceptedBets'
              :key='acceptedBets'
              :class='{ clicked: addBetForm.canAcceptNumber === acceptedBets }'
              @click.prevent.stop='numberCanAcceptBet(acceptedBets)'
          >
            {{ acceptedBets }}
          </button>
        </div>
      </div>
      <InputField :isActive="addBetForm.description !== ''" class-name='textArea'>
        <template v-slot:field>
          <label for='description'>Description</label>
          <textarea type='text' id='description' v-model.trim='addBetForm.description'></textarea>
        </template>
      </InputField>

      <input type='submit' class='btn btn--sm btn--bg-darkGreen btn--add-bet' id='addBetBTN' :disabled='!validateForm' value='Add'>
    </form>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { CreateBetDto } from '@/types/DTO/BetDto'
import UIHelper from '@/utility/UIHelper'
import BetService from '@/services/User/BetService'

@Component({
  name: 'AddBet',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue')
  }
})


export default class AddBet extends Vue {
  loading = false
  addBetForm: CreateBetDto = {
    title: '',
    description: '',
    amount: 0,
    canAcceptNumber: 0,
    requiresPassCode: false,
    isActive: false,
    userId: ''
  }

  amounts = [1, 5, 10, 25]
  numOfAcceptedBets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  get validateForm(): boolean {
    return !!(this.addBetForm.title && this.addBetForm.description && this.addBetForm.amount > 0 && this.addBetForm.canAcceptNumber > 0)
  }

  increaseBetAmount(amount: number, index: number): void {
    const spanTxt = document.getElementById('spanAmt')
    if (spanTxt) spanTxt.classList.add('flash')
    const els = this.$refs.amount as Element[]
    els[index].classList.add('clicked')
    setTimeout(() => {
      els[index].classList.remove('clicked')
      if (spanTxt) spanTxt.classList.remove('flash')
    }, 500)
    this.addBetForm.amount += amount
  }

  numberCanAcceptBet(numCanAccept: number): void {
    const spanTxt = document.getElementById('spanAcceptNum')
    if (spanTxt) spanTxt.classList.add('flash')
    setTimeout(() => {
      if (spanTxt) spanTxt.classList.remove('flash')
    }, 500)
    this.addBetForm.canAcceptNumber = numCanAccept
  }


  async createBet(): Promise<void> {
    this.loading = true
    this.addBetForm.userId = this.$store.state.authStore.currentUser.id
    try {
      UIHelper.clickedButton('addBetBTN')
      const res = await BetService.CreateBet(this.addBetForm)
      if (res.status === 200) {

        UIHelper.SnackBar({
          title: 'Success',
          message: `Bet Created`,
          classInfo: `primary`,
          isSnackBarShowing: true,
          errors: undefined
        })

        setTimeout(() => {
          this.$router.go(-1)
        }, 2000)

      }
    } catch (e) {
      console.log(e)

      UIHelper.SnackBar({
        title: 'Error',
        message: `Not able to create bet`,
        classInfo: `error`,
        isSnackBarShowing: true,
        errors: undefined
      })
      this.loading = false
    }
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/user/bet/addBet.scss";
</style>

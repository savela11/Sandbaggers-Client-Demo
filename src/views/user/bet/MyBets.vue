<template>
  <div class='myBets'>
    <div v-if='!loading'>
      <div class='search'>
        <IconBtn btn-text='Search' @click.prevent.stop='isSearchBarShowing = !isSearchBarShowing'>
          <template v-slot:svg>
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14V14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z' fill='#17252A' />
            </svg>
          </template>
        </IconBtn>
        <div class='search__column search__column--input' v-show='isSearchBarShowing'>
          <label for='searchSB' class='hideLabel'>Search</label>
          <input id='searchSB' class='input text text--input' type='text' v-model='searchInput' placeholder='Search by Bet Title' />
          <button class='search__btn search__btn--clear' @click.prevent.stop="searchInput = ''">Clear</button>
        </div>
      </div>
      <div class='bet-list'>
        <Card v-for='bet in filteredBets' :key='bet.betId' :additional='true' class='card-component'>
          <template v-slot:sectionOne>
            <p class='card__text card__text--alt'>Created: {{ formatDate(bet.createdOn) }}</p>
            <p class='card__text card__text--alt'>Accepted:
              <span>{{ bet.acceptedBy.length }} of {{ bet.canAcceptNumber }}</span>
            </p>
          </template>
          <template v-slot:sectionTwo>
            <h3 class='card__text card__text--title'>{{ bet.title }}</h3>
          </template>
          <template v-slot:sectionThree>
          </template>
          <template v-slot:additional>
            <router-link :to='`/MyBets/${bet.betId}`' class='card-component__btn card-component__btn--edit'>Edit</router-link>
          </template>
        </Card>

      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import BetService from '@/services/User/BetService'
import { BetVm } from '@/types/ViewModels/Models/BetVm'
import Helper from '@/utility/Helper'

@Component({
  name: 'MyBets',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    Card: (): Promise<typeof import('*.vue')> => import('@/components/ui/CardComponent.vue'),
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue')
  }
})


export default class MyBets extends Vue {
  loading = true
  searchInput = ''
  isSearchBarShowing = false
  myBets: Array<BetVm> = []

  mounted(): void {
    this.getMyBets()
  }


  get filteredBets(): Array<BetVm> {
    if (this.searchInput !== '') {
      return this.myBets.filter(b => {
        return b.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
    } else {
      return this.myBets
    }
  }

  async getMyBets(): Promise<void> {
    const userId = this.$store.state.authStore.currentUser.id
    if (!userId) {
      return this.$router.go(-1)
    }

    try {
      const res = await BetService.MyBets(userId)
      if (res.status === 200) {
        this.myBets = res.data
      }

    } catch (e) {
      console.log(e)

    } finally {
      setTimeout(() => {
        this.loading = false

      }, 2000)
    }
  }

  formatDate(date: string): string {
    return Helper.formatDate(date)
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/user/bet/myBets.scss";
</style>

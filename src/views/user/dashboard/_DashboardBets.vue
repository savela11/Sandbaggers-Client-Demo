<template>
    <div class="dashboardBets">
        <div class="dashboardBets__container" v-if="bets.length > 0">
            <div class="searchBar">
                <div class="inputContainer">
                    <label for="searchSB" class="hideLabel">Search</label>
                    <input id="searchSB" class="input" type="text" v-model="searchInput" placeholder="Search by name" />
                </div>
                <button class="clearBtn">Clear</button>
            </div>
            <div class="bet-list">
                <Card v-for="bet in filteredBets" :key="bet.betId" class=" bet" footer-class='flex--end' header-class='flex--between' main-class='flex--items-center flex--between'>
                    <template v-slot:card--header>
                        <p class="card__text card__text--alt">Created: {{ formatDate(bet.createdOn) }}</p>
                        <p class="card__text card__text--alt">By: {{ bet.createdBy.fullName }}</p>
                    </template>
                    <template v-slot:card--main>
                            <div class="title">
                                <h3 class="card__text card__text--title">{{ bet.title }}</h3>
                            </div>
                            <div class="amount">
                                <span>${{ bet.amount }}</span>
                            </div>
                    </template>
                    <template v-slot:card--footer >
                      <router-link class="viewBetBtn btn btn--xs btn--border-darkBlue btn--borderBottom" :to="`/bets/${bet.betId}`">View</router-link>
                    </template>
                </Card>
            </div>
            <PaginationBtns :items-count="filteredBets" :size="size" :page-number="pageNumber" @change-page="changePage" />
        </div>
        <div v-else class="noBets">
            <p>No Bets found...</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BetVm } from '@/types/ViewModels/Models/BetVm'
import Helper from '@/utility/Helper'

@Component({
    name: 'DashboardBets',
    components: {
        PaginationBtns: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/PaginationBtns.vue'),
        Card: (): Promise<typeof import('*.vue')> => import('@/components/ui/CardComponent.vue'),
    },
})
export default class DashboardBets extends Vue {
    @Prop() bets!: Array<BetVm>

    searchInput = ''
    isSearchInputShowing = false

    size = 10
    pageNumber = 0

    get betCount(): number {
        const l = this.bets.length,
            s = this.size
        return Math.ceil(l / s)
    }

    changePage(status: string): void {
        if (status === 'next') {
            this.pageNumber++
        } else {
            this.pageNumber--
        }
    }

    get filteredBets(): BetVm[] {
        const start = this.pageNumber * this.size,
            end = start + this.size

        const filterBets = this.bets.filter((b) => {
            return b.createdBy.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
        })
        return filterBets.slice(start, end)
    }

    formatDate(date: string): string {
        return Helper.formatDate(date)
    }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/dashboard/_dashboardBets";
</style>
<template>
    <div class="handicaps">
        <transition name="slide-fade">
            <div v-show="isSearchInputShowing" class="searchBar handicaps__search">
                <label for="searchSB" class="hideLabel">Search</label>
                <input id="searchSB" class="input text text--input" type="text" v-model="searchInput" placeholder="Search by name" />
                <div class="clearBtnContainer">
                    <button class="handicaps__btn handicaps__btn--clear" @click.prevent.stop="searchInput = ''">Clear</button>
                </div>
            </div>
        </transition>
        <div class="titleBar">
            <div>
                <button @click.prevent.stop="toggleSearch" class="handicaps__btn handicaps__btn--search">
                    <img src="@/assets/icons/search.svg" alt="search icon" class="handicaps__icon" />
                </button>
            </div>
            <div>
                <p class="handicaps__text">Name</p>
            </div>
            <div>
                <p class="handicaps__text">Handicap</p>
            </div>
        </div>
        <div class="sandbaggerList">
            <div class="sandbagger" v-for="sb in filteredSandbaggers" :key="sb.id">
                <div class="sandbagger__container">
                    <div>
                        <img v-if="sb.image === null" src="@/assets/icons/accountCircle.svg" alt="account icon" />
                        <img v-else :src="sb.image" alt="account icon" />
                    </div>
                    <div>
                        <span class="handicaps__text handicaps__text--fullName">
                            {{ sb.fullName }}
                        </span>
                    </div>
                    <div>
                        <span class="handicaps__text handicaps__text--handicap">{{ sb.handicap }}</span>
                    </div>
                </div>
            </div>
            <PaginationBtns :items-count="sandbaggerCount" :size="size" :page-number="pageNumber" @change-page="changePage" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SandbaggerWithHandicapVm } from '@/types/ViewModels/DashboardViewModel'

@Component({
    name: 'Handicaps',
    components: {
        Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
        PaginationBtns: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/PaginationBtns.vue'),
    },
})
export default class Handicaps extends Vue {
    @Prop() sandbaggers!: Array<SandbaggerWithHandicapVm>

    isSearchInputShowing = false
    searchInput = ''
    size = 5
    pageNumber = 0

    get filteredSandbaggers(): SandbaggerWithHandicapVm[] {
        const start = this.pageNumber * this.size,
            end = start + this.size

        const filteredSandbaggers = this.sandbaggers.filter((sb) => {
            return sb.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
        })

        return filteredSandbaggers.slice(start, end)
    }

    get sandbaggerCount(): number {
        const l = this.sandbaggers.length,
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

    toggleSearch(): void {
        this.isSearchInputShowing = !this.isSearchInputShowing
    }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/dashboard/_handicaps.scss";
</style>

<template>
    <div class='profileSettings'>
        <div class='favorites'>
            <h2>Favorite Links</h2>
            <div class='favoriteLink'>
                <p>One</p>
                <SelectBoxComponent
                    :selected='settings.favoriteLinks[0]'
                    :options='filterFavoriteLinks(selectableFavoriteLinks)'
                    selected-value='name'
                    optionValue='name'
                    :showSelectOptions='selectedOption === 0'
                    @click.prevent.stop='toggleOptions(0)'
                    @select-option='selectFavoriteLink'
                />
            </div>
            <div class='favoriteLink'>
                <p>Two</p>
                <SelectBoxComponent
                    :selected='settings.favoriteLinks[1]'
                    :options='filterFavoriteLinks(selectableFavoriteLinks)'
                    selected-value='name'
                    optionValue='name'
                    :showSelectOptions='selectedOption === 1'
                    @click.prevent.stop='toggleOptions(1)'
                    @select-option='selectFavoriteLink'
                />
            </div>

            <div class='favoriteLink'>
                <p>Three</p>
                <SelectBoxComponent
                    :selected='settings.favoriteLinks[2]'
                    :options='filterFavoriteLinks(selectableFavoriteLinks)'
                    selected-value='name'
                    optionValue='name'
                    :showSelectOptions='selectedOption === 2'
                    @click.prevent.stop='toggleOptions(2)'
                    @select-option='selectFavoriteLink'
                />
            </div>
        </div>

        <div class='contacts'>
            <h2>Contact Page</h2>
            <div class='contacts__flex'>
                <p>Show Number:</p>
                <div class='contacts__btns'>
                    <button :class='{ active: settings.isContactNumberShowing === true }' @click.prevent.stop='settings.isContactNumberShowing = true'>Yes</button>
                    <button :class='{ active: settings.isContactNumberShowing === false }' @click.prevent.stop='settings.isContactNumberShowing = false'>No</button>
                </div>
            </div>
            <div class='contacts__flex'>
                <p>Show Email:</p>
                <div class='contacts__btns'>
                    <button :class='{ active: settings.isContactEmailShowing === true }' @click.prevent.stop='settings.isContactEmailShowing = true'>Yes</button>
                    <button :class='{ active: settings.isContactEmailShowing === false }' @click.prevent.stop='settings.isContactEmailShowing = false'>No</button>
                </div>
            </div>
        </div>

        <div class='update-btn'>
            <button class='btn__update' @click.prevent.stop='updateSettings'>Update</button>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { FavoriteLinkVm, UserSettingsVm } from '@/types/ViewModels/Models/UserVm'

@Component({
    name: 'ProfileSettings',
    components: {
        SelectBoxComponent: (): Promise<typeof import('*.vue')> => import('@/components/ui/SelectBoxComponent.vue')
    }
})
export default class ProfileSettings extends Vue {
    @Prop() settings!: UserSettingsVm
    selectableFavoriteLinks: FavoriteLinkVm[] = [
        { name: 'Dashboard', link: '/dashboard' },
        { name: 'Events', link: '/Events' },
        { name: 'Bets', link: '/bets' },
        { name: 'Ideas', link: '/ideas' },
        { name: 'PowerRankings', link: '/powerRankings' },
        { name: 'Mock Drafts', link: '/mockDrafts' },
        { name: 'Gallery', link: '/gallery' },
        { name: 'Contacts', link: '/contacts' }
    ]

    selectedOption: null | number = null

    filterFavoriteLinks(selectableLinks: FavoriteLinkVm[]): FavoriteLinkVm[] {
        return selectableLinks.filter((v) => {
            const foundIndex = this.settings.favoriteLinks.findIndex((fl) => {
                return fl.name === v.name
            })
            if (foundIndex === -1) {
                return v
            } else {
                return
            }
        })
    }

    toggleOptions(option: number): void {
        if (this.selectedOption === option) {
            this.selectedOption = null
            return
        }
        this.selectedOption = option
    }

    selectFavoriteLink(favLink: FavoriteLinkVm): void {
        if (this.selectedOption === null) {
            return
        }

        this.settings.favoriteLinks[this.selectedOption] = favLink
        this.selectedOption = null
    }

    updateSettings(): void {
        this.$emit('update-settings', this.settings)
    }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/userProfile/_profileSettings.scss";
</style>

<template>
    <div class="draftManager">
        <div v-if="!loading">
            <div class="app__title-bar">
                <h1 class="app__text app__text--title">Draft Manager</h1>
            </div>
            <div class="landmark landmark--main">
                <div class="section section--utility">
                    <div class="draft-status">
                        <div>
                            <p>Live</p>
                        </div>
                        <div>
                            <button class="btn btn--tiny btn--border-darkBlue mr-05" :class="{ active: isDraftLive === false }" @click.prevent.stop="updateDraftStatus(false)">No</button>
                            <button class="btn btn--tiny btn--border-darkBlue" :class="{ active: isDraftLive === true }" @click.prevent.stop="updateDraftStatus(true)">Yes</button>
                        </div>
                    </div>
                </div>
                <div class="section section--captains">
                    <h2 class="text text--section-title">Captains:</h2>
                    <div class="captain-list">
                        <div class="captain" v-for="captain in draftCaptains" :key="captain.id">
                            <div class="captain__container">
                                <div class="captain__container__section captain__container__section--top">
                                    <p class="text text--team-name">Team {{ captain.teamName }}</p>
                                    <p class="text text--captain">{{ captain.fullName }}</p>
                                </div>
                                <div class="captain__container__section captain__container__section--bottom">
                                    <button class="btn btn--secondary btn--view-team">View Team</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section section--registered">
                    <h2 class="text text--section-title">Available:</h2>
                    <div class="registered-list">
                        <div class="registered" v-for="user in registeredUsers" :key="user.id">
                            <p>{{ user.fullName }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-else />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DraftManagerService from '@/services/Admin/DraftManagerService'
import { RegisteredUserVm } from '@/types/ViewModels/Models/EventVm'
import UIHelper from '@/utility/UIHelper'
import { DraftCaptainVM, DraftUserVm } from '@/types/ViewModels/Models/DraftVm'
import { UpdateDraftStatusDto } from '@/types/DTO/DraftDto'

@Component({
    name: 'DraftManager',
    components: {
        Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    },
})
export default class DraftManager extends Vue {
    loading = true
    isDraftLive: null | boolean = false
    draftId: number | null = null
    registeredUsers = [] as Array<RegisteredUserVm>
    draftedUsers = [] as Array<DraftUserVm>
    draftCaptains = [] as Array<DraftCaptainVM>

    mounted(): void {
        this.getRegisteredUsers()
    }

    async getRegisteredUsers(): Promise<void> {
        try {
            const res = await DraftManagerService.AdminDraftManagerData()
            if (res.status === 200) {
                console.log(res.data)
                const errors = []
                if (res.data.registeredUsers.length < 1) {
                    errors.push('No Registered Users for Event')
                }

                if (res.data.registeredUsers.length > 0) {
                    this.draftId = res.data.draftId
                    this.registeredUsers = res.data.registeredUsers
                    this.draftedUsers = res.data.draftUsers
                    this.draftCaptains = res.data.draftCaptains
                    this.isDraftLive = res.data.isDraftLive
                    setTimeout(() => {
                        this.loading = false
                    }, 2000)
                } else {
                    UIHelper.SnackBar({
                        title: 'Error',
                        message: ``,
                        classInfo: `error`,
                        isSnackBarShowing: true,
                        errors: errors,
                    })

                    setTimeout(() => {
                        this.$router.push('/admin/EventManager')
                    }, 3000)
                }
            }
            console.log(res)
        } catch (e) {
            console.log(e)
            UIHelper.SnackBar({
                title: 'Error',
                message: `No event set as active and current`,
                classInfo: `error`,
                isSnackBarShowing: true,
                errors: undefined,
            })

            setTimeout(() => {
                this.$router.push('/admin/EventManager')
            }, 3000)
        }
    }

    async updateDraftStatus(draftStatus: boolean): Promise<void> {
        const updateDraftStatusDto: UpdateDraftStatusDto = {
            draftId: this.draftId,
            status: draftStatus,
        }
        try {
            const { status, data } = await DraftManagerService.UpdateDraftStatus(updateDraftStatusDto)
            if (status === 200) {
                this.isDraftLive = data
                let message = 'Draft is no longer live'
                if (data) {
                    message = 'Draft is now Live'
                }

                UIHelper.SnackBar({
                    title: 'Success',
                    message: `${message}`,
                    classInfo: `primary`,
                    isSnackBarShowing: true,
                    errors: [],
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/admin/_draftManager.scss";
</style>
<template>
  <div class='DraftManager'>
    <div v-if='!loading'>
      <div class='app__title-bar'>
        <h1 class='app__text app__text--title '>Draft Manager</h1>
      </div>
      <div class='landmark landmark--main'>

        <div class='view view--registered'>
          <div class='view__section view__section--captains'>
            <h2 class='text text--section-title'>Captains</h2>

            <div class='view__section__container'>

            </div>


          </div>
        </div>


      </div>

    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import DraftManagerService from '@/services/Admin/DraftManagerService'
import { RegisteredUserVm, TeamMemberVm, TeamVm } from '@/types/ViewModels/Models/EventVm'
import UIHelper from '@/utility/UIHelper'
import { DraftCaptainVM, DraftUserVm } from '@/types/ViewModels/Models/DraftVm'

@Component({
  name: 'DraftManager',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue')
  }
})


export default class DraftManager extends Vue {
  loading = true
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
        console.log(res.data);
        const errors = []
        if(res.data.registeredUsers.length < 1) {
          errors.push("No Registered Users for Event")
        }

        if (res.data.registeredUsers.length > 0 ) {
          this.draftId = res.data.draftId
          this.registeredUsers = res.data.registeredUsers
          this.draftedUsers = res.data.draftUsers;
          setTimeout(() => {
            this.loading = false

          }, 2000)
        } else {

          UIHelper.SnackBar({
            title: 'Error',
            message: ``,
            classInfo: `error`,
            isSnackBarShowing: true,
            errors: errors
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
        errors: undefined
      })

      setTimeout(() => {
        this.$router.push('/admin/EventManager')
      }, 3000)
    }
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/admin/_draftManager.scss";
</style>

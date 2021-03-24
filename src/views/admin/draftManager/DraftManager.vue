<template>
  <div class='DraftManager'>
    <div v-if='!loading'>
      <div class='app__title-bar'>
        <h1 class='app__text app__text--title'>Draft Manager</h1>
      </div>
      <div class='landmark landmark--main'>

        <div class='view view--registered' v-if='registeredUsers.length > 0'>

        </div>


      </div>

    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import DraftManagerService from '@/services/Admin/DraftManagerService'
import { RegisteredUserVm } from '@/types/ViewModels/Models/EventVm'
import UIHelper from '@/utility/UIHelper'

@Component({
  name: 'DraftManager',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue')
  }
})


export default class DraftManager extends Vue {
  loading = true
  registeredUsers = [] as Array<RegisteredUserVm>

  mounted(): void {
    this.getRegisteredUsers()
  }

  async getRegisteredUsers(): Promise<void> {
    try {
      const res = await DraftManagerService.AdminDraftManagerData()
      if (res.status === 200) {
        if (res.data.registeredUsers.length > 0 && res.data.teams.length > 0) {

          this.registeredUsers = res.data.registeredUsers
          setTimeout(() => {
            this.loading = false

          }, 2000)
        } else {

          UIHelper.SnackBar({
            title: 'Error',
            message: `No registered users or no teams created for event`,
            classInfo: `error`,
            isSnackBarShowing: true,
            errors: undefined
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
.DraftManager {

}
</style>

<template>
  <div>
    <Loading v-if="loading" />
    <div v-else>
      <button @click="$router.back()" class="backBtn btn btn--borderGreen btn--xs btn--borderBottom">Back</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IdeaService from '@/services/IdeaService'
import { GetIdeaDto } from '@/types/DTO/Ideas/GetIdeaDto'
import { IdeaVm } from '@/types/ViewModels/IdeaVm'

@Component({
  name: 'EditIdea',
  components: { Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue') }
})
export default class EditIdea extends Vue {
  loading = true
  Idea: IdeaVm = {}

  mounted(): void {
    this.GetIdea()
  }

  async GetIdea(): Promise<void> {
    const getIdea: GetIdeaDto = {
      ideaId: parseInt(this.$route.params.id),
      userId: this.$store.state.authStore.currentUser.id
    }
    try {
      const res = await IdeaService.Idea(getIdea)
      if (res.status === 200) {
        this.Idea = res.data
        setTimeout(() => {
          this.loading = false
        }, Math.floor(Math.random() * 3000))
      }
    } catch (e) {
      this.$router.back()
      console.log(e)
    }
  }
}
</script>


<style scoped lang="scss">

</style>

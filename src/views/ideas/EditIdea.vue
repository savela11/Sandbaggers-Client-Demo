<template>
  <div>
    <Loading v-if="loading" />
    <div v-else>
      <button @click="$router.back()" class="backBtn btn btn--border-darkGreen btn--xs btn--borderBottom">Back</button>
      <div class="formContainer">
        <p class="updatedOn"><strong>Last Updated:</strong> {{ Idea.updatedOn }}</p>
        <form class="form">
          <div class="form__field">
            <label for="title">Title</label>
            <input id="title" type="text" v-model="Idea.title" />
          </div>
          <div class="form__field">
            <label for="description">Description</label>
            <textarea id="description" type="text" v-model="Idea.description"></textarea>
          </div>
        </form>
        <div class="btnContainer">
          <button @click.prevent.stop="UpdateIdea" class="btn btn--darkGreen btn--sm">Update</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import IdeaService from '@/services/IdeaService'
import { GetIdeaDto } from '@/types/DTO/Ideas/GetIdeaDto'
import { IdeaVm } from '@/types/ViewModels/IdeaVm'
import UIHelper from '@/utility/UIHelper'

@Component({
  name: 'EditIdea',
  components: { Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue') },
})
export default class EditIdea extends Vue {
  loading = true
  Idea = {} as IdeaVm

  mounted(): void {
    this.GetIdea()
  }

  async GetIdea(): Promise<void> {
    const getIdea: GetIdeaDto = {
      ideaId: parseInt(this.$route.params.id),
      userId: this.$store.state.authStore.currentUser.id,
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

  async UpdateIdea(): Promise<void> {
    this.loading = true
    try {
      const res = await IdeaService.UpdateIdea(this.Idea)
      if (res.status === 200) {
        setTimeout(() => {
          UIHelper.SnackBar({
            title: 'Success',
            message: 'Your Idea has been updated!',
            isSnackBarShowing: true,
            classInfo: 'primary',
          })
          this.$router.push('/ideas')
        }, Math.floor(Math.random() * 3000))
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.formContainer {
  margin: 3rem 0;
}

.updatedOn {
  font-size: 0.8rem;
  color: $SecondaryFS;
  text-align: right;
}

input {
  border-radius: 5px;
}

textarea {
  border-radius: 5px;
  min-height: 200px;
}

.btnContainer {
  padding: 0 2rem;
  display: flex;
  justify-content: flex-end;
}
</style>

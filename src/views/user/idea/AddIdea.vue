<template>
  <div class='add-idea'>
    <div v-if='!loading' class='add-idea__container'>
      <div class='app__title-bar'>
        <h1 class='app__text app__text--title'>Add Idea</h1>
      </div>
      <form class='form' @submit.prevent.stop='createIdea'>
        <InputField :isActive="addIdea.title !== ''">
          <template v-slot:field>
            <label for='title'>Title</label>
            <input type='text' id='title' v-model.trim='addIdea.title' />
          </template>
        </InputField>
        <InputField :isActive="addIdea.description !== ''" class-name='textArea'>
          <template v-slot:field>
            <label for='description'>Description</label>
            <textarea type='text' id='description' v-model.trim='addIdea.description'></textarea>
          </template>
        </InputField>
        <input type='submit' class='btn btn--sm text text--sm btn--darkBlue' value='Create' />
      </form>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { AddIdeaDto } from '@/types/DTO/IdeaDto'
import IdeaService from '@/services/User/IdeaService'

@Component({
  name: 'AddIdea',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue')
  }
})


export default class AddIdea extends Vue {
  loading = true

  addIdea: AddIdeaDto = {
    title: '',
    description: '',
    userId: ''
  }

  mounted(): void {
    this.loading = false
  }


  async createIdea(): Promise<void> {
    this.loading = true
    try {
      this.addIdea.userId = this.$store.state.authStore.currentUser.id
      const {status} = await IdeaService.AddIdea(this.addIdea)
      if(status === 200) {
       setTimeout(() => {
        this.$router.go(-1);
       }, 2000)
      }

    } catch (e) {
      console.log(e)
      this.loading = false;
    }
  }

}
</script>

<style scoped lang='scss'>
.add-idea {
  &__container {
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
      width: 70%;
      margin: 0 auto;
    }
    @media (min-width: 1024px) {
      width: 60%;
    }

    @media (min-width: 1280px) {
      width: 50%;
    }

    @media (min-width: 1900px) {
      width: 40%;
    }

  }
  .form {
    width: 100%;
  }
}
input[type=submit] {
  margin: 1rem 0;
}
</style>

<template>
  <div class='AddIdea'>
    <div v-if="!loading">
      <form class="form" @submit.prevent.stop="CreateIdea">
        <InputField :isActive="addIdea.title !== ''">
          <template v-slot:field>
            <label for="title">Title</label>
            <input type="text" id="title" v-model.trim="addIdea.title"/>
          </template>
        </InputField>
        <InputField :isActive="addIdea.description !== ''" class-name="textArea">
          <template v-slot:field>
            <label for="description">Description</label>
            <textarea type="text" id="description" v-model.trim="addIdea.description"></textarea>
          </template>
        </InputField>
        <input type="submit" class="btn btn--sm text text--sm btn--border-darkGreen" value="Create"/>
      </form>
    </div>
    <Loading v-else/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {AddIdeaDto} from "@/types/DTO/IdeaDto";
import IdeaService from "@/services/User/IdeaService";

@Component({
  name: "AddIdea",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue'),
  }
})


export default class AddIdea extends Vue {
  loading = true;

  addIdea: AddIdeaDto = {
    title: '',
    description: '',
    userId: ''
  }

  mounted() {
    this.loading = false;
  }


  async createIdea(): Promise<void> {
    this.loading = true;
    try {
      this.addIdea.userId = this.$store.state.authStore.currentUser.id;
      const res = await IdeaService.AddIdea(this.addIdea);

    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    }
  }

}
</script>

<style scoped lang="scss">
input[type=submit] {
  margin: 1rem 0;
}
</style>

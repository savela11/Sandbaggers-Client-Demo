<template>
  <div>
    <Loading v-if="loading" />
    <div v-else>
      <button @click="$router.go(-1)" class="btn btn--border-darkGreen btn--xs btn--borderBottom text text--sm">Back</button>
      <div class="formContainer">
        <p class="updatedOn"><strong>Last Updated:</strong> {{ formatDate(Idea.updatedOn) }}</p>
        <form class="form" @submit.prevent.stop="UpdateIdea">
          <InputField :isActive="Idea.title !== ''">
            <template v-slot:field>
              <label for="title">Title</label>
              <input type="text" id="title" v-model.trim="Idea.title" />
            </template>
          </InputField>
          <InputField :isActive="Idea.description !== ''">
            <template v-slot:field>
              <label for="description">Description</label>
              <textarea type="text" id="description" v-model.trim="Idea.description"></textarea>
            </template>
          </InputField>
          <input type="submit" class="btn btn--sm text text--sm btn--border-darkGreen" value="Update" />
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IdeaService from "@/services/IdeaService";
import { GetIdeaDto } from "@/types/DTO/Ideas/GetIdeaDto";
import { IdeaVm } from "@/types/ViewModels/Models/IdeaVm";
import UIHelper from "@/utility/UIHelper";
import Helper from "@/utility/Helper";

@Component({
  name: "EditIdea",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/InputField.vue")
  }
})
export default class EditIdea extends Vue {
  loading = true;
  Idea = {} as IdeaVm;

  mounted(): void {
    this.GetIdea();
  }

  formatDate(date: string): string {
    return Helper.formatDate(date);
  }

  async GetIdea(): Promise<void> {
    const getIdea: GetIdeaDto = {
      ideaId: parseInt(this.$route.params.id),
      userId: this.$store.state.authStore.currentUser.id
    };
    try {
      const res = await IdeaService.Idea(getIdea);
      if (res.status === 200) {
        this.Idea = res.data;
        setTimeout(() => {
          this.loading = false;
        }, Math.floor(Math.random() * 3000));
      }
    } catch (e) {
      this.$router.go(-1);
      console.log(e);
    }
  }

  async UpdateIdea(): Promise<void> {
    this.loading = true;
    try {
      const res = await IdeaService.UpdateIdea(this.Idea);
      if (res.status === 200) {
        setTimeout(() => {
          UIHelper.SnackBar({
            title: "Success",
            message: "Your Idea has been updated!",
            isSnackBarShowing: true,
            classInfo: "primary"
          });
          this.$router.push("/ideas");
        }, Math.floor(Math.random() * 3000));
      }
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/idea/_editIdea";
</style>

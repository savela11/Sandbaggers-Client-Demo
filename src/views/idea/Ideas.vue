<template>
  <div class="ideas">
    <Modal v-if="isAddingIdea" @click="toggleAddIdea(false)" :isFooter="false">
      <template v-slot:header>
        <h2 v-if="!loading" class="text text--bold text--lg color--primary">Add Idea</h2>
      </template>

      <template v-slot:body>
        <form v-if="!loading" class="form--addIdea">
          <InputField className="sm secondary" :isActive="addIdea.title !== ''">
            <template v-slot:field>
              <label for="title">Title</label>
              <input type="text" id="title" v-model.trim="addIdea.title" />
            </template>
          </InputField>

          <InputField :isActive="addIdea.description !== ''">
            <template v-slot:field>
              <label for="description">Description</label>
              <textarea type="text" id="description" v-model.trim="addIdea.description"></textarea>
            </template>
          </InputField>
          <div class="btnContainer">
            <button class="btn btn--sm text text--sm btn--bg-darkBlue" id="addIdeaBTN" @click.prevent.stop="createIdea">Add</button>
          </div>
        </form>
        <Loading v-if="loading" />
      </template>
    </Modal>
    <div class="addIdea">
      <button @click="toggleAddIdea(true)">
        <img :src="require('@/assets/icons/addCircle.svg')" alt="add circle" />
      </button>
    </div>
    <div class="ideas__list">
      <div class="idea" v-for="idea in paginatedIdeas" :key="idea.id" :class="{ autoHeight: showDescriptionById === idea.id }">
        <div class="section title">
          <h2 class="ideaTitle">{{ longString(idea.title, 30) }}</h2>
          <p class="ideaCreatedOn">{{ formatDate(idea.updatedOn) }}</p>
        </div>
        <div class="section createdBy">
          <p class="createdByFullName">By: {{ idea.createdBy.fullName }}</p>
          <button class="btn btn--xs btn--border-darkBlue btn--borderBottom text text--sm" @click="toggleShowDescription(idea.id)">view</button>
        </div>

        <div class="section description" v-show="showDescriptionById === idea.id" :class="[showDescriptionById === idea.id ? 'show' : 'hide']">
          <hr class="divider" />
          <div class="description__edit" v-if="$store.state.authStore.currentUser.id === idea.createdBy.id">
            <router-link class="btn btn--xs text text--sm" :to="`/ideas/editIdea/${idea.id}`">Edit</router-link>
          </div>
          <div class="description__text">
            <p v-if="showDescriptionById === idea.id">{{ idea.description }}</p>
          </div>
        </div>
      </div>
      <div class="prevNextButtons" v-if="paginatedIdeas.length > 0">
        <button v-on:click="changePage('previous')" :disabled="pageNumber === 0">Previous</button>
        <button v-on:click="changePage('next')" :disabled="pageNumber >= ideaCount - 1">Next</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IAddIdea } from "@/types/Idea";
import IdeaService from "@/services/IdeaService";
import Helper from "@/utility/Helper";
import FormatMixins from "@/mixins/FormatMixins.vue";
import UIHelper from "@/utility/UIHelper";
import { IdeaVm } from "@/types/ViewModels/Models/IdeaVm";

@Component({
  name: "Ideas",
  components: {
    Modal: (): Promise<typeof import("*.vue")> => import("@/components/ui/Modals/Modal.vue"),
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/InputField.vue")
  },
  mixins: [FormatMixins]
})
export default class Ideas extends Vue {
  addIdea = {
    title: "",
    description: ""
  } as IAddIdea;
  isAddingIdea = false;
  Ideas = [] as IdeaVm[];
  showDescriptionById: number | null = null;
  loading = false;

  editIdeaID: null | number = null;

  mounted(): void {
    this.getIdeas();
  }

  editIdea(ideaId: number): void {
    this.editIdeaID = ideaId;
  }

  // Idea pagination
  size = 10;
  pageNumber = 0;

  get paginatedIdeas(): IdeaVm[] {
    const start = this.pageNumber * this.size,
      end = start + this.size;
    return this.Ideas.slice(start, end);
  }

  get ideaCount(): number {
    const l = this.Ideas.length,
      s = this.size;
    return Math.ceil(l / s);
  }

  changePage(status: string): void {
    if (status === "next") {
      this.pageNumber++;
    } else {
      this.pageNumber--;
    }
    UIHelper.verticalSmoothScroll(300, "top");
  }

  filterIdeas(ideas: Array<IdeaVm>): IdeaVm[] {
    return ideas.sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn));
  }

  longString(str: string, num: number): string {
    return Helper.formatLongString(str, num);
  }

  toggleAddIdea(status: boolean): void {
    this.isAddingIdea = status;
  }

  async createIdea(): Promise<void> {
    this.loading = true;
    try {
      this.addIdea.userId = this.$store.state.authStore.currentUser.id;
      const res = await IdeaService.AddIdea(this.addIdea);
      if (res.status === 200) {
        this.Ideas.push(res.data);
        setTimeout(() => {
          this.toggleAddIdea(false);
        }, Math.floor(Math.random() * 3000));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    }
  }

  toggleShowDescription(id: number): void {
    if (this.showDescriptionById === id) {
      this.showDescriptionById = null;
      return;
    }

    this.showDescriptionById = id;
  }

  async getIdeas(): Promise<void> {
    try {
      const res = await IdeaService.AllIdeas();
      this.Ideas = this.filterIdeas(res.data);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/idea/_ideas";
</style>

<template>
  <div class="ideas">
    <div class='app__title-bar'>
      <h1 class='app__text app__text--title'>Ideas</h1>
    </div>
    <div class='flex flex--xs flex--end'>
      <IconBtn btn-text="Add" :link-btn="true" link="/ideas/AddIdea">
        <template v-slot:svg>
          <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3.125 17.9688V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9688ZM21.5729 7.33334C21.9792 6.92709 21.9792 6.27084 21.5729 5.86459L19.1354 3.42709C18.7292 3.02084 18.0729 3.02084 17.6667 3.42709L15.7604 5.33334L19.6667 9.23959L21.5729 7.33334V7.33334Z"
                fill="#17252A"
            />
          </svg>
        </template>
      </IconBtn>
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
          <hr class="divider"/>
          <div class="description__edit" v-if="$store.state.authStore.currentUser.id === idea.createdBy.id">
            <router-link class="btn btn--xs text text--sm" :to="`/ideas/editIdea/${idea.id}`">Edit</router-link>
          </div>
          <div class="description__text">
            <p v-if="showDescriptionById === idea.id">{{ idea.description }}</p>
          </div>
        </div>
      </div>
      <PaginationBtns v-if='filterIdeas.length > 0' :items-count='ideaCount' :size='size' :page-number='pageNumber' @change-page='changePage' />
<!--      <div class="prevNextButtons" v-if="paginatedIdeas.length > 0">-->
<!--        <button v-on:click="changePage('previous')" :disabled="pageNumber === 0">Previous</button>-->
<!--        <button v-on:click="changePage('next')" :disabled="pageNumber >= ideaCount - 1">Next</button>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import IdeaService from "@/services/User/IdeaService";
import Helper from "@/utility/Helper";
import FormatMixins from "@/mixins/FormatMixins.vue";
import UIHelper from "@/utility/UIHelper";
import {IdeaVm} from "@/types/ViewModels/Models/IdeaVm";

@Component({
  name: "Ideas",
  components: {
    Modal: (): Promise<typeof import("*.vue")> => import("@/components/ui/Modals/Modal.vue"),
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/InputField.vue"),
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue'),
    PaginationBtns: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/PaginationBtns.vue')
  },
  mixins: [FormatMixins]
})
export default class Ideas extends Vue {

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
      if (res.status === 200) {
        this.Ideas = this.filterIdeas(res.data);

      }
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/idea/_ideas";
</style>

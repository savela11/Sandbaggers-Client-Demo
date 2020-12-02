<template>
  <div class="ideas">
    <Modal v-if="isAddingIdea" @click="toggleAddIdea(false)" :isFooter="false">
      <template v-slot:header>
        <h2 v-if="!loading">Add Idea</h2>
      </template>

      <template v-slot:body>
        <form v-if="!loading" class="form form--addIdea">
          <div class="form__field">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="addIdea.title" />
          </div>
          <div class="form__field">
            <label for="description">Description</label>
            <textarea type="text" rows="10" id="description" v-model="addIdea.description" />
          </div>
          <div class="btnContainer">
            <button class="btn btn--sm btn--blue" id="addIdeaBTN" @click.prevent.stop="createIdea">Add</button>
          </div>
        </form>
        <Loading v-if="loading" />
      </template>
    </Modal>
    <div class="addIdea">
      <button @click="toggleAddIdea(true)">
        <img :src="require('@/assets/icons/addCircle.svg')" alt="add circle">
      </button>
    </div>
    <div class="ideas__list">
      <div class="idea" v-for="idea in Ideas" :key="idea.id" :class="{ autoHeight: showDescriptionById === idea.id }">
        <div class="section title">
          <h2 class="ideaTitle">{{ longString(idea.title, 30) }}</h2>
          <p class="ideaCreatedOn">{{ formatDate(idea.updatedOn) }}</p>
        </div>
        <div class="section createdBy">
          <p class="createdByFullName">By: {{ idea.createdBy.fullName }}</p>
          <button class="btn btn--xs btn--borderBlue btn--borderBottom" @click="toggleShowDescription(idea.id)">view</button>
        </div>


        <div class="section description" v-show="showDescriptionById === idea.id" :class="[showDescriptionById === idea.id ? 'show' : 'hide']">
          <hr class="divider" />
          <div class="description__edit" v-if="$store.state.authStore.currentUser.id === idea.createdBy.id">
            <router-link :to="`/ideas/editIdea/${idea.id}`">Edit</router-link>
          </div>
          <div class="description__text">
            <p v-if="showDescriptionById === idea.id">{{ idea.description }}</p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IAddIdea, ICreatedBy, IIdea } from '@/types/Idea'
import IdeaService from '@/services/IdeaService'
import Helper from '@/utility/Helper'
import FormatMixins from '@/mixins/FormatMixins.vue'
import { IHeader } from '@/types/UI/UIStoreTypes'
import UIHelper from '@/utility/UIHelper'

@Component({
  name: 'Ideas',
  components: {
    Modal: (): Promise<typeof import('*.vue')> => import('../components/ui/Modals/Modal.vue'),
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue')
  },
  mixins: [FormatMixins]
})
export default class Ideas extends Vue {
  private addIdea = {
    title: '',
    description: ''
  } as IAddIdea
  private isAddingIdea = false
  private Ideas = [] as IIdea[]
  showDescriptionById: number | null = null
  loading = false

  editIdeaID: null | number = null

  mounted(): void {
    this.getIdeas()

  }

  editIdea(ideaId: number):void {
    this.editIdeaID = ideaId;
  }

  filterIdeas(ideas: Array<IIdea>): IIdea[] {
    return ideas.sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn))
  }

  longString(str: string, num: number): string {
    return Helper.formatLongString(str, num)
  }

  toggleAddIdea(status: boolean): void {
    this.isAddingIdea = status
    UIHelper.ToggleNavBar(status)
  }

  async createIdea(): Promise<void> {
    this.loading = true
    try {
      this.addIdea.userId = this.$store.state.authStore.currentUser.id
      const res = await IdeaService.AddIdea(this.addIdea)
      if (res.status === 200) {
        this.Ideas.push(res.data)
        setTimeout(() => {
          this.toggleAddIdea(false)

        }, Math.floor(Math.random() * 3000))
      }
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        this.loading = false
      }, 3000)
    }
  }

  toggleShowDescription(id: number): void {
    if (this.showDescriptionById === id) {
      this.showDescriptionById = null
      return
    }

    this.showDescriptionById = id
  }

  async getIdeas(): Promise<void> {
    try {
      const res = await IdeaService.AllIdeas()
      const ideas = this.filterIdeas(res.data)

      this.Ideas = ideas
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
$--inputFS: (
    null: .8rem,
    $mobile: .9rem
);

$--ideaTitleFS: (
    null: 1rem,
    $mobile: 1.2rem
);
$--ideaCreatedOnFS: (
    null: .7rem,
    $mobile: rem
);
$--ideaCreatedByFS: (
    null: .8rem,
    $mobile: .9rem
);
$--ideaDescriptionFS: (
    null: .8rem,
    $mobile: 1rem
);
$--ideaDescriptionLH: (
    null: 1.6,
);


$--ideaEditBtnFS: (
    null: .9rem,
);
.ideas {
  .addIdea {
    button {
      height: 35px;
      width: 35px;
      border: none;
      padding: .2rem;

      @include mobile {
        height: 40px;
        width: 40px;
      }
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .form--addIdea {
    padding: 0;

    input,
    textarea {
      border-radius: 5px;
      @include font-size($--inputFS);
    }

    textarea {
      min-height: 150px;
    }
  }

  &__list {
    margin-top: 1rem;

  }

  .idea {
    padding: 1.2rem;
    border-radius: 5px;
    margin-bottom: 1rem;
    box-shadow: 3px 3px 5px lightgrey;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    &.autoHeight {
      height: auto;
    }


  }

  .section {
    margin-bottom: .2rem;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .ideaTitle {
    @include font-size($--ideaTitleFS);
    color: $PrimaryFS;
  }

  .ideaCreatedOn {
    @include font-size($--ideaCreatedOnFS);
    color: $SecondaryFS;
  }

  .createdBy {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .createdByFullName {
      color: $SecondaryFS;
      @include font-size($--ideaCreatedByFS);
    }

  }

  .description {
    overflow: hidden;
    opacity: 0;
    padding: .5rem;
    margin: 1rem 0 0 0;
    border-radius: 5px;

    p {
      @include font-size($--ideaDescriptionFS);
      @include line-height($--ideaDescriptionLH);
      white-space: pre-line;
      color: grey;
    }

    &.show {
      animation: slideDown 1s linear forwards;
    }

    &.hide {
      animation: slideUp 1s linear forwards;
      padding: 0;
    }

    &__edit {
      margin: .5rem 0;
      display: flex;
      justify-content: flex-end;

      button {
        border: none;
        color: $DarkGreen;
        font-weight: bold;
        padding: .3rem;
        @include font-size($--ideaEditBtnFS);
      }
    }

    &__text {
      max-height: 150px;
      overflow-y: auto;
      padding: .5rem;
    }
  }


}


@keyframes slideDown {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideUp {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

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
      <button @click="toggleAddIdea(true)" class="btn btn--borderBlue btn--xs">Add</button>
    </div>
    <hr />
    <div class="ideas__list">
      <div class="idea" v-for="idea in Ideas" :key="idea.id" :class="{ autoHeight: showDescriptionById === idea.id }">
        <div class="idea__section">
          <h2>{{ formatLongString(idea.title, 30) }}</h2>
          <p class="text--grey text--sm nowrap">{{ formatDate(idea.updatedOn) }}</p>
        </div>
        <div class="idea__createdBy idea__section">
          <p class="text--grey text--sm">By: {{ idea.createdBy.fullName }}</p>
        </div>
        <div class="idea__view">
          <button class="btn btn--xs btn--borderBlue btn--borderBottom" @click="toggleShowDescription(idea.id)">view</button>
        </div>

        <div class="idea__description" v-show="showDescriptionById === idea.id" :class="[showDescriptionById === idea.id ? 'show' : 'hide']">
          <p v-if="showDescriptionById === idea.id">{{ idea.description }}</p>
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

@Component({
  name: 'Ideas',
  components: { Modal: () => import('../components/ui/Modals/Modal.vue'), Loading: (): Promise<object> => import('@/components/ui/Loading.vue') },
  mixins: [FormatMixins],
})
export default class Ideas extends Vue {
  private addIdea = {
    title: '',
    description: '',
  } as IAddIdea
  private isAddingIdea = false
  private Ideas = [] as IIdea[]
  showDescriptionById: number | null = null
  loading = false

  mounted(): void {
    this.getIdeas()

    this.$store.dispatch('uiStore/_setHeaderTitle', 'Ideas')
  }

  toggleAddIdea(status: boolean) {
    this.isAddingIdea = status

    if (status) {
      this.$store.dispatch('uiStore/_setNavBarShowingStatus', false)
    } else {
      this.$store.dispatch('uiStore/_setNavBarShowingStatus', true)
    }
  }

  async createIdea(): Promise<void> {
    this.loading = true
    const createdBy: ICreatedBy = {
      fullName: this.$store.state.authStore.currentUser.fullName,
      id: this.$store.state.authStore.currentUser.id,
      username: this.$store.state.authStore.currentUser.username,
    }
    try {
      this.addIdea.createdBy = createdBy
      const res = await IdeaService.AddIdea(this.addIdea)
      if (res.status === 200) {
        this.Ideas.push(res.data)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        this.loading = false
      }, 3000)
    }
  }

  toggleShowDescription(id: number) {
    if (this.showDescriptionById === id) {
      return (this.showDescriptionById = null)
    }

    this.showDescriptionById = id
  }
  async getIdeas(): Promise<void> {
    try {
      const res = await IdeaService.AllIdeas()
      this.Ideas = res.data
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.ideas {
  .addIdea {
    display: flex;
    justify-content: flex-end;
  }
  .form--addIdea {
    padding: 0;
    input,
    textarea {
      border-radius: 5px;
    }
  }

  &__list {
    .idea {
      padding: 0.5rem 0.8rem;
      border-radius: 5px;
      margin-bottom: 1rem;
      box-shadow: 3px 3px 5px lightgrey;
      height: 75px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      &.autoHeight {
        height: auto;
      }

      h2 {
        font-size: 1rem;
      }

      &__section {
        &:nth-child(1) {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
      }

      &__createdBy {
      }
      &__description {
        overflow: hidden;
        opacity: 0;
        p {
          font-size: 0.8rem;
          white-space: pre;
          color: grey;
        }
        &.show {
          animation: slideDown 1s linear forwards;
          padding: 0.5rem 0;
        }

        &.hide {
          animation: slideUp 1s linear forwards;
          padding: 0;
        }
      }

      &__view {
        display: flex;
        justify-content: flex-end;
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
}
</style>

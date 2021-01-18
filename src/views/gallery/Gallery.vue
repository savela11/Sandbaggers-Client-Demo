<template>
  <div class="gallery">
    <div v-if="!loading">
      <div class="list" v-if="galleries.length > 0">
        <div class="event" v-for="gallery in galleries" :key="gallery.eventId">
          <div class="container">
            <div class="top">
              <h2 class="text text--title text--bold color--primary">{{ gallery.name }}</h2>

            </div>
            <div class="bottom">
              <div class="imgContainer" :class="{noImage: gallery.mainImg === ''}">
                <img class="z1" :src="setDefaultGalleryImage(gallery.mainImg)" alt="Main Gallery Image">
                <div class="numOfImages z2">
                  <p class="text text--bold text--md text--center color--white">Images: {{ gallery.numOfImages }}</p>
                </div>
              </div>
              <div class="info">
                <router-link :to="`/gallery/${gallery.eventId}`" class="text text--decoration-none text--center text--bold text--md color--white bg--secondary">View Images
                </router-link>
              </div>

            </div>
          </div>

        </div>
      </div>
      <div v-else><p>No Gallery Created</p></div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GalleryService from "@/services/GalleryService";
import { GalleryWithNoImageVm } from "@/types/ViewModels/EventGallery";
import UIHelper from "@/utility/UIHelper";

@Component({
  name: "Gallery", components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue")
  }
})
export default class Gallery extends Vue {
  loading = true;
  galleries: Array<GalleryWithNoImageVm> = [];

  mounted(): void {
    this.getGalleries();
  }

  async getGalleries(): Promise<void> {
    try {
      const res = await GalleryService.Galleries();
      if (res.status === 200) {
        this.galleries = res.data;
        setTimeout(() => {
          this.loading = false;
        }, Math.floor(Math.random() * 3000));
      }
    } catch (e) {
      console.log(e);
      this.loading = false;
    }
  }

  setDefaultGalleryImage(img: string): string {
    if (img == null || img === "") {
      return "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";
    } else {
      return img;
    }
  }
}


</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/gallery/_gallery";
</style>

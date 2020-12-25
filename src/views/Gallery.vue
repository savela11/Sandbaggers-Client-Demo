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
                <router-link :to="`/gallery/${gallery.eventId}`" class="text text--decoration-none text--center text--bold text--md color--white bg--secondary">View Images</router-link>
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
.gallery {
  padding: 2rem 0.5rem;

  .list {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    scroll-behavior: smooth;


  }

  .event {
    display: inline-block;
    height: 100%;
    width: 100%;

    &:not(:last-child) {
      margin-right: 1rem;
    }


    .container {
      display: flex;
      flex-direction: column;
      height: 100%;

      @include tablet {
        margin: 0 auto;
        width: 80%;
      }

      .top {
        flex: 0 0 20%;
        display: flex;
        justify-content: center;



      }

      .bottom {
        border-radius: 5px;
        flex: 0 0 80%;
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 0.3rem .3rem 1rem .3rem;

        .imgContainer {
          flex: auto;
          height: 250px;
          width: 100%;
          position: relative;
          margin: 0 0 1rem 0;
          border-radius: 5px;
          @include mobile {
            height: 300px;
            margin: 0 0 1.5rem 0;
          }

          @include tablet {
          height: 450px;
          }

          &.noImage {
            background-color: rgba(23, 37, 42, .8);

            img {
              opacity: .4;
            }
          }

          &::after {
            content: '';
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            position: absolute;
            background-color: rgba(23, 37, 42, .3);
            border-radius: 5px;
            z-index: 1;

          }

          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 5px;
          }

          .numOfImages {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;

            p {
            }
          }
        }

        .info {
          flex: 0 0 25%;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;

          a {
            display: block;
            border: none;
            border-radius: 50px;
            padding: 1rem 2rem;
            width: 100%;
            @include mobile {
              padding: 1.2rem 2rem;
            }
          }

        }

      }
    }


  }
}
</style>

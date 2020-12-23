<template>
  <div class="galleryImages" :class="{selected: selectedImage !== null}">
    <div v-if="!selectedImage && !loading">
      <div class="top">
        <button @click="$router.back()">Back</button>
        <h1 class="text text--bold text--title color--primary">{{ gallery.name }}</h1>
      </div>
      <div class="bottom">
        <div class="gallery">
          <div class="gallery__image" v-for="img in gallery.images" :key="img.imageId" @click.prevent.stop="selectImage(img)">
            <div class="content">
              <img :src="img.image" alt="image">
              <p class="createdByUser text text--xs color--white text--bold z1">{{ img.createdBy.fullName }}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
    <div v-else-if="selectedImage && !loading" class="selectedImage">
      <button class="backToGalleryBtn text color--primary z1 bg--white btn btn--xs text--noWrap">Back To Images</button>
      <div class="selectedImage__img">
        <p class="createdByUser text text--sm color--white text--bold z1">{{ selectedImage.createdBy.fullName }}</p>
        <img :src="selectedImage.image" alt="Selected Image">
      </div>
      <div class="selectedImage__comments">

      </div>
    </div>
    <Loading v-else />

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GalleryService from "@/services/GalleryService";
import { EventGalleryVm, GalleryImgVm } from "@/types/ViewModels/EventGallery";
import UIHelper from "@/utility/UIHelper";

@Component({
  name: "GalleryImages",
  components: { Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue") }
})


export default class GalleryImages extends Vue {
  loading = true;
  gallery = {} as EventGalleryVm;
  selectedImage = null as GalleryImgVm | null;

  mounted(): void {
    this.getGallery();
    UIHelper.ToggleNavBar(false);
  }

  selectImage(img: GalleryImgVm): void {
    this.selectedImage = img;
  }

  async getGallery(): Promise<void> {
    try {
      const res = await GalleryService.Gallery(this.$route.params.eventId);
      if (res.status === 200) {
        this.gallery = res.data;
        setTimeout(() => {
          this.loading = false;
        }, Math.floor(Math.random() * 4000));
      }
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
.galleryImages {
  padding: 2rem .3rem;

  @include tablet-landscape {
    padding: 2rem 1rem;
  }

  &.selected {
    padding: 0;
  }
}

.top {
  padding: 0 .8rem;
  @include desktopSmall {
    padding: 0 2rem;
  }

  button {
    float: right;
  }
}

.bottom {
  padding: 1rem 0;
  @include desktopSmall {
    padding: 1rem;
  }
}

.gallery {
  display: grid;
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  //grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(25%, 48%));
  grid-auto-rows: 10px;
  justify-content: center;
  @include tablet {
    grid-template-columns: repeat(auto-fill, minmax(24%, 1fr));
  }

  @include desktopSmall {
    grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));

  }

  &__image {
    grid-row-end: span 16;
    transition: grid-row-start 300ms linear;
    transition: transform 300ms ease;
    transition: all 0.5s ease;
    cursor: pointer;
    width: 100%;
    position: relative;
    @include tablet {
      grid-row-end: span 16;
    }

    @include desktopSmall {
      grid-row-end: span 22;
    }

    @include desktop {
      padding: .1rem;
    }

    @media(max-width: 767px) {
      &:nth-of-type(2n + 1) {
        grid-row-end: span 10;
      }
    }

    &:nth-of-type(2n + 2) {
      @include tablet {
        grid-row-end: span 12;
      }
      @include desktopSmall {
        grid-row-end: span 16;
      }
    }


    &:hover img {
      box-shadow: 0 0 32px #333;
      transform: scale(1.025);
    }

    &:hover .createdByUser {
      transform: scale(1.1);
    }

    .content {
      height: 100%;
      width: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      box-shadow: 0 0 16px rgba(51, 51, 51, .4);
      transition: all 1.5s ease;
      object-fit: cover;
      object-position: center center;
      filter: brightness(calc(.6 * (1 + 1)));
    }


  }
}

.selectedImage {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @include tablet {
    padding: 2rem;
  }

  .backToGalleryBtn {
    position: absolute;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
  }

  &__img {
    position: relative;
    @include tablet {
      max-width: 80%;
      flex: 0 0 25%;
    }

    img {
      height: 100%;
      width: 100%;
      object-position: center center;
      object-fit: contain;

      @include tablet {
      }

      @include tablet-landscape {
      }
    }
  }

  &__comments {

  }
}


.createdByUser {
  margin: 0;
  position: absolute;
  bottom: .6rem;
  left: 0.6rem;
  transition: all 1.5s ease;

  @include tablet {
    bottom: .8rem;
    left: .8rem;
  }
}

//@media (max-width: 600px) {
//  .gallery {
//    grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
//  }
//}
//
//@media (max-width: 400px) {
//  .gallery {
//    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
//  }
//}

@-moz-keyframes zoomin {
  0% {
    max-width: 50%;
    transform: rotate(-30deg);
    filter: blur(4px);
  }
  30% {
    filter: blur(4px);
    transform: rotate(-80deg);
  }
  70% {
    max-width: 50%;
    transform: rotate(45deg);
  }
  100% {
    max-width: 100%;
    transform: rotate(0deg);
  }
}

@-webkit-keyframes zoomin {
  0% {
    max-width: 50%;
    transform: rotate(-30deg);
    filter: blur(4px);
  }
  30% {
    filter: blur(4px);
    transform: rotate(-80deg);
  }
  70% {
    max-width: 50%;
    transform: rotate(45deg);
  }
  100% {
    max-width: 100%;
    transform: rotate(0deg);
  }
}

@-o-keyframes zoomin {
  0% {
    max-width: 50%;
    transform: rotate(-30deg);
    filter: blur(4px);
  }
  30% {
    filter: blur(4px);
    transform: rotate(-80deg);
  }
  70% {
    max-width: 50%;
    transform: rotate(45deg);
  }
  100% {
    max-width: 100%;
    transform: rotate(0deg);
  }
}

@keyframes zoomin {
  0% {
    max-width: 50%;
    transform: rotate(-30deg);
    filter: blur(4px);
  }
  30% {
    filter: blur(4px);
    transform: rotate(-80deg);
  }
  70% {
    max-width: 50%;
    transform: rotate(45deg);
  }
  100% {
    max-width: 100%;
    transform: rotate(0deg);
  }
}


</style>

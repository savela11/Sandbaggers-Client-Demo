<template>
  <div class="galleryImages" :class="{ selected: selectedImage !== null }">
    <PopUp class="popUp" v-if="isPopUpShowing" :showPopUp="showPopUp" @click.prevent.stop="togglePopUp(false)">
      <template v-slot:title>
        <h4 class="text my-1 my-md-2 text--bold text--md text--center color--primary text-vpLG--lg">Add Image</h4>
      </template>
      <template v-slot:content>
        <div class="popUpBtns">
          <button
            class="btn btn--active btn--xs text text--xs color--primary text--fw-500"
            :class="{ active: currentPopUpView === option }"
            v-for="option in popUpOptions"
            :key="option"
            @click="currentPopUpView = option"
          >
            {{ option }}
          </button>
        </div>

        <div class="popUpViews">
          <div class="view" v-show="currentPopUpView === 'Link'">
            <InputField className="sm" :isActive="imageLink !== ''">
              <template v-slot:field>
                <label for="imageLink">Link</label>
                <input type="text" id="imageLink" v-model.trim="imageLink" />
              </template>
            </InputField>
            <button class="btn btn--sm btn--bg-darkBlue text text--sm" @click.prevent.stop="addImageToGallery">Submit</button>
          </div>
          <div class="view" v-show="currentPopUpView === 'Upload'">
            <input type="file" @change.prevent="uploadImage($event.target.files)" id="fileInput" />
            <div class="uploadedImage" v-if="uploadedImageLink">
              <img :src="uploadedImageLink" alt="UploadedImage" />
            </div>
            <button class="btn btn--sm btn--bg-darkBlue text text--sm" @click.prevent.stop="addImageToGallery">Submit</button>
          </div>
        </div>
      </template>
    </PopUp>

    <div v-if="!selectedImage && !loading">
      <div class="backBtn">
        <button class="btn btn--border-darkGreen btn--xs btn--borderBottom text text--xs" @click="$router.go(-1)">Back</button>
        <IconBtn className="float float--right" btnText="Add Image" @click.prevent.stop="togglePopUp(!showPopUp)">
          <template v-slot:svg>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="#17252A" />
            </svg>
          </template>
        </IconBtn>
      </div>
      <div class="top">
        <h1 class="text text--bold text--title color--primary">{{ gallery.name }}</h1>
      </div>
      <div class="bottom">
        <div class="gallery">
          <div class="gallery__image" v-for="img in gallery.images" :key="img.imageId" @click.prevent.stop="selectImage(img)">
            <div class="content">
              <img :src="img.image" alt="image" />
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
        <img :src="selectedImage.image" alt="Selected Image" />
      </div>
      <div class="selectedImage__comments"></div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GalleryService from '@/services/GalleryService'
import { EventGalleryVm, GalleryImgVm } from '@/types/ViewModels/Models/EventGallery'
import UIHelper from '@/utility/UIHelper'
import { AddImageToGalleryDto } from '@/types/DTO/GalleryDtos'

@Component({
  name: 'GalleryImages',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue'),
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue'),
    PopUp: (): Promise<typeof import('*.vue')> => import('@/components/ui/PopUp.vue'),
  },
})
export default class GalleryImages extends Vue {
  loading = true
  gallery = {} as EventGalleryVm
  selectedImage = null as GalleryImgVm | null
  isPopUpShowing = false
  showPopUp = false
  popUpOptions = ['Link', 'Upload']
  currentPopUpView = 'Link'
  imageLink = ''
  uploadedImageLink: string | null = null

  mounted(): void {
    this.getGallery()
  }

  selectImage(img: GalleryImgVm): void {
    this.selectedImage = img
  }

  togglePopUp(status: boolean): void {
    if (status) {
      this.isPopUpShowing = true
      document.body.style.position = 'fixed'
    } else {
      document.body.style.position = 'static'

      setTimeout(() => {
        this.isPopUpShowing = false
      }, 1000)
    }

    this.$nextTick(() => {
      this.showPopUp = status
    })
  }

  async uploadImage(files: FileList): Promise<void> {
    try {
      const image = files[0]
      const formData = new FormData()

      formData.append(this.gallery.name, image, image.name)
      const res = await GalleryService.UploadImage(formData)
      if (res.status === 200) {
        this.uploadedImageLink = res.data
      }
    } catch (e) {
      console.log(e)
    }
  }

  async addImageToGallery(): Promise<void> {
    const addImageDto: AddImageToGalleryDto = {
      eventId: this.gallery.eventId,
      createdByUserId: this.$store.state.authStore.currentUser.id,
      image: this.imageLink,
    }
    if (this.uploadedImageLink) {
      addImageDto.image = this.uploadedImageLink
    }

    try {
      const res = await GalleryService.AddImageToGallery(addImageDto)
      if (res.status === 200) {
        UIHelper.SnackBar({
          title: 'Success',
          message: `Image added to ${this.gallery.name}`,
          isSnackBarShowing: true,
          classInfo: 'primary',
        })
        this.togglePopUp(false)
        setTimeout(() => {
          this.$router.go(0)
        }, Math.floor(Math.random() * 4000))
      }
    } catch (e) {
      console.log(e)
    }
  }

  async getGallery(): Promise<void> {
    try {
      const res = await GalleryService.Gallery(this.$route.params.eventId)
      if (res.status === 200) {
        this.gallery = res.data
        setTimeout(() => {
          this.loading = false
        }, Math.floor(Math.random() * 4000))
      }
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/gallery/_galleryImages";
</style>

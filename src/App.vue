<template>
  <div class='app'>
    <SnackBar v-if='this.$store.state.uiStore.snackBar.isSnackBarShowing' />
    <PageLoading v-if='this.$store.state.uiStore.pageLoading' />
    <!-- Modal -->
    <div class='modal fade' id='modal' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
      <div class='modal-dialog' :class='modal.classes'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h5 class='modal-title' id='staticBackdropLabel'>{{ modal.title }}</h5>
            <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
          </div>
          <div class='modal-body' style='min-height: 200px' v-html='modal.body'>

          </div>
          <div class='modal-footer' v-if='modal.footer' v-html='modal.footer'>


          </div>
        </div>
      </div>
    </div>
    <component :is="this.$route.meta.layout || 'div'">
      <BackBtn v-if='isBackBtnShowing' />
      <router-view class='routerView' :class='{withBackBtn: isBackBtnShowing === true}' />
    </component>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

import SnackBar from '@/components/ui/SnackBar.vue'
import PageLoading from '@/components/ui/PageLoading.vue'
import BackBtn from '@/components/ui/Buttons/BackBtn.vue'
import { IModal } from '@/types/vuexStore/UIStore'


@Component({
  name: 'App',
  components: {
    SnackBar,
    PageLoading,
    BackBtn
  }
})
export default class App extends Vue {

  get modal(): IModal {
    return this.$store.getters['uiStore/Modal']
  }

  get isBackBtnShowing(): boolean {
    return this.$store.getters['navigationStore/IsBackBtnShowing']
  }

}
</script>

<style lang='scss'>
@use "~@/assets/styles/views/_app";
</style>

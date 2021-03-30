<template>
  <div class='modal modal-lg fade' :class="[{'modal-fullscreen': fullScreen === true}]" id='modal' data-bs-backdrop="static" data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
    <div class='modal-dialog' v-bind:class="[{'modal-dialog-centered': centered === true},{'modal-dialog-scrollable': scrollable === true} ]">
      <div class='modal-content'>
        <div class='modal-header' v-if='isHeader'>
          <slot name='header'>

          </slot>
          <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
        </div>
        <div class='modal-body'>
          <slot name='body'>
            <p>Body</p>
          </slot>
        </div>
        <div class='modal-footer'>
          <slot name='footer'>

          </slot>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'BootstrapModal',
  components: {}
})


export default class BootstrapModal extends Vue {
  @Prop({ default: true }) isHeader?: boolean
  @Prop({ default: true }) fullScreen?: boolean
  @Prop({ default: false }) centered?: boolean
  @Prop({ default: false }) scrollable?: boolean

}
</script>

<style scoped lang='scss'>
.BootstrapModal {

}
</style>

<template>
  <div>
    <b-modal
      id="modal-1"
      title="Settings"
      ok-variant="secondary"
      ok-only
      ok-title="Save"
      ref="my-modal"
    >
      <p class="my-4">Update handicap on login?</p>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "Header" })
export default class SettingsModal extends Vue {
  @Prop({ default: false }) public showModal: boolean | undefined;

  showmodal() {
    //@ts-ignore
    this.$refs["my-modal"].show();
  }

  mounted() {
    if (this.showModal === false) {
      this.showmodal();
    }
  }
}
</script>

<style scoped lang="scss"></style>

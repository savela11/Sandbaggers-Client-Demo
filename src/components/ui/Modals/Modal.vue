<template>
  <div class="modal">
    <div class="modal__background"></div>
    <div class="modal__container">
      <div class="modal__header section" v-if="isHeader">
        <div class="modal__closeButton">
          <button class="btn btn--xs" v-on="$listeners">Close</button>
        </div>
        <slot name="header"></slot>
      </div>
      <div class="modal__body section" v-if="isBody">
        <slot name="body"></slot>
      </div>
      <div class="modal__footer section" v-if="isFooter">
        <div class="btnContainer">
          <slot name="submitBtn"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'Modal' })
export default class Modal extends Vue {
  @Prop({ default: true }) isHeader?: boolean
  @Prop({ default: true }) isBody?: boolean
  @Prop({ default: true }) isFooter?: boolean
}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  padding: 0.3rem;
  z-index: 10;

  h2 {
    font-size: 1.2rem;
  }

  &__closeButton {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: flex-end;

    button {
    }
  }

  &__background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }

  &__container {
    background-color: white;
    height: 100%;
    border: 2px solid $DarkBlue;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
  }

  .section {
    margin-bottom: 0.5rem;
    padding: 1rem;

    &:last-child {
      margin: 0;
    }
  }

  &__body {
    height: 100%;
    overflow-y: scroll;
    position: relative;
    margin: 0.5rem;
    border: 1px solid grey;
    border-radius: 5px;

    .form {
      padding: 0.5rem;
    }
  }

  &__footer {
    .btnContainer {
      display: flex;
      justify-content: flex-end;
      margin: 0;
    }
  }
}
</style>

<template>
  <div class="modal">
    <div class="modal__background"></div>
    <div class="modal__container">
      <div class="modal__header section">
        <div class="modal__closeButton">
          <button class="btn btn--xs" v-on="$listeners">Close</button>
        </div>
        <slot name="header"><h2>Header</h2></slot>
      </div>
      <div class="modal__body section">
        <slot name="body"><h3>Body</h3></slot>
      </div>
      <div class="modal__footer section">
        <slot name="footer"><h4>Footer</h4></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'Modal' })
export default class Modal extends Vue {}
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  padding: 0.3rem;

  h2 {
    font-size: 1rem;
  }

  &__closeButton {
    margin-bottom: 1rem;
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
    background-color: rgba(0, 0, 0, 0.2);
  }

  &__container {
    background-color: white;
    height: 100%;
    padding: 1rem;
    border: 5px solid $DarkBlue;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
  }

  .section {
    margin-bottom: 2rem;
  }

  &__body {
    height: 100%;
    max-height: 330px;
    overflow-y: scroll;
  }
}
</style>

<template>
  <div class="container modal">
    <div class="modal__background"></div>
    <div class="modal__content">
      <div class="modal__header">
        <h2>Heading</h2>
      </div>
      <div class="modal__body">
        <p>This is an error message</p>
      </div>
      <div class="modal__footer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'ErrorModal' })
export default class ErrorModal extends Vue {}
</script>

<style scoped lang="scss">
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
}

.modal {
  &__background {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  &__content {
    background-color: white;
    margin-left: auto;
    z-index: 1;
    max-width: 350px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.85);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    opacity: 1;
    border-radius: 0.25rem;
  }

  &__header {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding: 0.8rem 1rem;
    color: #6c757d;
    background-color: rgba(255, 255, 255, 0.85);
    background-clip: padding-box;
    border-bottom: 1px solid;
    h2 {
    }
  }

  &__body {
    padding: 0.75rem;

    p {
      font-size: 1.4rem;
    }
  }
}
</style>

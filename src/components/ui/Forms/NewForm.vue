<template>
  <form class="c-form" @click.prevent.stop>
    <div class="c-form__fields">
      <slot name="fields"></slot>
    </div>
    <div class="c-form__submit">
      <slot name="button"></slot>
    </div>

  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({ name: "NewForm" })
export default class NewForm extends Vue {

}
</script>


<style scoped lang="scss">
.c-form {

  @include tablet {
    width: 60%;
    margin: 0 auto;
  }

  &__fields {
  }

  &__submit {
    padding: 1rem 0;
  }
}
</style>

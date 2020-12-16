<template>
  <div class="c-form-field">
    <slot name="field"></slot>
    <ul v-if="hasErrors">
      <li v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "FormField" })
export default class FormField extends Vue {
  @Prop({ default: () => [] }) errors!: Array<string>;

  get hasErrors() {
    return !!this.errors.length;
  }
}
</script>


<style scoped lang="scss">
.c-form-field {
  padding: .8rem 1rem;
}

</style>

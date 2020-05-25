<template>
  <div class="form__field">
    <label :for="inputId">{{ label }}</label>
    <input :id="inputId" :type="inputType" v-model="input" @input="$emit('update:inputValue', input)" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'InputField' })
export default class InputField extends Vue {
  @Prop({ default: 'Label' }) inputId!: string
  @Prop({ default: 'Label' }) label!: string
  @Prop({ default: 'Text' }) inputType?: string
  @Prop({ default: 'Value' }) inputValue!: string

  input = ''
  // @Emit()
  // updateInput(e: Event) {
  //   const event = e.target as HTMLInputElement
  //   if (event) {
  //     console.log(event.value)
  //     return event.value
  //   }
  // }
}
</script>

<style lang="scss">
.form {
  &__field {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;

    label {
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
    }
    input {
      font-size: 1.6rem;
      border-radius: 25px;
      padding: 1.2rem 0 1rem 1.5rem;
      border: 1px solid lightgrey;
      outline: none;
      background-color: transparent;
    }
  }
}
</style>

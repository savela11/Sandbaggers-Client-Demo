<template>
  <form class="form">
    <div class="form__field" v-for="field in formFields" :key="field.id">
      <label :for="field.label">{{ field.label }}</label>
      <input :type="field.type" :id="field.id" v-model.trim="form[field.id]" />
    </div>

    <div class="btnContainer">
      <button class="backBtn btn btn--xs btn--red" @click.prevent.stop="() => $router.back()">Cancel</button>
      <button class="btn btn--blue btn--xs" :disabled="verifyFields(this.form)" @click.prevent.stop="submit">{{ btnText }}</button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { IFormField } from '@/types/UI/Forms'

@Component({ name: 'FormComponent' })
export default class FormComponent extends Vue {
  @Prop() formFields!: Array<IFormField>
  @Prop({ default: 'Submit' }) btnText!: string

  form: Record<string, any> = {}

  verifyFields(form: any) {
    const isEmpty = !Object.values(form).every((x) => x !== null && x !== '')
    return isEmpty
  }

  created(): void {
    this.setFields()
  }

  setFields(): void {
    this.formFields.forEach((f) => {
      this.form[f.id] = ''
    })
  }

  @Emit('submit')
  submit() {
    return this.form
  }
}
</script>

<style scoped lang="scss">
.btnContainer {
  display: flex;
  justify-content: space-between;
}
</style>

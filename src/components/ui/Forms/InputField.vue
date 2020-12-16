<template>
  <div class="c-field-container">
    <div class="c-field" :class="[className, {active: value !== ''}]">
      <label class="c-field__label" :class="[`c-field__label--${type}`]" :for="label.replace(/ +/g, '')">{{ label }}</label>
      <input v-if="type !== 'textarea'" :class="'c-field__' + type" :value="value" :id="label.replace(/ +/g, '')" :type="type" @input="$emit('input', $event.target.value)" />
      <textarea v-if="type === 'textarea'" class="c-field__textarea" :value="value" :id="label" :type="type" @input="$emit('input', $event.target.value)"></textarea>
    </div>
  </div>


</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "InputField", inheritAttrs: false })
export default class InputField extends Vue {
  @Prop({ default: "Label" }) label!: string;
  @Prop({ default: "text" }) type?: string;
  @Prop({ default: "Value" }) value!: string;
  @Prop({ default: "default" }) className?: string;


}
</script>

<style scoped lang="scss">
$--inputFS: (
    null: 1rem,
    $mobile: 1.1rem,
    $tablet: 1.2rem
);
$--labelFS: (
    null: .9rem,
);
$--activeLabelFS: (
    null: .8rem,
    $tablet: 1rem
);

.c-field-container {
  padding: .8rem 0;

  @include tablet {
    padding: 1rem 0;
  }
}


.c-field {
  flex: auto;
  display: flex;
  min-height: 56px;
  font-weight: 600;
  position: relative;
  font-family: 'Raleway', sans-serif;
  @include font-size($--inputFS);
  border: 1px solid rgba(60, 60, 67, .2);
  outline: none;
  border-radius: 5px;
  padding: .5rem .8rem;
  line-height: 25px;

  @include mobile {
    padding: .3rem .9rem;
  }
  @include tablet {
    padding: .5rem 1rem;
  }

  &:active, &:focus, &:focus-within, &.active {
    border: 1px solid $DarkGreen;

    label {
      top: 0;
      transform: translateY(-15px);
      background-color: white;
      border-radius: 5px;
      color: $DarkGreen;
      @include font-size($--activeLabelFS);
    }
  }

  &:active, &:focus, &:focus-within {
    border: 2px solid $DarkGreen;
  }


  &__label {
    position: absolute;
    color: rgba(134, 134, 134, .4);
    @include font-size($--labelFS);

    &--text, &--password, &--email {
      top: 50%;
      transform: translateY(-50%);
    }


  }

  &__text, &__textarea, &__password, &__email {
    padding: .5rem .2rem;
    border: none;
    outline: none;
    color: rgba(60, 60, 67, .7);
    @include font-size($--inputFS);
  }

  &__text, &__password {
    flex: auto;

  }

  &__textarea {
    flex: auto;
    min-height: 150px;
  }


}

.primary {

  &:active, &:focus, &:focus-within, &.active {
    border: 1px solid $DarkBlue;
    label {
      color: $DarkBlue;
    }
  }

  &:active, &:focus, &:focus-within {
    border: 2px solid $DarkBlue;
  }

  input, textarea {
    color: $DarkBlue;
  }

}


</style>

<template>
  <div class="c-field-container">
    <div class="c-field" :class="[className, {active: isActive}]">
      <slot name="field"></slot>
    </div>
  </div>


</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "InputField", inheritAttrs: false })
export default class InputField extends Vue {
  @Prop({ default: "default" }) className?: string;
  @Prop({ default: false }) isActive?: boolean;


}
</script>

<style scoped lang="scss">
$--inputFS: (
    null: 1rem,
    $mobile: 1.1rem,
    $tablet: 1.2rem
);
$--labelFS: (
    null: .8rem,
    $mobile: .9rem
);
$--activeLabelFS: (
    null: .9rem,
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
    border: 2px solid $DarkGreen;

    label {
      top: 0;
      transform: translateY(-15px);
      background-color: white;
      border-radius: 5px;
      font-weight: bold;
      color: $DarkGreen;
      @include font-size($--activeLabelFS);
    }
  }


  label {
    position: absolute;
    color: rgba(134, 134, 134, .4);
    @include font-size($--labelFS);


    input {
      top: 50%;
      transform: translateY(-50%);
    }


  }

  input, textarea {
    padding: .5rem .2rem;
    border: none;
    outline: none;
    color: rgba(60, 60, 67, .7);
    @include font-size($--inputFS);
  }

  input {
    flex: auto;
  }

  textarea {
    flex: auto;
    min-height: 150px;
  }


}

.primary {
  &:active, &:focus, &:focus-within, &.active {
    border: 2px solid $primary;

    label {
      color: $primary;
    }
  }

  input, textarea {
    color: $primary;
  }

}


</style>

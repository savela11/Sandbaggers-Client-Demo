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
    null: .8rem,
    $mobile: .9rem,
    $tablet: 1rem
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
    border: 2px solid $PrimaryFS;

    label {
      top: 0;
      transform: translateY(-15px);
      background-color: white;
      border-radius: 5px;
      font-weight: bold;
      color: $PrimaryFS;
      @include font-size($--activeLabelFS);
    }
  }


  label {
    position: absolute;
    color: rgba(40, 40, 40, .7);
    @include font-size($--labelFS);


    input {
      top: 50%;
      transform: translateY(-50%);
    }


  }

  input, textarea {
    padding: .5rem .2rem;
    max-width: 100%;
    border: none;
    outline: none;
    color: rgba(40, 40, 40, .7);
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

.sm {
  min-height: 40px;
}

.search {
  min-height: 40px;
  padding: .2rem .8rem;
  border: 1px solid rgba(60, 60, 67, 0.2);
  border-radius: 50px;

  label {
    color: rgba(60, 60, 67, 0.2);
    padding: 0 .3rem;
  }

  &:active, &:focus, &:focus-within, &.active {
    border: 2px solid rgba(60, 60, 67, 0.8);

    label {
      color: rgba(60, 60, 67, 0.8);
      left: 1.5rem;
    }
  }

  input, textarea {
    color: rgba(60, 60, 67, 0.8);
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

.secondary {
  &:active, &:focus, &:focus-within, &.active {
    border: 2px solid $secondary;

    label {
      color: $secondary;
    }
  }

  input, textarea {
    color: $secondary;
  }
}


</style>

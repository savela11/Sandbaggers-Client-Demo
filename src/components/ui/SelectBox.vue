<template>
  <div class="select-wrapper" v-on="$listeners" >
    <div class="select" :class="{open: showOptions}">
      <div class="select__trigger" >
        <slot name="selected">
          <span>Select link</span>
        </slot>
        <div class="arrow"></div>
      </div>
      <div class="options" v-show="showOptions">
        <slot name="options">
          <span class="option">Two</span>
          <span class="option">Three</span>
          <span class="option">Four</span>
        </slot>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({ name: "Header" })
export default class ComponentName extends Vue {
  @Prop({ default: false }) showOptions = false;

  @Emit("toggleOptions")
  toggleOptions(): void {
    const select = document.querySelector(".select");
  }
}
</script>

<style scoped lang="scss">
$--selectBoxOptionFS: (
    null: .8rem,
    $mobile: .9rem
);
.select-wrapper {
  position: relative;
  user-select: none;
  width: 100%;

  .select {
    position: relative;
    display: flex;
    flex-direction: column;
    border-width: 0 2px 0 2px;
    border-style: solid;
    border-color: #394a6d;
    border-radius: 3px;

    &.open {
      .arrow {
        &::before {
          left: 0;
          transform: rotate(-45deg);
        }

        &::after {
          left: 6px;
          transform: rotate(45deg);
        }
      }
    }

    &__trigger {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem .5rem;
      @include font-size($--selectBoxOptionFS);
      font-weight: 500;
      color: #3b3b3b;
      background: #ffffff;
      cursor: pointer;
      border-width: 2px 0 2px 0;
      border-style: solid;
      border-color: #394a6d;
      border-radius: 3px;
    }

    .arrow {
      position: relative;
      height: 10px;
      width: 10px;


      &::before, &::after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 0.15rem;
        height: 100%;
        transition: all 0.5s;
      }

      &::before {
        left: 0;
        transform: rotate(45deg);
        background-color: #394a6d;
      }

      &::after {
        left: 6px;
        transform: rotate(-45deg);
        background-color: #394a6d;
      }
    }
  }

  .options {
    position: absolute;
    display: block;
    top: 100%;
    left: 0;
    right: 0;
    border: 1px solid #394a6d;
    border-top: none;
    background: #fff;
    transition: all 0.5s;
    pointer-events: none;
    z-index: 2;
    max-height: 175px;
    overflow-y: auto;
    padding: .2rem;

    .option {
      position: relative;
      display: block;
      padding: 1rem .5rem;
      @include font-size($--selectBoxOptionFS);
      font-weight: 500;
      color: #3b3b3b;
      cursor: pointer;
      transition: all 0.5s;
      border-bottom: 1px solid lightgrey;
    }

    .option:hover {
      cursor: pointer;
      background-color: #b2b2b2;
    }

    .option.selected {
      color: #ffffff;
      background-color: #305c91;
    }
  }


}


.select.open .options {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

</style>

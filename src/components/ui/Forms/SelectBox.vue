<template>
  <div class="SelectBox">
    <div class="select" :class="{open: showOptions === true}">
      <div class="backdrop" v-show="showOptions" @click.stop.prevent="toggleShowOptions(false)"></div>
      <div class="box" @click.prevent.stop="toggleShowOptions(!showOptions)">
        <span class="box__selected text text--md color--primary">{{ selectedOption[displayValue] }}</span>
        <span class="box__arrow"></span>
      </div>
      <div class="options" v-show="showOptions">
        <span class="option text text--md color--primary" v-for="(option, index) in allOptions" :key="index" @click.prevent.stop="selectOption(option)">{{ option[displayValue] }}</span>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "SelectBox" })


export default class SelectBox extends Vue {
  @Prop() options!: Array<any>;
  @Prop() selectedOption!: any;
  @Prop() displayValue!: string;
  @Prop() showOptions!: boolean;

  get allOptions(): Array<any> {
    return this.options;
  }

  toggleShowOptions(status: boolean): void {
    this.$emit("toggle-show-options", status);
  }

  selectOption<T>(option: T): void {
    this.$emit("select-option", option);
  }
}
</script>

<style scoped lang="scss">

.SelectBox {
  .select {
    border: 2px solid $DarkBlue;
    border-radius: 3px;
    min-width: 100px;
    position: relative;
    z-index: 10;
    display: flex;

    &.open {
      .box {
        &__arrow {
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
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      background-color: transparent;
      z-index: 1;
    }

    .box {
      z-index: 2;
      padding: .3rem 2rem .3rem .5rem;
      background-color: white;
      flex: auto;
      min-height: 2rem;

      &__selected {
        background-color: white;
      }

      &__arrow {
        position: absolute;
        height: 10px;
        width: 10px;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        margin: 0 .5rem;

        &::before, &::after {
          content: "";
          position: absolute;
          bottom: 0;
          width: .15rem;
          height: 100%;
          transition: all .5s;
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
      display: flex;
      flex-direction: column;
      z-index: 2;
      top: 110%;
      min-height: 100px;
      padding: .5rem;
      right: 0;
      position: absolute;
      left: 0;
      background-color: white;
      box-shadow: 0 5px 5px lightgrey;
      border-bottom-right-radius: 2px;
      border-bottom-left-radius: 2px;

      .option {
        padding: .5rem .2rem;
      }
    }
  }


}
</style>

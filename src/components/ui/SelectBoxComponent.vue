<template>
  <div class='SelectBoxComponent'>
    <div class="select-wrapper" v-on="$listeners">
      <div class="select" :class="{open: showSelectOptions}">
        <div class="trigger">
          <div class="selectedSpan">
            <span v-if="selected" class="text text--md">{{ selected }}</span>
          </div>
          <div class="arrow"></div>
        </div>
        <div class="options" v-show="showSelectOptions">
          <span @click.prevent.stop="selectOption(option)" class="option text text--md" v-for="option in options" :key="option[keyValue]">{{ option[optionValue] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "SelectBoxComponent" })


export default class SelectBoxComponent extends Vue {
  @Prop({ default: false }) showSelectOptions!: boolean;
  @Prop() selected?: any;
  @Prop() options!: Array<any>;
  @Prop() keyValue!: string | number;
  @Prop() optionValue!: string | number;

  selectOption(option: any): void {
    this.$emit("select-option", option);
  }
}
</script>

<style scoped lang="scss">

.select-wrapper {
  position: relative;
  user-select: none;
  min-width: 100px;

  .select {
    position: relative;
    display: flex;
    flex-direction: column;
    border-width: 0 2px 0 2px;
    border-style: solid;
    border-color: #394a6d;
    border-radius: 3px;

    &.open {
      .trigger {
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


      .options {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
      }
    }

    .trigger {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem .5rem;

      font-weight: 500;
      color: #3b3b3b;
      background: #ffffff;
      cursor: pointer;
      border-width: 2px 0 2px 0;
      border-style: solid;
      border-color: #394a6d;
      border-radius: 3px;

      .selectedSpan {
        margin-right: .8rem;
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


}


</style>

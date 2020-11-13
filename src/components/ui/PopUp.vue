<template>
  <div class="popUp">
    <div class="popUp__backDrop" v-on="$listeners"></div>
    <div class="container" :class="classStatus">
      <div class="flexButton">
        <button class="closeBtn" v-on="$listeners">
          <img :src="require('@/assets/icons/cancel-red.svg')" alt="remove user X" />
        </button>
      </div>

      <div class="container__title">
        <h4>{{ title }}</h4>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'PopUp' })
export default class PopUp extends Vue {
  @Prop({ default: 'hide' }) classStatus!: string
  @Prop({ default: 'default' }) title!: string
}
</script>

<style scoped lang="scss">
.popUp {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1;

  &__backDrop {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: black;
    opacity: .5;
    width: 100%;
    height: 100%;
  }

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: white;
    width: 80%;
    border: 1px solid $DarkBlue;
    border-radius: 5px;
    padding: 1rem 1rem 2rem 1rem;
    z-index: 11;

    @include tablet {
      width: 40%;
      padding: 2rem 2rem 3rem 2rem;

    }

    &.hide {
      transform: translateX(150%);
      animation: hidePopUp 0.5s linear forwards;
    }

    &.show {
      transform: translate(-50%, -50%);
      animation: showPopUp 0.5s linear forwards;
    }

    .closeBtn {
      position: absolute;
      top: 0;
      right: 0;
      background-color: white;
      padding: 0.2rem;
      border: none;
      @include tablet {
        height: 35px;
        width: 35px;
        top: .2rem;
        right: .2rem;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }


    &__title {
      padding: .5rem;
      @include tablet {
      }

      h4 {
        font-size: 1rem;
        text-align: center;
        color: $DarkBlue;
      }
    }

    .content {
      padding: .5rem;
      max-height: 300px;
      overflow-y: auto;
      min-height: 100px;

      @include tablet {
        padding: 1rem;
        max-height: 500px;
      }
    }
  }
}


@media (min-width: 1024px) {
  .popUp {
    &__backDrop {
    }

    .container {
      width: 50%;

      .flexButton {
        .closeBtn {
        }
      }

      &__title {
        h4 {
        }
      }

      .content {
        max-height: 400px;
        min-height: 300px;
      }
    }
  }
}

@media (min-width: 1240px) {
  .popUp {
    &__backDrop {
    }

    .container {
      width: 40%;

      .flexButton {
        .closeBtn {
        }
      }

      &__title {
        h4 {
        }
      }

      .content {
        min-height: 350px;
      }
    }
  }
}

@keyframes showPopUp {
  0% {
    transform: translate(150%, -50%);
    opacity: 0;
  }
  //50% {
  //  transform: translateX(100%);
  //  opacity: 0.5;
  //}

  100% {
    transform: translateX(-50%, -50%);
    opacity: 1;
  }
}

@keyframes hidePopUp {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  //50% {
  //  transform: translateX(100%);
  //  opacity: 0.5;
  //}

  100% {
    transform: translateX(150%);
  }
}
</style>

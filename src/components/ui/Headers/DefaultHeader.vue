<template>
  <header class="heading">
    <div class="heading__backgroundColor" v-bind:style="{ backgroundColor: backgroundColor }">
      <div class="heading__image">
        <svg width="34" height="60" viewBox="0 0 34 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="31.6004" cy="2.4" r="2.4" fill="white" />
          <circle cx="17.2004" cy="2.4" r="2.4" fill="white" />
          <circle cx="2.80039" cy="2.4" r="2.4" fill="white" />
          <circle cx="2.80039" cy="12" r="2.4" fill="white" />
          <circle cx="17.2004" cy="12" r="2.4" fill="white" />
          <circle cx="31.6004" cy="12" r="2.4" fill="white" />
          <circle cx="2.80039" cy="21.6" r="2.4" fill="white" />
          <circle cx="17.2004" cy="21.6" r="2.4" fill="white" />
          <circle cx="31.6004" cy="21.6" r="2.4" fill="white" />
          <circle cx="2.80039" cy="31.2" r="2.4" fill="white" />
          <circle cx="17.2004" cy="31.2" r="2.4" fill="white" />
          <circle cx="31.6004" cy="31.2" r="2.4" fill="white" />
          <circle cx="2.80039" cy="40.8" r="2.4" fill="white" />
          <circle cx="17.2004" cy="40.8" r="2.4" fill="white" />
          <circle cx="31.6004" cy="40.8" r="2.4" fill="white" />
          <circle cx="2.80039" cy="50.4" r="2.4" fill="white" />
          <circle cx="17.2004" cy="50.4" r="2.4" fill="white" />
          <circle cx="31.6004" cy="50.4" r="2.4" fill="white" />
          <circle cx="2.80039" cy="60" r="2.4" fill="white" />
          <circle cx="17.2004" cy="60" r="2.4" fill="white" />
          <circle cx="31.6004" cy="60" r="2.4" fill="white" />
        </svg>
      </div>
      <div class="heading__title">
        <h1 class="text text--bolder text--headerTitle color--white">{{ title }}</h1>
      </div>
    </div>
    <div class="heading__smallText">
      <p class="text text--xs">{{ smallText }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ name: "DefaultHeader" })
export default class DefaultHeader extends Vue {
  @Prop({ default: "Sandbaggers" }) private smallText: string | undefined;
  @Prop({ default: "Default" }) private title!: string;
  @Prop({ default: "#425a41" }) private backgroundColor: string | undefined;
  @Prop() private fontSize: string | undefined;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.heading {
  display: flex;

  &__backgroundColor {
    padding: 0.8rem 0.8rem 0.8rem 1.5rem;
    background-color: $DarkGreen;
    position: relative;
    min-height: 200px;
    width: 90%;
    border-bottom-right-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 2px 10px rgba(102, 102, 102, 0.6);

    @include tablet {
      padding: 1rem 1rem 3rem 4rem;
      min-height: 300px;
      justify-content: space-evenly;
    }

    @include tablet-landscape {
      padding: 2rem 1rem 2rem 15rem;

    }

    @include desktopSmall {
      padding: 2rem 1rem 2rem 18rem;

    }

    @include desktop {
      padding: 2rem 1rem 2rem 20rem;
    }

    @include desktopLarge {
      padding: 2rem 1rem 2rem 26rem;
    }
  }

  &__image {
    margin-left: auto;
  }

  &__title {
    margin-top: 0.5rem;

    h1 {
      line-height: 1.3;
      text-shadow: 2px 2px 5px #000;
    }
  }

  &__smallText {
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    p {
      transform: rotate(90deg) translate(25px, 5px);
      color: #41425a;
      font-weight: 200;
      white-space: nowrap;
      margin: 0;

      @include tablet {
        transform: rotate(90deg) translate(25px, 20px);
      }

      @include tablet-landscape {
        transform: rotate(90deg) translate(25px, 35px);
      }

      @include desktopSmall {
        transform: rotate(90deg) translate(25px, 45px);
      }

      @include desktop {
        transform: rotate(90deg) translate(25px, 50px);
      }
      @include desktopLarge {
        transform: rotate(90deg) translate(25px, 75px);
      }
    }
  }
}
</style>

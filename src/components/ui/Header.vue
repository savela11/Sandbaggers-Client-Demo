<template>
  <header class="heading">
    <div class="heading__backgroundColor" v-bind:style="{ backgroundColor: backgroundColor }">
      <div class="heading__image">
        <svg width="34" height="72" viewBox="0 0 34 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="31.6004" cy="2.4" r="2.4" fill="white" />
          <circle cx="31.6004" cy="69.6" r="2.4" fill="white" />
          <circle cx="17.2004" cy="2.4" r="2.4" fill="white" />
          <circle cx="17.2004" cy="69.6" r="2.4" fill="white" />
          <circle cx="2.80039" cy="2.4" r="2.4" fill="white" />
          <circle cx="2.80039" cy="69.6" r="2.4" fill="white" />
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
        <h1>{{ headerTitle }}</h1>
      </div>
    </div>
    <div class="heading__smallText">
      <p>{{ smallText }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import UIStore from '@/store/modules/UIStore'
@Component({ name: 'Header' })
export default class HelloWorld extends Vue {
  @Prop({ default: 'Sandbaggers' }) private smallText: string | undefined

  @Prop({ default: '#425a41' }) private backgroundColor: string | undefined

  @Prop() private fontSize: string | undefined

  get headerTitle(): string {
    return UIStore.headerTitle
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.heading {
  display: flex;
  &__backgroundColor {
    padding: 1rem 1rem 1rem 2rem;
    background-color: $DarkGreen;
    position: relative;
    height: 100%;
    min-height: 200px;
    width: 90%;
    border-bottom-right-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__image {
    margin-left: auto;
  }

  &__title {
    margin-top: 1rem;
    h1 {
      font-size: 1.6rem;
      font-weight: 900;
      color: white;
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
    }
  }
}

@media (min-width: 375px) {
  .heading {
    &__title {
      h1 {
        font-size: 1.8rem;
      }
    }
  }
}

@media (min-width: 768px) {
  .heading {
    &__title {
      h1 {
        font-size: 3rem;
      }
    }

    &__smallText {
      p {
        margin: 0;
        transform: rotate(90deg) translate(25px, 20px);
      }
    }
  }
}

@media (min-width: 1024px) {
  .heading {
    &__backgroundColor {
      padding: 2rem 1rem 2rem 15rem;
    }

    &__title {
      h1 {
        font-size: 3.2rem;
      }
    }

    &__smallText {
      p {
        margin: 0;
        transform: rotate(90deg) translate(25px, 35px);
      }
    }
  }
}

@media (min-width: 1248px) {
  .heading {
    &__backgroundColor {
      padding: 2rem 1rem 2rem 20rem;
    }

    &__title {
      h1 {
        font-size: 3.4rem;
      }
    }

    &__smallText {
      p {
        margin: 0;
        transform: rotate(90deg) translate(25px, 45px);
      }
    }
  }
}

@media (min-width: 1440px) {
  .heading {
    &__backgroundColor {
      padding: 2rem 1rem 2rem 23rem;
    }

    &__title {
      h1 {
        font-size: 3.6rem;
      }
    }

    &__smallText {
      p {
        margin: 0;
        transform: rotate(90deg) translate(25px, 50px);
      }
    }
  }
}

@media (min-width: 1900px) {
  .heading {
    &__backgroundColor {
      padding: 2rem 1rem 2rem 31rem;
    }

    &__title {
      h1 {
        font-size: 4rem;
      }
    }

    &__smallText {
      p {
        margin: 0;
        transform: rotate(90deg) translate(25px, 75px);
      }
    }
  }
}
</style>

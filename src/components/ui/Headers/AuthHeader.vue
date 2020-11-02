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
        <h1>{{ title }}</h1>
      </div>
    </div>
    <div class="heading__smallText">
      <p>{{ smallText }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({ name: 'Header' })
export default class HelloWorld extends Vue {
  @Prop({ default: 'Sandbaggers' }) private smallText: string | undefined
  @Prop({ default: 'Default' }) private title!: string
  @Prop({ default: '#425a41' }) private backgroundColor: string | undefined
  @Prop() private fontSize: string | undefined
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
    min-height: 175px;
    width: 90%;
    border-bottom-right-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 2px 10px rgba(102, 102, 102, 0.6);
  }

  &__image {
    margin-left: auto;
  }

  &__title {
    margin-top: 0.5rem;
    h1 {
      font-size: 1.4rem;
      font-weight: 900;
      line-height: 1.3;
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
    &__backgroundColor {
    }
    &__title {
      h1 {
        font-size: 1.6rem;
      }
    }
  }
}

@media (min-width: 768px) {
  .heading {
    &__backgroundColor {
      padding: 1rem 1rem 3rem 4rem;
      min-height: 300px;
      justify-content: space-evenly;
    }
    &__title {
      h1 {
        font-size: 2.5rem;
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

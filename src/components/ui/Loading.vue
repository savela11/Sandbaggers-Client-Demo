<template>
  <div class="loading" :class="`loading--${value}`">
    <v-progress-circular :size="100" color="secondary" indeterminate></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'Loading' })
export default class Loading extends Vue {
  @Prop({ default: '5%' }) topMargin: string | undefined
  @Prop({ default: 'small' }) value: string | undefined
}
</script>

<style scoped lang="scss">
.loading {
  &--small {
    margin-top: 5%;
  }

  &--medium {
    margin-top: 10%;
  }

  &--large {
    margin-top: 15%;
  }

  &--xLarge {
    margin-top: 20%;
  }
}

@media (min-width: 1024px) {
  .loading {
    &--small {
      margin-top: 2.5%;
    }

    &--medium {
      margin-top: 5%;
    }

    &--large {
      margin-top: 10%;
    }

    &--xLarge {
      margin-top: 15%;
    }
  }
}
</style>

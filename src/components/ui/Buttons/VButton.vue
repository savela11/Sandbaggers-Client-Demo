<template>
  <div class="btnContainer">
    <button @click.prevent.stop="buttonClick" class="btn" v-bind:class="classes">{{ value }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'VBtn' })
export default class VBtn extends Vue {
  @Prop({ default: 'Button' }) value!: string
  @Prop() classes!: Array<string>

  @Emit('btnClick')
  buttonClick(e: Event) {
    const target = e.target as HTMLButtonElement
    target.classList.add('clicked')
    setTimeout(() => {
      target.classList.remove('clicked')
    }, 200)
  }
}
</script>

<style scoped lang="scss">
.btnContainer {
  margin: 1.5rem 0;
}

.btn {
  padding: 1rem 4rem;
  font-size: 1.6rem;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s linear 0s;
  outline: none;

  // Colors
  &-primary {
    background-color: $DarkGreen;
    color: white;
  }

  &-secondary {
    background-color: $DarkBlue;
    color: white;
  }

  // Sizes
  &-sm {
    padding: 0.8rem 3rem;
  }
  &-lg {
    padding: 1.2rem 5rem;
    font-size: 1.8rem;
  }
}

.clicked {
  transform: translateY(10px);
  box-shadow: 0 1px 1px rgba(70, 70, 70, 0.7);
}
</style>

<template>
  <div class="mainHeader">
    <div class="mainHeader__container">
      <div class="top">
        <div class="sbLogo"><img src="@/assets/SBLogo.png" alt="Sandbagger Logo" /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'MainHeader' })
export default class MainHeader extends Vue {}
</script>

<style scoped lang="scss">
.mainHeader {
  &__container {
    padding: 0.5rem;
    box-shadow: 0 1px 10px rgba(102, 102, 102, 0.8);
    .top {
      display: flex;
      height: 40px;
      justify-content: space-between;

      h1 {
        font-size: 0.9rem;
        font-weight: normal;
        color: lightgrey;
      }
      & > div {
      }

      .sbLogo {
        width: 40px;
        img {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }
}
</style>

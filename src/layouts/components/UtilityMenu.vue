<template>
  <div class='utilityMenu'>
    <button>Mail</button>
    <button>Bets</button>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'UtilityMenu',
  components: {}
})


export default class UtilityMenu extends Vue {
}
</script>

<style scoped lang='scss'>
.utilityMenu {
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem 0 0 0;
  width: 75%;

}
</style>

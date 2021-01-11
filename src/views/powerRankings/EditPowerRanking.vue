<template>
  <div class='EditPowerRanking'>
    <div v-if="!loading">
      EditPowerRanking
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "EditPowerRanking",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue")
  }
})


export default class EditPowerRanking extends Vue {
  loading = true;
}
</script>

<style scoped lang="scss">
.EditPowerRanking {

}
</style>

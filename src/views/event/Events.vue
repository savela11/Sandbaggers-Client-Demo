<template>
  <div class='Events'>
    <div v-if="!loading">
      <h2 class="text text--title text--bold color--primary">Events</h2>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Events",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue")
  }
})


export default class Events extends Vue {
  loading = false;
}
</script>

<style scoped lang="scss">
.Events {

}
</style>

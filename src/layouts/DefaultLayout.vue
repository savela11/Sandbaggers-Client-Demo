<template>
  <div class="DefaultLayout">
    <DefaultHeader :title="$route.name" />
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DefaultHeader from "@/components/ui/Headers/DefaultHeader.vue";

@Component({ name: "DefaultLayout", components: { DefaultHeader } })


export default class DefaultLayout extends Vue {

}
</script>

<style scoped lang="scss">
.DefaultLayout {

}
</style>

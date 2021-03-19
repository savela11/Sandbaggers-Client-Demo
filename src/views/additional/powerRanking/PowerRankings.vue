<template>
  <div class='PowerRankings'>
    <div v-if='!loading'>

    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'PowerRankings',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue')
  }
})


export default class PowerRankings extends Vue {
  loading = true
}
</script>

<style scoped lang='scss'>
.PowerRankings {

}
</style>

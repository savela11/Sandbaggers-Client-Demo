<template>
  <div class='CreatePowerRanking'>
    <div v-if='!loading'>

    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'CreatePowerRanking',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue')
  }
})


export default class CreatePowerRanking extends Vue {
  loading = true
}
</script>

<style scoped lang='scss'>
.CreatePowerRanking {

}
</style>

<template>
    <div>
        <div class="app__title-bar">
            <h1 class="app__text app__text--title">Mock Drafts</h1>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'MockDrafts' })
export default class MockDrafts extends Vue {
    mounted(): void {}
}
</script>

<style scoped lang="scss"></style>

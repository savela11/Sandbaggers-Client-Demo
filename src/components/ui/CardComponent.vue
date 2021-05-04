<template>
    <div class="card">
        <div class="card__container">
            <div class="card__section card__section--header" :class="headerClass">
                <slot name="card--header"></slot>
            </div>
            <div class="card__section card__section--main" :class="mainClass">
                <slot name="card--main"></slot>
            </div>
            <div class="card__section card__section--footer" :class="footerClass">
                <slot name="card--footer"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: 'CardComponent',
    components: {},
})
export default class CardComponent extends Vue {
    @Prop() headerClass?: string
    @Prop() mainClass?: string
    @Prop() footerClass?: string
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/components/_cardComponent.scss";
</style>
<template>
    <div class="BackBtn flex--xs" :class="justify">
        <div class="flex--xs flex--column flex--center flex--iCenter">
            <button @click.prevent.stop="$router.go(-1)" class='btn btn--icon'>
                <svg viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13 0.5C6.09675 0.5 0.5 6.09675 0.5 13C0.5 19.9032 6.09675 25.5 13 25.5C19.9032 25.5 25.5 19.9032 25.5 13C25.5 6.09675 19.9032 0.5 13 0.5ZM15.122 18.0895C15.215 18.1779 15.2894 18.2841 15.3408 18.4017C15.3922 18.5193 15.4195 18.646 15.4212 18.7743C15.4228 18.9027 15.3988 19.03 15.3504 19.1489C15.302 19.2678 15.2304 19.3758 15.1396 19.4665C15.0489 19.5573 14.9409 19.629 14.822 19.6773C14.7031 19.7257 14.5757 19.7497 14.4474 19.7481C14.3191 19.7465 14.1924 19.7191 14.0748 19.6678C13.9572 19.6164 13.851 19.542 13.7626 19.4489L7.99339 13.6797C7.8132 13.4994 7.71198 13.2549 7.71198 13C7.71198 12.7451 7.8132 12.5006 7.99339 12.3203L13.7626 6.55108C13.9444 6.37837 14.1865 6.28351 14.4372 6.28672C14.6879 6.28993 14.9275 6.39096 15.1048 6.56827C15.2821 6.74558 15.3832 6.98513 15.3864 7.23587C15.3896 7.4866 15.2947 7.72867 15.122 7.91046L10.0331 13L15.122 18.0895Z"
                        fill="#17252A"
                    />
                </svg>
            </button>
            <span class="text text--tiny">Back</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    name: 'BackBtn',
    components: {},
})
export default class BackBtn extends Vue {
    @Prop({ default: 'flex--start' }) justify?: string

    goBack(): void {
        return this.$router.go(-1)
    }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/components/_backBtn";
</style>

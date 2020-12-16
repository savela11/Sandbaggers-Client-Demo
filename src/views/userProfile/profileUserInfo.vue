<template>
  <div>
    <NewForm>
      <template v-slot:fields>
        <InputField type="text" label="First Name" className="primary" v-model="currentUser.profile.firstName" />
        <InputField type="text" label="Last Name" className="primary" v-model="currentUser.profile.lastName" />
      </template>
    </NewForm>
    <!--      <form v-if="currentView.title === 'Profile'" class="view profile">-->
    <!--        <div class="form__field">-->
    <!--          <label for="firstName">First</label>-->
    <!--          <input id="firstName" v-model="currentUser.profile.firstName" type="text" />-->
    <!--        </div>-->
    <!--        <div class="form__field">-->
    <!--          <label for="lastName">Last</label>-->
    <!--          <input id="lastName" v-model="currentUser.profile.lastName" type="text" />-->
    <!--        </div>-->
    <!--        <div class="form__field">-->
    <!--          <label for="email">Email</label>-->
    <!--          <input id="email" v-model="currentUser.email" type="email" />-->
    <!--        </div>-->
    <!--        &lt;!&ndash; TODO add formatter for phone number &ndash;&gt;-->
    <!--        <div class="form__field">-->
    <!--          <label for="phone">Phone</label>-->
    <!--          <input id="phone" v-model="currentUser.phoneNumber" type="tel" @input="formatPhone" />-->
    <!--        </div>-->
    <!--      </form>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NewForm from "@/components/ui/Forms/NewForm.vue";
import { UserVm } from "@/types/ViewModels/UserVm";

@Component({
  name: "ProfileUserInfo",
  components: {
    NewForm,
    Form: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/NewForm.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/InputField.vue")
  }

})
export default class ProfileUserInfo extends Vue {
  @Prop() currentUser!: UserVm;



}
</script>


<style scoped lang="scss">

</style>

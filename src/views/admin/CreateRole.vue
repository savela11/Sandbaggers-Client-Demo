<template>
  <div class='CreateRole'>
    <div v-if="!loading">

      <form class="form" @submit.prevent.stop="createRole">
        <fieldset>
          <legend class="text text--xl text--fw-600 color--primary text--bold">Create Role</legend>
          <InputField :isActive="createRoleForm.roleName !== ''">
            <template v-slot:field>
              <label for="name">Role Name</label>
              <input type="text" id="name" v-model.trim="createRoleForm.roleName" />
            </template>
          </InputField>


        </fieldset>
        <input type="submit" value="Submit" class="btn btn--sm btn--bg-darkBlue mt-1 text text--fw-500">
      </form>

    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CreateRoleDto } from "@/types/DTO/RoleDtos";
import RoleService from "@/services/RoleService";
import UIHelper from "@/utility/UIHelper";

@Component({
  name: "CreateRole",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/InputField.vue")
  }
})


export default class CreateRole extends Vue {
  loading = false;
  createRoleForm: CreateRoleDto = {
    roleName: ""
  };

  async createRole(): Promise<void> {
    this.loading = true;
    if (this.createRoleForm.roleName === "") {
      UIHelper.SnackBar({ title: "Error", message: `Role name is required`, classInfo: `error`, isSnackBarShowing: true, errors: undefined });
      this.loading = false;
      return;
    }
    try {
      const res = await RoleService.CreateRole(this.createRoleForm);
      console.log(res);
      if (res.status === 200) {
        UIHelper.SnackBar({ title: "Success", message: `${res.data}`, classInfo: `primary`, isSnackBarShowing: true, errors: undefined });
        setTimeout(() => {
          this.$router.go(-1);
        }, Math.floor(Math.random() * 3000));

      }
    } catch (e) {
      console.log(e);
      UIHelper.SnackBar({ title: "Error", message: `${e.data.message}`, classInfo: `error`, isSnackBarShowing: true, errors: undefined });

    } finally {
      setTimeout(() => {
        this.loading = false;
      }, Math.floor(Math.random() * 3000));


    }
  }
}
</script>

<style scoped lang="scss">
.CreateRole {

}
</style>

<template>
  <div class="roles">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IAddOrRemoveUseFromRole, ICreateRole, IRoleDto, IUserWithRole } from "@/types/Admin/Role";
import RoleService from "@/services/RoleService";
import UIHelper from "@/utility/UIHelper";
import { ISnackBar } from "@/types/UI/SnackBar";

@Component({
  name: "Roles",
  components: {}
})
export default class Roles extends Vue {


}
</script>

<style lang="scss">
</style>

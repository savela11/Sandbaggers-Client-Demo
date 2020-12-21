<template>
  <div class="roles">
    <div v-if="!loading && selectedRole">
      <div class="utility">
        <button class="btn btn--xs btn--borderBottom btn--borderGreen">Create</button>
        <SelectBoxComponent
            :options.sync="filterOptions"
            displayValue="roleName"
            :selectedOption.sync="selectedRole"
            :showOptions="showOptions"
            @select-option="selectRole"
            @toggle-show-options="toggleShowOptions"
        />
      </div>
      <div class="selectedRole">
        <h2 class="text text--xl text--bold">{{ selectedRole.roleName }}</h2>
        <ViewBtns :viewButtons="viewButtons" :activeViewBtn="activeViewBtn" @selected-btn="toggleActiveView" />
        <div v-show="activeViewBtn === 'with'" class="users withRole">
          <div class="user" v-for="user in selectedRole.members" :key="user.id">
            <p class="text text--lg">{{ user.fullName }}</p>
            <IconBtn @click="removeUserWithRole(user)">
              <template v-slot:svg>
                <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 0C5.5971 0 0 5.5971 0 12.5C0 19.4029 5.5971 25 12.5 25C19.4029 25 25 19.4029 25 12.5C25 5.5971 19.4029 0 12.5 0ZM17.8571 13.1696C17.8571 13.2924 17.7567 13.3929 17.6339 13.3929H7.36607C7.2433 13.3929 7.14286 13.2924 7.14286 13.1696V11.8304C7.14286 11.7076 7.2433 11.6071 7.36607 11.6071H17.6339C17.7567 11.6071 17.8571 11.7076 17.8571 11.8304V13.1696Z" fill="#9F0000" />
                </svg>
              </template>
            </IconBtn>
          </div>
        </div>
        <div v-show="activeViewBtn === 'without'" class="users withoutRole">
          <div class="user" v-for="user in selectedRole.nonMembers" :key="user.id">
            <p class="text text--lg">{{ user.fullName }}</p>
            <IconBtn @click="addUserToRole(user)">
              <template v-slot:svg>
                <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 0 12.5 0ZM18.75 13.75H13.75V18.75H11.25V13.75H6.25V11.25H11.25V6.25H13.75V11.25H18.75V13.75Z" fill="#167230" />
                </svg>
              </template>
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { IAddOrRemoveUseFromRole, ICreateRole, IRoleDto, IUserWithRole } from "@/types/Admin/Role";
import RoleService from "@/services/RoleService";
// import UIHelper from '@/utility/UIHelper'
// import { ISnackBar } from "@/types/UI/SnackBar";
import { RoleVm, UserWithRoleVm } from "@/types/ViewModels/RoleVm";
import { AddUserToRoleDto, RemoveUserFromRoleDto } from "@/types/DTO/Roles/RoleDtos";
import UIHelper from "@/utility/UIHelper";

@Component({
  components: {
    SelectBoxComponent: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/SelectBox.vue"),
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    IconBtn: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/IconBtn.vue"),
    ViewBtns: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/ViewBtns.vue")
  }
})
export default class Roles extends Vue {
  loading = true;
  roles = [] as Array<RoleVm>;
  selectedRole = {} as RoleVm;
  showOptions = false;
  viewButtons = ["with", "without"];
  activeViewBtn = "with";

  mounted(): void {
    this.getRoles();
  }

  toggleActiveView(selectedBtn: string): void {
    this.activeViewBtn = selectedBtn;
  }

  toggleShowOptions(val: boolean): void {
    this.showOptions = val;
  }

  get filterOptions(): Array<RoleVm> | [] {
    if (this.selectedRole) {
      return this.roles.filter((r) => r.roleName !== this.selectedRole.roleName);
    } else {
      return [];
    }
  }

  async addUserToRole(selectedUser: UserWithRoleVm): Promise<void> {
    const addUserToRoleDto: AddUserToRoleDto = {
      roleName: this.selectedRole.roleName,
      userId: selectedUser.id
    };
    try {
      const res = await RoleService.AddUserToRole(addUserToRoleDto);
      if (res.status === 200) {
        UIHelper.SnackBar({
          title: "Success",
          message: `${selectedUser.fullName} has been added to ${this.selectedRole.roleName} role`,
          isSnackBarShowing: true,
          classInfo: "primary"
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  async removeUserWithRole(selectedUser: UserWithRoleVm): Promise<void> {
    const removeUserFromRoleDto: RemoveUserFromRoleDto = {
      roleName: this.selectedRole.roleName,
      userId: selectedUser.id
    };
    try {
      const res = await RoleService.RemoveUserFromRole(removeUserFromRoleDto);
      if (res.status === 200) {
        UIHelper.SnackBar({
          title: "Success",
          message: `${selectedUser.fullName} has been removed from ${this.selectedRole.roleName} role`,
          isSnackBarShowing: true,
          classInfo: "primary"
        });
        setTimeout(() => {
          this.$router.go(0);
        }, 3000);
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  }

  async getRoles(): Promise<void> {
    try {
      const res = await RoleService.roleList();
      if (res.status === 200) {
        this.roles = res.data;
        this.selectedRole = res.data.find(r => r.roleName === "Admin") as RoleVm;
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, Math.floor(Math.random() * 3000));
    }
  }

  selectRole(role: RoleVm): void {
    this.selectedRole = role;
    this.showOptions = false;
  }
}
</script>

<style scoped lang="scss">
.utility {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.selectedRole {
  padding: .5rem;

  .roleOptions {
    button {
      margin-right: .5rem;
    }
  }

  .users {
    margin: 1rem 0;
  }

  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .5rem 1rem;
    border-radius: 3px;
    border: 1px solid $DarkBlue;
    margin-bottom: .5rem;

  }
}
</style>

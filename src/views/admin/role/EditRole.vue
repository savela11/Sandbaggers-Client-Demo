<template>
  <div class="editRole">
    <div v-if="!loading">
      <!-- Toggle Edit Mode -->
      <div class="d-flex justify-end">
        <v-btn @click="isEditMode = !isEditMode" color="primary" small outlined>{{ isEditMode ? 'Done' : 'Edit' }}</v-btn>
      </div>

      <!-- Form Edit Title -->
      <v-form>
        <v-text-field label="Name" v-model="editRole.name"></v-text-field>
      </v-form>

      <!-- List of Users in Role -->
      <v-list subheader>
        <v-subheader>Users</v-subheader>
        <!-- Single User -->
        <v-list-item v-for="user in editRole.users" :key="user.id" class="elevation-3 mb-4">
          <v-list-item-content>
            <v-list-item-title v-text="user.fullName"></v-list-item-title>
          </v-list-item-content>
          <!-- Delete User trash icon -->
          <v-list-item-icon v-if="isEditMode">
            <v-btn @click.prevent.stop="removeUserFromRole(user)" text>
              <v-icon color="error">mdi-delete-empty</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <!-- Update Button -->
      <div class="mt-5">
        <v-btn @click.prevent.stop="updatedRoleName" :disabled="isEditMode ? false : true" color="secondary">Update</v-btn>
      </div>
    </div>
    <!-- Loading Component -->
    <div v-if="loading">
      <Loading value="large" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IRoleDto, IUserWithoutRole, IUserWithRole } from '@/types/Admin/Role'
import UsersService from '@/services/UsersService'
import { IUserWithProfile } from '@/types/User/User'
import RoleService from '@/services/RoleService'
import UIStore from '../../../store/modules/UIStore'

@Component({ name: 'EditRole', components: { Loading: (): Promise<object> => import('@/components/ui/Loading.vue') } })
export default class EditRole extends Vue {
  loading = true
  isEditMode = false
  editRole: IRoleDto = {
    id: '',
    name: '',
    users: [],
  }
  showUsersListToAdd = false
  showConfirmModal = false

  removedUsers: Array<IUserWithoutRole> = []
  addedUsers: Array<IUserWithRole> = []
  usersWithoutRole: Array<IUserWithoutRole> = []

  initialRoleName = ''

  mounted(): void {
    this.getRoleById()
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Edit Role')
  }

  addSelectedUsers(): void {
    this.showUsersListToAdd = false
    this.usersWithoutRole.forEach((u, index) => {
      if (u.selected == 'true') {
        const addedUser = {
          id: u.id,
          fullName: u.fullName,
          roles: u.roles,
        } as IUserWithRole
        this.addedUsers.push(addedUser)
        this.usersWithoutRole.splice(index, 1)
      }
    })
  }

  removeUserFromRole(user: IUserWithRole): void {
    if (this.isEditMode) {
      const foundUserIndex = this.editRole.users.findIndex((u) => {
        return u.id === user.id
      })

      const removedUser = this.editRole.users.splice(foundUserIndex, 1)
      removedUser.forEach((u) => {
        this.removedUsers.push(u)
      })
      console.log(removedUser)
    }
  }

  async getRoleById(): Promise<void> {
    this.loading = true
    try {
      const res = await RoleService.getRoleById(this.$route.params.id)
      this.initialRoleName = res.data.name
      this.editRole = res.data
      this.loading = false
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }

  async getUsersWithoutRole(): Promise<void> {
    this.showUsersListToAdd = true
    try {
      const res = await UsersService.getUsers()
      const usersWithRoleList = res.data
      const usersWithoutRole = [] as IUserWithoutRole[]
      usersWithRoleList.forEach((u) => {
        if (u.roles) {
          if (!u.roles.includes(this.editRole.name)) {
            const user = {
              id: u.id,
              fullName: u.fullName,
              roles: u.roles,
            }
            usersWithoutRole.push(user)
          }
        }
      })

      this.usersWithoutRole = usersWithoutRole
    } catch (e) {
      console.log(e)
    }
  }

  async updatedRoleName(): Promise<void> {
    // If there are any users to delete or add.. show a confirmation modal
    if (this.removedUsers.length > 0 || this.addedUsers.length > 0) {
      this.showConfirmModal = true
      return
    }
    // else update the role
    else {
      this.loading = true
      try {
        const res = await RoleService.editRole(this.editRole)
        if (res.status === 200) {
          setTimeout(() => {
            this.$router.push('/admin/roles')
          }, 4000)
        }
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    }
  }

  async updateUsersInRole(): Promise<void> {
    this.loading = true
    let removedUsers
    if (this.removedUsers.length > 0) {
      removedUsers = {
        role: this.editRole,
        users: this.removedUsers,
      }
    }
    let addedUsers
    if (this.addedUsers.length > 0) {
      addedUsers = {
        role: this.editRole,
        users: this.addedUsers,
      }
    }
    try {
      if (removedUsers) {
        const resOne = await RoleService.removeUsersFromRole(removedUsers)
      }
      if (addedUsers) {
        const resTwo = await RoleService.addUsersToRole(addedUsers)
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.editButton {
  background-color: white;
  color: $DarkBlue;

  &--canEdit {
    background-color: $info;
    border-collapse: $info;
    color: white;
  }
}

.confirmModal {
  display: block;
}
</style>

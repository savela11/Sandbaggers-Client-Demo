<template>
  <div class=""></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IRoleDto, IUserWithoutRole, IUserWithRole } from '@/types/Admin/Role'
import Toast from '@/utility/Toasts'
import UsersService from '@/services/UsersService'
import { IUserWithProfile } from '@/types/User/User'
import RoleService from '@/services/RoleService'

@Component({ name: 'EditRole' })
export default class EditRole extends Vue {
  loading = false
  editRole: IRoleDto = {
    id: '',
    name: '',
    users: [],
  }
  showUsersListToAdd = false
  showConfirmModal = false
  canEditUsersRole = false
  removedUsers: Array<IUserWithoutRole> = []
  addedUsers: Array<IUserWithRole> = []
  usersWithoutRole: Array<IUserWithoutRole> = []

  initialRoleName = ''

  mounted(): void {
    this.getRoleById()
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

  editCurrentUsersWithRole(): void {
    this.canEditUsersRole = !this.canEditUsersRole
  }

  removeUserFromRole(user: IUserWithRole): void {
    if (this.canEditUsersRole) {
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
      setTimeout(() => {
        this.loading = false
      }, 2000)
    } catch (e) {
      setTimeout(() => {
        this.loading = false
      }, 3000)
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
          Toast.successToast({
            vInstance: this,
            message: `${this.initialRoleName} has been updated to ${this.editRole.name}.`,
            title: `Success`,
          })
          setTimeout(() => {
            this.$router.push('/admin/roles')
          }, 4000)
        }
      } catch (e) {
        this.loading = false
        console.log(e)
        Toast.errorToast({ vInstance: this, title: 'Error', message: 'There was an error', errors: e })
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

<template>
  <div class="p-1">
    <div v-if="!loading && editRole" class="card border-0">
      <div class="card-header bg-secondary text-white">
        <div class="d-flex justify-content-between">
          <h1 class="h4">{{ editRole.name }}</h1>
          <div>
            <router-link to="/admin/roles" class="btn bg-white btn-sm text-secondary font-weight-bold">back </router-link>
          </div>
        </div>
      </div>
      <!--      Card body-->
      <div class="card-body mb-5">
        <!--        Change role name form-->
        <form>
          <div class="form-group">
            <label for="roleName" class="col-form-label">Name</label>
            <div class="">
              <input type="text" v-model="editRole.name" class="form-control" id="roleName" />
            </div>
          </div>
        </form>
        <div class="py-3">
          <!--          Heading for users, edit and add buttons-->
          <div class="d-flex align-items-center justify-content-between">
            <h2 class="h6">Users</h2>
            <div class="d-flex">
              <div class="mr-3">
                <p class="text-center">{{ canEditUsersRole ? 'Done' : 'Edit' }}</p>
                <b-button class="editButton btn-sm" v-bind:class="{ 'editButton--canEdit': canEditUsersRole === true }" @click="editCurrentUsersWithRole">
                  <b-icon icon="pencil-square"></b-icon>
                </b-button>
              </div>

              <div>
                <p class="text-center">Add</p>
                <b-button v-b-modal.modal-scrollable class="btn-sm" @click="getUsersWithoutRole">
                  <b-icon icon="person-plus"></b-icon>
                </b-button>
              </div>
            </div>
          </div>
          <hr />
          <!--          List of users in role-->
          <div class="p-3 d-flex align-items-center justify-content-between" v-for="user in editRole.users" v-bind:key="user.id">
            <p>{{ user.fullName }}</p>
            <div v-if="canEditUsersRole">
              <button @click="removeUserFromRole(user)" class="btn btn-sm btn-outline-danger">remove</button>
            </div>
          </div>
        </div>
      </div>
      <!--      Card footer-->
      <div class="card-footer border-0 bg-transparent">
        <div class="row justify-content-end no-gutters btn-group-sm">
          <button @click="updatedRoleName" class="btn btn-primary ml-2">update</button>
        </div>
      </div>
    </div>

    <!--    Add users list-->
    <b-modal v-if="showUsersListToAdd" id="modal-scrollable" scrollable title="User List">
      <div v-for="user in usersWithoutRole" v-bind:key="user.id" class="d-flex justify-content-between align-items-center p-2">
        <div>
          <p>{{ user.fullName }}</p>
        </div>
        <b-form-checkbox id="checkbox-1" v-model="user.selected" name="checkbox-1" value="true" unchecked-value="false"></b-form-checkbox>
      </div>

      <template v-slot:modal-footer="{ cancel }">
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
        <!-- Button with custom close trigger value -->
        <b-button size="sm" variant="secondary" @click="addSelectedUsers">
          Add Selected
        </b-button>
      </template>
    </b-modal>

    <!--    Confirmation modal if there are users to delete or add-->
    <div v-if="showConfirmModal" class="modal confirmModal" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!--            Added users list-->
            <div v-if="addedUsers.length > 0">
              <h3 class="h6">Users To be Added</h3>
              <div v-for="user in addedUsers" v-bind:key="user.id">
                <p>{{ user.fullName }}</p>
              </div>
            </div>
            <!--            Removed Users List-->
            <div v-if="removedUsers.length > 0">
              <h3 class="h6">Users To be removed</h3>
              <div v-for="user in removedUsers" v-bind:key="user.id">
                <p>{{ user.fullName }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="updateUsersInRole" type="button" class="btn btn-danger">delete</button>
          </div>
        </div>
      </div>
    </div>

    <!--    Loading spinner-->
    <div class="loading loading--half" v-if="loading">
      <b-spinner class="loading__spinner" label="Large Spinner"></b-spinner>
    </div>
  </div>
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

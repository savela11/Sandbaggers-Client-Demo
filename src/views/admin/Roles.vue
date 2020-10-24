<template>
  <div class="roles">
    <h1>{{ viewTitle }}</h1>

    <div class="utilityBar" :class="{ creatingRole: isCreatingRole === true }">
      <button class="btn btn--xs btn--borderBlue btn--borderBottom" @click="isCreatingRole = !isCreatingRole">{{ isCreatingRole ? 'Cancel' : 'Create' }}</button>
      <div class="selectBox" v-if="!isCreatingRole">
        <label for="roles">Roles</label>
        <select id="roles" v-model="selectedRole">
          <option v-for="role in selectBoxRoles" :key="role.id" :value="role">{{ role.name }}</option>
        </select>
      </div>
    </div>
    <div class="selectedRole" v-if="!isCreatingRole && selectedRole">
      <div class="title">
        <h2>{{ selectedRole.name }}</h2>
        <div class="buttons">
          <button @click="togglePopUp(true, 'show', 'addUser')" class="btn btn--xs btn--green">Add User</button>
        </div>
      </div>
      <RolesList v-bind="{ selectedRole }" @addOrRemoveFromRole="verifyRemoveUserFromRole" />
      <PopUp v-show="isPopUpShowing" :title="popUp.title" :classStatus="popUp.classStatus" @click="togglePopUp(false, 'hide')">
        <template v-slot:content>
          <div v-if="isAddingUserToRole" class="allUsers">
            <div v-for="user in allUsers" :key="user.id" class="user">
              <h3>{{ user.fullName }}</h3>
              <button @click="addUserToRole(user)">
                <img :src="require('@/assets/icons/addCircle.svg')" alt="add + symbol" />
              </button>
            </div>
          </div>
          <div v-else class="popUpButtons">
            <button @click="removeUserFromRole(true)" class="btn btn--green btn--sm">Yes</button>
            <button @click="removeUserFromRole(false)" class="btn btn--red btn--sm">No</button>
          </div>
        </template>
      </PopUp>
    </div>

    <FormComponent v-else-if="isCreatingRole">
      <template v-slot:fieldOne>
        <label for="roleName">Role Name</label>
        <input type="text" id="roleName" v-model.trim="createRoleForm.roleName" />
      </template>

      <template v-slot:button>
        <button @click.prevent.stop="createRole" class="btn btn--xs btn--blue" id="loginBTN">Create</button>
      </template>
    </FormComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IAddOrRemoveUseFromRole, ICreateRole, IRoleDto, IUserWithRole } from '@/types/Admin/Role'
import RoleService from '@/services/RoleService'
import UIHelper from '@/utility/UIHelper'
import { ISnackBar } from '@/types/UI/SnackBar'

@Component({
  name: 'Roles',
  components: {
    RolesList: (): Promise<typeof import('*.vue')> => import('@/components/admin/roles/RolesList.vue'),
    FormComponent: (): Promise<typeof import('*.vue')> => import('@/components/ui/Forms/Form.vue'),
    PopUp: (): Promise<typeof import('*.vue')> => import('@/components/ui/PopUp.vue'),
  },
})
export default class Roles extends Vue {
  Roles = [] as IRoleDto[]
  selectedRole: null | IRoleDto = null
  showModal = false
  selectedToDelete = null as IRoleDto | null
  isCreatingRole = false
  isAddingUserToRole = false
  viewTitle = 'Roles'
  isPopUpShowing = false
  popUp = {
    classStatus: '',
    title: '',
  }
  userToRemoveFromRole: null | IAddOrRemoveUseFromRole = null
  createRoleForm: ICreateRole = {
    roleName: '',
  }

  togglePopUp(isPopUpShowing: boolean, classStatus: string, type?: string): void {
    this.popUp.classStatus = classStatus

    if (isPopUpShowing) {
      if (type === 'addUser') {
        this.isAddingUserToRole = true
        this.popUp.title = 'Users'
      } else if (type === 'removeUser') {
        this.popUp.title = `Are you sure you want to remove user from this role?`
      }
      this.isPopUpShowing = true
    } else {
      setTimeout(() => {
        this.popUp.title = ''
        this.isAddingUserToRole = false
        this.isPopUpShowing = false
      }, 500)
    }
  }

  mounted(): void {
    UIHelper.Header({ title: 'Roles', isShowing: true, current: 'main' })
    this.RoleList()
  }

  get selectBoxRoles(): IRoleDto[] {
    return this.Roles.filter((r) => {
      return r.name !== 'User'
    })
  }

  get allUsers(): IUserWithRole[] | null {
    if (this.selectedRole) {
      let users: IUserWithRole[] = []
      this.Roles.forEach((r) => {
        r.users.forEach((u) => {
          users.push(u)
        })
      })
      const listOfId: string[] = []
      this.selectedRole.users.forEach((u) => {
        listOfId.push(u.id)
      })
      users = users.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)

      return users
    } else {
      return null
    }
  }

  showUsersInRole(roleDTO: IRoleDto): Array<string> {
    return roleDTO.users.map((u) => u.fullName)
  }

  async createRole(): Promise<void> {
    try {
      const res = await RoleService.createRole(this.createRoleForm)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  async RoleList(): Promise<void> {
    await UIHelper.DataLoading(true)
    try {
      const res = await RoleService.roleList()
      if (res.status === 200) {
        this.Roles = res.data
      }
    } catch (e) {
      console.log(e)
    } finally {
      await UIHelper.DataLoading(false)
    }
  }

  async addUserToRole(user: IUserWithRole): Promise<void> {
    const foundUserIndex = this.selectedRole?.users.findIndex((u) => {
      return u.id === user.id
    })

    if (foundUserIndex === -1 && this.selectedRole) {
      await UIHelper.DataLoading(true)
      try {
        const userToAddToRole: IAddOrRemoveUseFromRole = {
          roleId: this.selectedRole.id,
          userId: user.id,
          status: 'add',
        }
        const res = await RoleService.AddOrRemoveUserFromRole(userToAddToRole)
        if (res.status === 200) {
          this.selectedRole.users.push(user)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isAddingUserToRole = false
        await UIHelper.DataLoading(false)
        const snackBarData: ISnackBar = {
          title: `Success`,
          message: `${user.fullName} added to ${this.selectedRole.name}`,
          isSnackBarShowing: true,
          class: 'primary',
          errors: [],
        }
        this.isPopUpShowing = false
        await UIHelper.SnackBar(snackBarData)
      }
    } else {
      const snackBarData: ISnackBar = {
        title: `Error`,
        message: `${user.fullName} already exists in ${this.selectedRole?.name}`,
        isSnackBarShowing: true,
        class: 'error',
        errors: [],
      }
      await UIHelper.SnackBar(snackBarData)
    }
  }

  verifyRemoveUserFromRole(payload: IAddOrRemoveUseFromRole): void {
    if (this.userToRemoveFromRole === null) {
      this.togglePopUp(true, 'show', 'removeUser')
      this.userToRemoveFromRole = payload
    } else {
      return
    }
  }

  async removeUserFromRole(status: boolean): Promise<void> {
    if (status === true && this.userToRemoveFromRole) {
      const userId = this.userToRemoveFromRole.userId
      await UIHelper.DataLoading(true)
      try {
        const res = await RoleService.AddOrRemoveUserFromRole(this.userToRemoveFromRole)
        if (res.status === 200 && this.selectedRole) {
          const usersIndex = this.selectedRole?.users.findIndex((u) => {
            return u.id === userId
          })
          this.selectedRole?.users.splice(usersIndex, 1)
        }
        console.log(res)
      } catch (e) {
        console.log(e)
      } finally {
        this.isPopUpShowing = false
        this.userToRemoveFromRole = null
        await UIHelper.DataLoading(false)
      }
    } else {
      this.isPopUpShowing = false
      this.userToRemoveFromRole = null
    }
  }

  confirmModal(status: boolean, role?: IRoleDto): void {
    this.showModal = status
    if (status && role) {
      this.selectedToDelete = role
    } else {
      this.selectedToDelete = null
    }
  }

  async deleteRole(role: IRoleDto | null): Promise<void> {
    this.confirmModal(false)
    try {
      if (role) {
        const res = await RoleService.deleteRole(role.id)
        console.log(res)
        if (res.status === 200) {
          const deletedRoleIndex = this.Roles.findIndex((r) => r.id === role.id)
          this.Roles.splice(deletedRoleIndex, 1)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/admin/_roles.scss';
</style>

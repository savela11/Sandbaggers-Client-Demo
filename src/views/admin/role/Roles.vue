<template>
  <div class="roles p-1">
<!--    Are you sure you want to delete role modal-->
    <div class="modal" tabindex="-1" role="dialog" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content" v-if="selectedToDelete">
          <div class="modal-header">
            <h5 class="modal-title">Confirm</h5>
            <button type="button" @click="confirmModal(false)" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-if="selectedToDelete">Are you sure you want to delete {{ selectedToDelete.name }} role?</p>
          </div>
          <div class="modal-footer">
            <button @click="deleteRole(selectedToDelete)" type="button" class="btn btn-danger">delete</button>
          </div>
        </div>
      </div>
    </div>
<!--    Main card-->
    <div class="card border-0">
      <div class="card-header bg-secondary text-white">
        <h1 class="h2">Roles</h1>
      </div>
      <div v-if="!loading" class="card-body">
        <div class="row justify-content-between align-items-center no-gutters">
          <div class="col-4">
            Name
          </div>
          <div class="col-4 col-md-3">
            <p class="text-md-center">
              # of Users
            </p>
          </div>
          <div class="col-4 col-md-5">
            <div class="row no-gutters justify-content-end">
              <router-link to="roles/createRole" class="btn btn-primary btn-sm">Create</router-link>
            </div>
          </div>
        </div>
        <hr />
        <div v-if="Roles.length > 0">
          <div class="row py-3 no-gutters justify-content-between align-items-center border-bottom" v-for="role in Roles" v-bind:key="role.id">
            <div class="col-4">
              <p class="m-0">{{ role.name }}</p>
            </div>
            <div class="col-3">
              <p class="m-0 text-center">{{ role.users.length || 0 }}</p>
            </div>
            <div class="col-5">
              <div class="d-flex justify-content-end">
                <div class="mr-2">
                  <router-link :to="{ name: 'EditRole', params: { id: role.id } }" class="btn m-0 btn-sm btn-secondary">
                    edit
                  </router-link>
                </div>

                <div>
                  <button @click="confirmModal(true, role)" class="btn m-0 btn-sm btn-danger">
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4" v-else>
          <p>No roles created....</p>
        </div>
      </div>
      <div v-if="loading">
        <div class="loading" v-if="loading">
          <b-spinner class="loading__spinner" label="Large Spinner"></b-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IRoleDto } from '@/types/Admin/Role'
import UIStore from '@/store/modules/UIStore'
import Toast from '@/utility/Toasts'
import RoleService from '@/services/RoleService'

@Component({ name: 'Roles' })
export default class Roles extends Vue {
  loading = false
  Roles = [] as IRoleDto[]
  showModal = false
  selectedToDelete = null as IRoleDto | null

  mounted(): void {
    UIStore._setHeaderTitle('Roles')
    this.RoleList()
  }

  async RoleList(): Promise<void> {
    try {
      const res = await RoleService.roleList()
      if (res.status === 200) {
        this.Roles = res.data
      }
      this.loading = false
    } catch (e) {
      console.log(e)
      this.loading = false
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
    this.loading = true
    this.confirmModal(false)
    try {
      if (role) {
        const res = await RoleService.deleteRole(role.id)
        console.log(res)
        if (res.status === 200) {
          const deletedRoleIndex = this.Roles.findIndex((r) => r.id === role.id)
          this.Roles.splice(deletedRoleIndex, 1)
          Toast.successToast({
            vInstance: this,
            message: `${role.name} role has been deleted.`,
            title: `Success`,
            colorVariant: `success`,
            autoHideDelay: 4000,
          })
        }
      }

      this.loading = false
    } catch (e) {
      console.log(e)
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.roles {
  .modal {
    display: block;
    background-color: rgba(168, 164, 164, 0.7);
  }
}
</style>

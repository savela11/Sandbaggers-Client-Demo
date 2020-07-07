<template>
  <div class="roles">
    <v-row class="justify-end mb-6">
      <v-btn dark fab small color="primary" to="/admin/roles/createRole">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-expansion-panels>
      <v-expansion-panel v-for="role in Roles" :key="role.id" class="mb-4">
        <v-expansion-panel-header>
          <v-row no-gutters>
            <v-col cols="4"
              ><h2 class="subtitle-1 font-weight-bold">{{ role.name }}</h2></v-col
            >
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <hr />

          <v-row no-gutters>
            <v-col cols="6" class="d-flex align-center">
              <div class="d-flex align-center">
                <p class="body-2">
                  Users
                </p>
                <p class="ml-2 caption">{{ `( ${role.users.length} )` }}</p>
              </div>
            </v-col>
            <v-col>
              <v-select :items="showUsersInRole(role)" chips flat solo></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="secondary">
                  Cancel
                </v-btn>
                <v-btn text color="primary" :to="`/admin/roles/editRole/${role.id}`">
                  Edit
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IRoleDto } from '@/types/Admin/Role'
import UIStore from '@/store/modules/UIStore'
import RoleService from '@/services/RoleService'

@Component({ name: 'Roles' })
export default class Roles extends Vue {
  loading = false
  Roles = [] as IRoleDto[]
  showModal = false
  selectedToDelete = null as IRoleDto | null
  mounted(): void {

    this.$store.dispatch('uiStore/_setHeaderTitle', 'Roles')
    this.RoleList()
  }

  showUsersInRole(roleDTO: IRoleDto): Array<string> {
    return roleDTO.users.map((u) => u.fullName)
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

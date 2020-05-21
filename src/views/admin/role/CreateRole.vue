<template>
  <div class="card border-0 p-1">
    <div class="card-header bg-secondary text-white">
      <h1 class="h3">Create Role</h1>
    </div>
    <div class="card-body">
      <form v-if="!loading">
        <div class="form-group">
          <label for="role">Role Name</label>
          <input type="text" v-model="createRoleForm.roleName" class="form-control" id="role" />
        </div>

        <div class="btn-group-sm justify-content-end row no-gutters mt-5">
          <router-link to="/admin/roles" class="btn btn-danger">Cancel</router-link>
          <button @click.prevent.stop="onSubmit" type="submit" class="ml-1 btn btn-primary">Create</button>
        </div>
      </form>
      <div class="loading" v-if="loading">
        <b-spinner class="loading__spinner" label="Large Spinner"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICreateRole } from '@/types/Admin/Role'
import RoleService from "@/services/RoleService";

@Component({ name: 'CreateRole' })
export default class CreateRole extends Vue {
  loading = false
  createRoleForm: ICreateRole = {
    roleName: '',
  }

  async onSubmit(): Promise<void> {
    this.loading = true
    try {
      const res = await RoleService.createRole(this.createRoleForm)
      if (res.data.succeeded) {
        setTimeout(() => {
          this.$router.push('/admin/roles')
        }, 4000)
      }
    } catch (e) {
      console.log(e)
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss"></style>

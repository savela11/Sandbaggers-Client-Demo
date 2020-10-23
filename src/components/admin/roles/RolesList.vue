<template>
  <div class="rolesList">
    <div class="container">
      <div class="container__bottom">
        <hr />
        <div class="list">
          <div class="user" v-for="user in selectedRole.users" :key="user.id">
            <div class="left">
              <p>{{ user.fullName }}</p>
            </div>
            <div class="right">
              <button @click="addOrRemoveUserFromRole(user.id, selectedRole.id, 'remove')">
                <img :src="require('@/assets/icons/cancel-red.svg')" alt="remove user X" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { IAddOrRemoveUseFromRole, IRoleDto } from '@/types/Admin/Role'
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
  name: 'RolesList',
  components: {},
})
export default class RolesList extends Vue {
  @Prop() selectedRole!: IRoleDto

  @Emit('addOrRemoveFromRole')
  addOrRemoveUserFromRole(userId: string, roleId: string, status: string): IAddOrRemoveUseFromRole {
    return { userId, roleId, status } as IAddOrRemoveUseFromRole
  }
}
</script>
<style scoped lang="scss"></style>

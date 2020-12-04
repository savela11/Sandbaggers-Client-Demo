<template>
  <div class="contacts">
    <div v-if="!loading">
      <h2>Contacts</h2>
      <div class="search"><label for="search"></label><input type="text" id="search"></div>
      <div class="contactsList">
        <div v-for="contact in contacts" :key="contact.fullName">
          <p>{{ contact.fullName }}</p>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactService from "@/services/ContactService";
import { ContactVm } from "@/types/ViewModels/ContactVm";
import Loading from "@/components/ui/Loading.vue";

@Component({ name: "Contacts", components: { Loading } })
export default class Contacts extends Vue {
  loading = true;
  contacts: Array<ContactVm> = [];

  mounted(): void {
    this.getContacts();
  }

  async getContacts(): Promise<void> {

    try {
      const res = await ContactService.Contacts();
      if (res.status === 200) {
        this.contacts = res.data;
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, Math.floor(Math.random() * 3000));
    }
  }
}
</script>


<style scoped lang="scss">

</style>

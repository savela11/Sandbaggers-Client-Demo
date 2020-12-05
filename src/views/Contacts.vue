<template>
  <div class="contacts">
    <div v-if="!loading">
      <div class="search input">
        <button class="toggleSearchBtn"><img :src="require('@/assets/icons/search.svg')" alt="Search icon"></button>
        <label class="hideLabel" for="search"></label><input v-model="searchInput" type="text" id="search"></div>
      <div class="contactList">
        <div class="contact" v-for="contact in searchContacts(contacts)" :key="contact.fullName">
          <div class="top">
            <h3 class="contactFullName">{{ contact.fullName }}</h3>
          </div>
          <div class="bottom">
            <div class="section phone">
              <div class="img">
                <svg width="100%" height="100%" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.3474 13.5391C20.2254 13.4168 20.0804 13.3198 19.9208 13.2536C19.7613 13.1875 19.5902 13.1534 19.4174 13.1534C19.2447 13.1534 19.0736 13.1875 18.914 13.2536C18.7545 13.3198 18.6095 13.4168 18.4874 13.5391L16.3907 15.6358C15.4186 15.3464 13.6046 14.6887 12.455 13.5391C11.3053 12.3894 10.6476 10.5756 10.3582 9.60351L12.455 7.50683C12.5772 7.38478 12.6742 7.23982 12.7404 7.08025C12.8066 6.92067 12.8406 6.74962 12.8406 6.57687C12.8406 6.40412 12.8066 6.23306 12.7404 6.07349C12.6742 5.91391 12.5772 5.76896 12.455 5.64691L7.1933 0.385467C7.07124 0.26321 6.92628 0.166218 6.7667 0.100041C6.60712 0.0338643 6.43606 -0.000198364 6.2633 -0.000198364C6.09054 -0.000198364 5.91948 0.0338643 5.7599 0.100041C5.60032 0.166218 5.45536 0.26321 5.3333 0.385467L1.7659 3.95272C1.26604 4.45256 0.984543 5.13918 0.995066 5.84027C1.02532 7.71334 1.52123 14.2191 6.64872 19.3464C11.7762 24.4737 18.2822 24.9682 20.1567 24.9998H20.1935C20.8881 24.9998 21.5445 24.7262 22.0417 24.229L25.6091 20.6617C25.7314 20.5397 25.8284 20.3947 25.8945 20.2352C25.9607 20.0756 25.9948 19.9045 25.9948 19.7318C25.9948 19.559 25.9607 19.388 25.8945 19.2284C25.8284 19.0688 25.7314 18.9239 25.6091 18.8018L20.3474 13.5391ZM20.1804 22.3678C18.5387 22.3401 12.9219 21.8995 8.50871 17.4851C4.08103 13.0576 3.6522 7.42133 3.6259 5.81264L6.2633 3.17535L9.66496 6.57687L7.96413 8.27763C7.80952 8.43212 7.69584 8.6227 7.63337 8.83214C7.57091 9.04159 7.56161 9.2633 7.60634 9.47724C7.63791 9.6285 8.41006 13.2155 10.5936 15.399C12.7772 17.5825 16.3644 18.3546 16.5156 18.3862C16.7295 18.4322 16.9514 18.4236 17.161 18.3613C17.3707 18.299 17.5613 18.185 17.7153 18.0297L19.4174 16.3289L22.8191 19.7305L20.1804 22.3678V22.3678Z" fill="#17252A" />
                </svg>
              </div>
              <div class="flexer">
                <span> - </span>
                <a v-if="contact.phoneNumber" :href="`tel:+1 ${contact.phoneNumber}`">{{ contact.phoneNumber }}</a>
                <p class="noContactInfo" v-else>No number available</p>
              </div>
            </div>
            <div class="section email">
              <div class="img">
                <svg width="100%" height="100%" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.8264 0.166672H1.95139C1.53698 0.166672 1.13956 0.342266 0.846531 0.654827C0.553505 0.967388 0.388885 1.39131 0.388885 1.83334V18.5C0.388885 18.942 0.553505 19.366 0.846531 19.6785C1.13956 19.9911 1.53698 20.1667 1.95139 20.1667H23.8264C24.2408 20.1667 24.6382 19.9911 24.9312 19.6785C25.2243 19.366 25.3889 18.942 25.3889 18.5V1.83334C25.3889 1.39131 25.2243 0.967388 24.9312 0.654827C24.6382 0.342266 24.2408 0.166672 23.8264 0.166672V0.166672ZM22.6233 18.5H3.24826L8.71701 12.4667L7.59201 11.3083L1.95139 17.5333V3.10001L11.6623 13.4083C11.9551 13.7188 12.3511 13.893 12.7639 13.893C13.1767 13.893 13.5727 13.7188 13.8654 13.4083L23.8264 2.84167V17.425L18.0764 11.2917L16.9748 12.4667L22.6233 18.5ZM2.97482 1.83334H22.5608L12.7639 12.225L2.97482 1.83334Z" fill="#17252A" />
                </svg>
              </div>
              <div class="flexer">
                <span> - </span>
                <a v-if="contact.email" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
                <p class="noContactInfo" v-else> No email available</p>
              </div>
            </div>

          </div>
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
import Helper from "@/utility/Helper";

@Component({ name: "Contacts", components: { Loading } })
export default class Contacts extends Vue {
  loading = true;
  contacts: Array<ContactVm> = [];
  searchInput = "";

  mounted(): void {
    this.getContacts();
  }

  searchContacts(contacts: Array<ContactVm>): Array<ContactVm> {
    return Helper.searchByFullName(contacts, this.searchInput);
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
$--contactFullNameFS: (
    null: 1.3rem,
    $mobile: 1.4rem
);
$--contactFS: (
    null: 1rem,
    $mobile: 1.1rem
);


.search {
  margin: 1rem 0;
  display: flex;
  align-items: center;

  .toggleSearchBtn {
    height: 30px;
    width: 30px;
    padding: 0.2rem;
    border: none;
    margin-right: .5rem;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  input {
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: .3rem .5rem;
    @include font-size($--inputFS);
  }
}

.contactList {
}

.contact {
  padding: 1rem;
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin: 1rem 0;

  .top {
    display: flex;
    justify-content: center;
    margin-bottom: .5rem;
  }

  .contactFullName {
    color: $PrimaryFS;
    @include font-size($--contactFullNameFS);
  }

  .section {
    display: flex;
    align-items: center;
    padding: .5rem;
    margin: 1rem 0;
  }

  .flexer {
    display: flex;
    align-items: center;

    span {
      margin: 0 .4rem;
    }
  }


  .email {
    .img {
      height: 20px;
      width: 25px;
    }
  }

  .phone {
    .img {
      height: 25px;
      width: 25px;
    }
  }


  a {
    color: $PrimaryFS;
    text-decoration: none;
    @include font-size($--contactFS);
  }

  .noContactInfo {
    color: red;
    @include font-size($--contactFS);
  }
}
</style>

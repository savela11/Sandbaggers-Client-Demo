<template>
  <div class="contacts">
    <div v-if="!loading">
      <div class="search input">
        <button class="toggleSearchBtn"><img :src="require('@/assets/icons/search.svg')" alt="Search icon" /></button>
        <label class="hideLabel" for="search"></label><input v-model="searchInput" class="text text--input" type="text" id="search" />
      </div>
      <div class="contactList" v-if="filteredContacts.length > 0">
        <div class="contact" v-for="contact in filteredContacts" :key="contact.fullName">
          <div class="image"><img :src="contactImage(contact.image)" alt="logo" /></div>
          <div class="inner">
            <div class="top">
              <h3 class="fullName">{{ contact.fullName }}</h3>
              <p class="email" v-if="contact.email && contact.isContactEmailShowing">{{ contact.email }}</p>
            </div>
            <div class="bottom">
              <div v-if="contact.isContactNumberShowing === true || contact.isContactEmailShowing === true">
                <a v-if="contact.email && contact.isContactEmailShowing" class="contactIcon" :href="'mailto:' + contact.email">
                  <svg width="100%" height="100%" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.4375 0H1.5625C1.1481 0 0.750671 0.175595 0.457646 0.488155C0.16462 0.800716 0 1.22464 0 1.66667V18.3333C0 18.7754 0.16462 19.1993 0.457646 19.5118C0.750671 19.8244 1.1481 20 1.5625 20H23.4375C23.8519 20 24.2493 19.8244 24.5424 19.5118C24.8354 19.1993 25 18.7754 25 18.3333V1.66667C25 1.22464 24.8354 0.800716 24.5424 0.488155C24.2493 0.175595 23.8519 0 23.4375 0V0ZM22.2344 18.3333H2.85938L8.32812 12.3L7.20312 11.1417L1.5625 17.3667V2.93333L11.2734 13.2417C11.5662 13.5521 11.9622 13.7263 12.375 13.7263C12.7878 13.7263 13.1838 13.5521 13.4766 13.2417L23.4375 2.675V17.2583L17.6875 11.125L16.5859 12.3L22.2344 18.3333ZM2.58594 1.66667H22.1719L12.375 12.0583L2.58594 1.66667Z" fill="white" />
                  </svg>


                </a>
                <a v-if="contact.phoneNumber && contact.isContactNumberShowing" class="contactIcon" :href="'sms: 1 +' + contact.phoneNumber">
                  <svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4999 23.5278C10.5192 23.5291 8.57469 22.9963 6.87128 21.9855C6.78514 21.9343 6.68944 21.9012 6.59006 21.8883C6.49067 21.8754 6.3897 21.883 6.29334 21.9105L2.23012 23.0713C2.18808 23.0834 2.14359 23.0839 2.10126 23.073C2.05893 23.062 2.02031 23.0399 1.98939 23.009C1.95847 22.9781 1.93639 22.9395 1.92543 22.8971C1.91447 22.8548 1.91503 22.8103 1.92706 22.7683L3.08796 18.7053C3.11544 18.609 3.12295 18.5081 3.11003 18.4088C3.09711 18.3094 3.06404 18.2138 3.01284 18.1277C1.77052 16.0348 1.2553 13.5899 1.54744 11.1738C1.83957 8.7576 2.92266 6.50589 4.62798 4.7694C6.3333 3.03291 8.5651 1.90914 10.9757 1.57316C13.3863 1.23718 15.8404 1.70784 17.9556 2.91183C20.0708 4.11582 21.7284 5.98554 22.6701 8.22971C23.6119 10.4739 23.785 12.9665 23.1624 15.3193C22.5397 17.6721 21.1564 19.7529 19.2279 21.2376C17.2993 22.7223 14.9338 23.5275 12.4999 23.5278ZM16.9414 11.0584C17.0793 10.9205 17.1568 10.7335 17.1568 10.5385C17.1568 10.3435 17.0793 10.1565 16.9414 10.0186C16.8035 9.88071 16.6165 9.80325 16.4215 9.80325H8.57838C8.38337 9.80325 8.19635 9.88071 8.05845 10.0186C7.92056 10.1565 7.84309 10.3435 7.84309 10.5385C7.84309 10.7335 7.92056 10.9205 8.05845 11.0584C8.19635 11.1963 8.38337 11.2737 8.57838 11.2737H16.4215C16.6165 11.2737 16.8035 11.1963 16.9414 11.0584ZM16.9414 14.9797C17.0793 14.8418 17.1568 14.6548 17.1568 14.4598C17.1568 14.2648 17.0793 14.0778 16.9414 13.9399C16.8035 13.802 16.6165 13.7245 16.4215 13.7245H8.57838C8.38337 13.7245 8.19635 13.802 8.05845 13.9399C7.92056 14.0778 7.84309 14.2648 7.84309 14.4598C7.84309 14.6548 7.92056 14.8418 8.05845 14.9797C8.19635 15.1176 8.38337 15.195 8.57838 15.195H16.4215C16.6165 15.195 16.8035 15.1176 16.9414 14.9797Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4999 0C10.3203 0.000601434 8.17873 0.570925 6.28754 1.65441C4.39635 2.7379 2.82125 4.29691 1.71847 6.17683C0.615682 8.05675 0.0235131 10.1923 0.000685905 12.3716C-0.0221413 14.551 0.525167 16.6984 1.58833 18.6011L0.51297 22.3644C0.428951 22.6586 0.425132 22.9699 0.501909 23.266C0.578686 23.5622 0.733265 23.8324 0.949629 24.0488C1.16599 24.2651 1.43627 24.4196 1.73246 24.4964C2.02865 24.5731 2.33997 24.5693 2.63416 24.4852L6.39788 23.41C8.0651 24.3423 9.92382 24.8801 11.8313 24.9821C13.7388 25.0842 15.6442 24.7478 17.4014 23.9987C19.1586 23.2497 20.7208 22.1079 21.9679 20.6612C23.2151 19.2144 24.1141 17.501 24.5959 15.6527C25.0776 13.8044 25.1294 11.8702 24.7472 9.9988C24.365 8.12735 23.5589 6.36838 22.3909 4.85696C21.223 3.34554 19.7241 2.12187 18.0095 1.27992C16.2949 0.437961 14.4101 0.000115053 12.4999 0ZM12.4999 23.5278C10.5192 23.5291 8.57469 22.9963 6.87128 21.9855C6.78514 21.9343 6.68944 21.9012 6.59006 21.8883C6.49067 21.8754 6.3897 21.883 6.29334 21.9105L2.23012 23.0713C2.18808 23.0834 2.14359 23.0839 2.10126 23.073C2.05893 23.062 2.02031 23.0399 1.98939 23.009C1.95847 22.9781 1.93639 22.9395 1.92543 22.8971C1.91447 22.8548 1.91503 22.8103 1.92706 22.7683L3.08796 18.7053C3.11544 18.609 3.12295 18.5081 3.11003 18.4088C3.09711 18.3094 3.06404 18.2138 3.01284 18.1277C1.77052 16.0348 1.2553 13.5899 1.54744 11.1738C1.83957 8.7576 2.92266 6.50589 4.62798 4.7694C6.3333 3.03291 8.5651 1.90914 10.9757 1.57316C13.3863 1.23718 15.8404 1.70784 17.9556 2.91183C20.0708 4.11582 21.7284 5.98554 22.6701 8.22971C23.6119 10.4739 23.785 12.9665 23.1624 15.3193C22.5397 17.6721 21.1564 19.7529 19.2279 21.2376C17.2993 22.7223 14.9338 23.5275 12.4999 23.5278Z" fill="white" />
                  </svg>


                </a>
                <a v-if="contact.phoneNumber && contact.isContactNumberShowing" class="contactIcon" :href="'tel: 1 +' + contact.phoneNumber">
                  <svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.3527 13.5393C19.2306 13.417 19.0856 13.32 18.9261 13.2538C18.7665 13.1877 18.5954 13.1536 18.4227 13.1536C18.2499 13.1536 18.0788 13.1877 17.9193 13.2538C17.7597 13.32 17.6147 13.417 17.4927 13.5393L15.3959 15.636C14.4238 15.3466 12.6098 14.6889 11.4602 13.5393C10.3105 12.3896 9.6528 10.5758 9.36341 9.60371L11.4602 7.50703C11.5824 7.38498 11.6794 7.24002 11.7456 7.08045C11.8118 6.92087 11.8459 6.74982 11.8459 6.57707C11.8459 6.40431 11.8118 6.23326 11.7456 6.07369C11.6794 5.91411 11.5824 5.76916 11.4602 5.64711L6.19852 0.385665C6.07646 0.263408 5.9315 0.166416 5.77192 0.100239C5.61234 0.0340627 5.44128 0 5.26852 0C5.09576 0 4.9247 0.0340627 4.76512 0.100239C4.60554 0.166416 4.46058 0.263408 4.33852 0.385665L0.771118 3.95292C0.27126 4.45276 -0.0102385 5.13938 0.000284846 5.84046C0.0305394 7.71354 0.526451 14.2193 5.65394 19.3466C10.7814 24.4739 17.2875 24.9684 19.1619 25H19.1988C19.8933 25 20.5497 24.7264 21.0469 24.2292L24.6143 20.6619C24.7366 20.5399 24.8336 20.3949 24.8998 20.2354C24.9659 20.0758 25 19.9047 25 19.732C25 19.5592 24.9659 19.3882 24.8998 19.2286C24.8336 19.069 24.7366 18.9241 24.6143 18.802L19.3527 13.5393Z" fill="white" />
                  </svg>


                </a>
              </div>
              <div v-else>
                <p>No contact information available...</p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div v-else class="notFound">
        <p>No Contacts Found...</p>
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

  contactImage(contactImage: string): string {
    if (contactImage == null) {
      return require("@/assets/logo.svg");
    } else {
      return contactImage;
    }
  }

  get filteredContacts(): Array<ContactVm> {
    return Helper.searchByProperty<ContactVm>(this.contacts, "fullName", this.searchInput);
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

$--fullNameFS: (
    null: 1.1rem,
    $mobile: 1.4rem,
    $tablet-landscape: 1.2rem,
    $desktopSmall: 1.4rem,
);
$--emailFS: (
    null: .8rem,
    $desktopSmall: 1rem
);

$--noUserFoundFS: (
    null: 1rem,
    $mobile: 1.1rem
);
$--noContactInfoAvailableFS: (
    null: .8rem,
    $mobile: .9rem
);
.search {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  @include tablet {
    width: 75%;
    margin: 1rem auto;
  }

  .toggleSearchBtn {
    height: 30px;
    width: 30px;
    padding: 0.2rem;
    border: none;
    margin-right: 0.5rem;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  input {
    border: 1px solid lightgrey;
    border-radius: 5px;
    padding: 0.3rem 0.5rem;

    @include tablet {
      padding: .5rem .8rem;
    }
  }
}

.contactList {
  @include tablet {
    display: flex;
    flex-wrap: wrap;
  }
}

.contact {
  margin: 0;
  padding: 0 1rem;
  @include tablet {
    flex: 0 0 50%;
  }

  @include tablet-landscape {
    flex: 0 0 33%;
  }

  .top {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .bottom {

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    p {
      @include font-size($--noContactInfoAvailableFS);
      color: #8b2635;
    }
  }

  .inner {
    border-radius: 5px;
    padding: 4rem 1rem 2rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 3px 8px lightgrey;
    height: 225px;

    @include mobile {
      height: 250px;
    }
  }


  .image {
    background-color: white;
    height: 80px;
    width: 80px;
    margin: 0 auto;
    padding: 0.8rem;
    border-radius: 50%;
    transform: translateY(45px);
    box-shadow: 0 2px 2px lightgrey;

    @include mobile {
      height: 90px;
      width: 90px;
    }

    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }

  .fullName {
    color: $PrimaryFS;
    line-height: 1.6;
    @include font-size($--fullNameFS);

  }

  .email {
    text-align: center;
    line-height: 1.4;
    color: $SecondaryFS;
    font-weight: 500;
    @include font-size($--emailFS);
  }

  .phone {

  }

  .contactIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    margin-right: 1rem;
    background-color: $DarkBlue;
    border: 1px solid $DarkBlue;
    border-radius: 100%;


    &:last-of-type {
      margin: 0;
    }

    @include mobile {
      height: 50px;
      width: 50px;
      margin-right: 1.5rem;
    }


    svg {
      height: 20px;
      width: 20px;

      @include mobile {
        height: 25px;
        width: 25px;
      }
    }
  }

}


.notFound {
  padding: 5rem;
  display: flex;
  justify-content: center;

  p {
    color: $Crimson;
    font-weight: bold;
    @include font-size($--noUserFoundFS);
  }
}
</style>

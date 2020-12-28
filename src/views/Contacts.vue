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
              <h3 class="fullName text text--bold text--center text--lg">{{ contact.fullName }}</h3>
              <p class="email text text--center text--sm" v-if="contact.email && contact.isContactEmailShowing">{{ contact.email }}</p>
            </div>
            <div class="bottom">
              <div v-if="contact.isContactNumberShowing === true || contact.isContactEmailShowing === true">
                <a v-if="contact.email && contact.isContactEmailShowing" class="contactIcon" :href="'mailto:' + contact.email">
                  <svg viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M23.4375 0H1.5625C1.1481 0 0.750671 0.175595 0.457646 0.488155C0.16462 0.800716 0 1.22464 0 1.66667V18.3333C0 18.7754 0.16462 19.1993 0.457646 19.5118C0.750671 19.8244 1.1481 20 1.5625 20H23.4375C23.8519 20 24.2493 19.8244 24.5424 19.5118C24.8354 19.1993 25 18.7754 25 18.3333V1.66667C25 1.22464 24.8354 0.800716 24.5424 0.488155C24.2493 0.175595 23.8519 0 23.4375 0V0ZM22.2344 18.3333H2.85938L8.32812 12.3L7.20312 11.1417L1.5625 17.3667V2.93333L11.2734 13.2417C11.5662 13.5521 11.9622 13.7263 12.375 13.7263C12.7878 13.7263 13.1838 13.5521 13.4766 13.2417L23.4375 2.675V17.2583L17.6875 11.125L16.5859 12.3L22.2344 18.3333ZM2.58594 1.66667H22.1719L12.375 12.0583L2.58594 1.66667Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a v-if="contact.phoneNumber && contact.isContactNumberShowing" class="contactIcon" :href="'sms: 1 +' + contact.phoneNumber">
                  <svg viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15 0H3C2.45833 0 1.95833 0.105794 1.5 0.317383C1.04167 0.528971 0.677083 0.813802 0.40625 1.17188C0.135417 1.52995 0 1.92057 0 2.34375V22.6562C0 23.3073 0.291667 23.8607 0.875 24.3164C1.45833 24.7721 2.16667 25 3 25H15C15.8333 25 16.5417 24.7721 17.125 24.3164C17.7083 23.8607 18 23.3073 18 22.6562V2.34375C18 1.92057 17.8646 1.52995 17.5938 1.17188C17.3229 0.813802 16.9583 0.528971 16.5 0.317383C16.0417 0.105794 15.5417 0 15 0ZM16 22.6562C16 22.8678 15.901 23.0509 15.7031 23.2056C15.5052 23.3602 15.2708 23.4375 15 23.4375H3C2.72917 23.4375 2.49479 23.3602 2.29688 23.2056C2.09896 23.0509 2 22.8678 2 22.6562V2.34375C2 2.13216 2.09896 1.94906 2.29688 1.79443C2.49479 1.63981 2.72917 1.5625 3 1.5625H15C15.2708 1.5625 15.5052 1.63981 15.7031 1.79443C15.901 1.94906 16 2.13216 16 2.34375V22.6562ZM9.01562 19.5312C8.46354 19.5312 7.98958 19.6859 7.59375 19.9951C7.19792 20.3044 7 20.6706 7 21.0938C7 21.3704 7.08854 21.6309 7.26562 21.875C7.44271 22.1191 7.6875 22.3104 8 22.4487C8.3125 22.5871 8.64583 22.6562 9 22.6562C9.35417 22.6562 9.6875 22.5871 10 22.4487C10.3125 22.3104 10.5573 22.1191 10.7344 21.875C10.9115 21.6309 11 21.3704 11 21.0938C11 20.6706 10.8073 20.3044 10.4219 19.9951C10.0365 19.6859 9.56771 19.5312 9.01562 19.5312ZM11 2.34375H7C6.72917 2.34375 6.49479 2.42106 6.29688 2.57568C6.09896 2.73031 6 2.91341 6 3.125C6 3.33659 6.09896 3.51969 6.29688 3.67432C6.49479 3.82894 6.72917 3.90625 7 3.90625H11C11.2708 3.90625 11.5052 3.82894 11.7031 3.67432C11.901 3.51969 12 3.33659 12 3.125C12 2.91341 11.901 2.73031 11.7031 2.57568C11.5052 2.42106 11.2708 2.34375 11 2.34375Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a v-if="contact.phoneNumber && contact.isContactNumberShowing" class="contactIcon" :href="'tel: 1 +' + contact.phoneNumber">
                  <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.3527 13.5393C19.2306 13.417 19.0856 13.32 18.9261 13.2538C18.7665 13.1877 18.5954 13.1536 18.4227 13.1536C18.2499 13.1536 18.0788 13.1877 17.9193 13.2538C17.7597 13.32 17.6147 13.417 17.4927 13.5393L15.3959 15.636C14.4238 15.3466 12.6098 14.6889 11.4602 13.5393C10.3105 12.3896 9.6528 10.5758 9.36341 9.60371L11.4602 7.50703C11.5824 7.38498 11.6794 7.24002 11.7456 7.08045C11.8118 6.92087 11.8459 6.74982 11.8459 6.57707C11.8459 6.40431 11.8118 6.23326 11.7456 6.07369C11.6794 5.91411 11.5824 5.76916 11.4602 5.64711L6.19852 0.385665C6.07646 0.263408 5.9315 0.166416 5.77192 0.100239C5.61234 0.0340627 5.44128 0 5.26852 0C5.09576 0 4.9247 0.0340627 4.76512 0.100239C4.60554 0.166416 4.46058 0.263408 4.33852 0.385665L0.771118 3.95292C0.27126 4.45276 -0.0102385 5.13938 0.000284846 5.84046C0.0305394 7.71354 0.526451 14.2193 5.65394 19.3466C10.7814 24.4739 17.2875 24.9684 19.1619 25H19.1988C19.8933 25 20.5497 24.7264 21.0469 24.2292L24.6143 20.6619C24.7366 20.5399 24.8336 20.3949 24.8998 20.2354C24.9659 20.0758 25 19.9047 25 19.732C25 19.5592 24.9659 19.3882 24.8998 19.2286C24.8336 19.069 24.7366 18.9241 24.6143 18.802L19.3527 13.5393Z"
                      fill="white"
                    />
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
import { Component, Vue } from 'vue-property-decorator'
import ContactService from '@/services/ContactService'
import { ContactVm } from '@/types/ViewModels/ContactVm'
import Loading from '@/components/ui/Loading.vue'
import Helper from '@/utility/Helper'

@Component({ name: 'Contacts', components: { Loading } })
export default class Contacts extends Vue {
  loading = true
  contacts: Array<ContactVm> = []
  searchInput = ''

  mounted(): void {
    this.getContacts()
  }

  contactImage(contactImage: string): string {
    if (contactImage == null) {
      return require('@/assets/logo.svg')
    } else {
      return contactImage
    }
  }

  get filteredContacts(): Array<ContactVm> {
    return Helper.searchByProperty<ContactVm>(this.contacts, 'fullName', this.searchInput)
  }

  async getContacts(): Promise<void> {
    try {
      const res = await ContactService.Contacts()
      if (res.status === 200) {
        this.contacts = res.data
      }
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        this.loading = false
      }, Math.floor(Math.random() * 3000))
    }
  }
}
</script>

<style scoped lang="scss">
$--noUserFoundFS: (
  null: 1rem,
  $mobile: 1.1rem,
);
$--noContactInfoAvailableFS: (
  null: 0.8rem,
  $mobile: 0.9rem,
);
.search {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  @include tablet {
    width: 75%;
    margin: 1rem auto;
  }
  @include tablet-landscape {
    width: 50%;
  }
  @include desktop {
    width: 30%;
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
      padding: 0.5rem 0.8rem;
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
  @include desktop {
    flex: 0 0 25%;
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
    padding: 2rem 1rem 2rem 1rem;
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
    border-radius: 50%;
    transform: translateY(45px);
    box-shadow: 0 2px 2px lightgrey;

    @include mobile {
      height: 90px;
      width: 90px;
    }

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }

  .fullName {
    color: $PrimaryFS;
    line-height: 1.6;
  }

  .email {
    text-align: center;
    line-height: 1.4;
    color: $SecondaryFS;
    font-weight: 500;
  }

  .phone {
  }

  .contactIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    margin-right: 2rem;
    background-color: $DarkBlue;
    border: 1px solid $DarkBlue;
    border-radius: 100%;
    padding: 0.5rem;

    &:last-of-type {
      margin: 0;
    }

    svg {
      height: 100%;
      width: 100%;
      object-fit: contain;
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

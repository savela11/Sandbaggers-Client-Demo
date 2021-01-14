<template>
  <div class='EditEvent'>
    <div v-if="!loading && Event.eventId">
      <ViewBtns :view-buttons="views" :active-view-btn="currentView" @selected-btn="selectedView" />
      <div class="views ">

        <div v-show="currentView === 'main'" class="view">
          <form class="form" @submit.prevent.stop="UpdateEvent">
            <InputField :isActive="Event.name !== ''">
              <template v-slot:field><label for="name">Event Name</label> <input type="text" id="name" v-model.trim="Event.name" /></template>
            </InputField>
            <input type="submit" value="Update" class="btn btn--sm my-1 btn--bg-darkBlue">
          </form>
        </div>
        <div v-show="currentView === 'registration'" class="view">
          <div class="users">
            <div class="registered">
              <h3 class="text text--base color--secondary">Registered</h3>
              <div class="user" v-for="user in Event.registeredUsers" :key="user.id">
                <p class="text text--lg">{{ user.fullName }}</p>
                <IconBtn @click="registration(user)">
                  <template v-slot:svg>
                    <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.5 0C5.5971 0 0 5.5971 0 12.5C0 19.4029 5.5971 25 12.5 25C19.4029 25 25 19.4029 25 12.5C25 5.5971 19.4029 0 12.5 0ZM17.8571 13.1696C17.8571 13.2924 17.7567 13.3929 17.6339 13.3929H7.36607C7.2433 13.3929 7.14286 13.2924 7.14286 13.1696V11.8304C7.14286 11.7076 7.2433 11.6071 7.36607 11.6071H17.6339C17.7567 11.6071 17.8571 11.7076 17.8571 11.8304V13.1696Z"
                        fill="#9F0000"
                      />
                    </svg>
                  </template>
                </IconBtn>
              </div>
            </div>
            <div class="notRegistered">
              <h3 class="text text--base color--secondary">Not Registered</h3>
              <div class="user" v-for="user in Event.unRegisteredUsers" :key="user.id">
                <p class="text text--lg">{{ user.fullName }}</p>
                <IconBtn @click="registration(user, 'register')">
                  <template v-slot:svg>
                    <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 0 12.5 0ZM18.75 13.75H13.75V18.75H11.25V13.75H6.25V11.25H11.25V6.25H13.75V11.25H18.75V13.75Z"
                        fill="#167230"
                      />
                    </svg>
                  </template>
                </IconBtn>
              </div>
            </div>

          </div>
        </div>
        <div v-show="currentView === 'itinerary'" class="view">
        </div>
        <div v-show="currentView === 'teams'" class="view">

        </div>
        <div v-show="currentView === 'location'" class="view">
          <form class="form" @submit.prevent.stop="UpdateEvent">
            <InputField :isActive="Event.location.name !== ''">
              <template v-slot:field>
                <label for="lName">Location Name</label>
                <input type="text" id="lName" v-model.trim="Event.location.name" />
              </template>
            </InputField>
            <InputField :isActive="Event.location.city !== ''">
              <template v-slot:field>
                <label for="city">City</label>
                <input type="text" id="city" v-model.trim="Event.location.city" />
              </template>
            </InputField>
            <InputField :isActive="Event.location.streetName !== ''">
              <template v-slot:field>
                <label for="sName">Street Name</label>
                <input type="text" id="sName" v-model.trim="Event.location.streetName" />
              </template>
            </InputField>
            <InputField :isActive="Event.location.streetNumbers !== ''">
              <template v-slot:field>
                <label for="sNum">Street Numbers</label>
                <input type="text" id="sNum" v-model.trim="Event.location.streetNumbers" />
              </template>
            </InputField>
            <InputField :isActive="Event.location.postalCode !== ''">
              <template v-slot:field>
                <label for="zip">Zip Code</label>
                <input type="text" id="zip" v-model.trim="Event.location.postalCode" />
              </template>
            </InputField>
            <input type="submit" value="Update" class="btn btn--sm my-1 btn--bg-darkBlue">
          </form>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>
<script lang="ts"> import { Component, Vue } from "vue-property-decorator";
import EventService from "@/services/EventService";
import { AdminEventManagerVm, EventVm, RegisteredUserVm } from "@/types/ViewModels/EventVm";
import UIHelper from "@/utility/UIHelper";
import UsersService from "@/services/UsersService";
import { RegisterUserForEventDto } from "@/types/DTO/EventDto";

@Component({
  name: "EditEvent",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue"),
    InputField: (): Promise<typeof import("*.vue")> => import("@/components/ui/Forms/InputField.vue"),
    BackBtn: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/BackBtn.vue"),
    ViewBtns: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/ViewBtns.vue"),
    IconBtn: (): Promise<typeof import("*.vue")> => import("@/components/ui/Buttons/IconBtn.vue")
  }
}) export default class EditEvent extends Vue {
  loading = true;
  Event = {} as AdminEventManagerVm;

  views: Array<string> = ["main", "registration", "itinerary", "teams", "location"];
  currentView = "main";

  mounted(): void {
    this.getEvent();
  }

  selectedView(btnView: string): void {

    this.currentView = btnView;
  }

  async UpdateEvent(): Promise<void> {
    this.loading = true;
    try {
      const res = await EventService.UpdateEvent(this.Event);
      if (res.status === 200) {
        UIHelper.SnackBar({ title: "Success", message: `${this.Event.name} has been updated`, classInfo: `primary`, isSnackBarShowing: true, errors: undefined });
        setTimeout(() => {
          this.$router.push("/Admin/EventManager");
        }, Math.floor(Math.random() * 3000));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getEvent(): Promise<void> {
    try {
      const res = await EventService.EventForEventManager(parseInt(this.$route.params.id));
      if (res.status === 200) {
        this.Event = res.data;
      }

    } catch (e) {
      console.log(e);
      UIHelper.SnackBar({ title: "Error", message: `No Event Found`, classInfo: `error`, isSnackBarShowing: true, errors: undefined });

      setTimeout(() => {
        this.$router.go(-1);
      }, Math.floor(Math.random() * 3000));


    } finally {
      setTimeout(() => {
        this.loading = false;
      }, Math.floor(Math.random() * 3000));
    }
  }

  async registration(user: RegisteredUserVm, status?: string): Promise<void> {
    var registerUserForEventDto: RegisterUserForEventDto = {
      eventId: this.Event.eventId,
      userId: user.id
    };
    try {
      let res;
      let userIndex;
      // let registerOrUnRegister = status === "register" ? "unRegisteredUsers" : "registeredUsers";
      if (status === "register") {
        res = await EventService.RegisterUserForEvent(registerUserForEventDto);

        userIndex = this.Event.unRegisteredUsers.findIndex(u => u.id === registerUserForEventDto.userId);

      } else {
        res = await EventService.UnRegisterUserFromEvent(registerUserForEventDto);

        userIndex = this.Event.registeredUsers.findIndex(u => u.id === registerUserForEventDto.userId);

      }

      if (res.status === 200) {
        if (status === "register") {
          const user = this.Event.unRegisteredUsers.splice(userIndex, 1);
          console.log(user[0]);
          this.Event.registeredUsers.unshift(user[0]);
        } else {
          const user = this.Event.registeredUsers.splice(userIndex, 1);
          console.log(user[0]);
          this.Event.unRegisteredUsers.unshift(user[0]);
        }
      }

    } catch (e) {
      console.log(e);

    } finally {


    }
  }


}
</script>

<style scoped lang="scss">
.EditEvent {

}

.views {
  padding: 2rem .5rem;
}

.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #17252a;
  margin-bottom: 0.5rem;
}


</style>

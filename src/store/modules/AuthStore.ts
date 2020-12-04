import router from "../../router";
import SecureLS from "secure-ls";
import AuthService from "../../services/AuthService";
import { ActionContext } from "vuex";
import { IRootState } from "@/store";
import { LoggedInUserVm, UserVm } from "@/types/ViewModels/UserVm";

const ls = new SecureLS({ isCompression: false });

export interface IAuthState {
  currentUser: LoggedInUserVm | undefined
  isLoggedIn: boolean
}

const state: IAuthState = {
  currentUser: undefined,
  isLoggedIn: false
};

const getters = {
  CurrentUser(state: IAuthState): LoggedInUserVm | undefined {
    return state.currentUser;
  }

};

const mutations = {
  SetLoggedInUser(state: IAuthState, loggedInUser: LoggedInUserVm): void {
    state.currentUser = loggedInUser;
    state.isLoggedIn = true;
  },

  LogoutCurrentUser(state: IAuthState): void {
    state.currentUser = undefined;
    state.isLoggedIn = false;
  },

  UpdateCurrentUserProfile(state: IAuthState, updatedUser: LoggedInUserVm): void {
    if (state.currentUser) {
      state.currentUser.email = updatedUser.email;
      state.currentUser.phoneNumber = updatedUser.phoneNumber;
      state.currentUser.fullName = `${updatedUser.profile.firstName} ${updatedUser.profile.lastName}`;
      state.currentUser.profile = updatedUser.profile;
      state.currentUser.settings = updatedUser.settings;

    } else {
      return;
    }
  }
};

const actions = {
  async SetLoggedInUser(context: ActionContext<IAuthState, IRootState>, loggedInUser: LoggedInUserVm): Promise<void> {
    localStorage.setItem("token", loggedInUser.token);
    context.commit("SetLoggedInUser", loggedInUser);
    await router.push("/dashboard");
  },

  async Logout(context: ActionContext<IAuthState, IRootState>): Promise<void> {
    try {
      await context.commit("LogoutCurrentUser");
      ls.removeAll();
      localStorage.clear();
      await router.push("/login").catch(() => {
      });
      await AuthService.logout();
    } catch (e) {
      console.log(e);
    }
  },

  async LogoutWithError(context: ActionContext<IAuthState, IRootState>): Promise<void> {
    try {
      await AuthService.logout();
      await context.commit("LogoutCurrentUser");
      ls.removeAll();
      localStorage.clear();
    } catch (e) {
      console.log(e);
    }

    return;
  },

  async updateCurrentUser(context: ActionContext<IAuthState, IRootState>, updatedUser: LoggedInUserVm): Promise<void> {
    context.commit("UpdateCurrentUserProfile", updatedUser);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

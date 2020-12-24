import router from "../../router";
import SecureLS from "secure-ls";
import AuthService from "../../services/AuthService";
import { ActionContext } from "vuex";
import { IRootState } from "@/store";
import { LoggedInUserVm, UserSettingsVm } from "@/types/ViewModels/UserVm";
import { IAuthState } from "@/types/vuexStore/AuthStore";

const ls = new SecureLS({ isCompression: false });



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

  UpdateUserSettings(state: IAuthState, userSettings: UserSettingsVm): void {
    if (state.currentUser) {
      state.currentUser.settings = userSettings;
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

  async UpdateUserSettings(context: ActionContext<IAuthState, IRootState>, userSettings: UserSettingsVm): Promise<void> {
    if (context.state.currentUser) {
      context.commit("UpdateUserSettings", userSettings);
    } else {
      context.commit("LogoutCurrentUser");
    }
  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};

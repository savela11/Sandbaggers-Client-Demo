import store from "@/store/index";


export default class NavigationHelper {


  static ToggleNavMenu(status: boolean): void {
    const navMenu = document.querySelector(".navMenu");
    const closeNavMenu = document.querySelector(".closeNavMenu");
    if (navMenu) {
      if (status) {
        store.dispatch("navigationStore/_setNavMenuShowingStatus", status).then();
        navMenu.classList.remove("hide");
        navMenu.classList.add("show");
        closeNavMenu?.classList.add("show");
        document.body.style.position = "fixed";
        document.body.style.overflowY = "hidden";
        document.body.style.margin = "0";
      } else {
        navMenu.classList.remove("show");
        navMenu.classList.add("hide");
        closeNavMenu?.classList.remove("show");
        document.body.style.position = "static";
        document.body.style.overflowY = "auto";
        setTimeout(() => {
          store.dispatch("navigationStore/_setNavMenuShowingStatus", status).then();
        }, 500);
      }
    }
  }

  /**
   *
   * @param {boolean} status
   * @returns {Promise<void>}
   * @description UI NavBar component - bottom navigation menu toggle
   * @example UIHelper.ToggleNavBar(false)
   */
  static ToggleNavBar(status: boolean): void {
    const showNavBarBtn = document.querySelector(".showNavBarBtn");
    const navBar = document.querySelector(".navBar__container");
    if (status) {
      if (showNavBarBtn) {
        showNavBarBtn.classList.remove("show");
        showNavBarBtn.classList.add("hide");
      }
      if (navBar) {
        navBar.classList.remove("hide");
        navBar.classList.add("show");
      }
    } else {
      if (showNavBarBtn) {
        showNavBarBtn.classList.remove("hide");
        showNavBarBtn.classList.add("show");
      }
      if (navBar) {
        navBar.classList.remove("show");
        navBar.classList.add("hide");
      }
    }

    setTimeout(() => {
      store.dispatch("navigationStore/_setNavBarShowingStatus", status).then();
    }, 500);
  }

  static ToggleBackBtn(status: boolean): void {
    store.dispatch("navigationStore/_setBackBtnShowingStatus", status).then();
  }
}

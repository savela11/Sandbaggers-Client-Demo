import UIHelper from "@/utility/UIHelper";
import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
import store from "../store/index";
import AdminRoutes from "./admin/AdminRoutes";
import AuthErrorRoutes from "./errors/AuthErrorRoutes";

function loadView(view: string) {
  return (): Promise<typeof import("*.vue")> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

Vue.use(VueRouter);

// function authRoute(to: Route, from: Route, next: any): any {
//   UIHelper.PageLoading(true);
//   // let headerName = "";
//   // if (to.name) {
//   //
//   //   if (to.name !== "NotFound") {
//   //     headerName = to.name;
//   //   } else {
//   //     headerName = "Login";
//   //
//   //   }
//   // }
//   if (store.state.authStore.isLoggedIn) {
//     next("/dashboard");
//   } else {
//     next();
//     // UIHelper.Header({ current: "auth", isShowing: true, title: headerName, bgColor: "white" });
//     // UIHelper.PageLoading(false);
//
//   }
// }

function guardRoute(to: Route, from: Route, next: any): any {
  let authenticated = false;
  UIHelper.PageLoading(true);
  if (store.state.authStore.isLoggedIn) {
    authenticated = true;
  }

  const headerTitle = "";

  if (authenticated) {
    next();
    UIHelper.PageLoading(false);
    UIHelper.Header({ current: "main", isShowing: true, title: headerTitle, bgColor: "white" });
  } else {
    store.dispatch("authStore/Logout").then();
    UIHelper.PageLoading(false);
    next("/login");
  }
}

const routes: Array<RouteConfig> = [
  ...AdminRoutes,
  ...AuthErrorRoutes,
  {
    path: "*",
    name: "NotFound",
    beforeEnter: guardRoute,
    component: loadView("/Dashboard")
  },
  {
    path: "/register",
    name: "Register",
    component: loadView("auth/Register")
  },
  {
    path: "/login",
    name: "Login",
    component: loadView("auth/Login")
  },
  {
    path: "/userProfile",
    name: "UserProfile",
    beforeEnter: guardRoute,
    component: loadView("UserProfile")
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    beforeEnter: guardRoute,
    component: loadView("Dashboard")

  },
  {
    path: "/sandbagger/:id",
    name: "Sandbagger",
    beforeEnter: guardRoute,
    component: loadView("Sandbagger")
  },
  {
    path: "/sandbaggerEvents",
    name: "Events",
    beforeEnter: guardRoute,
    component: loadView("event/SandbaggerEvents")

  },
  {
    path: "/sandbaggerEvents/:eventId",
    name: "SandbaggerEvent",
    beforeEnter: guardRoute,
    component: loadView("event/SandbaggerEvent")
  },
  {
    path: "/profile",
    name: "Profile",
    beforeEnter: guardRoute,
    component: loadView("user/Profile")
  },
  {
    path: "/bets",
    name: "Bets",
    beforeEnter: guardRoute,
    component: loadView("bet/Bets")

  },
  {
    path: "/bets/:betId",
    name: "SelectedBet",
    beforeEnter: guardRoute,
    component: loadView("bet/SelectedBet")

  },
  {
    path: "/ideas",
    name: "Ideas",
    beforeEnter: guardRoute,
    component: loadView("Ideas")
  },
  {
    path: "/ideas/editIdea/:id",
    name: "EditIdea",
    beforeEnter: guardRoute,
    component: loadView("ideas/EditIdea")
  },
  {
    path: "/powerRankings",
    name: "PowerRankings",
    beforeEnter: guardRoute,
    component: loadView("PowerRankings")

  },
  {
    path: "/powerRankings/CreatePowerRanking/:eventId/:userId",
    name: "CreatePowerRanking",
    beforeEnter: guardRoute,
    component: loadView("powerRankings/CreatePowerRanking")

  },
  {
    path: "/mockDrafts",
    name: "MockDrafts",
    beforeEnter: guardRoute,
    component: loadView("MockDrafts")

  },
  {
    path: "/gallery",
    name: "Gallery",
    beforeEnter: guardRoute,
    component: loadView("Gallery")
  },

  { path: "/contacts",
    name: "Contacts",
    beforeEnter: guardRoute,
    component: loadView("Contacts")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition): any {
    return { x: 0, y: 0 };
  }
});

export default router;

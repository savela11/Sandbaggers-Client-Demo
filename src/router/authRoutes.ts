import UIHelper from "@/utility/UIHelper";
import { Route } from "vue-router";
import store from "../store/index";
import AuthLayout from "@/layouts/authLayouts/AuthLayout.vue";
import AuthLayoutNoNavBar from '@/layouts/authLayouts/AuthLayoutNoNavBar.vue';


function loadView(view: string): () => Promise<typeof import("*.vue")> {
  return (): Promise<typeof import("*.vue")> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}



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

export default  [


  {
    path: "/userProfile",
    name: "UserProfile",
    beforeEnter: guardRoute,
    component: loadView("UserProfile"),
    meta: {
      layout: AuthLayoutNoNavBar
    }
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    beforeEnter: guardRoute,
    component: loadView("Dashboard"),
    meta: {
      layout: AuthLayout
    }
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
    component: loadView("Bets")

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
  {
    path: "/gallery/:eventId",
    name: "GalleryImages",
    beforeEnter: guardRoute,
    component: loadView("gallery/GalleryImages")
  },
  {
    path: "/contacts",
    name: "Contacts",
    beforeEnter: guardRoute,
    component: loadView("Contacts")
  }
];



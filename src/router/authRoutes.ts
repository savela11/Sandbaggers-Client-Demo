import UIHelper from "@/utility/UIHelper";
import { Route } from "vue-router";
import store from "../store/index";
import AuthLayout from "@/layouts/authLayouts/AuthLayout.vue";
import AuthLayoutNoNavBar from '@/layouts/authLayouts/AuthLayoutNoNavBar.vue';
import AuthLayoutNoHeader from "@/layouts/authLayouts/AuthLayoutNoHeader.vue";
import AuthLayoutNoBars from "@/layouts/authLayouts/AuthLayoutNoBars.vue";


function loadView(view: string): () => Promise<typeof import("*.vue")> {
  return (): Promise<typeof import("*.vue")> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}



function guardRoute(to: Route, from: Route, next: any): any {
  let authenticated = false;
  UIHelper.PageLoading(true);
  if (store.state.authStore.isLoggedIn) {
    authenticated = true;
  }
console.log(to);
  const headerTitle = "";
if(to.meta.backBtn) {
  store.dispatch("navigationStore/_setBackBtnShowingStatus", true).then()
}else {
  store.dispatch("navigationStore/_setBackBtnShowingStatus", false).then()
}
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
      layout: AuthLayoutNoBars
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
    component: loadView("Sandbagger"),
    meta: {
      layout: AuthLayoutNoNavBar
    }
  },
  {
    path: "/sandbaggerEvents",
    name: "Events",
    beforeEnter: guardRoute,
    component: loadView("event/SandbaggerEvents"),
    meta: {
      layout: AuthLayout
    }

  },
  {
    path: "/sandbaggerEvents/:eventId",
    name: "SandbaggerEvent",
    beforeEnter: guardRoute,
    component: loadView("event/SandbaggerEvent"),
    meta: {
      layout: AuthLayout
    }
  },

  {
    path: "/bets",
    name: "Bets",
    beforeEnter: guardRoute,
    component: loadView("Bets"),
    meta: {
      layout: AuthLayout
    }

  },
  {
    path: "/bets/:betId",
    name: "SelectedBet",
    beforeEnter: guardRoute,
    component: loadView("bet/SelectedBet"),
    meta: {
      layout: AuthLayout
    }

  },
  {
    path: "/ideas",
    name: "Ideas",
    beforeEnter: guardRoute,
    component: loadView("Ideas"),
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: "/ideas/editIdea/:id",
    name: "EditIdea",
    beforeEnter: guardRoute,
    component: loadView("ideas/EditIdea"),
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: "/powerRankings",
    name: "PowerRankings",
    beforeEnter: guardRoute,
    component: loadView("PowerRankings"),
    meta: {
      layout: AuthLayout
    }

  },
  {
    path: "/powerRanking/edit/:eventId",
    name: "EditPowerRanking",
    beforeEnter: guardRoute,
    component: loadView("powerRankings/EditPowerRanking"),
    meta: {
      layout: AuthLayout,
      backBtn: true
    }

  },
  {
    path: "/mockDrafts",
    name: "MockDrafts",
    beforeEnter: guardRoute,
    component: loadView("MockDrafts"),
    meta: {
      layout: AuthLayout
    }

  },
  {
    path: "/gallery",
    name: "Gallery",
    beforeEnter: guardRoute,
    component: loadView("Gallery"),
    meta: {
      layout: AuthLayoutNoHeader
    }
  },
  {
    path: "/gallery/:eventId",
    name: "GalleryImages",
    beforeEnter: guardRoute,
    component: loadView("gallery/GalleryImages"),
    meta: {
      layout: AuthLayoutNoBars
    }
  },
  {
    path: "/contacts",
    name: "Contacts",
    beforeEnter: guardRoute,
    component: loadView("Contacts"),
    meta: {
      layout: AuthLayout
    }
  }
];



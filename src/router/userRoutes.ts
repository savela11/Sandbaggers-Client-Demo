import UIHelper from "@/utility/UIHelper";
import { Route, NavigationGuardNext } from "vue-router";
import store from "../store/index";
import AuthLayout from "@/layouts/authLayouts/AuthLayout.vue";
import AuthLayoutNoNavBar from '@/layouts/authLayouts/AuthLayoutNoNavBar.vue';
import AuthLayoutNoHeader from "@/layouts/authLayouts/AuthLayoutNoHeader.vue";
import AuthLayoutNoBars from "@/layouts/authLayouts/AuthLayoutNoBars.vue";


function loadView(view: string): () => Promise<typeof import("*.vue")> {
  return (): Promise<typeof import("*.vue")> => import(/* webpackChunkName: "view-[request]" */ `@/views/user/${view}.vue`);
}



function guardRoute(to: Route, from: Route, next: NavigationGuardNext): any {
  let authenticated = false;
  UIHelper.PageLoading(true);
  if (store.state.authStore.isLoggedIn) {
    authenticated = true;
  }

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
    store.dispatch("navigationStore/_setBackBtnShowingStatus", false).then()
    UIHelper.PageLoading(false);
    next("/login");
  }
}

export default  [
  {
    path: "/userProfile",
    name: "UserProfile",
    beforeEnter: guardRoute,
    component: loadView("userProfile/UserProfile"),
    meta: {
      layout: AuthLayoutNoBars,
      backBtn: true
    }
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    beforeEnter: guardRoute,
    component: loadView("dashboard/Dashboard"),
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
      layout: AuthLayoutNoBars,
      backBtn: true
    }
  },
  {
    path: "/Events",
    name: "Events",
    beforeEnter: guardRoute,
    component: loadView("event/Events"),
    meta: {
      layout: AuthLayout
    }

  },
  {
    path: "/Event/:eventId",
    name: "SandbaggerEvent",
    beforeEnter: guardRoute,
    component: loadView("event/Event"),
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: "/bets",
    name: "Bets",
    beforeEnter: guardRoute,
    component: loadView("bet/Bets"),
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
    path: "/MyBets",
    name: "MyBets",
    beforeEnter: guardRoute,
    component: loadView("bet/MyBets"),
    meta: {
      layout: AuthLayout,
      backBtn: true
    }

  },
  {

    path: "/MyBets/:betId",
    name: "MyBet",
    beforeEnter: guardRoute,
    component: loadView("bet/MyBet"),
    meta: {
      layout: AuthLayout,
      backBtn: true
    }
  },
  {
    path: "/bet/AddBet",
    name: "AddBet",
    beforeEnter: guardRoute,
    component: loadView("bet/AddBet"),
    meta: {
      layout: AuthLayout
    }

  },
  {
    path: "/ideas",
    name: "Ideas",
    beforeEnter: guardRoute,
    component: loadView("idea/Ideas"),
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: "/ideas/editIdea/:id",
    name: "EditIdea",
    beforeEnter: guardRoute,
    component: loadView("idea/EditIdea"),
    meta: {
      layout: AuthLayout
    }
  },
   {
        path: "/ideas/addIdea",
        name: "AddIdea",
        beforeEnter: guardRoute,
        component: loadView("idea/AddIdea"),
        meta: {
            layout: AuthLayout
        }
    },
  {
    path: "/powerRankings",
    name: "PowerRankings",
    beforeEnter: guardRoute,
    component: loadView("powerRankings/PowerRankings"),
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
    component: loadView("mockDraft/MockDrafts"),
    meta: {
      layout: AuthLayout
    }

  },
  {
    path: "/gallery",
    name: "Gallery",
    beforeEnter: guardRoute,
    component: loadView("gallery/Gallery"),
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
    component: loadView("contact/Contacts"),
    meta: {
      layout: AuthLayout
    }
  }
];



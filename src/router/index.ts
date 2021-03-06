import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import store from '../store/index'
import adminRoutes from './adminRoutes'
import userRoutes from './userRoutes'
import additionalRoutes from '@/router/additionalRoutes'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

function loadView(view: string) {
  return (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

Vue.use(VueRouter)

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

// function guardRoute(to: Route, from: Route, next: any): any {
//   let authenticated = false;
//   UIHelper.PageLoading(true);
//   if (store.state.authStore.isLoggedIn) {
//     authenticated = true;
//   }
//
//   const headerTitle = "";
//
//   if (authenticated) {
//     next();
//     UIHelper.PageLoading(false);
//     UIHelper.Header({ current: "main", isShowing: true, title: headerTitle, bgColor: "white" });
//
//
//   } else {
//     store.dispatch("authStore/Logout").then();
//     UIHelper.PageLoading(false);
//     next("/login");
//   }
// }

function noGuard(to: Route, from: Route, next: any): any {
  store.dispatch("navigationStore/_setBackBtnShowingStatus", false).then()
  next();
}

function defaultGuard(to: Route, from: Route, next: any): any {
  store.dispatch('authStore/Logout').then()
  next()
}

const routes: Array<RouteConfig> = [
  ...userRoutes,
  ...adminRoutes,
    ...additionalRoutes,
  {
    path: '*',
    name: 'NotFound',
    beforeEnter: defaultGuard,
    component: loadView('NotFound'),
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: '/register',
    name: 'Register',
    beforeEnter: noGuard,
    component: loadView('auth/Register'),
    meta: {
      layout: DefaultLayout,
    },
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: noGuard,
    component: loadView('auth/Login'),
    meta: {
      layout: DefaultLayout,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(): any {
    return { x: 0, y: 0 }
  },
})

export default router

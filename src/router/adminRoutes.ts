﻿import { Route } from 'vue-router'
import UIHelper from '@/utility/UIHelper'
import store from '@/store'

function loadView(view: string) {
  return (): Promise<typeof import("*.vue")> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

function guardAdminRoute(to: Route, from: Route, next: any): any {
  let authenticated = false
  if (store.state.authStore.isLoggedIn && store.state.authStore.currentUser && store.state.authStore.currentUser.roles.includes('Admin')) {
    authenticated = true
  }
  if (authenticated) {
    UIHelper.PageLoading(false);
    UIHelper.Header({ current: "main", isShowing: true, title: 'Admin', bgColor: "white" });
    next()
  } else {
    store.dispatch('authStore/Logout').then();
    next('/login')
  }
}

export default [
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: guardAdminRoute,
    component: loadView('admin/index'),
    meta: {},
  },
  {
    path: '/admin/roles',
    name: 'Roles',
    beforeEnter: guardAdminRoute,
    component: loadView('admin/Roles'),
    meta: {},
  },
  {
    path: '/admin/roles/createRole',
    name: 'CreateRole',
    beforeEnter: guardAdminRoute,
    component: loadView('admin/role/CreateRole'),
    meta: {},
  },
  {
    path: '/admin/roles/editRole/:id',
    name: 'EditRole',
    beforeEnter: guardAdminRoute,
    component: loadView('admin/role/EditRole'),
    meta: {},
  },

  {
    path: '/admin/events',
    name: 'Admin Events',
    beforeEnter: guardAdminRoute,
    component: loadView('admin/events/AdminEvents'),
    meta: {},
  },
  {
    path: '/admin/events/createEvent',
    name: 'Create Event',
    beforeEnter: guardAdminRoute,
    component: loadView('admin/events/CreateEvent'),
    meta: {},
  },
  {
    path: '/admin/events/editEvent/:id',
    name: 'Edit Event',
    beforeEnter: guardAdminRoute,
    component: loadView('admin/events/EditEvent'),
    meta: {},
  },
  {
    path: '/admin/events/eventTeams/:eventId',
    name: 'Event Teams',
    beforeEnter: guardAdminRoute,
    component: loadView('admin/events/EventTeams'),
    meta: {},
  },
]
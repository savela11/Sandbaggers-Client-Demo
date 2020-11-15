import UIHelper from '@/utility/UIHelper'
import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import store from '../store/index'
import AdminRoutes from './admin/AdminRoutes'
import AuthErrorRoutes from './errors/AuthErrorRoutes'

function loadView(view: string) {
  return (): Promise<object> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

Vue.use(VueRouter)

function authRoute(to: Route, from: Route, next: any): any {
  let headerName = ''
  if (to.name) {
    headerName = to.name
  }
  UIHelper.Header({ current: 'auth', isShowing: true, title: headerName, bgColor: 'white' })
  UIHelper.PageLoading(false)
  if (store.state.authStore.isLoggedIn) {
    next('/dashboard')
  } else {
    next()
  }
}

function guardRoute(to: Route, from: Route, next: any): any {
  let authenticated = false
  UIHelper.PageLoading(true)
  if (store.state.authStore.isLoggedIn) {
    authenticated = true
  }

  const headerTitle = ''
  if (from.name === 'Dashboard') {
    UIHelper.Header({ current: 'main', isShowing: true, title: headerTitle, bgColor: 'white' })
  }


  if (authenticated) {
    next()
    UIHelper.PageLoading(false)
  } else {
    store.dispatch('authStore/Logout')
    next('/login')
  }
}

const routes: Array<RouteConfig> = [
  ...AdminRoutes,
  ...AuthErrorRoutes,
  {
    path: '*',
    name: 'NotFound',
    component: loadView('dashboard/Dashboard'),
    meta: {}
  },
  {
    path: '/register',
    name: 'Register',
    beforeEnter: authRoute,
    component: loadView('auth/Register')
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: authRoute,
    component: loadView('auth/Login')
  },
  {
    path: '/userProfile',
    name: 'UserProfile',
    beforeEnter: guardRoute,
    component: loadView('UserProfile'),
    meta: {}
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    beforeEnter: guardRoute,
    component: loadView('dashboard/Dashboard'),
    meta: {
      canFavorite: true
    }
  },
  {
    path: '/sandbagger/:id',
    name: 'Sandbagger',
    beforeEnter: guardRoute,
    component: loadView('Sandbagger'),
    meta: {}
  },
  {
    path: '/sandbaggerEvents',
    name: 'Events',
    beforeEnter: guardRoute,
    component: loadView('event/SandbaggerEvents'),
    meta: {
      canFavorite: true
    }
  },
  {
    path: '/sandbaggerEvents/:eventId',
    name: 'SandbaggerEvent',
    beforeEnter: guardRoute,
    component: loadView('event/SandbaggerEvent'),
    meta: {}
  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: guardRoute,
    component: loadView('user/Profile'),
    meta: {}
  },
  {
    path: '/bets',
    name: 'Bets',
    beforeEnter: guardRoute,
    component: loadView('bet/Bets'),
    meta: {
      canFavorite: true
    }
  },
  {
    path: '/bets/:betId',
    name: 'SelectedBet',
    beforeEnter: guardRoute,
    component: loadView('bet/SelectedBet')

  },
  {
    path: '/ideas',
    name: 'Ideas',
    beforeEnter: guardRoute,
    component: loadView('Ideas'),
    meta: {}
  },
  {
    path: '/powerRankings',
    name: 'PowerRankings',
    beforeEnter: guardRoute,
    component: loadView('PowerRankings'),

    meta: {
      canFavorite: true
    }
  },
  {
    path: '/mockDrafts',
    name: 'MockDrafts',
    beforeEnter: guardRoute,
    component: loadView('MockDrafts'),
    meta: {
      canFavorite: true
    }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    beforeEnter: guardRoute,
    component: loadView('Gallery'),
    meta: {
      canFavorite: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition): any {
    return { x: 0, y: 0 }
  }
})

export default router

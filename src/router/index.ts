import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import store from '../store/index'
import AdminRoutes from './admin/AdminRoutes'
import AuthErrorRoutes from './errors/AuthErrorRoutes'
import { ICurrentUser } from '@/types/User/AuthUser'

function loadView(view: string) {
  return (): Promise<object> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

Vue.use(VueRouter)

function guardRoute(to: Route, from: Route, next: any): any {
  let authenticated = false
  if (store.state.authStore.isLoggedIn) {
    authenticated = true
  }

  if (authenticated) {
    next()
  } else {
    next('/login')
  }
}

const routes: Array<RouteConfig> = [
  ...AdminRoutes,
  ...AuthErrorRoutes,
  {
    path: '*',
    name: 'Not-Found',
    component: loadView('Dashboard'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: loadView('auth/Register'),
  },
  {
    path: '/login',
    name: 'Login',
    component: loadView('auth/Login'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: loadView('Dashboard'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sandbagger/:profileId',
    name: 'Sandbagger',
    component: loadView('Sandbagger'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sandbaggerEvents',
    name: 'SandbaggerEvents',
    component: loadView('event/SandbaggerEvents'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sandbaggerEvents/:eventId',
    name: 'SandbaggerEvent',
    component: loadView('event/SandbaggerEvent'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: loadView('user/Profile'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/bets',
    name: 'Bets',
    component: loadView('Bets'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: (): any => {
    return { x: 0, y: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const currentUser: ICurrentUser = store.getters['authStore/CurrentUser']

  if (to.name === 'Login') {
    if (currentUser) {
      return next({ path: '/dashboard' })
    }
  }
  if (to.meta.requiresAuth) {
    if (currentUser === null) {
      await store.dispatch('authStore/LogoutWithError', { title: 'Session Expired', message: 'You must re-login.' })
      return next({ path: '/login' })
    } else {
      return next()
    }
  }
  if (to.path.startsWith('/admin')) {
    if (currentUser.roles.includes('Admin')) {
      return next()
    } else {
      await store.dispatch('authStore/LogoutWithError', { title: 'Authorization Error', message: 'You do not have access to admin section' })
      return next({ path: '/login' })
    }
  }

  return next()
})

export default router

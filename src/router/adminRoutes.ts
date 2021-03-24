import { Route, NavigationGuardNext } from 'vue-router'
import UIHelper from '@/utility/UIHelper'
import store from '@/store'

// import AuthLayout from '@/layouts/authLayouts/AuthLayout.vue'
// import AuthLayoutNoNavBar from '@/layouts/authLayouts/AuthLayoutNoNavBar.vue'
// import AuthLayoutNoHeader from '@/layouts/authLayouts/AuthLayoutNoHeader.vue'
// import AuthLayoutNoBars from '@/layouts/authLayouts/AuthLayoutNoBars.vue'
import AuthLayoutNoHeaderAlt from "@/layouts/authLayouts/AuthLayoutNoHeader-Alt.vue";

function loadView(view: string) {
    return (): Promise<typeof import('*.vue')> => import(/* webpackChunkName: "view-[request]" */ `@/views/admin/${view}.vue`)
}

function guardAdminRoute(to: Route, from: Route, next: NavigationGuardNext): any {
    let authenticated = false
    if (store.state.authStore.isLoggedIn && store.state.authStore.currentUser && store.state.authStore.currentUser.roles.includes('Admin')) {
        authenticated = true
    }
    if (authenticated) {
        if (to.meta.backBtn) {
            store.dispatch('navigationStore/_setBackBtnShowingStatus', true).then()
        } else {
            store.dispatch('navigationStore/_setBackBtnShowingStatus', false).then()
        }
        UIHelper.PageLoading(false)
        UIHelper.Header({ current: 'main', isShowing: true, title: 'Admin', bgColor: 'white' })
        next()
    } else {
        store.dispatch('authStore/Logout').then()
        next('/login')
    }
}

export default [
    {
        path: '/admin',
        name: 'Admin',
        beforeEnter: guardAdminRoute,
        component: loadView('index'),
        meta: {},
    },
    {
        path: '/admin/roles',
        name: 'Roles',
        beforeEnter: guardAdminRoute,
        component: loadView('roleManager/Roles'),
        meta: {
            layout: AuthLayoutNoHeaderAlt,
        },
    },
    {
        path: '/admin/createRole',
        name: 'CreateRole',
        beforeEnter: guardAdminRoute,
        component: loadView('roleManager/CreateRole'),
        meta: {
            layout: AuthLayoutNoHeaderAlt,
            backBtn: true,
        },
    },
    {
        path: '/admin/roles/editRole/:id',
        name: 'EditRole',
        beforeEnter: guardAdminRoute,
        component: loadView('role/EditRole'),
        meta: {
            layout: AuthLayoutNoHeaderAlt,
        },
    },
    {
        path: '/admin/eventManager',
        name: 'Event Manager',
        beforeEnter: guardAdminRoute,
        component: loadView('eventManager/EventManager'),
        meta: {
            layout: AuthLayoutNoHeaderAlt,
        },
    },
    {
        path: '/admin/createEvent',
        name: 'Create Event',
        beforeEnter: guardAdminRoute,
        component: loadView('eventManager/CreateEvent'),
        meta: {
            layout: AuthLayoutNoHeaderAlt,
            backBtn: true,
        },
    },
    {
        path: '/admin/editEvent/:id',
        name: 'Edit Event',
        beforeEnter: guardAdminRoute,
        component: loadView('eventManager/EditEvent'),
        meta: {
            layout: AuthLayoutNoHeaderAlt,
            backBtn: true,
        },
    },
    {
        path: '/admin/events/eventTeams/:eventId',
        name: 'Event Teams',
        beforeEnter: guardAdminRoute,
        component: loadView('events/EventTeams'),
        meta: {
            layout: AuthLayoutNoHeaderAlt,
        },
    },

    {
        path: '/admin/DraftManager/',
        name: 'Draft Manager',
        beforeEnter: guardAdminRoute,
        component: loadView('draftManager/DraftManager'),
        meta: {
            layout: AuthLayoutNoHeaderAlt,
        },
    },
]

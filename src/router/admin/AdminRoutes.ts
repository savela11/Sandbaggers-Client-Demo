function loadView(view: string) {
  return (): Promise<object> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

export default [
  {
    path: '/admin',
    name: 'Admin',
    component: loadView('admin/index'),

    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/roles',
    name: 'Roles',
    component: loadView('admin/Roles'),

    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/roles/createRole',
    name: 'CreateRole',
    component: loadView('admin/role/CreateRole'),

    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/roles/editRole/:id',
    name: 'EditRole',
    component: loadView('admin/role/EditRole'),

    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/admin/events',
    name: 'Admin Events',
    component: loadView('admin/events/AdminEvents'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/events/createEvent',
    name: 'Create Event',
    component: loadView('admin/events/CreateEvent'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/events/editEvent/:id',
    name: 'Edit Event',
    component: loadView('admin/events/EditEvent'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/admin/events/eventTeams/:eventId',
    name: 'Event Teams',
    component: loadView('admin/events/EventTeams'),
    meta: {
      requiresAuth: true,
    },
  },
]

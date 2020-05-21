function loadView(view: string) {
  return (): Promise<object> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

export default [
  {
    path: '/admin/events',
    name: 'AdminEvents',
    component: loadView('admin/events/AdminEvents'),
  },

  {
    path: '/admin/events/create',
    name: 'CreateEvent',
    component: loadView('admin/events/CreateEvent'),
  },
  {
    path: '/admin/events/editEvent/:id',
    name: 'EditEvent',
    component: loadView('admin/events/EditEvent'),
  },
]

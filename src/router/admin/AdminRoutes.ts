import AdminEventRoutes from './AdminEvent'


function loadView(view: string) {
    return (): Promise<object> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

export default [
    ...AdminEventRoutes,
    {
        path: "/admin",
        name: "Admin",
        component: loadView("admin/index")
    },
    {
        path: "/admin/roles",
        name: "Roles",
        component: loadView("admin/role/Roles")
    },
    {
        path: "/admin/roles/createRole",
        name: "CreateRole",
        component: loadView("admin/role/CreateRole")
    },
    {
        path: "/admin/roles/editRole/:id",
        name: "EditRole",
        component: loadView("admin/role/EditRole")
    }
]

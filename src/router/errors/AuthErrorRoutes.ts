function loadView(view: string) {
    return (): Promise<object> => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

export default [
    {
        path: "/errors/alreadyLoggedIn",
        name: "AlreadyLoggedIn",
        component: loadView("errors/AlreadyLoggedIn")
    }
]

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        meta: { requiresAuth: true },
      },
      { path: "login", component: () => import("pages/UserLogin.vue") },
      // другие маршруты
    ],
  },
  // другие маршруты
];

export default routes;

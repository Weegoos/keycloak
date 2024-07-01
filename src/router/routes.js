const routes = [
  {
    path: "/",
    component: () => import("pages/IndexPage.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/UserLogin.vue"),
  },
  // другие маршруты
];

export default routes;

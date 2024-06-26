// src/router/routes.js
const routes = [
  {
    path: "/",
    component: () => import("pages/IndexPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: () => import("pages/UserLogin.vue"),
  },
  {
    path: "/user-profile",
    component: () => import("pages/UserProfile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;

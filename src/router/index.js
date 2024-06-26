// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import keycloak from "../keycloak";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await keycloak.init({ onLoad: "login-required" });
      if (keycloak.authenticated) {
        next();
      } else {
        keycloak.login();
      }
    } catch (error) {
      console.error("Ошибка инициализации Keycloak:", error);
      next("/login");
    }
  } else {
    next();
  }
});

export default router;

// src/boot/keycloak.js
import { boot } from "quasar/wrappers";
import keycloak from "../keycloak";

export default boot(({ app, router }) => {
  return new Promise((resolve, reject) => {
    keycloak
      .init({ onLoad: "login-required", checkLoginIframe: false })
      .then((authenticated) => {
        if (authenticated) {
          app.config.globalProperties.$keycloak = keycloak;

          router.beforeEach(async (to, from, next) => {
            if (to.matched.some((record) => record.meta.requiresAuth)) {
              if (!keycloak.authenticated) {
                keycloak.login();
              } else {
                next();
              }
            } else {
              next();
            }
          });

          resolve();
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Ошибка инициализации Keycloak:", error);
        reject(error);
      });
  });
});

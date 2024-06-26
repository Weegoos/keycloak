import { boot } from "quasar/wrappers";
import keycloak from "src/keycloak";

export default boot(({ app, router }) => {
  keycloak
    .init({ onLoad: "login-required" })
    .then((authenticated) => {
      if (!authenticated) {
        window.location.reload();
      } else {
        app.config.globalProperties.$keycloak = keycloak;

        keycloak.onTokenExpired = () => {
          keycloak.updateToken(30).catch(() => {
            keycloak.logout();
          });
        };

        router.beforeEach((to, from, next) => {
          if (to.meta.requiresAuth && !keycloak.authenticated) {
            keycloak.login();
          } else {
            next();
          }
        });
      }
    })
    .catch(() => {
      console.error("Authenticated Failed");
    });
});

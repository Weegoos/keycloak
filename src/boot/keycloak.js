import { boot } from "quasar/wrappers";
import axios from "axios";
import keycloak from "src/keycloak";

// Функция для удаления cookies по их имени
function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export default boot(({ app, router }) => {
  // Проверяем наличие токена в cookies
  const hasToken = document.cookie.includes("KEYCLOAK_IDENTITY");

  // Инициализация Keycloak в зависимости от наличия токена
  keycloak
    .init({ onLoad: "login-required" })
    .then((authenticated) => {
      if (!authenticated) {
        keycloak.login();
      } else {
        app.config.globalProperties.$keycloak = keycloak;

        // Настройка обработки токена с Axios
        axios.interceptors.request.use((config) => {
          if (keycloak.token) {
            console.log("Используем токен Keycloak:", keycloak.token);
            config.headers.Authorization = `Bearer ${keycloak.token}`;
          } else {
            console.warn("Отсутствует токен Keycloak при отправке запроса.");
          }
          return config;
        });

        // Удаление cookies через 30 секунд
        setTimeout(function () {
          deleteCookie("KEYCLOAK_IDENTITY");
          deleteCookie("KEYCLOAK_SESSION");
        }, 30000);

        // Обработка истечения срока действия токена
        keycloak.onTokenExpired = () => {
          keycloak.updateToken(30).catch(() => {
            keycloak.logout();
          });
        };

        // Переход к маршруту после успешной аутентификации
        keycloak.onReady = (authenticated) => {
          if (authenticated) {
            router.push("/");
          }
        };

        // Переход к маршруту, если требуется аутентификация и пользователь не аутентифицирован
        router.beforeEach((to, from, next) => {
          if (to.meta.requiresAuth && !keycloak.authenticated) {
            keycloak.login();
          } else {
            next();
          }
        });
      }
    })
    .catch((error) => {
      console.error("Ошибка аутентификации", error);
    });
});

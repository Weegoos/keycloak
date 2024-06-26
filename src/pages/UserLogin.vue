<template>
  <div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Имя пользователя:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Войти с помощью Keycloak Batyr</button>
    </form>

    <div v-if="user">
      <p>Добро пожаловать, {{ user.username }}!</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import keycloak from "src/keycloak";

const username = ref("");
const password = ref("");
const user = ref(null);

const handleLogin = async () => {
  try {
    await keycloak.login({
      username: username.value,
      password: password.value,
    });
    checkAuthentication();
  } catch (error) {
    console.error("Ошибка входа:", error);
    alert("Ошибка входа. Проверьте правильность имени пользователя и пароля.");
  }
};

const checkAuthentication = () => {
  if (keycloak.authenticated) {
    const userData = {
      username: keycloak.tokenParsed.preferred_username,
      email: keycloak.tokenParsed.email,
    };
    user.value = userData;
    alert(`Вы связаны, ${userData.username}`);
  }
};

// Вызывается при монтировании компонента для проверки аутентификации
checkAuthentication();
</script>

<template>
  <q-page>
    <h1>Вход</h1>
    <form @submit.prevent="login">
      <q-input filled v-model="username" label="Имя пользователя" required />
      <q-input
        filled
        type="password"
        v-model="password"
        label="Пароль"
        required
      />
      <q-btn type="submit">Войти</q-btn>
    </form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import keycloak from "../keycloak";

const username = ref("");
const password = ref("");

const login = async () => {
  try {
    await keycloak.login({
      username: username.value,
      password: password.value,
    });
  } catch (error) {
    console.error("Ошибка входа:", error);
  }
};
</script>

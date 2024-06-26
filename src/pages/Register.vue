<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-page>
    <h1>Регистрация</h1>
    <form @submit.prevent="register">
      <q-input filled v-model="username" label="Имя пользователя" required />
      <q-input filled v-model="email" label="Email" required />
      <q-input
        filled
        type="password"
        v-model="password"
        label="Пароль"
        required
      />
      <q-btn type="submit">Зарегистрироваться</q-btn>
    </form>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import connectKeycloakAdmin from "../keycloakAdmin";

const username = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
  try {
    const kcAdminClient = await connectKeycloakAdmin();
    await kcAdminClient.users.create({
      realm: "WebApp",
      username: username.value,
      email: email.value,
      enabled: true,
      credentials: [
        {
          type: "password",
          value: password.value,
          temporary: false,
        },
      ],
    });
    alert("Регистрация успешна!");
  } catch (error) {
    console.error("Ошибка регистрации:", error);
  }
};
</script>

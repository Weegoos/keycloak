<!-- src/pages/UserLogin.vue -->
<template>
  <div>
    <button @click="login">Войти с помощью Keycloak</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const login = () => {
  keycloak.login();
};
</script>

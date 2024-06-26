<!-- src/pages/Index.vue -->

<template>
  <div>
    <h1>Welcome to BATYR WEB APP</h1>
    <button @click="login">Login with Keycloak</button>
  </div>
</template>

<script setup>
import keycloak from "../keycloak"; // Adjust the path if necessary

const login = () => {
  // keycloak.login();
  alert("Batyr");
};
</script>

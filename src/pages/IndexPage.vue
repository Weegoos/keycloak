<template>
  <div>
    <p>Привет, {{ username }}</p>
    <q-btn label="Выход" @click="logout" />
  </div>
</template>

<script setup>
import { ref, onMounted, onErrorCaptured } from "vue";
import axios from "axios";
import keycloak from "../keycloak";

const username = ref("");

const fetchUserProfile = async () => {
  try {
    const response = await axios.get("/http://localhost:8080/");
    username.value = response.data.username;
  } catch (error) {
    console.error("Не удалось загрузить профиль пользователя", error);
  }
};

const logout = () => {
  keycloak.logout({ redirectUri: window.location.origin });
};

onMounted(() => {
  fetchUserProfile();
});

onErrorCaptured((err, instance, info) => {
  console.log(err);
});
</script>

<template>
  <q-page>
    <div v-if="$keycloak.authenticated">
      <p>Welcome, {{ $keycloak.tokenParsed.preferred_username }}</p>
      <q-btn @click="logout" label="Logout" />
    </div>
    <div v-else>
      <p>You are not authenticated. Redirecting...</p>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const logout = () => {
  $keycloak.logout();
};

const router = useRouter();
if (!$keycloak.authenticated) {
  router.push("/login");
}
</script>

<style></style>

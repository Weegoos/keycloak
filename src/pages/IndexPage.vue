<template>
  <div>
    <h1>Welcome, {{ userName }}</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  computed: {
    userName() {
      return this.$keycloak.tokenParsed
        ? this.$keycloak.tokenParsed.preferred_username
        : "";
    },
  },
  methods: {
    logout() {
      this.$keycloak.logout();
    },
  },
};
</script>

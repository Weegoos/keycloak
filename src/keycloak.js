// src/keycloak.js

import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080/",
  realm: "WebApp",
  clientId: "webApp",
});

export default keycloak;

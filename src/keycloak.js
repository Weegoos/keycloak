import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  realm: "WebApp",
  url: "http://localhost:8080/",
  clientId: "webApp",
  clientSecret: "oi8ZN8i4MtIQW8hwvkdtFRNDPkhMHP99",
});

export default keycloak;

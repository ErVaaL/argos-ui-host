import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const appOrigin =
  typeof window === "undefined"
    ? "http://127.0.0.1:5173"
    : window.location.origin;
const storage =
  typeof window === "undefined" ? undefined : window.localStorage;
const userStore = storage ? new WebStorageStateStore({ store: storage }) : undefined;
const stateStore = storage ? new WebStorageStateStore({ store: storage }) : undefined;

export const userManager = new UserManager({
  authority: "http://auth.localhost/realms/argos",
  client_id: "argos-frontend",
  redirect_uri: `${appOrigin}/callback`,
  post_logout_redirect_uri: `${appOrigin}/logout-callback`,
  silent_redirect_uri: `${appOrigin}/silent-renew`,
  automaticSilentRenew: true,
  useRefreshTokens: true,
  response_type: "code",
  scope: "openid profile email",
  ...(userStore ? { userStore } : {}),
  ...(stateStore ? { stateStore } : {}),
});

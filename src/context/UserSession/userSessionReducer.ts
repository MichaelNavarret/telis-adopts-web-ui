import { isDefined } from "../../tools/commons";
import { UserSessionContextState } from "./UserSessionContext";

export type UserSessionReducerAction = UserSessionContextState & {
  type:
    | "setOwnerInfo"
    | "setPermissions"
    | "setToken"
    | "setFirstToken"
    | "loadToken"
    | "loadFirstToken"
    | "clearSession";
};

export function saveToken(token?: string | null) {
  if (!isDefined(token)) return;
  localStorage.setItem("telisWeb_token", token);
}

export function saveFirstToken(token?: string | null) {
  if (!isDefined(token)) return;
  localStorage.setItem("telisWeb_firstToken", token);
}

export function loadToken(): string | null {
  return localStorage.getItem("telisWeb_token");
}

export function loadFirstToken(): string | null {
  return localStorage.getItem("telisWeb_firstToken");
}

export function userSessionReducer(
  state: UserSessionContextState,
  action: UserSessionReducerAction
) {
  const newState = { ...state };
  switch (action.type) {
    case "setOwnerInfo":
      newState.ownerInfo = action.ownerInfo;
      break;
    case "setPermissions":
      newState.permissions = action.permissions;
      break;
    case "setToken":
      newState.token = action.token;
      saveToken(action.token);
      break;
    case "setFirstToken":
      newState.firstToken = action.firstToken;
      saveFirstToken(action.firstToken);
      break;
    case "loadToken":
      const token = loadToken();
      newState.token = token;
      break;
    case "loadFirstToken":
      const firstToken = loadFirstToken();
      newState.firstToken = firstToken;
      break;
    case "clearSession":
      return {
        token: null,
      };
  }

  return newState;
}

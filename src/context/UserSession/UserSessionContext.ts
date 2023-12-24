import { createContext } from "react";
import { OwnerInfo } from "../../types/owner";
import { PermissionInfo } from "../../types/permission";

export type UserSessionContextState = {
  ownerInfo?: OwnerInfo;
  permissions?: PermissionInfo[];
  token?: string | null;
  firstToken?: string | null;
};

const baseContext: {
  state: UserSessionContextState;
  updateOwnerInfo: () => void;
  updatePermissions: () => void;
  setToken: (_: string) => void;
  setFirstToken: (_: string) => void;
  loadToken: () => void;
  loadFirstToken: () => void;
  clearSession: () => void;
} = {
  state: {},
  updateOwnerInfo: () => {},
  updatePermissions: () => {},
  setToken: () => {},
  setFirstToken: () => {},
  loadToken: () => {},
  loadFirstToken: () => {},
  clearSession: () => {},
};

export const UserSessionContext = createContext(baseContext);

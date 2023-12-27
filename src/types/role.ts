import { PermissionInfo } from "./permission";

export type RoleInfo = {
  id: string;
  name: string;
  active: boolean;
  permissions: PermissionInfo[];
};

export type RoleCollectionResponse = {
  roles: RoleInfo[];
};

export type RoleSingletonResponse = {
  role: RoleInfo;
};

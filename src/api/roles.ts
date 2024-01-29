import request from "../tools/request";
import { RoleCollectionResponse, RoleSingletonResponse } from "../types/role";

export const listRoles = async () => {
  const data = await request
    .get<RoleCollectionResponse>("roles")
    .then((res) => res.data.roles);
  return data;
};

export const loadPermissions = async (roleId: string) => {
  const data = await request
    .get<RoleSingletonResponse>(`roles/${roleId}/permissions`)
    .then((res) => {
      return res.data.roleSingletonInfo.permissions;
    });
  return data;
};

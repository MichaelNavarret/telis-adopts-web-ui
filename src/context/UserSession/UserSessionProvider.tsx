import { useCallback, useReducer } from "react";
import {
  UserSessionContext,
  UserSessionContextState,
} from "./UserSessionContext";
import { userSessionReducer } from "./userSessionReducer";
import { getMyOwner } from "../../api/owners";
import { loadPermissions } from "../../api/roles";

const defaultState: UserSessionContextState = {};

export function UserSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(userSessionReducer, defaultState);

  const token = state.token;
  const ownerInfo = state.ownerInfo;

  const updateOwnerInfo = useCallback(async () => {
    if (!token) return;
    const ownerInfo = await getMyOwner();
    dispatch({
      type: "setOwnerInfo",
      ownerInfo,
    });
  }, [token, dispatch]);

  const updatePermissions = useCallback(async () => {
    if (!ownerInfo) return;
    const response = await loadPermissions(ownerInfo.role.id);
    dispatch({
      type: "setPermissions",
      permissions: response,
    });
  }, [ownerInfo, dispatch]);

  const setToken = useCallback(
    (token: string) => {
      dispatch({
        type: "setToken",
        token,
      });
    },
    [dispatch]
  );

  const setFirstToken = useCallback(
    (token: string) => {
      dispatch({
        type: "setFirstToken",
        token,
      });
    },
    [dispatch]
  );

  const loadToken = useCallback(() => {
    dispatch({
      type: "loadToken",
    });
  }, [dispatch]);

  const loadFirstToken = useCallback(() => {
    dispatch({
      type: "loadFirstToken",
    });
  }, [dispatch]);

  const clearSession = useCallback(() => {
    dispatch({
      type: "clearSession",
    });
  }, [dispatch]);

  return (
    <UserSessionContext.Provider
      value={{
        state,
        updateOwnerInfo,
        updatePermissions,
        setToken,
        setFirstToken,
        loadToken,
        loadFirstToken,
        clearSession,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
}

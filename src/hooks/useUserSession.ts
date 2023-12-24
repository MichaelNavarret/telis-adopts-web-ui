import { useCallback, useContext, useEffect, useMemo } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserSessionContext } from "../context/UserSession/UserSessionContext";
import { isDefined } from "../tools/commons";
import Toast, { ToastProps } from "../components/Toast";
import { jwtDecode } from "jwt-decode";

const useUserSession = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    setToken,
    loadToken,
    clearSession,
    updateOwnerInfo,
    updatePermissions,
    state,
  } = useContext(UserSessionContext);
  const token = state.token;
  const ownerInfo = state.ownerInfo;
  const permissions = state.permissions;

  useEffect(() => {
    if (isDefined(token) && !isDefined(ownerInfo)) {
      updateOwnerInfo();
    }
  }, [token, ownerInfo, updateOwnerInfo]);

  useEffect(() => {
    if (isDefined(ownerInfo) && !isDefined(permissions)) {
      updatePermissions();
    }
  }, [ownerInfo, permissions, updatePermissions]);

  const logout = (toastMessage?: ToastProps) => {
    queryClient.clear();
    localStorage.clear();
    navigate("/login");
    if (toastMessage) Toast(toastMessage);
    clearSession();
  };

  const loadTokenFromStorage = useCallback(() => {
    loadToken();
  }, [loadToken]);

  const isAuth = useMemo(() => {
    if (typeof token === "undefined") return null;

    if (token === null) return false;

    const decodedToken: any = jwtDecode(token);

    if (decodedToken.userpriv === 0) return false;

    const currentTime = Math.floor(Date.now() / 1000);
    const remainingTime = decodedToken.exp - currentTime;

    if (remainingTime < 0) return false;

    return true;
  }, [token]);

  const setLoginToken = useCallback(
    (token: string) => {
      setToken(token);
    },
    [setToken]
  );

  const refreshOwnerInfo = useCallback(() => {
    updateOwnerInfo();
    updatePermissions();
  }, [updateOwnerInfo, updatePermissions]);

  return {
    _loadTokenFromStorage: loadTokenFromStorage,
    _setLoginToken: setLoginToken,
    _token: token,
    isAuth: isAuth,
    logout: logout,
    ownerInfo: state.ownerInfo,
    permissions: state.permissions,
    refreshOwnerInfo: refreshOwnerInfo,
  };
};

export default useUserSession;

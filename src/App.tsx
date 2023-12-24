import MainContainer from "./app/EntryPoint/MainContainer";
import { UserSessionProvider } from "./context/UserSession/UserSessionProvider";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import useUserSession from "./hooks/useUserSession";
import { useCallback } from "react";
import Toast from "./components/Toast";

const queryClient = new QueryClient();

function isError(args: unknown): args is unknown {
  return true;
}

export function errorMsg(error: any, def = "An error occurred") {
  let message = error?.response?.data?.message?.message;
  if (message) message = error?.response?.data?.message;
  return message ?? def;
}

function showToast(error: unknown) {
  Toast({
    type: "error",
    subTitle: errorMsg(error),
  });
}

function onErrorHandler(error: unknown) {
  if (isError(error)) {
    showToast(error);
    return Promise.reject(error);
  }
  return error;
}

const QueryConfig = () => {
  const queryClient = useQueryClient();
  const { logout } = useUserSession();

  const retryHandler = useCallback(
    (failureContent: number, error: unknown) => {
      if (isError(error)) {
        if ((error as any).response?.status === 401) {
          logout({
            type: "error",
            subTitle: errorMsg(error, "Invalid Credentials"),
          });
        } else if ((error as any).response?.status === 403) {
          return false;
        }
        return failureContent < 3;
      }
      return true;
    },
    [logout]
  );

  queryClient.setDefaultOptions({
    queries: {
      onError: onErrorHandler,
      retry: retryHandler,
    },
    mutations: {
      retry: false,
      onError: onErrorHandler,
    },
  });

  return <></>;
};

function App() {
  return (
    <UserSessionProvider>
      <QueryClientProvider client={queryClient}>
        <MainContainer />
        <QueryConfig />
      </QueryClientProvider>
    </UserSessionProvider>
  );
}

export default App;

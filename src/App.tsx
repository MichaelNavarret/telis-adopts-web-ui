import { useCallback } from "react";
import MainContainer from "./app/EntryPoint/MainContainer";
import { UserSessionProvider } from "./context/UserSession/UserSessionProvider";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import useUserSession from "./hooks/useUserSession";
import { RouteProps } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { ThemeProvider } from "./context/ThemeProvider";
import strings from "./l10n";
import { Toaster } from "react-hot-toast";
import { errorToast } from "./constants/toasts";

const App: React.FunctionComponent<RouteProps> = () => {
  const queryClient = new QueryClient({});

  function isError(_args: unknown): _args is unknown {
    return true;
  }

  function errorMsg(error: any, def = strings.SOMETHING_WENT_WRONG) {
    let message = error?.response?.data?.message;
    if (!message) message = error?.response?.data?.message;
    return message ?? def;
  }

  function onErrorHandler(error: unknown) {
    console.log("onErrorHandler");
    if (isError(error)) {
      errorToast(errorMsg(error));
      return;
    }
    return error;
  }

  const QueryConfig = () => {
    const queryClient = useQueryClient();
    const { logout } = useUserSession();

    const retryHandler = useCallback(
      (failureCount: number, error: unknown) => {
        console.log("retryHandler", failureCount, error);
        if (isError(error)) {
          if ((error as any).response?.status === 401) {
            logout();
            return false;
          } else if ((error as any).response?.status === 403) {
            return false;
          }
          return failureCount < 3;
        }
        return true;
      },
      [logout]
    );

    queryClient.setDefaultOptions({
      queries: {
        retry: retryHandler,
        onError: onErrorHandler,
      },
      mutations: {
        retry: false,
        onError: onErrorHandler,
      },
    });

    return <></>;
  };

  return (
    <ErrorBoundary>
      <Toaster />
      <ThemeProvider>
        <UserSessionProvider>
          <QueryClientProvider client={queryClient}>
            <MainContainer />
            <QueryConfig />
          </QueryClientProvider>
        </UserSessionProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

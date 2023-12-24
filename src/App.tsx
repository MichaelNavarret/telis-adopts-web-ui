import MainContainer from "./app/EntryPoint/MainContainer";
import { UserSessionProvider } from "./context/UserSession/UserSessionProvider";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <UserSessionProvider>
      <QueryClientProvider client={queryClient}>
        <MainContainer />
      </QueryClientProvider>
    </UserSessionProvider>
  );
}

export default App;

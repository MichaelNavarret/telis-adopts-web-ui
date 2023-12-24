import { BrowserRouter } from "react-router-dom";
import MainContainer from "./app/EntryPoint/MainContainer";

function App() {
  return (
    <BrowserRouter>
      <MainContainer />
    </BrowserRouter>
  );
}

export default App;

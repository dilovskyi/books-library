import "./App.css";
import AppContext from "../../hoc/AppContext";

import AuthModal from "../AuthModal/AuthModal";
import Header from "../Header/Header";

function App() {
  return (
    <div className="App">
      <AppContext>
        <AuthModal />
        <Header />
      </AppContext>
    </div>
  );
}

export default App;

import "./App.css";
import AppContext from "../../hoc/AppContext";

import CheckAuth from "../../hoc/CheckAuth";

import AuthModal from "../AuthModal/AuthModal";
import Header from "../Header/Header";

function App() {
  return (
    <AppContext>
      <AuthModal />
      <div className="App">
        <CheckAuth>
          <Header />
        </CheckAuth>
      </div>
    </AppContext>
  );
}

export default App;

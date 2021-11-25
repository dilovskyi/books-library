import "./App.css";
import AppContext from "../../hoc/AppContext";

import AuthModal from "../AuthModal/AuthModal";

function App() {
  return (
    <div className="App">
      <AppContext>
        <AuthModal />
      </AppContext>
    </div>
  );
}

export default App;

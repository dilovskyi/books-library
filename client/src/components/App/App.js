import "./App.css";
import AppContext from "../../hoc/AppContext";

import CheckAuth from "../../hoc/CheckAuth";

import AuthModal from "../AuthModal/AuthModal";
import Header from "../Header/Header";

import BooksList from "../BooksList/BooksList";

function App() {
  return (
    <AppContext>
      <AuthModal />
      <div className="App">
        <CheckAuth>
          <Header />
          <BooksList />
        </CheckAuth>
      </div>
    </AppContext>
  );
}

export default App;

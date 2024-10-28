import "./styles/App.scss";
import { Route } from "react-router-dom";

import Header from "./navigation/Header";
import AuthHeader from "./navigation/AuthHeader";
import Footer from "./navigation/Footer";
import DefaultContainer from "./routing/DefaultContainer";
import Cookies from "js-cookie";
import { useAuthInfo } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuthInfo();
  const authToken = Cookies.get("auth_token");

  return (
    <div className="App">
      {authToken && isLoggedIn ? <AuthHeader /> : <Header />}

      <Route component={DefaultContainer} />

      <Footer />
    </div>
  );
}

export default App;

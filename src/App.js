import "./App.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authService from "./services/auth.service";

function App() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogin = async () => {
      console.log(".....................");
      let loggedIn = await authService.isLoggedIn(username);
      if (!loggedIn) {
        console.log("trigger");
        navigate("/login");
      }
    };

    checkLogin();
  }, []);

  return (
    <>
      <div className="app-root">
        <Outlet />
      </div>
    </>
  );
}

export default App;

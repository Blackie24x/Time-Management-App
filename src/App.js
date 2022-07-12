import Menu from "./components/menu/Menu";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import Context, { Store } from "./context/Context";
import Alert from "./components/alert/Alert";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Tasks from "./components/tasks/Tasks";
import Pomo from "./components/pomo/Pomo";
import Notes from "./components/notes/Notes";
import { useContext, useEffect } from "react";

function App() {
  const { isLoggedIn, userName, activeSpace, spaces, setActiveSpace } =
    useContext(Store);
  useEffect(() => {
    console.log(activeSpace, spaces.length);
    if (spaces.length && !activeSpace) {
      console.log(spaces);
      setActiveSpace(spaces[0]);
    }
  }, [isLoggedIn]);
  return isLoggedIn ? (
    <div className="app">
      <Alert />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/pomo" element={<Pomo />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>

      <Menu />
    </div>
  ) : (
    <>
      {" "}
      <Alert />
      <Auth />
    </>
  );
}

export default App;

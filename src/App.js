import Menu from "./components/menu/Menu";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import { Store } from "./context/Context";
import Alert from "./components/alert/Alert";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Tasks from "./components/tasks/Tasks";
// import Pomo from "./components/pomo/Pomo";
// import Notes from "./components/notes/Notes";
import { useContext, useEffect, Suspense, lazy } from "react";

const Tasks = lazy(() => import("./components/tasks/Tasks"));
const Pomo = lazy(() => import("./components/pomo/Pomo"));
const Notes = lazy(() => import("./components/notes/Notes"));

function App() {
  const { isLoggedIn, activeSpace, spaces, setActiveSpace } = useContext(Store);
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
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/pomo" element={<Pomo />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </Suspense>
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

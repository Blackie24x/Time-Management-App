import Menu from "./components/menu/Menu";
import Context from "./context/Context";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Tasks from "./components/tasks/Tasks";
import Pomo from "./components/pomo/Pomo";

function App() {
  return (
    <Context>
      <div className="app">
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/pomo" element={<Pomo />} />
        </Routes>

        <Menu />
      </div>
    </Context>
  );
}

export default App;

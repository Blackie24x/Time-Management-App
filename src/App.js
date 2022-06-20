import Menu from "./components/menu/Menu";
import Context from "./context/Context";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Tasks from "./components/tasks/Tasks";

function App() {
  return (
    <Context>
      <div className="app">
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
        </Routes>

        <Menu />
      </div>
    </Context>
  );
}

export default App;

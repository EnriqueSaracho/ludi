import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { AddGame } from "./pages/add-game";
import { EditGame } from "./pages/edit-game";
import { Game } from "./pages/game";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/add-game" element={<AddGame />} />
          <Route path="/edit-game/:id" element={<EditGame />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

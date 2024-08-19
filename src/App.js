import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Home } from "./pages/home";
import { AddGame } from "./pages/add-game";
import { EditGame } from "./pages/edit-game";
import { Game } from "./pages/game";
import { Auth } from "./pages/auth";

function App() {
  return (
    <div className="bg-secondary min-h-screen min-w-full pt-12">
      <Router>
        <Navbar />
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/add-game" element={<AddGame />} />
          <Route path="/edit-game/:id" element={<EditGame />} />
          <Route path="/auth" element={<Auth />} />
        </Routes> */}
      </Router>
    </div>
  );
}

export default App;

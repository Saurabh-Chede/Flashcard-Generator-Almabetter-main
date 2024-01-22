import "./App.css";
import LogoBar from "./components/LogoBar";
import NavBar from "./components/NavBar";
import CreateFlashCard from "./pages/CreateFlashCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyFlashCard from "./pages/MyFlashCard";

function App() {
  return (
    <div className="App">
      <LogoBar />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/createflashcard" element={<CreateFlashCard />}>
            CreateFlashcard
          </Route>
          <Route path="/myflashcard" element={<MyFlashCard />}>
            MyFlashCard
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

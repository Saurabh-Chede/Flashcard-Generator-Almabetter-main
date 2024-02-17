import "./App.css";
import LogoBar from "./components/LogoBar";
import NavBar from "./components/NavBar";
import CreateFlashCard from "./pages/CreateFlashCard";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyFlashCard from "./pages/MyFlashCard";
import store from "./redux/store";
import { Provider } from "react-redux";
import FlashCardDetails from "./pages/FlashCardDetails";

function App() {
  return (
    <div className="App">
      <LogoBar />
      <div>
      <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/createflashcard" element={<CreateFlashCard />}>
            CreateFlashcard
          </Route>
          <Route path="/myflashcard" element={<MyFlashCard />}>
            MyFlashCard
          </Route>
          <Route path="/flashCardDetails" element={<FlashCardDetails />}>
                FlashCardDetails Page
              </Route>
              <Route path="*" element={<CreateFlashCard />}>
                Default Page
              </Route>
        </Routes>
      </Router>
      </Provider>
      </div>
    </div>
  );
}

export default App;

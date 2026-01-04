import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TutorialsList from "./pages/TutorialsList";
import AddTutorial from "./pages/AddTutorial";
import Tutorial from "./pages/Tutorial";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="text-white bg-blue-400 p-4">
          <div className="flex space-x-4">
            <Link to="/tutorials" className="hover:text-gray-300 font-bold">
              Tutorials
            </Link>
            <Link to="/add" className="hover:text-gray-300">
              Add
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<TutorialsList />} />
          <Route path="/tutorials" element={<TutorialsList />} />
          <Route path="/add" element={<AddTutorial />} />
          <Route path="/tutorials/:id" element={<Tutorial />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

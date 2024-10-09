import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./(authenticated)/Homepage/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import CalcForm from "./features/calculator/CalcForm";

function App() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-white sm:p-6 bg-slate-900">
      <Routes>
        <Route path="/" element={<CalcForm />} />
      </Routes>
    </div>
  );
}

export default App;

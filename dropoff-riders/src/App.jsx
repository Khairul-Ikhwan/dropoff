import { Route, Routes, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import "./App.css";
import JobsPage from "./(authenticated)/JobsPage/JobsPage";
import GlobalLayout from "./(authenticated)/components/layout/GlobalLayout";
import ActivePage from "./(authenticated)/ActivePage/ActivePage";

function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Scroll to the bottom on initial load or when a new route is navigated to
  //   window.scrollTo(0, document.body.scrollHeight);
  // }, [navigate]);

  return (
    <>
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<JobsPage />} />
          <Route path="/active" element={<ActivePage />} />
        </Routes>
      </GlobalLayout>
    </>
  );
}

export default App;

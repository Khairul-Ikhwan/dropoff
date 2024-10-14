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
          <Route path="/completed" element={<h1>Completed Jobs</h1>} />
          <Route path="/settings" element={<h1>Settings</h1>} />

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </GlobalLayout>
    </>
  );
}

export default App;

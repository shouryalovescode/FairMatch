import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import Candidates from "./pages/Candidates";
import Evaluation from "./pages/Evaluation";
import Fairness from "./pages/Fairness";
import Methodology from "./pages/Methodology";
import { ToastProvider } from "./components/Toast";

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyze" element={<ResumeAnalysis />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/fairness" element={<Fairness />} />
          <Route path="/methodology" element={<Methodology />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}

export default App;

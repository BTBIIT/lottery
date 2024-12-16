import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DrawPage from "./pages/DrawPage";
import Record from "./pages/Record";
import Header from "./components/Header";

function App() {
  const [activeTab, setActiveTab] = useState("lottery");
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "lottery") {
      navigate("/");
    } else if (tab === "record") {
      navigate("/record");
    }
  };

  return (
    <div>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <Routes>
        <Route path="/" element={<DrawPage />} />
        <Route path="/record" element={<Record />} />
      </Routes>
    </div>
  );
}

export default App;

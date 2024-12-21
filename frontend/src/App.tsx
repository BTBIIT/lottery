import React, { useState } from "react";
import Header from "./components/Header";
import DrawPage from "./pages/DrawPage";
import Record from "./pages/Record";

function App() {
  const [activeTab, setActiveTab] = useState("lottery");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className={isDarkTheme ? "bg-gray-800" : "bg-white"}>
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
      />
      {activeTab === "lottery" ? (
        <DrawPage isDarkTheme={isDarkTheme} />
      ) : (
        <Record isDarkTheme={isDarkTheme} />
      )}
    </div>
  );
}

export default App;

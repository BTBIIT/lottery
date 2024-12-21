import React from "react";
import moonIcon from "../assets/moon.svg";
import sunIcon from "../assets/sun.svg";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function Header({ activeTab, onTabChange }: HeaderProps) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div
      className={`w-[800px] h-[100px] m-0 p-0 flex items-center shadow-lg ${
        isDarkTheme ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div className="flex">
        <button
          onClick={() => onTabChange("lottery")}
          className={`w-[350px] h-[100px] px-4 py-2 relative border-b-8 font-bold text-[30px] ${
            activeTab === "lottery" ? "border-blue-400" : "border-transparent"
          } ${isDarkTheme ? "text-white" : "text-gray-600"}`}
        >
          추첨기
        </button>
        <button
          onClick={() => onTabChange("record")}
          className={`w-[350px] h-[100px] px-4 py-2 relative border-b-8 font-bold text-[30px] ${
            activeTab === "record" ? "border-yellow-400" : "border-transparent"
          } ${isDarkTheme ? "text-white" : "text-gray-600"}`}
        >
          당첨 기록
        </button>
      </div>
      <div
        className="w-[60px] h-[60px] flex items-center justify-center ml-4 cursor-pointer"
        onClick={toggleTheme}
      >
        <img
          src={isDarkTheme ? sunIcon : moonIcon}
          alt={isDarkTheme ? "Sun Icon" : "Moon Icon"}
          className="w-[40px] h-[40px]"
        />
      </div>
    </div>
  );
}

export default Header;

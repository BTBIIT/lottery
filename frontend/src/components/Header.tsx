import React from "react";

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
        isDarkTheme ? "bg-gray-800" : "bg-purple-100"
      }`}
    >
      <div className="flex">
        <button
          onClick={() => onTabChange("lottery")}
          className={`w-[350px] h-[100px] px-4 py-2 relative border-b-8 font-bold text-[30px] ${
            activeTab === "lottery" ? "border-purple-700" : "border-transparent"
          } ${isDarkTheme ? "text-white" : "text-gray-600"}`}
        >
          추첨기
        </button>
        <button
          onClick={() => onTabChange("record")}
          className={`w-[350px] h-[100px] px-4 py-2 relative border-b-8 font-bold text-[30px] ${
            activeTab === "record" ? "border-purple-700" : "border-transparent"
          } ${isDarkTheme ? "text-white" : "text-gray-600"}`}
        >
          당첨 기록
        </button>
      </div>
      <div
        className="w-[60px] h-[60px] flex items-center justify-center ml-4"
        onClick={toggleTheme}
      >
        {isDarkTheme ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffff00"
          >
            <circle
              cx="12"
              cy="12"
              r="6"
              stroke="#ffff00"
              strokeWidth="1.536"
            ></circle>
            <path
              d="M12 2V3"
              stroke="#ffff00"
              strokeWidth="1.536"
              strokeLinecap="round"
            ></path>
            <path
              d="M12 21V22"
              stroke="#ffff00"
              strokeWidth="1.536"
              strokeLinecap="round"
            ></path>
            <path
              d="M22 12L21 12"
              stroke="#ffff00"
              strokeWidth="1.536"
              strokeLinecap="round"
            ></path>
            <path
              d="M3 12L2 12"
              stroke="#ffff00"
              strokeWidth="1.536"
              strokeLinecap="round"
            ></path>
            <path
              d="M19.0708 4.92969L18.678 5.32252"
              stroke="#ffff00"
              strokeWidth="1.536"
              strokeLinecap="round"
            ></path>
            <path
              d="M5.32178 18.6777L4.92894 19.0706"
              stroke="#ffff00"
              strokeWidth="1.536"
              strokeLinecap="round"
            ></path>
            <path
              d="M19.0708 19.0703L18.678 18.6775"
              stroke="#ffff00"
              strokeWidth="1.536"
              strokeLinecap="round"
            ></path>
            <path
              d="M5.32178 5.32227L4.92894 4.92943"
              stroke="#ffff00"
              strokeWidth="1.536"
              strokeLinecap="round"
            ></path>
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#809EAD"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#809EAD"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
}

export default Header;
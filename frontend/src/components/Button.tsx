import React, { useState } from "react";
import "./Button.css";

interface ButtonProps {
  selected: "normal" | "special";
  specialInput: string; // Pass the input value from DropDown
}

// SVG 파일 동적 임포트
const svgs = import.meta.glob("../assets/ball_*.svg", {
  eager: true,
}) as Record<string, { default: string }>;

// 숫자를 기반으로 파일 경로를 반환하는 함수
const getImageByNumber = (num: number) => {
  const filePath = `../assets/ball_${num}.svg`;
  return svgs[filePath]?.default || null;
};

function Button({ selected, specialInput }: ButtonProps) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<"none" | "singular" | "plural">(
    "none"
  );
  const handleClick = async (drawCount: number) => {
    const buttonType = drawCount === 1 ? "singular" : "plural";
    setLoading(buttonType); // 로딩 상태 활성화
    setResult(null); // 기존 결과 초기화

    try {
      let endpoint = "";
      if (selected === "normal") {
        endpoint =
          drawCount === 1
            ? "http://localhost:5000/api/single-draw"
            : "http://localhost:5000/api/multiple-draws";
      } else if (selected === "special") {
        endpoint =
          drawCount === 1
            ? "http://localhost:5000/api/draw-limited"
            : "http://localhost:5000/api/draw-limited-multiple";
      }

      console.log("Requesting API endpoint:", endpoint); // 1. 여기에요!

      // n 값을 쿼리 파라미터로 추가
      const url = new URL(endpoint);
      url.searchParams.append("n", specialInput);

      console.log("Special Input:", specialInput); // 2. 여기에요!
      console.log("Generated URL:", url.toString()); // 3. 여기에요!

      // 3초 지연 후 API 요청 처리
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      setResult("오류 발생: 데이터를 가져올 수 없습니다.");
    } finally {
      setLoading("none"); // 로딩 상태 비활성화
    }
  };

  return (
    <div className="w-[800px] flex flex-col items-center space-y-6">
      <div className="w-[600px] flex justify-between">
        <button
          onClick={() => handleClick(1)}
          className="w-[270px] h-[50px] bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-[20px] font-bold flex justify-center items-center"
          disabled={loading !== "none"} // 다른 버튼 클릭 방지
        >
          {loading === "singular" ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "1회 추첨"
          )}
        </button>
        <button
          onClick={() => handleClick(5)}
          className="w-[270px] h-[50px] bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-[20px] font-bold flex justify-center items-center"
          disabled={loading !== "none"} // 다른 버튼 클릭 방지
        >
          {loading === "plural" ? (
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "5회 추첨"
          )}
        </button>
      </div>

      {/* 결과 렌더링 */}
      {result && (
        <div className="mt-4">
          <pre className="bg-gray-100 p-4 rounded-md">{result}</pre>
        </div>
      )}
    </div>
  );
}

export default Button;

import React, { useState } from "react";
import "./Button.css";

interface ButtonProps {
  selected: "normal" | "special";
  specialInput: string;
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
  const [result, setResult] = useState<number[][] | null>(null);
  const [loading, setLoading] = useState<"none" | "singular" | "plural">(
    "none"
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async (drawCount: number) => {
    const buttonType = drawCount === 1 ? "singular" : "plural";
    setLoading(buttonType);
    setResult(null);
    setIsAnimating(true); // 애니메이션 시작

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

      const url = new URL(endpoint);
      url.searchParams.append("n", specialInput);

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

      if (selected === "special") {
        if (drawCount === 1) {
          setResult([data.limited_draw || []]);
        } else {
          setResult(data.limited_multiple_draws || []);
        }
      } else {
        if (drawCount === 1) {
          setResult([data.single_draw || []]);
        } else {
          setResult(data.multiple_draws || []);
        }
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      setResult([]);
    } finally {
      setLoading("none");
      setTimeout(() => setIsAnimating(false), 3000); // 3초 뒤 애니메이션 중단
    }
  };

  return (
    <div className="w-[800px] flex flex-col items-center space-y-6">
      <div className="w-[600px] flex justify-between mb-2">
        <button
          onClick={() => handleClick(1)}
          className="w-[270px] h-[50px] bg-red-600 text-white py-2 rounded hover:bg-red-700 transition text-[20px] font-bold flex justify-center items-center"
          disabled={loading !== "none"}
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
          disabled={loading !== "none"}
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
        <div className="mt-4 space-y-6">
          {result.map((draw, drawIndex) => (
            <div
              key={drawIndex}
              className="flex flex-wrap gap-4 justify-center w-[600px] p-4 rounded-lg bg-gray-300"
            >
              {draw.map((num, numIndex) => {
                const imageSrc = getImageByNumber(num);
                const delay = `${numIndex * 0.2}s`; // 순서대로 0.2초 간격 설정
                return imageSrc ? (
                  <img
                    key={numIndex}
                    src={imageSrc}
                    alt={`Ball ${num}`}
                    className={`w-16 h-16 ${isAnimating ? "animate-roll" : ""}`}
                    style={{ animationDelay: delay }}
                  />
                ) : (
                  <div
                    key={numIndex}
                    className={`w-16 h-16 flex items-center justify-center bg-gray-300 text-black rounded-full ${
                      isAnimating ? "animate-roll" : ""
                    }`}
                    style={{ animationDelay: delay }}
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Button;

import React, { useState } from "react";
import "./Button.css";

interface ButtonProps {
  selected: "normal" | "special";
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

function Button({ selected }: ButtonProps) {
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

      console.log("Requesting API endpoint:", endpoint);

      // 3초 지연 후 API 요청 처리
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(endpoint);
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
      {result
        ? (() => {
            const parsedResult = JSON.parse(result);

            // single_draw 또는 multiple_draws 데이터 추출
            const drawResults =
              parsedResult.single_draw ??
              (parsedResult.multiple_draws?.flat() || []);

            // 6개씩 끊어서 그룹화
            const groupedResults = [];
            for (let i = 0; i < drawResults.length; i += 6) {
              groupedResults.push(drawResults.slice(i, i + 6));
            }

            // 그룹화된 결과를 렌더링
            return groupedResults.map((group, groupIdx) => (
              <div
                key={groupIdx}
                className="w-[600px] flex justify-center space-x-4 bg-gray-300 p-2 rounded"
              >
                {group.map((num: number, idx: number) => {
                  const imageSrc = getImageByNumber(num);
                  return imageSrc ? (
                    <img
                      key={idx}
                      src={imageSrc}
                      alt={`ball_${num}`}
                      className="w-12 h-12 animate-roll"
                      style={{ animationDelay: `${idx * 0.1}s` }} // 이미지 순서대로 딜레이 설정
                    />
                  ) : (
                    <span key={idx} className="text-red-500">
                      {`이미지 없음 (${num})`}
                    </span>
                  );
                })}
              </div>
            ));
          })()
        : " "}
    </div>
  );
}

export default Button;

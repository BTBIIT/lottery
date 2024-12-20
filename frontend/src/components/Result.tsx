import React, { useEffect, useState, useRef, useCallback } from "react";

// SVG 파일 동적 임포트
const svgs = import.meta.glob("../assets/ball_*.svg", {
  eager: true,
}) as Record<string, { default: string }>;

// 숫자를 기반으로 파일 경로를 반환하는 함수
const getImageByNumber = (num: number) => {
  const filePath = `../assets/ball_${num}.svg`;
  return svgs[filePath]?.default || null;
};

interface ResultProps {
  log: number[][]; // 추첨 로그
  onUpdateLog: (newLog: number[][]) => void; // 상위 컴포넌트에서 로그 업데이트를 관리
}

function Result({ log }: ResultProps) {
  const [localLogs, setLocalLogs] = useState<number[][]>([]);
  const [delayedLogs, setDelayedLogs] = useState<number[][]>([]);
  const [visibleLogs, setVisibleLogs] = useState<number[][]>([]);
  const [page, setPage] = useState(1); // 페이지 번호 (5개씩 로드)
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // 로그를 localStorage에서 불러옴
  useEffect(() => {
    const storedLogs = localStorage.getItem("logs");
    if (storedLogs) {
      setLocalLogs(JSON.parse(storedLogs));
    }
  }, []);

  // 새 로그가 추가될 때 2.7초 딜레이 적용 (결과 미리보기 방지)
  useEffect(() => {
    if (log.length === 0) return;

    const delay = setTimeout(() => {
      setDelayedLogs((prevLogs) => {
        const updatedLogs = [...prevLogs, ...log];

        // 중복 제거
        const uniqueLogs = updatedLogs
          .map((item) => JSON.stringify(item)) // 문자열로 변환
          .filter((value, index, self) => self.indexOf(value) === index) // 중복 제거
          .map((item) => JSON.parse(item)); // 다시 객체로 변환

        // localStorage에 저장
        localStorage.setItem("logs", JSON.stringify(uniqueLogs));
        return uniqueLogs;
      });
    }, 2700);

    return () => clearTimeout(delay);
  }, [log]);

  // delayedLogs가 변경될 때, 초기 5개를 설정
  useEffect(() => {
    setVisibleLogs(delayedLogs.slice(0, 5));
  }, [delayedLogs]);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 } // 완전히 보일 때 트리거
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  // 페이지 변경될 때마다 visibleLogs 업데이트
  useEffect(() => {
    const newLogs = delayedLogs.slice(0, page * 5);
    setVisibleLogs(newLogs);
  }, [page, delayedLogs]);

  return (
    <>
      <p className="ml-[100px] mt-8 mb-6 text-[25px] font-bold text-black">
        추첨 기록
      </p>
      <div className="mt-4 mb-8 flex flex-col gap-4 w-[600px] h-[550px] overflow-y-auto rounded-lg bg-gray-100 shadow-md">
        {visibleLogs
          .slice() // 원본 배열 복사
          .reverse() // 역순 정렬 (최신 기록이 상단)
          .map((draw, drawIndex) => (
            <div
              key={drawIndex}
              className="flex flex-wrap gap-4 justify-center w-full p-4 rounded-lg bg-gray-300"
            >
              {draw.map((num, numIndex) => {
                const imageSrc = getImageByNumber(num);
                return imageSrc ? (
                  <img
                    key={numIndex}
                    src={imageSrc}
                    alt={`Ball ${num}`}
                    className="w-16 h-16"
                  />
                ) : (
                  <div
                    key={numIndex}
                    className="w-16 h-16 flex items-center justify-center bg-gray-100 text-black rounded-full"
                  >
                    {num}
                  </div>
                );
              })}
            </div>
          ))}
        <div ref={loaderRef} className="h-4" /> {/* 무한 스크롤 트리거 */}
      </div>
    </>
  );
}

export default Result;

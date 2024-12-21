import React, { useEffect, useState, useRef } from "react";

// LottoRecord 인터페이스 정의
interface LottoRecord {
  Index: number;
  date: string;
  one: number;
  two: number;
  three: number;
  four: number;
  five: number;
  six: number;
  bonus: number;
}

// SVG 파일들을 동적으로 가져오기
const svgs = import.meta.glob("../assets/ball_*.svg", {
  eager: true,
}) as Record<string, { default: string }>;

// LottoCard 컴포넌트 정의
const LottoCard = ({ record }: { record: LottoRecord }) => {
  return (
    <div className="flex items-center justify-between w-[700px] p-3 mb-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col items-start text-sm mr-1">
        <div className="font-bold text-gray-500">{record.Index}회</div>
        <div className="text-gray-400">{record.date}</div>
      </div>
      <div className="flex items-center">
        {[
          record.one,
          record.two,
          record.three,
          record.four,
          record.five,
          record.six,
        ].map((num, idx) => (
          <img
            key={idx}
            src={svgs[`../assets/ball_${num}.svg`]?.default}
            alt={`ball_${num}`}
            className="w-12 h-12 mr-1"
          />
        ))}
        <span className="text-lg font-bold text-gray-500 mx-1">+</span>
        <img
          src={svgs[`../assets/ball_${record.bonus}.svg`]?.default}
          alt={`ball_${record.bonus}`}
          className="w-12 h-12 ml-1"
        />
      </div>
    </div>
  );
};

interface RecordProps {
  isDarkTheme: boolean;
}

function Record({ isDarkTheme }: RecordProps) {
  const [records, setRecords] = useState<LottoRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/data?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecords((prevRecords) => [...prevRecords, ...data]);
      setHasMore(data.length === ITEMS_PER_PAGE);
    } catch (err) {
      setError("데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleScroll = () => {
    if (loading || !hasMore || !scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;

    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [loading, hasMore]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className={`flex flex-col items-center min-h-screen p-4 overflow-y-auto ${
        isDarkTheme ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"
      }`}
      style={{ maxHeight: "100vh" }}
    >
      {records.map((record) => (
        <LottoCard key={record.Index} record={record} />
      ))}
      {loading && <div className="flex justify-center mt-4">로딩 중...</div>}
      {!hasMore && (
        <div className="text-gray-500 mt-4">더 이상 데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default Record;

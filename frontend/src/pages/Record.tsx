import React, { useEffect, useState, useRef } from "react";

// LottoRecord 인터페이스: 로또 데이터가 어떤 형식인지 정의
interface LottoRecord {
  Index: number; // 로또 회차
  date: string; // 추첨 날짜
  one: number; // 당첨 숫자 1
  two: number; // 당첨 숫자 2
  three: number; // 당첨 숫자 3
  four: number; // 당첨 숫자 4
  five: number; // 당첨 숫자 5
  six: number; // 당첨 숫자 6
  bonus: number; // 보너스 숫자
}

// SVG 파일들을 동적으로 가져오기
const svgs = import.meta.glob("../assets/ball_*.svg", {
  eager: true,
}) as Record<string, { default: string }>;

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
            src={svgs[`../assets/ball_${num}.svg`]?.default} // 올바르게 타입 강제 변환
            alt={`ball_${num}`}
            className="w-12 h-12 mr-1"
          />
        ))}
        <span className="text-lg font-bold text-gray-500 mx-1">+</span>
        <img
          src={svgs[`../assets/ball_${record.bonus}.svg`]?.default} // 올바르게 타입 강제 변환
          alt={`ball_${record.bonus}`}
          className="w-12 h-12 ml-1"
        />
      </div>
    </div>
  );
};

function Record() {
  const [records, setRecords] = useState<LottoRecord[]>([]); // 로또 데이터 저장
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 메시지
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터 여부
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const ITEMS_PER_PAGE = 10; // 한 번에 불러올 데이터 개수
  const scrollContainerRef = useRef<HTMLDivElement>(null); // 스크롤 컨테이너 참조

  const fetchData = async (page: number) => {
    try {
      setLoading(true); // 로딩 시작
      const response = await fetch(
        `http://localhost:5000/api/data?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json(); // JSON 데이터 파싱
      setRecords((prevRecords) => [...prevRecords, ...data]); // 기존 데이터에 새 데이터 추가
      setHasMore(data.length === ITEMS_PER_PAGE); // 데이터가 더 있는지 확인
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
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
      className="flex flex-col items-center bg-gray-100 min-h-screen p-4 overflow-y-auto"
      style={{ maxHeight: "100vh" }}
    >
      {records.map((record) => (
        <LottoCard key={record.Index} record={record} />
      ))}
      {loading && (
        <div className="flex justify-center items-center mt-4">로딩 중...</div>
      )}
      {!hasMore && (
        <div className="text-gray-500 mt-4">더 이상 데이터가 없습니다.</div>
      )}
    </div>
  );
}

export default Record;

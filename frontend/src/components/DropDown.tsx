import React from "react";

interface DropDownProps {
  selected: "normal" | "special";
  onChange: (selected: "normal" | "special") => void;
  specialInput: string; // 부모로부터 전달받은 specialInput
  onSpecialInputChange: (input: string) => void; // 값 변경 이벤트 핸들러
  isDarkTheme: boolean; // Dark theme flag
}

function DropDown({
  selected,
  onChange,
  specialInput,
  onSpecialInputChange,
  isDarkTheme, // Receiving isDarkTheme prop
}: DropDownProps) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSpecialInputChange(event.target.value); // specialInput 값을 부모로 전달
  };

  return (
    <div className="w-[600px] h-[150px] mt-8 flex justify-center">
      {/* 추첨 방식 선택 드롭다운 */}
      <select
        id="raffle-select"
        className="w-[200px] h-[50px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black font-bold"
        value={selected}
        onChange={(e) => onChange(e.target.value as "normal" | "special")}
      >
        <option value="normal" className="text-black font-bold">
          일반 추첨
        </option>
        <option value="special" className="text-black font-bold">
          특수 추첨
        </option>
      </select>

      {/* 일반 추첨 설명 */}
      {selected === "normal" && (
        <p
          className={`float-right pt-2 ml-[110px] font-bold text-right ${
            isDarkTheme ? "text-white" : "text-black"
          }`}
        >
          모든 지난 회차의 번호 출현 확률에 따라 <br /> 가중치를 두고 번호를
          추첨하는 방식
        </p>
      )}

      {/* 특수 추첨 - 사용자 입력 */}
      {selected === "special" && (
        <div className="ml-2">
          <p
            className={`float-pt-2 ml-[54px] font-bold text-right ${
              isDarkTheme ? "text-white" : "text-black"
            }`}
          >
            사용자가 지정한 최근 회차의 번호 출현 확률에
            <br />
            따라 가중치를 두고 번호를 추첨하는 방식
          </p>

          {/* 입력 필드 */}
          <input
            style={{ color: "black" }}
            type="text"
            className="w-[350px] ml-[50px] mt-6 p-2 border border-gray-300 rounded-md text-center"
            placeholder="예) 100"
            value={specialInput} // 부모에서 전달받은 specialInput 값
            onChange={handleInputChange} // 입력 시 부모에 전달
          />
        </div>
      )}
    </div>
  );
}

export default DropDown;

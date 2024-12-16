import React, { useState } from "react";

interface DropDownProps {
  selected: "normal" | "special";
  onChange: (value: "normal" | "special") => void;
}

function DropDown({ selected, onChange }: DropDownProps) {
  const [specialInput, setSpecialInput] = useState("");

  return (
    <div className="cw-[800px] h-[150px] mt-8 flex justify-center ">
      <select
        id="raffle-select"
        className="w-[200px] h-[50px] p-2 border border-gray-300 rounded-md rounded-tr-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-black font-bold"
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

      {selected === "normal" && (
        <p className="float-right pt-2 ml-[110px] text-black font-bold text-right">
          모든 지난 회차의 번호 출현 확률에 따라 <br /> 가중치를 두고 번호를
          추첨하는 방식
        </p>
      )}

      {selected === "special" && (
        <div className="ml-2">
          <p className="pt-2 ml-[54px] text-black font-bold text-right">
            사용자가 지정한 최근 회차의 번호 출현 확률에
            <br />
            따라 가중치를 두고 번호를 추첨하는 방식
          </p>
          <input
            type="text"
            className=" w-[300px] ml-[50px] mt-4 p-2 border border-gray-300 rounded-md text-center"
            placeholder="예) 100회 "
            value={specialInput}
            onChange={(e) => setSpecialInput(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default DropDown;

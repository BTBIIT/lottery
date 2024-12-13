import React, { useState } from "react";

interface DropDownProps {
  selected: "normal" | "special";
  onChange: (value: "normal" | "special") => void;
}

function DropDown({ selected, onChange }: DropDownProps) {
  const [specialInput, setSpecialInput] = useState("");

  return (
    <div className="w-[800px] flex flex-col items-start mt-8 mb-8">
      <select
        id="raffle-select"
        className="ml-[100px] p-2 border border-gray-300 rounded-tl-md rounded-tr-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
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
        <p className="ml-[100px] text-black font-bold mt-4">
          일반 추첨에 대한 설명을 여기에 넣어주세요.
        </p>
      )}

      {selected === "special" && (
        <div className="ml-[100px] mt-4">
          <p className="text-black font-bold">
            특수 추첨에 대한 설명을 여기에 넣어주세요.
          </p>
          <input
            type="text"
            className="mt-2 p-2 border border-gray-300 rounded-md"
            placeholder="특수 추첨을 위한 입력"
            value={specialInput}
            onChange={(e) => setSpecialInput(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default DropDown;

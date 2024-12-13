import React from "react";

interface DropDownProps {
  selected: "normal" | "special";
  onChange: (value: "normal" | "special") => void;
}

function DropDown({ selected, onChange }: DropDownProps) {
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
    </div>
  );
}

export default DropDown;

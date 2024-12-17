import React, { useState } from "react";
import DropDown from "../components/DropDown";
import Button from "../components/Button";
import Animation from "../components/Animation";
import Result from "../components/Result";

function DrawPage() {
  const [selected, setSelected] = useState<"normal" | "special">("normal");
  const [specialInput, setSpecialInput] = useState<string>(""); // specialInput 상태 추가

  const handleSpecialInputChange = (input: string) => {
    setSpecialInput(input); // specialInput 값 변경
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-[800px] bg-white p-0">
        <DropDown
          selected={selected}
          onChange={setSelected}
          specialInput={specialInput} // specialInput 값을 DropDown에 전달
          onSpecialInputChange={handleSpecialInputChange} // 값 변경 함수 전달
        />
        <Animation />
        <Button selected={selected} specialInput={specialInput} />{" "}
        {/* specialInput 전달 */}
        <Result results={[]} />
      </div>
    </div>
  );
}

export default DrawPage;

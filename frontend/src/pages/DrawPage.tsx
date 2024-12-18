import React, { useState } from "react";
import DropDown from "../components/DropDown";
import Button from "../components/Button";
import Animation from "../components/Animation";
import Result from "../components/Result";

function DrawPage() {
  const [selected, setSelected] = useState<"normal" | "special">("normal");
  const [specialInput, setSpecialInput] = useState<string>("");
  const [log, setLog] = useState<number[][]>([]);

  const handleSpecialInputChange = (input: string) => {
    setSpecialInput(input);
  };

  const handleNewResult = (newResult: number[][]) => {
    setLog((prevLog) => [...prevLog, ...newResult]);
  };

  const handleUpdateLog = (newLog: number[][]) => {
    setLog(newLog); // 새로운 로그로 상태 업데이트
    localStorage.setItem("logs", JSON.stringify(newLog)); // localStorage에 저장
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-[800px] bg-white p-0">
        <DropDown
          selected={selected}
          onChange={setSelected}
          specialInput={specialInput}
          onSpecialInputChange={handleSpecialInputChange}
        />
        <Animation />
        <Button
          selected={selected}
          specialInput={specialInput}
          onNewResult={handleNewResult}
        />
        <Result
          log={log}
          onUpdateLog={handleUpdateLog} // 수정된 onUpdateLog 함수 전달
        />
      </div>
    </div>
  );
}

export default DrawPage;

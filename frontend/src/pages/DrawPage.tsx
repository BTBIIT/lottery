import React, { useState, useRef } from "react";
import DropDown from "../components/DropDown";
import Button from "../components/Button";
import Animation from "../components/Animation";
import Result from "../components/Result";

function DrawPage() {
  const [selected, setSelected] = useState<"normal" | "special">("normal");
  const [specialInput, setSpecialInput] = useState<string>("");
  const [log, setLog] = useState<number[][]>([]);

  // Animation 컴포넌트에 대한 ref 생성
  const animationRef = useRef<Animation>(null);

  const handleSpecialInputChange = (input: string) => {
    setSpecialInput(input);
  };

  const handleNewResult = (newResult: number[][]) => {
    setLog((prevLog) => [...prevLog, ...newResult]);
  };

  const handleUpdateLog = (newLog: number[][]) => {
    setLog(newLog);
    localStorage.setItem("logs", JSON.stringify(newLog));
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
        {/* Animation 컴포넌트에 ref 전달 */}
        <Animation ref={animationRef} />
        <Button
          selected={selected}
          specialInput={specialInput}
          onNewResult={handleNewResult}
          // animationRef에서 setSpeed 메서드 전달
          setAnimationSpeed={(speed) => animationRef.current?.setSpeed(speed)}
        />
        <Result log={log} onUpdateLog={handleUpdateLog} />
      </div>
    </div>
  );
}

export default DrawPage;

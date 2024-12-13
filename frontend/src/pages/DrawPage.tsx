import React, { useState } from "react";
import DropDown from "../components/DropDown";
import Button from "../components/Button";
import Animation from "../components/Animation";

function DrawPage() {
  const [selected, setSelected] = useState<"normal" | "special">("normal");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[800px] bg-white shadow-md rounded-lg p-4">
        <Animation />
        <DropDown selected={selected} onChange={setSelected} />
        <Button selected={selected} />
      </div>
    </div>
  );
}

export default DrawPage;

import React, { useState } from "react";
import DropDown from "../components/DropDown";
import Button from "../components/Button";
import Animation from "../components/Animation";

function DrawPage() {
  const [selected, setSelected] = useState<"normal" | "special">("normal");

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-[800px] bg-white p-0">
        <DropDown selected={selected} onChange={setSelected} />
        <Animation />
        <Button selected={selected} />
      </div>
    </div>
  );
}

export default DrawPage;

import React, { useContext } from "react";
import { globalContext } from "../App";

const InfoDiv = ({ img, bigdesc, smalldesc }) => {
  const { mode } = useContext(globalContext);

  return (
    <div
      className={`w-full h-[30%] flex rounded-md overflow-hidden ${
        mode === 1 ? "border-black bg-neutral-300" : "border-white bg-neutral-800"
      }`}
    >
      <div className="w-[40%] h-full  flex items-center justify-center text-[6vw]">
        {img}
      </div>
      <div className="w-[60%] h-full p-4 flex flex-col justify-center">
        <h2 className="text-lg font-semibold">{bigdesc}</h2>
        <h3 className="text-sm text-gray-600">{smalldesc}</h3>
      </div>
    </div>
  );
};

export default InfoDiv;

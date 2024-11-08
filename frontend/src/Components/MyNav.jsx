import React, { useContext } from "react";
import { MdLightMode } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { globalContext } from "../App";

const MyNav = () => {
  const { mode, setMode } = useContext(globalContext);

  const handleModeChange = () => {
    // Toggle mode between 0 (dark) and 1 (light)
    setMode(mode === 1 ? 0 : 1);
    console.log(mode === 1 ? "Dark Mode" : "Light Mode");
  };

  return (
    <div
      className={`w-full h-[10%] flex items-center justify-between  pl-10 pr-10 pt-3 pb-3 border-b-[1px]  ${
        mode === 1 ? "border-black" : "border-white"
      }`}
    >
      {/* Title Section */}
      <h1 className="text-2xl md:text-3xl font-semibold">Share It</h1>

      {/* Mode Toggle Button */}
      <button
        className={`${
          mode === 1 ? "border-black" : "border-white"
        } w-10 h-10 border-2 rounded-full flex items-center justify-center md:w-10 md:h-10`}
        onClick={handleModeChange}
      >
        {mode === 1 ? <MdModeNight /> : <MdLightMode />}
      </button>
    </div>
  );
};

export default MyNav;

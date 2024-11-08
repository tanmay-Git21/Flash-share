import React, { useContext, useState, useRef } from "react";
import { globalContext } from "../App";
import { GiFastArrow } from "react-icons/gi";
import InfoDiv from "../Components/InfoDiv";
import { GrSecure } from "react-icons/gr";
import { FcMultipleDevices } from "react-icons/fc";
import axios from "axios";
import Download from "./download";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const { mode } = useContext(globalContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [downButton, setDownButton] = useState("off");
  const [downloadUrl, setDownloadUrl] = useState(""); // New state for download URL

  const information = [
    {
      img: <GiFastArrow />,
      bigdesc: "Lightning-Fast File Transfer",
      smalldesc:
        "Upload, generate a QR code, and share files instantly across devices.",
    },
    {
      img: <GrSecure />,
      bigdesc: "Secure Transfers",
      smalldesc: "All files are encrypted to ensure secure transfers.",
    },
    {
      img: <FcMultipleDevices />,
      bigdesc: "Cross-Platform",
      smalldesc:
        "Seamlessly share files between different devices and platforms.",
    },
  ];

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Handle file upload with Axios
  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:3000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("File uploaded successfully:", response.data);
        const { filename } = response.data.file; // Get the filename from the response

        // Navigate to the download page with the filename
        navigate(`/download/${filename}`);

        // Set the download URL
        setDownloadUrl(`http://localhost:3000/download/${filename}`);

        // Show the download button
        setDownButton("on");

        alert(`File uploaded: ${selectedFile.name}`);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert(
          error.response && error.response.data
            ? error.response.data.message
            : "An error occurred during file upload."
        );
      }
    } else {
      alert("Please select a file first.");
    }
  };

  // Clear selected file
  const handleFileRemove = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  return (
    <div className="w-full h-[80%] pl-10 pr-10 pt-10 flex gap-2">
      {/* Left Section */}
      <div className="w-[50%] h-[95%] flex flex-col gap-2">
        <div
          className={`w-full h-full border-[1px] border-dashed rounded-xl ${
            mode === 1
              ? "border-black bg-neutral-300"
              : "border-white bg-neutral-800"
          } flex flex-col items-center justify-center`}
        >
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef} // Attach the ref here
            className="file-input"
          />
        </div>

        <div
          className={`w-full h-[20%]   rounded-xl p-2 ${
            mode === 1 ? " bg-neutral-300" : " bg-neutral-800"
          } flex gap-2 items-center`}
        >
          <button
            onClick={handleFileRemove}
            className="w-[50%] h-auto bg-red-600 p-3 rounded-md cursor-pointer hover:bg-red-500"
          >
            Remove selected file
          </button>
          {downButton === "off" ? (
            <button
              onClick={handleFileUpload}
              className="w-[50%] h-auto bg-green-600 p-3 rounded-md cursor-pointer hover:bg-green-500"
            >
              Upload to share
            </button>
          ) : (
            <Download filename={downloadUrl} /> // Pass the download URL to the Download component
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-[50%] h-full pl-2 flex flex-col gap-4">
        {information.map((info, index) => (
          <InfoDiv
            key={index}
            img={info.img}
            bigdesc={info.bigdesc}
            smalldesc={info.smalldesc}
          />
        ))}
      </div>
    </div>
  );
};

export default Upload;

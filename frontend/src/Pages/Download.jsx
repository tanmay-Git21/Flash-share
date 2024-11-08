import React from 'react';
import QRCode from 'react-qr-code';  // Import react-qr-code

const Download = ({ filename }) => {
  const downloadUrl = `http://localhost:3000/download/${filename}`;

  return (
    <div className="flex flex-col items-center mt-40">
      {/* Display QR Code */}
      <div className="mb-4">
        <QRCode value={downloadUrl} size={256} />  {/* This generates the QR code for download URL */}
      </div>

      {/* Button to download file */}
      <button
        onClick={() => window.open(downloadUrl, '_blank')}  // Open the URL in a new tab
        className="bg-blue-600 p-3 rounded-md cursor-pointer hover:bg-blue-500"
      >
        Click to Download File
      </button>
    </div>
  );
};

export default Download;

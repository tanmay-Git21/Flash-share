import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import { connectToDB } from "./config/DBconnect.js"; // Make sure this file is also using ES modules

dotenv.config();

const app = express();
app.use(cors());

// Manually construct the path for the "uploads" folder
const uploadDir = "C:\\Users\\rtanm\\OneDrive\\Desktop\\Shareit\\backend\\uploads"; // Hardcoded path

// Ensure the "uploads" directory exists, and create it if it doesn't
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Make sure the path is created recursively if needed
}

// Serve static files from the 'uploads' folder
app.use("/uploads", express.static(uploadDir));

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Define the directory where files should be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Define the filename pattern
  },
});

// Accept only certain file types (PDF, images, audio, videos, etc.)
const allowedMimeTypes = [
  "application/pdf", // PDF
  "image/jpeg", // JPEG images
  "image/png", // PNG images
  "image/gif", // GIF images
  "image/webp", // WebP images
  "audio/mpeg", // MP3 audio
  "audio/wav", // WAV audio
  "audio/aac", // AAC audio
  "audio/ogg", // OGG audio
  "video/mp4", // MP4 video
  "video/webm", // WebM video
  "video/x-msvideo", // AVI video
  "video/quicktime", // MOV video
  "application/zip", // ZIP archive files
  "application/rar", // RAR archive files
  "application/json", // JSON files
  "text/csv", // CSV files
  "application/epub+zip", // ePub files
];

// Set file size limit and file filter (optional)
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    // Accept only allowed file types
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Log the file info (this will help you debug)
    console.log("File uploaded:", req.file);

    // Send a response to the client with file information
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file, // Send file information (filename, path, etc.)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Download route (manually constructed path for download)
app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename); // Manually construct the file path

  // Check if the file exists before sending it
  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("Error downloading the file:", err);
        res.status(500).send("Error downloading the file");
      }
    });
  } else {
    res.status(404).send("File not found");
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello from the file upload server!");
});

// Start the server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  connectToDB(); // Connect to the database if needed
});

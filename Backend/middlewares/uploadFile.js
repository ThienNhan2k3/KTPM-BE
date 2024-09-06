// const multer = require('multer');

// // Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images/games');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// // Create the multer instance
// const upload = multer({ storage: storage });

// module.exports = upload;

const multer = require("multer");
const axios = require("axios");

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const uploadToImgur = async (fileBuffer) => {
  try {
    const response = await axios.post(
      "https://api.imgur.com/3/image",
      fileBuffer,
      {
        headers: {
          Authorization: "Client-ID 80bb2cb1e290184", // Replace YOUR_CLIENT_ID with your actual Imgur API client ID
          "Content-Type": "application/octet-stream",
        },
      }
    );
    return response.data.data.link;
  } catch (error) {
    console.error("Error uploading to Imgur:", error);
    throw error;
  }
};

const storage = multer.memoryStorage();
// 'image' is the name of our file input field in the HTML form
let upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

module.exports = {
  upload,
  uploadToImgur,
};

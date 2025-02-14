// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//     cloud_name:process.env.cloud_name,
//     api_key:process.env.cloud_API_KEY,
//     api_secret:process.env.cloud_API_SECRET

// })
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'wonderlust_DEV',
//       allowedFormats: ["png","jpg","jpeg"],
      
//     },
//   });

//   module.exports={
//     cloudinary,
//     storage,
//   }
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Updated variable name
    api_key: process.env.CLOUD_API_KEY, // Updated variable name
    api_secret: process.env.CLOUD_API_SECRET // Updated variable name
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "wonderlust_DEV",
        allowed_formats: ["jpeg", "png", "jpg"]
    }
});

module.exports = { cloudinary, storage };

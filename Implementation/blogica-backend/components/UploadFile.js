var path = require("path");
var Resize = require("./Resize");
var multer = require("multer");

const uploadPhoto = async (file, folderName, width, height) => {
  var imagePath = path.join(__dirname, "..", `public/images/${folderName}`);
  var nameSplit = file.originalname.split(".");
  var imageExt = nameSplit[nameSplit.length - 1];
  const fileUpload = new Resize(imagePath, imageExt, width, height);
  const filename = await fileUpload.save(file.buffer);
  return `/images/${folderName}/${filename}`;
};

const multerConfig = () =>
  multer({
    limits: {
      fileSize: 100 * 1920 * 1920,
    },
  });

module.exports = { uploadPhoto, multerConfig };

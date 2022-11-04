var path = require("path");
var Resize = require("./Resize");
var multer = require("multer");
const { v4 } = require("uuid");

var ImageKit = require("imagekit");
var config = require("../config/config");
var imagekit = new ImageKit({
  publicKey: `${config.IMAGEKIT_PUBLIC_KEY}`,
  privateKey: `${config.IMAGEKIT_PRIVATE_KEY}`,
  urlEndpoint: `https://ik.imagekit.io/${config.IMAGEKIT_ID}/`,
});

const uploadPhoto = async (file, folderName, width, height) => {
  /* USING MULTER FOR LOCAL STORAGE */
  // var imagePath = path.join(__dirname, "..", `public/images/${folderName}`);
  // var nameSplit = file.originalname.split(".");
  // var imageExt = nameSplit[nameSplit.length - 1];
  // const fileUpload = new Resize(imagePath, imageExt, width, height);
  // const filename = await fileUpload.save(file.buffer);
  // return `/images/${folderName}/${filename}`;

  var imageKitResponse = await imagekit
    .upload({
      file: file.buffer,
      fileName: `${v4()}.jpg`,
      folder: `blogica/images/${folderName}`,
      width: width,
      height: height,
    })
    .then(async (response) => {
      // console.log("imageURL", { success: true, url: response.url });
      var url = await imagekit.url({
        src: response.url,
        transformation: [
          {
            height: height,
            width: width,
            aspectRatio: 1 / 1,
          },
        ],
      });
      return { success: true, url };
    })
    .catch((error) => {
      console.log(error);
      return { success: false, url: "" };
    });
  return imageKitResponse;
};

const multerConfig = () =>
  multer({
    limits: {
      fileSize: 40 * 720 * 720,
    },
  });

// var imagekit = new ImageKit({
//   publicKey: `${config.IMAGEKIT_PUBLIC_KEY}`,
//   privateKey: `${config.IMAGEKIT_PRIVATE_KEY}`,
//   urlEndpoint: `https://ik.imagekit.io/${config.IMAGEKIT_ID}/`,
// });
module.exports = { uploadPhoto, multerConfig };

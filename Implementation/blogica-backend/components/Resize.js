const sharp = require("sharp");
const { v4 } = require("uuid");
const path = require("path");

class Resize {
  constructor(folder, type, width, height) {
    this.folder = folder;
    this.fileExt = type;
    this.width = width;
    this.height = height;
  }

  filepath = (filename) => {
    return path.resolve(`${this.folder}/${filename}`);
  };
  save = async (buffer) => {
    const filename = `${v4()}.png`;
    //${this.fileExt}`;
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(this.width, this.height, {
        width: this.width,
        height: this.height,
        fit: sharp.fit.cover,
        withoutEnlargement: false,
      })

      .toFile(filepath);

    return filename;
  };
}
module.exports = Resize;

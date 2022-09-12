const dotenv = require("dotenv");

if (process.env.NODE_ENV)
  dotenv.config({
    path: __dirname + `/.env.${process.env.NODE_ENV}`,
  });
else dotenv.config();

console.log(process.env.NODE_ENV, process.env.HOST, process.env.PORT);
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
};

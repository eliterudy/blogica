const dotenv = require("dotenv");
const { resolve } = require("path");

if (process.env.NODE_ENV) {
  dotenv.config({ path: resolve(__dirname, `../${process.env.NODE_ENV}`) });
} else {
  dotenv.config();
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_CONNECT: process.env.DB_CONNECT || "localhost",
  JWT_SECRET: process.env.JWT_SECRET || 3000,
  VIEW_COUNT_REWARD: [2, 4, 100, 1000, 10000, 100000],
};

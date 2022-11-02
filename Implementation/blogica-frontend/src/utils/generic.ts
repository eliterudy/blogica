import { colors } from "../config/configuration";

export const randomColorGenerator: any = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const toggler = (key: boolean, updater: Function) => {
  return updater(!key);
};

export const numberToCurrencyRounder = (number: number) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(number)) >= 1.0e9
    ? (Math.abs(Number(number)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(number)) >= 1.0e6
    ? (Math.abs(Number(number)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(number)) >= 1.0e2
    ? (Math.abs(Number(number)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(number)) + "";
};

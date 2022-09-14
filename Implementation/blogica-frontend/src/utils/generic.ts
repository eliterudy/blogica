import { colors } from "../config/configuration";

export const randomColorGenerator: any = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const toggler = (key: boolean, updater: Function) => {
  return updater(!key);
};

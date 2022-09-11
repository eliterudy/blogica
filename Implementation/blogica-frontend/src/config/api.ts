import axios from "axios";
export const baseURL = "";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  // Origin: baseURL,
};

const ApiCaller = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: headers,
});
ApiCaller.interceptors.request.use(async function (config: any) {
  let token = await localStorage.getItem("token");
  // config.headers.Authorization = token ? `bearer ${token}` : '';
  return config;
});

const apiDefault = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ApiCaller,

  ...apiDefault,
};

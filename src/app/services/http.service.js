import axios from "axios";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key],
      }))
    : data;
}
axios.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.log(error);
      alert("Something was wrong. Try it later");
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
export default httpService;

import axios, { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const instanceAxios = (() => {
  const token = cookies.get("token");

  const config: AxiosRequestConfig<any> = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  };

  if (token) {
    Object.assign(config, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  const instance = axios.create(config);

  return instance;
})();

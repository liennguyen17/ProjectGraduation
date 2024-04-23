import Cookies from "js-cookie";
import axios from "axios";
import { message } from "antd";
import { appInfo } from "../config/appInfo";
// import message from "../hooks/message";

// const base_url = "https://service.edustar.com.vn"
const base_url = "http://localhost:8080";
// const base_url = "https://c428-118-70-132-104.ngrok-free.app"

const login_path = "/auth/login";

//Truoc khi call API
axios.interceptors.request.use((req) => {
  //Noi 2 url voi nhau
  console.log("req url:: ", req?.url);
  const token = Cookies.get("access_token");
  //   const newUrl = base_url + req.url;
  const Authorization =
    login_path === req.url || req?.url?.startsWith("client")
      ? undefined
      : `Bearer ${token}`;

  return {
    ...req,
    url: req?.url,
    headers: {
      ...req.headers,
      Authorization,
      "ngrok-skip-browser-warning": "1",
    },
  };
});

//Sau khi co response tra ve
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    message.error({ content: err?.response?.data?.error?.message });
    history.replaceState(undefined, "", appInfo.loginPath);
    window.location.replace(appInfo.loginPath);
    return Promise.reject(err);
  }
);

export default axios;

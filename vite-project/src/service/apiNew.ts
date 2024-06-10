import axios from "axios";
import { appInfo } from "../config/appInfo";

export async function NewsGetListApiHome() {
  const requestData = {
    start: 0,
    limit: 50,
  };
  try {
    const res = await axios.post(`${appInfo.apiUrl}/news/filter`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data?.success) {
      return res.data.data.items;
    } else {
      throw new Error("loi lay tin tuc");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

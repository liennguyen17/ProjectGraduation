import axios from "axios";
import { appInfo } from "../config/appInfo";

export async function uploadApi(file: File) {
  try {
    const res = await axios.post(`${appInfo.apiUrl}/file/upload`, {
      file,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}

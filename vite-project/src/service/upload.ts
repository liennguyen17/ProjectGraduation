import axios from "axios";

export async function uploadApi(file: File) {
  try {
    const res = await axios.post("http://localhost:8080/file/upload", {
      file,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}

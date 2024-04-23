import { appInfo } from "../config/appInfo";
import axios from "../lib/request";

// export async function NewGetListApi() {
//   try {
//     //     const res = await axios.post(
//     //       "http://localhost:8080/news/filter",
//     //       {},
//     //       {
//     //         headers: {
//     //           // "content-type": "text/json",
//     //           "Content-Type": "application/json",
//     //         },
//     //       }
//     //     );
//     const res = await axios.get("http://localhost:8080/news/3");
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function NewGetListApi() {
  const requestData = {
    // start: 0,
    // limit: 7,
    // keywords: "Công nghệ phần mềm",
    // year: 2021,
    // sortField: "title",
    // sortType: "DESC",
  };

  try {
    const res = await axios.post(
      "http://localhost:8080/news/filter",
      // requestData,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data); // Xử lý dữ liệu phản hồi từ server
  } catch (error) {
    console.error(error);
  }
}

// export async function NewGetListApi() {
//   try {
//     const res = await axios.get("http://localhost:8080/news/all");
//     console.log(res.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

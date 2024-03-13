import axios from "axios";

export async function UserGetListApi() {
  try {
    const res = await axios.post(
      "http://localhost:8080/users/filter",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data?.success) {
      return res.data.data.items;
    } else {
      throw new Error("Loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function StudentGetListApi() {
  const requestData = {
    // keywords: "STUDENT",
    role: "STUDENT",
  };
  try {
    const res = await axios.post(
      "http://localhost:8080/users/filter",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data?.success) {
      return res.data.data.items;
    } else {
      throw new Error("Loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

import { message } from "antd";
import axios from "axios";
import { appInfo } from "../config/appInfo";

export async function UserGetListApi() {
  try {
    const res = await axios.post(
      "https://38a2-118-70-132-104.ngrok-free.app",
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
      `${appInfo.apiUrl}/users/filter`,
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

export async function TeacherGetListApi() {
  const requestData = {
    // keywords: "STUDENT",
    role: "TEACHER",
  };
  try {
    const res = await axios.post(
      `${appInfo.apiUrl}/users/filter`,
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

export async function ManageGetListApi() {
  const requestData = {
    // keywords: "ASSISTANT",
    role: "MANAGE",
  };
  try {
    const res = await axios.post(
      `${appInfo.apiUrl}/users/filter`,
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

export async function TopicGetListApi() {
  const requestData = {};
  try {
    const res = await axios.post(
      `${appInfo.apiUrl}/users/filter`,
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

export async function NotificationGetListApi() {
  const requestData = {};
  try {
    const res = await axios.post(
      "http://localhost:8080/notifications/filter",
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

export async function NewsFilterApi(keywords: string) {
  const requestData = {
    keywords: keywords,
  };
  try {
    const res = await axios.post(
      "http://localhost:8080/news/filter",
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

export async function getNewsDetail(id: number) {
  try {
    const res = await axios.get(`http://localhost:8080/news/${id}`);
    if (res.data?.success) {
      return res.data.data;
    } else {
      throw new Error("Failed to fetch news detail");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function ForgotPassword(email: string) {
  const requestData = {
    email: email,
  };
  try {
    const res = await axios.post(
      "http://localhost:8080/users/forgot/password",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data?.success) {
      return res.data;
      // message.success(res.data.data);
    } else {
      // message.error(
      //   res.data.error || "Có lỗi xảy ra khi thực hiện chức năng quên mật khẩu"
      // );
      return res.data;
    }
  } catch (error) {
    console.error("Error:", error);
    message.error("Có lỗi xảy ra khi kết nối đến máy chủ");
  }
}

export async function LoginApi(username: string, password: string) {
  const requestData = {
    username: username,
    password: password,
  };
  try {
    const res = await axios.post(
      "http://localhost:8080/auth/login",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);

    if (res.data.success) {
      return res.data;
    } else {
      return res.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function MasterDataApi() {
  const requestData = {};
  try {
    const res = await axios.post(
      "http://localhost:8080/master-data/filter",
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

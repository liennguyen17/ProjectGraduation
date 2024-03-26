import { message } from "antd";
import axios from "axios";
import { appInfo } from "../config/appInfo";

export async function UserGetListApi() {
  try {
    const res = await axios.post(
      `${appInfo.apiUrl}/users/filter`,
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
  console.log("appInfo.apiUrl", appInfo.apiUrl);
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
      `${appInfo.apiUrl}/topic/filter`,
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
      `${appInfo.apiUrl}/notifications/filter`,
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
    const res = await axios.post(`${appInfo.apiUrl}/news/filter`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
    const res = await axios.get(`${appInfo.apiUrl}/news/${id}`);
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
      `${appInfo.apiUrl}/users/forgot/password`,
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
    const res = await axios.post(`${appInfo.apiUrl}/auth/login`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
      `${appInfo.apiUrl}/master-data/filter`,
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

export async function getTopicDetail(id: number) {
  try {
    // const res = await axios.get(`${appInfo.apiUrl}/topic/${id}`);
    const res = await axios.get(`${appInfo.apiUrl}/topic/${id}`);
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

export async function getUserDetail(id: number) {
  try {
    // const res = await axios.get(`${appInfo.apiUrl}/topic/${id}`);
    const res = await axios.get(`${appInfo.apiUrl}/users/${id}`);
    if (res.data?.success) {
      return res.data.data;
    } else {
      throw new Error("Failed to fetch users detail");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getListComment() {
  try {
    const res = await axios.get(`${appInfo.apiUrl}/comments/all`);
    if (res.data?.success) {
      return res.data.data.items;
    } else {
      throw new Error("Failed to fetch comment detail");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

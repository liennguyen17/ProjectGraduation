import { message } from "antd";
import axios from "axios";
import { appInfo } from "../config/appInfo";
import {
  MasterData,
  News,
  NewsType,
  NotificationType,
  RegisterTopicType,
  UserType,
} from "./types";

export async function UserGetListApi() {
  const requestData = {
    start: 0,
    limit: 50,
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
  const requestData = {
    start: 0,
    limit: 50,
  };
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

// -------------------------------------------

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

export async function getNewsDetail(id: number) {
  try {
    const res = await axios.get(`${appInfo.apiUrl}/news/${id}`);
    if (res.data?.success) {
      return res.data.data;
    } else {
      throw new Error("Loi goi api");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getNotificationsDetail(id: number) {
  try {
    const res = await axios.get(`${appInfo.apiUrl}/notifications/${id}`);
    if (res.data?.success) {
      return res.data.data;
    } else {
      throw new Error("Loi goi api");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//==========================create=========

// export async function createNews(data: News): Promise<News> {
//   try {
//     const res = await axios.post(`${appInfo.apiUrl}/news`, data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (res.data?.success) {
//       console.log("data new::", res.data.data);
//       return res.data.data;
//     } else {
//       throw new Error("Failed to create news");
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

export const createMasterData = async (data: MasterData) => {
  try {
    const response = await axios.post(`${appInfo.apiUrl}/master-data`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo MasterData:", error);
    throw new Error("Có lỗi xảy ra khi tạo MasterData");
  }
};

export const createUser = async (data: UserType) => {
  try {
    const response = await axios.post(`${appInfo.apiUrl}/users`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo MasterData:", error);
    throw new Error("Có lỗi xảy ra khi tạo MasterData");
  }
};
export const createNews = async (data: NewsType) => {
  try {
    const response = await axios.post(`${appInfo.apiUrl}/news`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo news:", error);
    throw new Error("Có lỗi xảy ra khi tạo news");
  }
};
export const createNotification = async (data: NotificationType) => {
  try {
    const response = await axios.post(`${appInfo.apiUrl}/notifications`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo thong bao:", error);
    throw new Error("Có lỗi xảy ra khi tạo thong bao");
  }
};

export const createStudentRegisterTopic = async (data: RegisterTopicType) => {
  try {
    const response = await axios.post(`${appInfo.apiUrl}/topic/student`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo thong bao:", error);
    throw new Error("Có lỗi xảy ra khi tạo thong bao");
  }
};

// =========================PUT=================

// export const editMasterData = async (data: MasterData) => {
//   try {
//     const response = await axios.put(`${appInfo.apiUrl}/master-data`, data, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi tạo MasterData:", error);
//     throw new Error("Có lỗi xảy ra khi tạo MasterData");
//   }
// };

export const editMasterData = async (data: MasterData) => {
  try {
    const response = await axios.put(`${appInfo.apiUrl}/master-data`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    console.error("Lỗi khi tạo MasterData:", error);
    throw new Error("Có lỗi xảy ra khi tạo MasterData");
  }
};

export const editUser = async (data: UserType) => {
  try {
    const response = await axios.put(`${appInfo.apiUrl}/users`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    console.error("Lỗi khi tạo user:", error);
    throw new Error("Có lỗi xảy ra khi tạo user");
  }
};

export const editNews = async (data: NewsType) => {
  try {
    const response = await axios.put(`${appInfo.apiUrl}/users`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    console.error("Lỗi khi tạo tin tức:", error);
    throw new Error("Có lỗi xảy ra khi tạo tin tức");
  }
};

export const editNotifications = async (data: NotificationType) => {
  try {
    const response = await axios.put(`${appInfo.apiUrl}/notifications`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    console.error("Lỗi khi tạo thong bao:", error);
    throw new Error("Có lỗi xảy ra khi tạo thong bao");
  }
};

// =================DELETE==================
export const deleteMasterData = async (ids) => {
  try {
    const response = await axios.delete(`${appInfo.apiUrl}/master-data`, {
      data: {
        ids: ids,
      },
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(
        response.data.error.message || response.data.error.errors.message
      );
    }
  } catch (error) {
    throw new Error("Có lỗi xảy ra khi xóa Master Data");
  }
};

export const deleteUser = async (ids) => {
  try {
    const response = await axios.delete(`${appInfo.apiUrl}/users`, {
      data: {
        ids: ids,
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(
        response.data.error.message || response.data.error.errors.message
      );
    }
  } catch (error) {
    throw new Error("Có lỗi xảy ra khi xóa Master Data");
  }
};

export const deleteNews = async (ids) => {
  try {
    const response = await axios.delete(`${appInfo.apiUrl}/news`, {
      data: {
        ids: ids,
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(
        response.data.error.message || response.data.error.errors.message
      );
    }
  } catch (error) {
    throw new Error("Có lỗi xảy ra khi xóa Master Data");
  }
};

export const deleteNotification = async (ids) => {
  try {
    const response = await axios.delete(`${appInfo.apiUrl}/notifications`, {
      data: {
        ids: ids,
      },
    });
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(
        response.data.error.message || response.data.error.errors.message
      );
    }
  } catch (error) {
    throw new Error("Có lỗi xảy ra khi xóa Master Data");
  }
};

// ==========filter===========
export async function MasterDataFilterApi(keywords: string) {
  const requestData = {
    keywords: keywords,
  };
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
    if (res.data.success) {
      return res.data.data.items;
    } else {
      throw new Error("Loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function filterUser(data) {
  try {
    const response = await axios.post(
      `${appInfo.apiUrl}/master-data/filter`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success) {
      return response.data.data.items;
    } else {
      throw new Error("Loi lay du lieu loc/tim kiem user");
    }
  } catch (error) {
    console.error("Error filtering users:", error);
    throw error;
  }
}

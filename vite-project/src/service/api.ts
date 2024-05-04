import { message } from "antd";
// import axios from "axios";
import { appInfo } from "../config/appInfo";
import {
  ChangeNameTopicType,
  MasterData,
  News,
  NewsType,
  NotificationType,
  RegisterTopicType,
  TopicApproval,
  TopicEdit,
  TopicEditChangeName,
  TopicType,
  TopicTypeCreate,
  UserType,
} from "./types";
import axios from "../lib/request";

export async function UserGetListApi(params, sort, filter) {
  console.log("params: ", params);
  const requestData = {
    start: 0,
    limit: 50,
    role: params?.role || "",
    keywords: params?.keyword || "",
    email: params?.email || "",
    phone: params?.phone || "",
    username: params?.username || "",
    subject: params?.subject || "",
    address: params?.address || "",
    userCode: params?.userCode || "",
    className: params?.className || "",
    name: params?.name || "",
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
      return {
        data: res.data.data.items,
      };
    } else {
      throw new Error("Loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function StudentGetListApi(params, sort, filter) {
  const requestData = {
    start: 0,
    limit: 50,
    role: "STUDENT",
    keywords: params?.keyword || "",
    email: params?.email || "",
    phone: params?.phone || "",
    username: params?.username || "",
    subject: params?.subject || "",
    address: params?.address || "",
    userCode: params?.userCode || "",
    className: params?.className || "",
    name: params?.name || "",
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
      return { data: res.data.data.items };
    } else {
      throw new Error("Loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function TeacherGetListApi(params, sort, filter) {
  const requestData = {
    start: 0,
    limit: 50,
    role: "TEACHER",
    keywords: params?.keyword || "",
    email: params?.email || "",
    phone: params?.phone || "",
    username: params?.username || "",
    subject: params?.subject || "",
    address: params?.address || "",
    userCode: params?.userCode || "",
    className: params?.className || "",
    name: params?.name || "",
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
      return { data: res.data.data.items };
    } else {
      throw new Error("Loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function TeacherGetListData() {
  const requestData = {
    start: 0,
    limit: 50,
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
export async function StudentGetListData() {
  const requestData = {
    start: 0,
    limit: 50,
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

export async function ManageGetListApi(params, sort, filter) {
  const requestData = {
    start: 0,
    limit: 50,
    role: "MANAGER",
    keywords: params?.keyword || "",
    email: params?.email || "",
    phone: params?.phone || "",
    username: params?.username || "",
    subject: params?.subject || "",
    address: params?.address || "",
    userCode: params?.userCode || "",
    className: params?.className || "",
    name: params?.name || "",
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
      return { data: res.data.data.items };
    } else {
      throw new Error("Loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function NewGetListApi(params, sort, filter) {
  console.log("params: ", params);
  const requestData = {
    start: 0,
    limit: 50,
    title: params?.title || "",
    year: params?.year || "",
    description: params?.description || "",
    subject: params?.subject || "",
    keywords: params?.keyword || "",
  };
  try {
    const res = await axios.post(`${appInfo.apiUrl}/news/filter`, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data?.success) {
      return { data: res.data.data.items };
    } else {
      throw new Error("loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function NewGetList() {
  const requestData = {
    start: 0,
    limit: 50,
  };

  try {
    const res = await axios.post(
      `${appInfo.apiUrl}/news/filter`,
      requestData,
      // {},
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

export async function NewGetListData() {
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
      throw new Error("loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function TopicGetListApi(params, sort, filter) {
  console.log("params:: ", params);
  const requestData = {
    start: 0,
    limit: 50,
    keywords: params?.keyword || "",
    status: params?.status || "",
    nameTopic: params?.nameTopic || "",
    semester: params?.semester || "",
    departmentManagement: params?.departmentManagement || "",
    teacher: params?.teacher,
    student: params?.student,
  };
  console.log("request data:: ", requestData);
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
      return {
        data: res.data.data.items,
      };
    } else {
      throw new Error("Loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function TopicChangeNameGetListApi(params, sort, filter) {
  console.log("params:: ", params);
  const requestData = {
    start: 0,
    limit: 50,
    keywords: params?.keyword || "",
    status: params?.status || "",
    newNameTopic: params?.newNameTopic || "",
    // topic: {
    //   semester: params?.semester || "",
    //   student: {
    //     name: params?.name || "",
    //     userCode: params?.userCode || "",
    //   },
    // },
    topic: params.topic,
  };
  console.log("request data:: ", requestData);
  try {
    const res = await axios.post(
      `${appInfo.apiUrl}/topic-change-name/filter`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data?.success) {
      return {
        data: res.data.data.items,
      };
    } else {
      throw new Error("Lỗi lấy danh sách đơn đổi đề tài");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function TopicGetListData(params, sort, filter) {
  const requestData = { start: 0, limit: 50, nameTopic: params?.nameTopic };
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
      return {
        data: res.data.data.items,
      };
    } else {
      throw new Error("Loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function NotificationGetListApi(params, sort, filter) {
  const requestData = {
    start: 0,
    limit: 50,
    keywords: params?.keyword || "",
    description: params?.description || "",
    title: params?.title || "",
  };
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
      return {
        data: res.data.data.items,
      };
    } else {
      throw new Error("Loi");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function NotificationGetListData() {
  const requestData = { start: 0, limit: 50 };
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

export async function MasterDataApi(params, sort, filter) {
  const requestData = {
    start: 0,
    limit: 50,
    keywords: params?.keyword || "",
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
      return {
        data: res.data.data.items,
      };
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

export async function getListTopicStudentOfTeacher() {
  try {
    const res = await axios.get(`${appInfo.apiUrl}/users/topic/teacher`);
    if (res.data?.success) {
      return { data: res.data.data.items };
    } else {
      throw new Error("Failed to fetch comment detail");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// -------get by login------------------------------------

export async function findTopicFromStudentLogin() {
  try {
    const res = await axios.get(`${appInfo.apiUrl}/topic-change-name`);
    if (res.data?.success) {
      return res.data.data;
    } else {
      throw new Error("Lỗi hiện thị kết quả đăng ký gửi đơn đổi đề tài");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//===get by id=====

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
    console.error("Lỗi khi đăng ký đề tài:", error);
    throw new Error("Có lỗi xảy ra khi đăng ký đề tài");
  }
};

export const studentChangeNameTopic = async (data: ChangeNameTopicType) => {
  try {
    const response = await axios.post(
      `${appInfo.apiUrl}/topic-change-name`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đổi tên đề tài:", error);
    throw new Error("Có lỗi xảy ra khi đổi tên đề tài");
  }
};

export const TopicCreate = async (data: TopicTypeCreate) => {
  try {
    const response = await axios.post(`${appInfo.apiUrl}/topic`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo de tai:", error);
    throw new Error("Có lỗi xảy ra khi tạo de tai");
  }
};
// =========================PUT=================

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

export const editTopic = async (data: TopicEdit) => {
  try {
    const response = await axios.put(`${appInfo.apiUrl}/topic`, data, {
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
    console.error("Lỗi khi phê duyệt đăng ký đề tài:", error);
    throw new Error("Có lỗi xảy ra khi phê duyệt đăng ký đề tài");
  }
};

export const editTopicChangeName = async (data: TopicEditChangeName) => {
  try {
    const response = await axios.put(
      `${appInfo.apiUrl}/topic-change-name`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.error.message);
    }
  } catch (error) {
    console.error("Lỗi khi tạo đơn đăng ký đổi đề tài:", error);
    throw new Error("Có lỗi xảy ra khi tạo đơn đăng ký đổi đề tài");
  }
};

export const editTopic1 = async (data: TopicTypeCreate) => {
  try {
    const response = await axios.put(`${appInfo.apiUrl}/topic`, data, {
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
export async function MasterDataFilterApi(keywords: string): Promise<any[]> {
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
      return [];
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

// export async function NewGetListApi(params, sort, filter) {
//   const requestData = {
//     start: 0,
//     limit: 50,
//   };
//   try {
//     const res = await axios.post(
//       "http://localhost:8080/news/filter",
//       requestData,
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     if (res.data?.success) {
//       return res.data.data.items;
//     } else {
//       throw new Error("loi");
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// =============filebase===========

export async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      `${appInfo.apiUrl}/file/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("response:: ", response);
    if (response.data.success) {
      console.log("file upload:: ", response.data.data);
      return response.data.data;
    } else {
      return [];
      // throw new Error("Loi upload file");
    }
  } catch (error) {
    console.error("Error upload file:", error);
    throw error;
  }
}

// ===========================
// const jwtToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW5lMTExMiIsIlhBVVRIT1IiOiJTVFVERU5UIiwiaWF0IjoxNzEyODAxMTAzLCJleHAiOjE3MTI4MzcxMDN9.PQY0HbR9yIBjrlY2jZKJI9XmktXniNRpCi-beqWoe1IGHPGIiA7aKyN86vz4bGcvJ125VANA4zJuSD810gKVJw";

// // Function to call the PDF generation endpoint with JWT
// async function generatePdfWithJwt() {
//   try {
//     const response = await axios.get(`${appInfo.apiUrl}/topic/generate-pdf`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     throw error;
//   }
// }

// const jwtToken =
//   "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW5lMTExMiIsIlhBVVRIT1IiOiJTVFVERU5UIiwiaWF0IjoxNzEyODAxMTAzLCJleHAiOjE3MTI4MzcxMDN9.PQY0HbR9yIBjrlY2jZKJI9XmktXniNRpCi-beqWoe1IGHPGIiA7aKyN86vz4bGcvJ125VANA4zJuSD810gKVJw"; // Thay thế bằng JWT token của bạn

export async function UserProfile() {
  try {
    const response = await axios.get("http://localhost:8080/users/profile", {
      // headers: {
      //   Authorization: `Bearer ${jwtToken}`,
      // },
    });

    // Trả về dữ liệu người dùng từ phản hồi nếu thành công
    if (response.data.success) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

// // Sử dụng hàm fetchUserProfile để lấy thông tin người dùng và xử lý dữ liệu khi đã nhận được
// fetchUserProfile()
//   .then((userData) => {
//     console.log("User profile:", userData);
//     // Xử lý dữ liệu người dùng ở đây nếu cần thiết
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//     // Xử lý lỗi khi không thể lấy thông tin người dùng
//   });

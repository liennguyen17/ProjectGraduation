import { MenuDataItem } from "@ant-design/pro-components";
import { RouteObject } from "react-router-dom";

import {
  ClusterOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  ReadOutlined,
  TeamOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import Layout from "../layout";
import NotFound from "../pages/404";
import NotAuthorized from "../pages/403";
import Student from "../pages/Student";
import User from "../pages/User";
import Teacher from "../pages/Teacher";
import News from "../pages/News";
import Topic from "../pages/Topic";
import Login from "../pages/Login";
import Manage from "../pages/Manage";
import Notification from "../pages/Notification";
import Home from "../pages/Home";
import NewsDetailPage from "../pages/Home/NewDetail";
import RegistrationTopic from "../pages/RegisterTopic";
import TopicApproval from "../pages/TopicApproval";
import AllTopic from "../pages/AllTopic";
import DisplayNotification from "../pages/Notification/components/DisplayNotification";
import DisplayNew from "../pages/News/components/DisplayNew";
import ResultTopic from "../pages/Topic/components/ResultTopic";
import Comment from "../pages/Comment";
import NotificationDetail from "../pages/Notification/components/NotificationDetail";
import MasterDatas from "../pages/MasterData";
import Info from "../pages/ProfileUser";
import ChangeTopic from "../pages/ChangeTopic";
import { ProfileAccount } from "../service/types";
import StudentOfTeacher from "../pages/Teacher/components/StudentOfTeacher";
import DetailTopicStudent from "../pages/Teacher/components/DetailTopicStudent";
import ResultTopicStudent from "../pages/Teacher/components/ResultTopicStudent";
import ApprovalChangeTopic from "../pages/TopicApproval/approvalChangeTopic";
import Statistics from "../pages/Statistics";
import DiaryStudent from "../pages/Student/components/DiaryStudent";

//config defaultRouter
export const defaultRouter: Record<string, string> = {
  "/sinh-vien": "/1/sinh-vien",
};

const accountInfo: ProfileAccount = JSON.parse(
  sessionStorage.getItem("profileAcc") as any
);

const checkRole = (roleName: string) => {
  let resultCheckRole: boolean = false;
  switch (roleName) {
    case "AllRole":
      resultCheckRole = accountInfo?.roles.some(
        (value) =>
          value === "ADMIN" ||
          value === "MANAGER" ||
          value === "TEACHER" ||
          value === "STUDENT"
      )
        ? true
        : false;
      break;
    case "AdminAndManager":
      resultCheckRole = accountInfo?.roles.some(
        (value) => value === "ADMIN" || value === "MANAGER"
      )
        ? true
        : false;
      break;
    case "ManagerAndTeacher":
      resultCheckRole = accountInfo?.roles.some(
        (value) =>
          value === "ADMIN" || value === "MANAGER" || value === "TEACHER"
      )
        ? true
        : false;
      break;
    case "ManagerAndStudent":
      resultCheckRole = accountInfo?.roles.some(
        (value) =>
          value === "ADMIN" || value === "MANAGER" || value === "STUDENT"
      )
        ? true
        : false;
      break;
    case "Manager":
      resultCheckRole = accountInfo?.roles.some((value) => value === "MANAGER")
        ? true
        : false;
      break;
    case "StudentAndTeacher":
      resultCheckRole = accountInfo?.roles.some(
        (value) => value === "TEACHER" || value === "STUDENT"
      )
        ? true
        : false;
      break;
    case "Teacher":
      resultCheckRole = accountInfo?.roles.some((value) => value === "TEACHER")
        ? true
        : false;
      break;
    case "Student":
      resultCheckRole = accountInfo?.roles.some((value) => value === "STUDENT")
        ? true
        : false;
      break;
    default:
  }
  // console.log("resultCheckRole:: ", resultCheckRole);

  return resultCheckRole;
};

// console.log("profileAcc:: ", accountInfo);

export const workplace: RouteObject | MenuDataItem = {
  path: "/",
  element: <Layout />,
  children: [
    {
      name: "Quản lý người dùng",
      path: "users",
      icon: <ReadOutlined />,
      hideInMenu: checkRole("StudentAndTeacher"),
      // hideChildrenInMenu: true,
      children: [
        {
          name: "User",
          path: "user",
          icon: <ReadOutlined />,
          element: <User />,
          hideInMenu: checkRole("Manager"),
        },

        {
          name: "Giảng viên quản lý",
          path: "manage",
          icon: <ClusterOutlined />,
          element: <Manage />,
          hideInMenu: checkRole("Manager"),
        },
        {
          name: "Giảng viên hướng dẫn",
          path: "teacher",
          icon: <NotificationOutlined />,
          element: <Teacher />,
          // hideInMenu: checkRole("Student"),
        },
        {
          name: "Sinh viên",
          path: "student",
          icon: <ClusterOutlined />,
          element: <Student />,
          // element: <StudentsForm />,
        },
      ],
    },
    {
      name: "Quản lý khóa luận tốt nghiệp",
      path: "graduation-thesis",
      icon: <FileDoneOutlined />,
      hideInMenu: checkRole("StudentAndTeacher"),
      children: [
        {
          name: "Phê duyệt đề tài",
          path: "approval",
          icon: <TeamOutlined />,
          element: <TopicApproval />,
        },
        {
          name: "Phê duyệt đổi đề tài",
          path: "approval-change-topic",
          icon: <TeamOutlined />,
          element: <ApprovalChangeTopic />,
        },
        {
          name: "Điểm đề tài",
          path: "topic",
          icon: <SolutionOutlined />,
          element: <Topic />,
        },
        {
          name: "Tổng quan đề tài",
          path: "topics",
          icon: <SolutionOutlined />,
          element: <AllTopic />,
        },
      ],
    },
    {
      name: "Thống kê",
      path: "statistics",
      icon: <FileDoneOutlined />,
      element: <Statistics />,
      hideInMenu: checkRole("StudentAndTeacher"),
    },
    {
      name: "Quản lý tin tức",
      path: "news",
      icon: <FileDoneOutlined />,
      element: <News />,
      hideInMenu: checkRole("StudentAndTeacher"),
    },

    {
      name: "Quản lý thông báo",
      path: "notification",
      icon: <FileDoneOutlined />,
      element: <Notification />,
      hideInMenu: checkRole("StudentAndTeacher"),
    },
    {
      name: "Master Data",
      path: "master-data",
      icon: <FileDoneOutlined />,
      element: <MasterDatas />,
      hideInMenu: checkRole("StudentAndTeacher"),
    },
    {
      name: "Đăng ký đề tài",
      path: "register-topic",
      icon: <FileDoneOutlined />,
      element: <RegistrationTopic />,
      hideInMenu: checkRole("ManagerAndTeacher"),
    },
    {
      name: "Đổi đề tài",
      path: "change-topic",
      icon: <FileDoneOutlined />,
      element: <ChangeTopic />,
      hideInMenu: checkRole("ManagerAndTeacher"),
    },
    {
      name: "Nhật ký",
      path: "/diary/student",
      icon: <FileDoneOutlined />,
      element: <DiaryStudent />,
      hideInMenu: checkRole("ManagerAndTeacher"),
    },

    {
      name: "Kết quả KLTN",
      path: "result",
      icon: <FileDoneOutlined />,
      element: <ResultTopic />,
      hideInMenu: checkRole("ManagerAndTeacher"),
    },
    {
      name: "Sinh viên hướng dẫn",
      path: "student",
      icon: <FileDoneOutlined />,
      element: <StudentOfTeacher />,
      hideInMenu: checkRole("ManagerAndStudent"),
    },
    {
      name: "Thông tin thực tập",
      path: "detailTopic",
      icon: <FileDoneOutlined />,
      element: <DetailTopicStudent />,
      hideInMenu: checkRole("ManagerAndStudent"),
    },
    {
      name: "Danh sách điểm đề tài",
      path: "topicStudent",
      icon: <FileDoneOutlined />,
      element: <ResultTopicStudent />,
      hideInMenu: checkRole("ManagerAndStudent"),
    },
    {
      name: "Nhật ký",
      path: "action",
      icon: <FileDoneOutlined />,
      element: <Comment />,
      hideInMenu: checkRole("ManagerAndStudent"),
    },
    {
      name: "Thông báo",
      path: "notification-user",
      icon: <FileDoneOutlined />,
      element: <DisplayNotification />,
      hideInMenu: checkRole("AdminAndManager"),
    },
    {
      name: "Tin tức",
      path: "new-user",
      icon: <FileDoneOutlined />,
      element: <DisplayNew />,
      hideInMenu: checkRole("AdminAndManager"),
    },
  ],
};

export const routes: MenuDataItem[] | RouteObject[] = [
  {
    path: "*",
    name: "404",
    element: <NotFound />,
  },
  {
    path: "/home",
    name: "Trang chủ",
    element: <Home />,
  },
  {
    path: "/news/:id",
    name: "Chi tiết tin tức",
    element: <NewsDetailPage />,
  },
  {
    path: "/notifications/:id",
    name: "Thông báo",
    element: <NotificationDetail />,
  },
  {
    path: "/error",
    children: [
      {
        path: "404",
        name: "Error 404",
        element: <NotFound />,
      },
      {
        path: "403",
        name: "Error 403",
        element: <NotAuthorized />,
      },
    ],
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  workplace,
];

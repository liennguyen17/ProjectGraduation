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
import AllTopics from "../pages/AllTopic/demo";

//config defaultRouter
export const defaultRouter: Record<string, string> = {
  "/sinh-vien": "/1/sinh-vien",
};

export const workplace: RouteObject | MenuDataItem = {
  path: "/",
  element: <Layout />,
  children: [
    {
      // >>>>>>> 1707fabce9ba066f41e3500b44be2d6a9917f96b
      name: "Quản lý người dùng",
      path: "users",
      icon: <ReadOutlined />,
      // element: <PostPage />,
      children: [
        {
          name: "User",
          path: "user",
          icon: <ReadOutlined />,
          element: <User />,
          // element: <Student />,
        },

        {
          name: "Giảng viên quản lý",
          path: "manage",
          icon: <ClusterOutlined />,
          element: <Manage />,
        },
        {
          name: "Giảng viên hướng dẫn",
          path: "teacher",
          icon: <NotificationOutlined />,
          element: <Teacher />,
          // element: <ModalFormNews />,
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
      name: "Quản lý tin tức",
      path: "news",
      icon: <FileDoneOutlined />,
      element: <News />,
    },

    {
      name: "Quản lý thông báo",
      path: "notification",
      icon: <FileDoneOutlined />,
      element: <Notification />,
    },
    {
      name: "Quản lý khóa luận tốt nghiệp",
      path: "graduation-thesis",
      icon: <FileDoneOutlined />,
      // element: <>recruitment</>,
      children: [
        {
          name: "Phê duyệt đề tài",
          path: "approval",
          icon: <TeamOutlined />,
          element: <TopicApproval />,
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
      name: "Đăng ký đề tài",
      path: "register-topic",
      icon: <FileDoneOutlined />,
      element: <RegistrationTopic />,
      // element: <MyComponent />,
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

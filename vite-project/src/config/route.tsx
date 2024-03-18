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
    // {
    //   name: "Quản lý đề tài",
    //   path: "topics",
    //   icon: <FileDoneOutlined />,
    //   element: <Topic />,
    // },
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
          name: "Đề tài",
          path: "topic",
          icon: <SolutionOutlined />,
          element: <Topic />,
        },
        {
          name: "Phê duyệt đề tài",
          path: "file",
          icon: <TeamOutlined />,
          element: <>o no</>,
        },
      ],
    },
    // {
    //   name: "Quản lý tin tức",
    //   path: "user-management",
    //   icon: <FileDoneOutlined />,
    //   // element: <></>,
    //   children: [
    //     {
    //       name: "Tin tức sinh viên",
    //       path: "news",
    //       icon: <ReadOutlined />,
    //       element: <DrawerStudent />,
    //     },
    //     {
    //       name: "Tin tức",
    //       path: "permission",
    //       icon: <FolderOpenOutlined />,
    //       element: <DrawerNews />,
    //     },
    //   ],
    // },
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

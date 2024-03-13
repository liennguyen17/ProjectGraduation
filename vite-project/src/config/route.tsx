import { MenuDataItem } from "@ant-design/pro-components";
import { RouteObject } from "react-router-dom";

import {
  ClusterOutlined,
  FileDoneOutlined,
  FolderOpenOutlined,
  NotificationOutlined,
  ReadOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Layout from "../layout";
import NotFound from "../pages/404";
import NotAuthorized from "../pages/403";
import ModalFormStudent from "../pages/Student/components/ModalFormStudent";
import DrawerStudent from "../pages/Student/components/DrawerStudent";
import Student from "../pages/Student";
import DrawerNews from "../pages/News/components/DrawerNews";
import User from "../pages/User";
import Teacher from "../pages/Teacher";
import News from "../pages/News";
import Topic from "../pages/Topic";
import Login from "../pages/Login";

//config defaultRouter
export const defaultRouter: Record<string, string> = {
  "/sinh-vien": "/1/sinh-vien",
};

export const workplace: RouteObject | MenuDataItem = {
  path: "/",
  element: <Layout />,
  children: [
    {
<<<<<<< HEAD
=======
      name: "Đăng nhập",
      path: "login",
      element: "Ô nô không ra giữa nữa rồi",
      // element: <LoginPage />,
    },
    {
>>>>>>> 1707fabce9ba066f41e3500b44be2d6a9917f96b
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
          path: "teacher",
          icon: <ClusterOutlined />,
          element: <ModalFormStudent />,
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
          name: "Bộ môn CNPM",
          path: "member",
          icon: <TeamOutlined />,
          element: <></>,
        },
      ],
    },
    {
      name: "Quản lý tin tức",
      path: "user-management",
      icon: <FileDoneOutlined />,
      // element: <></>,
      children: [
        {
          name: "Tin tức sinh viên",
          path: "news",
          icon: <ReadOutlined />,
          element: <DrawerStudent />,
        },
        {
          name: "Tin tức",
          path: "permission",
          icon: <FolderOpenOutlined />,
          element: <DrawerNews />,
        },
      ],
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

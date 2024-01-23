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

//config defaultRouter
export const defaultRouter: Record<string, string> = {
  "/sinh-vien": "/1/sinh-vien",
};

export const workplace: RouteObject | MenuDataItem = {
  path: "/",
  element: <Layout />,
  children: [
    {
      name: "Quản lý sinh viên",
      path: "cms",
      icon: <ReadOutlined />,
      // element: <PostPage />,
      children: [
        {
          name: "sinh viên",
          path: "posts",
          icon: <ReadOutlined />,
          element: <div>123</div>,
        },
        {
          name: "sinh viên",
          path: "category",
          icon: <ClusterOutlined />,
          element: <div>123</div>,
        },
        {
          name: "sinh viên",
          path: "banner",
          icon: <NotificationOutlined />,
          element: <div>123</div>,
        },
        {
          name: "sinh viên",
          path: "media",
          icon: <ClusterOutlined />,
          element: <div>123</div>,
        },
      ],
    },
    {
      name: "Quản lý giảng viên",
      path: "recruitment",
      icon: <FileDoneOutlined />,
      element: <>giảng viên</>,
    },
    {
      name: "Quản lý Bài viết KLTN",
      path: "candidate-management",
      icon: <FileDoneOutlined />,
      element: <>recruitment</>,
      children: [
        {
          name: "Bộ môn CNPM",
          path: "candidate",
          icon: <SolutionOutlined />,
          element: <div>sinh viên</div>,
        },
        {
          name: "Bộ môn CNPM",
          path: "member",
          icon: <TeamOutlined />,
          element: <div>sinh viên</div>,
        },
      ],
    },
    {
      name: "Quản lý người dùng",
      path: "user-management",
      icon: <FileDoneOutlined />,
      element: <></>,
      children: [
        {
          name: "Người dùng",
          path: "user",
          icon: <ReadOutlined />,
          element: <div>sinh viên</div>,
        },
        {
          name: "Vai trò",
          path: "permission",
          icon: <FolderOpenOutlined />,
          element: <div>sinh viên</div>,
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
        element: <div>login</div>,
      },
    ],
  },
  workplace,
];

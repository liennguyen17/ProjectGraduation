import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React from "react";

export const columTeacher = () => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      hideInTable: true,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      // hideInTable: true, //ẩn trên bảng
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
    },
    {
      title: "Mã giảng viên",
      dataIndex: "userCode",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Bộ môn",
      dataIndex: "subject",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      hideInSearch: true, //ẩn ở tìm kiếm
      width: "100px",
      // hideInTable: true,
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      hideInSearch: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      hideInSearch: true,
      width: "100px",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateAt",
      hideInSearch: true,
      width: "100px",
    },
    {
      title: "Hành động",
      hideInSearch: true,
      align: "center",
      render: () => (
        <Space>
          <Button
            ghost
            type="link"
            icon={<EyeOutlined />}
            // onClick={() => handleView(record)}
          ></Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            // onClick={() => handleEdit(record)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            //onClick={() => handleDelete(record)}
          ></Button>
        </Space>
      ),
    },
  ];
};

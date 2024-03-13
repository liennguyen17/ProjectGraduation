import {
  EditOutlined,
  DeleteOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import React from "react";

export const columStudent = () => {
  return [
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
      hideInTable: true,
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
      //   width: 100,
      render: () => (
        <div>
          <SolutionOutlined
            style={{ fontSize: "22px", color: "#65ddc7", marginRight: "13px" }}
            //   onClick={() => handleAdd()}
          />
          <EditOutlined
            style={{ fontSize: "22px", color: "#3eb0e8", marginRight: "13px" }}
            // onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            style={{ fontSize: "22px", color: "#fc755a" }}
            // onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];
};

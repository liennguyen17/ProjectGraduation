import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";

export const columUser = () => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: "Học kỳ",
      dataIndex: "semester",
      hideInTable: true,
      // hideInSearch: true,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      // hideInTable: true,
      // hideInSearch: true,
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
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateAt",
      hideInSearch: true,
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

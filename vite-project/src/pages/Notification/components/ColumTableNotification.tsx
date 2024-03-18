import { Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const dataNotification = [
  {
    title: "ID",
    dataIndex: "id",
    hideInTable: true,
    hideInSearch: true,
  },
  {
    title: "Tên thông báo",
    dataIndex: "title",
    width: "20%",
  },
  {
    title: "Nội dung thông báo",
    dataIndex: "description",
    width: "200px",
    // ellipsis: true,
  },
  {
    title: "File đính kèm",
    dataIndex: "file",
  },
  {
    title: "Trạng thái đọc",
    dataIndex: "isRead",
  },

  {
    title: "Ngày tạo",
    dataIndex: "createAt",
    align: "center",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updateAt",
    align: "center",
  },
  {
    title: "Thao tác",
    dataIndex: "operation",
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

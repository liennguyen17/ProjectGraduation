import { Button, Space } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Notification } from "../../../service/types";

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
    title: "Mô tả",
    dataIndex: "description",
    width: "20%",
  },
  {
    title: "Người tạo",
    dataIndex: "user",
    width: "5%",
  },
  {
    title: "Nội dung",
    dataIndex: "content",
    width: "200px",
    ellipsis: true,
    hideInTable: true,
    hideInSearch: true,
  },
  {
    title: "File đính kèm",
    dataIndex: "file",
    hideInSearch: true,
    align: "center",
    width: "10%",
    render: (_, record: Notification) => (
      <a href={record.file} target="_blank" rel="noopener noreferrer">
        <DownloadOutlined /> File đính kèm
      </a>
    ),
  },
  {
    title: "Trạng thái đọc",
    dataIndex: "isRead",
    hideInTable: true,
    hideInSearch: true,
  },

  {
    title: "Ngày tạo",
    dataIndex: "createAt",
    align: "center",
    hideInSearch: true,
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updateAt",
    align: "center",
    hideInSearch: true,
  },
  {
    title: "Thao tác",
    dataIndex: "operation",
    align: "center",
    hideInSearch: true,
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

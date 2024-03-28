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
    title: "Nội dung thông báo",
    dataIndex: "description",
    width: "200px",
    // ellipsis: true,
  },
  {
    title: "File đính kèm",
    dataIndex: "file",
    hideInSearch: true,
    render: (_, record: Notification) => (
      <a href={record.file} target="_blank" rel="noopener noreferrer">
        <DownloadOutlined /> File đính kèm
      </a>
    ),
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

import { Button, Space } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Notification, NotificationType } from "../../../service/types";
import { ProColumns } from "@ant-design/pro-components";

// export const dataNotification = [
//   {
//     title: "ID",
//     dataIndex: "id",
//     hideInTable: true,
//     hideInSearch: true,
//   },
//   {
//     title: "Tên thông báo",
//     dataIndex: "title",
//     width: "20%",
//   },
//   {
//     title: "Mô tả",
//     dataIndex: "description",
//     width: "20%",
//   },
//   {
//     title: "Người tạo",
//     dataIndex: "user",
//     width: "5%",
//   },
//   {
//     title: "Nội dung",
//     dataIndex: "content",
//     width: "200px",
//     ellipsis: true,
//     hideInTable: true,
//     hideInSearch: true,
//   },
//   {
//     title: "File đính kèm",
//     dataIndex: "file",
//     hideInSearch: true,
//     align: "center",
//     width: "10%",
//     render: (_, record: Notification) => (
//       <a href={record.file} target="_blank" rel="noopener noreferrer">
//         <DownloadOutlined /> File đính kèm
//       </a>
//     ),
//   },
//   {
//     title: "Trạng thái đọc",
//     dataIndex: "isRead",
//     hideInTable: true,
//     hideInSearch: true,
//   },

//   {
//     title: "Ngày tạo",
//     dataIndex: "createAt",
//     align: "center",
//     hideInSearch: true,
//   },
//   {
//     title: "Ngày cập nhật",
//     dataIndex: "updateAt",
//     align: "center",
//     hideInSearch: true,
//   },
//   {
//     title: "Thao tác",
//     dataIndex: "operation",
//     align: "center",
//     hideInSearch: true,
//     render: () => (
//       <Space>
//         <Button
//           ghost
//           type="link"
//           icon={<EyeOutlined />}
//           // onClick={() => handleView(record)}
//         ></Button>
//         <Button
//           type="link"
//           icon={<EditOutlined />}
//           // onClick={() => handleEdit(record)}
//         ></Button>
//         <Button
//           type="link"
//           icon={<DeleteOutlined />}
//           //onClick={() => handleDelete(record)}
//         ></Button>
//       </Space>
//     ),
//   },
// ];

interface ColumnProps {
  handleViewDetail: (record: NotificationType) => void;
  handleEdit: (record: NotificationType) => void;
  handleDelete: (record: NotificationType) => void;
}

export const columnNotification = ({
  handleViewDetail,
  handleEdit,
  handleDelete,
}: ColumnProps): ProColumns<NotificationType>[] => {
  return [
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
    // {
    //   title: "Người tạo",
    //   dataIndex: "user",
    //   width: "5%",
    // },
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
      width: "10%",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateAt",
      align: "center",
      hideInSearch: true,
      width: "10%",
    },
    {
      width: "10%",
      title: "Thao tác",
      dataIndex: "operation",
      align: "center",
      hideInSearch: true,
      render: (text, record) => (
        <Space>
          <Button
            ghost
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          ></Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          ></Button>
        </Space>
      ),
    },
  ];
};

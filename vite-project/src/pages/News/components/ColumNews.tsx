import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Space } from "antd";
import { NewsType } from "../../../service/types";

interface ColumnProps {
  handleViewDetail: (record: NewsType) => void;
  handleDelete: (record: NewsType) => void;
  handleEdit: (record: NewsType) => void;
}

export const columsNews = ({
  handleViewDetail,
  handleEdit,
  handleDelete,
}: ColumnProps): ProColumns<NewsType>[] => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      width: "100px",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "350px",
      hideInSearch: true,
      // width: "20%",
      // ellipsis: true,
      //   render: (text, entity) => (
      //     <span
      //       style={{
      //         overflow: "hidden",
      //         textOverflow: "ellipsis",
      //         whiteSpace: "nowrap",
      //       }}
      //     >
      //       {entity.description}
      //     </span>
      //   ),
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      hideInSearch: true,
      render: (text, record) => (
        <img
          src={record.image as string}
          alt="Ảnh tin tức"
          style={{ width: "100px" }}
        />
      ),
    },
    {
      title: "File đính kèm",
      dataIndex: "file",
      hideInSearch: true,
      render: (_, record) => (
        <a href={record.file} target="_blank" rel="noopener noreferrer">
          <DownloadOutlined /> File đính kèm
        </a>
      ),
    },
    {
      title: "Năm",
      dataIndex: "year",
    },
    {
      title: "Bộ môn",
      dataIndex: "subject",
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

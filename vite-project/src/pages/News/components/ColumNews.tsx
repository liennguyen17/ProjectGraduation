import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Space } from "antd";

interface NewsRecord {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;

  file: string;
  year: number;
  subject: string;
  createAt: Date;
  updateAt: Date;
}

export const colums = (): ProColumns<NewsRecord>[] => {
  return [
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      hideInTable: true,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      hideInSearch: true,
      render: (text, record: NewsRecord) => (
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
      render: (_, record: NewsRecord) => (
        <a href={record.file} target="_blank" rel="noopener noreferrer">
          File đính kèm
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

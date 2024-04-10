import { useEffect, useState } from "react";
import { getNewsDetail } from "../../../service/api";
import { Drawer } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { DownloadOutlined } from "@ant-design/icons";
import { NewsType } from "../../../service/types";

interface DrawerProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  selectedRecord: NewsType | null;
}

const DrawerNew: React.FC<DrawerProps> = ({
  open,
  onClose,
  selectedRecord,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (selectedRecord) {
      const responseData = async () => {
        try {
          const response = await getNewsDetail(selectedRecord.id);
          setData(response);
        } catch (error) {
          console.error("Error fetching new detail:", error);
        }
      };
      responseData();
    }
  }, [selectedRecord]);
  return (
    <Drawer
      title="Chi tiết tin tức"
      onClose={() => onClose(false)}
      visible={open}
      width={"80%"}
    >
      <ProDescriptions<NewsType>
        column={1}
        dataSource={data}
        columns={[
          {
            title: "Tiêu đề",
            key: "title",
            dataIndex: "title",
            // ellipsis: true,
          },
          {
            title: "Ảnh",
            dataIndex: "image",
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
            render: (_, record) => (
              <a href={record.file} target="_blank" rel="noopener noreferrer">
                <DownloadOutlined /> File
              </a>
            ),
          },
          {
            title: "Năm bảo vệ",
            dataIndex: "year",
          },
          {
            title: "Bộ môn",
            dataIndex: "subject",
          },
          {
            title: "Mô tả",
            key: "description",
            dataIndex: "description",
            // ellipsis: true,
          },
          {
            title: "Nội dung",
            key: "content",
            dataIndex: "content",
            // ellipsis: true,
            render(dom, entity) {
              return (
                <div dangerouslySetInnerHTML={{ __html: entity.content }} />
              );
            },
          },
          {
            title: "Ngày tạo",
            dataIndex: "createAt",
            // hideInSearch: true,
          },
          {
            title: "Ngày cập nhật",
            dataIndex: "updateAt",
            // hideInSearch: true,
          },
        ]}
      ></ProDescriptions>
    </Drawer>
  );
};

export default DrawerNew;

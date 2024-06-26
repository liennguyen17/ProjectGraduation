import { useEffect, useState } from "react";
import { getNotificationsDetail } from "../../../service/api";
import { Drawer } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { DownloadOutlined } from "@ant-design/icons";
import { Notification, NotificationType } from "../../../service/types";

// interface NotificationRecord {
//   id: number;
//   user: string;
//   title: string;
//   description: string;
//   file: string;
//   isRead: string;
//   createAt: string;
//   updateAt: string;
// }
interface DrawerProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  selectedRecord: NotificationType | null;
}
const DrawerNotification: React.FC<DrawerProps> = ({
  open,
  onClose,
  selectedRecord,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (selectedRecord) {
      const responseData = async () => {
        try {
          const response = await getNotificationsDetail(selectedRecord.id);
          setData(response);
        } catch (error) {
          console.error("Error fetching notification detail:", error);
        }
      };
      responseData();
    }
  }, [selectedRecord]);
  return (
    <Drawer
      title="Chi tiết thông báo"
      onClose={() => onClose(false)}
      visible={open}
      width={"80%"}
    >
      <ProDescriptions<Notification>
        column={1}
        dataSource={data}
        // layout="vertical"
        columns={[
          {
            title: "Tên thông báo",
            key: "title",
            dataIndex: "title",
            // ellipsis: true,
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
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
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
            title: "Người tạo",
            dataIndex: "user",
          },
          {
            title: "Ngày tạo",
            dataIndex: "createAt",
          },
          {
            title: "Ngày cập nhật",
            dataIndex: "updateAt",
          },
        ]}
      ></ProDescriptions>
    </Drawer>
  );
};

export default DrawerNotification;

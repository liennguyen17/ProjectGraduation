import { PageContainer, ProList } from "@ant-design/pro-components";
import { NotificationGetListApi } from "../../../service/api";
import { Key, ReactNode, useEffect, useState } from "react";
import { Avatar, Button, Image, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
type Notification = {
  id: number;
  user: null;
  title: string;
  description: string;
  file: string;
  isRead: string;
  createAt: string;
  updateAt: string;
};

const DisplayNotification: React.FC = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);
  useEffect(() => {
    const datasetNotification = async () => {
      try {
        const res = await NotificationGetListApi();
        console.log("res:: ", res);
        setNotificationData(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    datasetNotification();
  }, []);

  const ActionsButton: React.FC = () => {
    return (
      <>
        <Button>
          <EyeOutlined />
        </Button>
      </>
    );
  };

  return (
    <PageContainer subTitle="Thông báo" title={false}>
      <ProList<Notification>
        dataSource={notificationData}
        search={{
          filterType: "light",
        }}
        headerTitle="Danh sách thông báo "
        request={async () => {
          // try{
          const res = await NotificationGetListApi();
          return res;
          // }
        }}
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        // metas={{
        //   title: {
        //     dataIndex: "title",
        //   },
        //   description: {
        //     dataIndex: "description",
        //   },
        //   actions: {
        //     render: (text, row) => [<a>xem chi tiet</a>, <a>tong quan</a>],
        //     search: false,
        //   },
        //   status: {},

        // }}
        metas={{
          title: {
            dataIndex: "title",
            title: "title",
            render: (dom: ReactNode) => {
              return dom;
            },
          },
          avatar: {
            dataIndex: "image",
            editable: false,
            render: () => {
              return <Avatar src="/images/logo.jpg" size={32} />;
            },
          },
          description: {
            dataIndex: "description",
          },
          subTitle: {
            dataIndex: "updateAt",
            render: (a) => {
              return a;
            },
          },
          actions: {
            render: (text, row, index, action) => {
              console.log("action", action);
              return <ActionsButton />;
            },
          },
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
      ></ProList>
    </PageContainer>
  );
};
export default DisplayNotification;

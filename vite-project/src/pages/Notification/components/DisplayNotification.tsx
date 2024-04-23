import { PageContainer, ProList } from "@ant-design/pro-components";
import { NotificationGetListApi } from "../../../service/api";
import { Key, ReactNode, useEffect, useState } from "react";
import { Avatar, Button, Image, Space, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Notification } from "../../../service/types";

const DisplayNotification: React.FC = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const datasetNotification = async () => {
  //     try {
  //       const res = await NotificationGetListData();
  //       // console.log("res:: ", res);
  //       setNotificationData(res);
  //     } catch (error) {
  //       console.error("Loi lay du lieu: ", error);
  //     }
  //   };
  //   datasetNotification();
  // }, []);

  const handleViewDetail = (id: number) => {
    navigate(`/notifications/${id}`);
  };

  return (
    <PageContainer subTitle="Thông báo" title={false}>
      <ProList<Notification>
        search={{
          filterType: "query",
        }}
        request={async (params, sort, filter) =>
          await NotificationGetListApi(params, sort, filter)
        }
        headerTitle="Danh sách thông báo "
        metas={{
          title: {
            dataIndex: "title",
            title: "Tiêu đề",
            render: (dom: ReactNode) => {
              return dom;
            },
          },
          avatar: {
            dataIndex: "image",
            // editable: false,
            search: false,
            render: () => {
              return <Avatar src="/images/logo.jpg" size={32} />;
            },
          },
          description: {
            dataIndex: "description",
            // search: false,
            title: "Mô tả",
          },
          subTitle: {
            search: false,
            title: "Ngày tạo",
            dataIndex: "updateAt",
            render: (a) => {
              return a;
            },
          },
          actions: {
            render: (text, row, index, action) => [
              <Button onClick={() => handleViewDetail(row.id)}>
                <EyeOutlined />
              </Button>,
            ],
            // {
            //   console.log("action", action);
            //   return (
            //     <Button type="">
            //       <ActionsButton /> xem thông báo
            //     </Button>
            //   );
            // },
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

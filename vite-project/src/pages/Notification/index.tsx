import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { NotificationGetListApi } from "../../service/api";
import { Button } from "antd";
import { dataNotification } from "./components/ColumTableNotification";
// import "./styles.css";

const Notification: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [notificationData, setNotificationData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const datasetNotification = async () => {
      try {
        const res = await NotificationGetListApi();
        setNotificationData(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    datasetNotification();
  }, []);

  return (
    <PageContainer
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 4,
      }}
      title={false}
      footer={[]}
    >
      <ProTable
        dataSource={notificationData}
        columns={dataNotification}
        actionRef={actionRef}
        formRef={formRef}
        cardBordered
        headerTitle="Danh sách tất cả người dùng"
        size="small"
        tableLayout="auto"
        rowKey="id"
        search={{
          labelWidth: "auto",
          filterType: "query",
          style: {
            // paddingBlock: 12,
          },
        }}
        scroll={{ x: "max-content", y: "calc(100vh - 260px)" }}
        options={{
          search: {
            placeholder: "Nhập từ khoá để tìm kiếm...",
            style: { width: 300 },
          },
          density: false,
          setting: true,
        }}
        cardProps={{
          bodyStyle: {
            paddingBottom: 30,
            paddingTop: 20,
            paddingInline: 12,
          },
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
        dateFormatter="string"
        rowSelection={{}}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showModal}>
            <PlusOutlined /> Tạo người dùng
          </Button>,
        ]}
      ></ProTable>
      {/* <ModalFormUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      /> */}
    </PageContainer>
  );
};
export default Notification;

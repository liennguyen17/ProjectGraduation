import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { NotificationGetListApi, deleteNotification } from "../../service/api";
import { Button, Modal, message } from "antd";
import { columnNotification } from "./components/ColumTableNotification";
import DrawerNotification from "./components/DrawerNotification";
import ModalNotificationForm from "./components/ModalNotificationForm";
import { NotificationType } from "../../service/types";
// import "./styles.css";

const Notification: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [notificationData, setNotificationData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<NotificationType | null>(
    null
  );
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [recordToDeleteName, setRecordToDeleteName] = useState("");

  // const showDrawer = () => {
  //   setOpenDrawer(true);
  // };

  // const onClose = () => {
  //   setOpenDrawer(false);
  // };

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

  const handleViewDetail = (record: NotificationType) => {
    setSelectedRecord(record);
    setIsDetailVisible(true);
  };

  const handleCloseDetail = () => {
    setSelectedRecord(null);
    setIsDetailVisible(false);
  };

  const handleEdit = (record: NotificationType) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
    setEditingId(record.id);
  };

  const handleDelete = (record: NotificationType) => {
    setSelectedRecord(record);
    setIsConfirmDeleteOpen(true);
    setRecordToDeleteName(record.title);
  };

  const handleCreateSuccess = async () => {
    try {
      const res = await NotificationGetListApi();
      setNotificationData(res);
    } catch (error) {
      console.error("loi lay du lieu:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteNotification([selectedRecord?.id]);
      console.log("delete::", res);
      message.success(res.data);
      handleCreateSuccess();
      setIsConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Lỗi xóa dữ liệu::", error);
    }
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const columns = columnNotification({
    handleViewDetail,
    handleEdit,
    handleDelete,
  });

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
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        cardBordered
        headerTitle="Danh sách tất cả thông báo"
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
            <PlusOutlined /> Tạo thông báo
          </Button>,
          // <Button type="primary" key="primary" onClick={showDrawer}>
          //   demo drawer
          // </Button>,
        ]}
      ></ProTable>
      {/* <ModalFormUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      /> */}
      <ModalNotificationForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleCreateSuccess={handleCreateSuccess}
        editingId={editingId}
        selectedRecord={selectedRecord}
      />
      <DrawerNotification
        open={isDetailVisible}
        onClose={handleCloseDetail}
        selectedRecord={selectedRecord}
      />
      <Modal
        title="Xác nhận xóa"
        visible={isConfirmDeleteOpen}
        onOk={handleConfirmDelete}
        onCancel={handleCloseConfirmDelete}
      >
        <p>
          Bạn có chắc chắn muốn xóa người dùng "{recordToDeleteName}" không?
        </p>
      </Modal>
    </PageContainer>
  );
};
export default Notification;

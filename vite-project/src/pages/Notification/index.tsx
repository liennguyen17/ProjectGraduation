import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { NotificationGetListApi, deleteNotification } from "../../service/api";
import { Button, Modal, message } from "antd";
import { columnNotification } from "./components/ColumTableNotification";
import DrawerNotification from "./components/DrawerNotification";
import ModalNotificationForm from "./components/ModalNotificationForm";
import { NotificationType } from "../../service/types";

const Notification: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<NotificationType | null>(
    null
  );
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [recordToDeleteName, setRecordToDeleteName] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

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

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteNotification([selectedRecord?.id]);
      console.log("delete::", res);
      message.success(res.data);
      if (actionRef && actionRef.current) {
        actionRef.current.reload();
      }
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
        request={async (params, sort, filter) =>
          await NotificationGetListApi(params, sort, filter)
        }
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        cardBordered
        headerTitle="Danh sách tất cả thông báo"
        size="small"
        tableLayout="auto"
        rowKey="id"
        search={false}
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
        // rowSelection={{}}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showModal}>
            <PlusOutlined /> Tạo thông báo
          </Button>,
        ]}
      ></ProTable>
      <ModalNotificationForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        actionRef={() => actionRef.current?.reload()}
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

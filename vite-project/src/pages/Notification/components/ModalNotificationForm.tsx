import { Modal } from "antd";
import NotificationForm from "./NotificationForm";
import { NotificationType } from "../../../service/types";

interface ModalFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleCreateSuccess: () => Promise<void>;
  editingId: number | null;
  selectedRecord: NotificationType | null;
}

const ModalNotificationForm: React.FC<ModalFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  handleCreateSuccess,
  editingId,
  selectedRecord,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title={editingId ? "Chỉnh sửa thông báo" : "Tạo thông báo"}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      width={900}
      footer={false}
    >
      <NotificationForm
        handleCancel={handleCancel}
        handleCreateSuccess={handleCreateSuccess}
        editingId={editingId}
        initialData={selectedRecord}
      />
    </Modal>
  );
};
export default ModalNotificationForm;

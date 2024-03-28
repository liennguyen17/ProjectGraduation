import { Modal } from "antd";
import NotificationForm from "./NotificationForm";

interface ModalFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ModalNotificationForm: React.FC<ModalFormProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Tạo thông báo"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      width={900}
    >
      <NotificationForm />
    </Modal>
  );
};
export default ModalNotificationForm;

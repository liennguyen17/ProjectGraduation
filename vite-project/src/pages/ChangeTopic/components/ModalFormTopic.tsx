import { Modal } from "antd";
import FormRegisterTopic from "./FormRegisterTopic";

interface ModalTopicFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ModalFormTopic: React.FC<ModalTopicFormProps> = ({
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
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      width="60%"
      title="ĐƠN XIN ĐỔI TÊN ĐỀ TÀI KHÓA LUẬN TỐT NGHIỆP"
      footer={false}
    >
      <FormRegisterTopic handleCancel={handleCancel} />
    </Modal>
  );
};
export default ModalFormTopic;

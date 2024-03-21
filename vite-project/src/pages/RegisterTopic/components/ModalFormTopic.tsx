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
      width={900}
      title="ĐƠN ĐĂNG KÝ ĐỀ TÀI KHÓA LUẬN TỐT NGHIỆP"
    >
      <FormRegisterTopic />
    </Modal>
  );
};
export default ModalFormTopic;

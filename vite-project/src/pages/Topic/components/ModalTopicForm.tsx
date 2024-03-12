import { Modal } from "antd";
import TopicForm from "./TopicForm";

interface ModalTopicFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ModalTopicForm: React.FC<ModalTopicFormProps> = ({
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
    <>
      <Modal
        title="Tạo đề tài"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        width="60%"
      >
        <TopicForm />
      </Modal>
    </>
  );
};
export default ModalTopicForm;

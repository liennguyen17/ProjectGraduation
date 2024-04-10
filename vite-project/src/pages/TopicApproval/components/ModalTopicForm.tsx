import { Modal } from "antd";
import TopicForm from "./TopicForm";
import { TopicType } from "../../../service/types";

interface ModalTopicFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  editingId: number | null;
  selectedRecord: TopicType | null;
  actionRef?: () => void;
}

const ModalTopicForm: React.FC<ModalTopicFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  editingId,
  selectedRecord,
  actionRef,
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
        title={editingId ? "Chỉnh sửa đề tài" : "Tạo đề tài"}
        // title="Tạo đề tài"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        width="65%"
        footer={false}
      >
        <TopicForm
          actionRef={actionRef}
          onCancel={handleCancel}
          editingId={editingId}
          initialData={selectedRecord}
        />
      </Modal>
    </>
  );
};
export default ModalTopicForm;

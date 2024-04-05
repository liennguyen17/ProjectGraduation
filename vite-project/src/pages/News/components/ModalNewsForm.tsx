import { Modal } from "antd";

import NewsForm from "./NewsForm";
import { NewsType } from "../../../service/types";

interface ModalNewFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleCreateSuccess: () => Promise<void>;
  editingId: number | null;
  selectedRecord: NewsType | null;
}

const ModalNewsForm: React.FC<ModalNewFormProps> = ({
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
    <>
      <Modal
        title={editingId ? "Chỉnh sửa tin tức" : "Tạo tin tức"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        width={900}
        footer={false}
      >
        <NewsForm
          handleCancel={handleCancel}
          handleCreateSuccess={handleCreateSuccess}
          editingId={editingId}
          initialData={selectedRecord}
        />
      </Modal>
    </>
  );
};

export default ModalNewsForm;

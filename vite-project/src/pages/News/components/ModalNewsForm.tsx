import { Modal } from "antd";

import NewsForm from "./NewsForm";
import { NewsType } from "../../../service/types";

interface ModalNewFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  editingId: number | null;
  selectedRecord: NewsType | null;
  actionRef?: () => void;
}

const ModalNewsForm: React.FC<ModalNewFormProps> = ({
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
        title={editingId ? "Chỉnh sửa tin tức" : "Tạo tin tức"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        width={900}
        footer={false}
      >
        <NewsForm
          actionRef={actionRef}
          handleCancel={handleCancel}
          editingId={editingId}
          initialData={selectedRecord}
        />
      </Modal>
    </>
  );
};

export default ModalNewsForm;

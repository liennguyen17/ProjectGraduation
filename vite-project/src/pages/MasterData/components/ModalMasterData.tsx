import { Modal } from "antd";
import MasterDataForm from "./MasterDataForm";
import { MasterData } from "../../../service/types";

interface ModalFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  editingId: number | null;
  selectedRecord: MasterData | null;
  actionRef?: () => void;
}

const ModalMasterData: React.FC<ModalFormProps> = ({
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
    <Modal
      title={editingId ? "Chỉnh sửa Master Data" : "Tạo Master Data"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      footer={false}
      width={900}
    >
      <MasterDataForm
        handleCancel={handleCancel}
        actionRef={actionRef}
        editingId={editingId}
        initialData={selectedRecord}
      />
    </Modal>
  );
};
export default ModalMasterData;

import { Modal } from "antd";
import MasterDataForm from "./MasterDataForm";
import { MasterData } from "../../../service/types";

interface ModalFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleCreateSuccess: () => Promise<void>;
  editingId: number | null;
  selectedRecord: MasterData | null;
}

const ModalMasterData: React.FC<ModalFormProps> = ({
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
        handleCreateSuccess={handleCreateSuccess}
        editingId={editingId}
        initialData={selectedRecord}
      />
    </Modal>
  );
};
export default ModalMasterData;

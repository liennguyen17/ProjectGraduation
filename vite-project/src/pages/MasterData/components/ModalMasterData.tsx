import { Modal } from "antd";
import MasterDataForm from "./MasterDataForm";

interface ModalFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ModalMasterData: React.FC<ModalFormProps> = ({
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
      title="Tạo Master Data"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      width={900}
    >
      <MasterDataForm />
    </Modal>
  );
};
export default ModalMasterData;

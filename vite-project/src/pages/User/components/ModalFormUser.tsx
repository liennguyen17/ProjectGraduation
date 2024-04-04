import { Modal } from "antd";
import FormUser from "./FormUser";
import { UserType } from "../../../service/types";

interface ModalUserFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleCreateSuccess: () => Promise<void>;
  editingId: number | null;
  selectedRecord: UserType | null;
}
const ModalFormUser: React.FC<ModalUserFormProps> = ({
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
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      width={900}
      title={editingId ? "Chỉnh sửa người dùng" : "Tạo người dùng"}
      footer={false}
    >
      <FormUser
        handleCancel={handleCancel}
        handleCreateSuccess={handleCreateSuccess}
        editingId={editingId}
        initialData={selectedRecord}
      />
    </Modal>
  );
};

export default ModalFormUser;

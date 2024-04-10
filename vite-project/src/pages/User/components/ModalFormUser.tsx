import { Modal } from "antd";
import FormUser from "./FormUser";
import { UserType } from "../../../service/types";
import { ActionType } from "@ant-design/pro-components";

interface ModalUserFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  editingId: number | null;
  selectedRecord: UserType | null;
  actionRef?: () => void;
}
const ModalFormUser: React.FC<ModalUserFormProps> = ({
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
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      width={900}
      title={editingId ? "Chỉnh sửa người dùng" : "Tạo người dùng"}
      footer={false}
    >
      <FormUser
        actionRef={actionRef}
        handleCancel={handleCancel}
        editingId={editingId}
        initialData={selectedRecord}
      />
    </Modal>
  );
};

export default ModalFormUser;

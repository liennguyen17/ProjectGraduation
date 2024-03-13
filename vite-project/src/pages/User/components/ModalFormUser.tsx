import { Modal } from "antd";
import FormUser from "./FormUser";

interface ModalUserFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}
const ModalFormUser: React.FC<ModalUserFormProps> = ({
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
    >
      <FormUser />
      {/* <StudentsForm /> */}
    </Modal>
  );
};

export default ModalFormUser;

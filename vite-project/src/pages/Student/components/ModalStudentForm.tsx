import { Modal, ModalProps } from "antd";
import StudentsForm from "./StudentsForm";
import { useState } from "react";
import ModalFormStudent from "./ModalFormStudent";

interface ModalStudentFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}
const ModalStudentForm: React.FC<ModalStudentFormProps> = ({
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
      <ModalFormStudent />
      {/* <StudentsForm /> */}
    </Modal>
  );
};

export default ModalStudentForm;

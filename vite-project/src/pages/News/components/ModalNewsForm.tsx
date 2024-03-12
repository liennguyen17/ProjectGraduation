import { Button, Modal } from "antd";
import { useState } from "react";
import StudentsForm from "../../student/components/StudentsForm";
import NewsForm from "./NewsForm";

interface ModalNewFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ModalNewsForm: React.FC<ModalNewFormProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log("modal ", isModalOpen);
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Tạo tin tức
      </Button> */}
      <Modal
        title="Tạo tin tức"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
        width={900}
      >
        <NewsForm />
        {/* <StudentsForm /> */}
      </Modal>
    </>
  );
};

export default ModalNewsForm;

import { Button, Divider, Modal } from "antd";
import { useEffect, useState } from "react";
import { getTopicDetail } from "../../../service/api";
import { ProDescriptions } from "@ant-design/pro-components";

interface ModalTopicFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ModalResultTopic: React.FC<ModalTopicFormProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [topicData, setTopicData] = useState([]);
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await getTopicDetail(1);
        setTopicData(response);
      } catch (error) {
        console.error("Error fetching topic detail:", error);
      }
    };

    fetchNewsDetail();
  }, [1]);
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
      title="KẾT QUẢ ĐỔI ĐỀ TÀI KHÓA LUẬN TỐT NGHIỆP"
      footer={[
        <Button key="back" type="primary" onClick={handleCancel}>
          Đóng
        </Button>,
      ]}
    >
      <ProDescriptions
        column={2}
        request={async () => {
          return Promise.resolve({
            success: true,
            data: topicData,
          });
        }}
      >
        {/* <ProDescriptions.Item span={3}>
          <Divider />
        </ProDescriptions.Item> */}
        <ProDescriptions.Item
          dataIndex="nameTopic"
          label="Tên đề tài khóa luận tốt nghiệp mới"
          span={3}
        />
        <ProDescriptions.Item
          dataIndex={["student", "name"]}
          label="Họ tên sinh viên "
        />
        <ProDescriptions.Item
          dataIndex={["student", "userCode"]}
          label="Mã sinh viên"
        />

        <ProDescriptions.Item
          dataIndex={["teacher", "name"]}
          label="Họ tên giảng viên hướng dẫn "
        />
        <ProDescriptions.Item
          dataIndex={["teacher", "userCode"]}
          label="Mã giảng viên hướng dẫn "
        />

        <ProDescriptions.Item
          dataIndex="departmentManagement"
          label="Bộ môn quản lý "
        />
        <ProDescriptions.Item dataIndex="semester" label="Học kỳ " />

        <ProDescriptions.Item dataIndex="note" label="Ghi chú " />
      </ProDescriptions>
    </Modal>
  );
};
export default ModalResultTopic;

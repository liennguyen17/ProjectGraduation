import { Button, Divider, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  findTopicFromStudentLogin,
  getTopicDetail,
} from "../../../service/api";
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
        const response = await findTopicFromStudentLogin();
        setTopicData(response);
      } catch (error) {
        console.error(
          "Lỗi hiện thị kết quả đăng ký gửi đơn đổi đề tài:",
          error
        );
      }
    };

    fetchNewsDetail();
  }, []);
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
      // title="KẾT QUẢ ĐỔI ĐỀ TÀI KHÓA LUẬN TỐT NGHIỆP"
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
        <ProDescriptions.Item span={3}>
          <Divider>ĐƠN ĐĂNG KÝ ĐỔI TÊN ĐỀ TÀI KHÓA LUẬN TỐT NGHIỆP</Divider>
        </ProDescriptions.Item>
        <ProDescriptions.Item
          dataIndex="newNameTopic"
          label="Đề tài khóa luận tốt nghiệp mới"
          span={3}
        />
        <ProDescriptions.Item
          dataIndex="oldNameTopic"
          label="Đề tài khóa luận tốt nghiệp cũ"
          span={3}
        />
        <ProDescriptions.Item
          dataIndex={["topic", "student", "name"]}
          label="Họ tên sinh viên "
        />
        <ProDescriptions.Item
          dataIndex={["topic", "student", "userCode"]}
          label="Mã sinh viên"
        />

        <ProDescriptions.Item
          dataIndex={["topic", "teacher", "name"]}
          label="Họ tên giảng viên hướng dẫn "
        />
        <ProDescriptions.Item
          dataIndex={["topic", "teacher", "userCode"]}
          label="Mã giảng viên hướng dẫn "
        />

        <ProDescriptions.Item
          dataIndex={["topic", "departmentManagement"]}
          label="Bộ môn quản lý "
        />
        <ProDescriptions.Item
          dataIndex={["topic", "semester"]}
          label="Học kỳ "
        />

        <ProDescriptions.Item
          span={2}
          dataIndex="reason"
          label="Lý do đổi đề tài"
        />
        <ProDescriptions.Item
          span={2}
          dataIndex="createAt"
          label="Ngày gửi đơn"
        />
        <ProDescriptions.Item span={3}>
          <Divider>Kết quả</Divider>
        </ProDescriptions.Item>
        <ProDescriptions.Item
          dataIndex="status"
          label="Trạng thái đơn đổi đề tài"
          span={2}
        />
        <ProDescriptions.Item
          dataIndex="note"
          label="Chú thích/nhắc nhở(nếu có)"
          span={2}
        />
      </ProDescriptions>
    </Modal>
  );
};
export default ModalResultTopic;

import { Button, Divider, Modal } from "antd";
import { useEffect, useState } from "react";
import {
  TopicGetListApi,
  getTopicDetail,
  studentViewTopicLogin,
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
        const response = await studentViewTopicLogin();
        setTopicData(response);
      } catch (error) {
        console.error("Error fetching topic detail:", error);
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
      // title="KẾT QUẢ ĐĂNG KÝ ĐỀ TÀI KHÓA LUẬN TỐT NGHIỆP"
      footer={[
        <Button key="back" type="primary" onClick={handleCancel}>
          Đóng
        </Button>,
      ]}
    >
      <ProDescriptions
        column={2}
        // dataSource={topicData}
        // request={async () => {
        //   return Promise.resolve({
        //     success: true,
        //     data: topicData,
        //   });
        // }}
        request={async () => {
          try {
            const res = await studentViewTopicLogin();
            // setTopicData(res);

            return {
              success: true,
              data: res,
            };
          } catch (error) {
            throw new Error("lien lien");
          }
        }}

        // request={async () => await studentViewTopicLogin()}
      >
        <ProDescriptions.Item span={3}>
          <Divider>ĐƠN ĐĂNG KÝ ĐỀ TÀI KHÓA LUẬN TỐT NGHIỆP</Divider>
        </ProDescriptions.Item>
        <ProDescriptions.Item
          dataIndex="nameTopic"
          label="Đề tài khóa luận tốt nghiệp"
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
        <ProDescriptions.Item
          dataIndex="nameInternshipFacility"
          label="Tên cơ sở thực tập "
        />
        <ProDescriptions.Item
          dataIndex="menterInternshipFacility"
          label="Cán bộ hướng dẫn tại cơ sở thực tập "
        />
        <ProDescriptions.Item
          span={3}
          dataIndex="phoneInstructorInternshipFacility"
          label="Số điện thoại cán bộ hướng dẫn tại cơ sở thực tập"
        />
        <ProDescriptions.Item span={3}>
          <Divider>KẾT QUẢ ĐƠN ĐĂNG KÝ</Divider>
        </ProDescriptions.Item>
        <ProDescriptions.Item
          span={3}
          dataIndex="status"
          label="Trạng thái đơn đăng ký đề tài"
        />
        <ProDescriptions.Item
          span={3}
          dataIndex="note"
          label="Chú thích/nhắc nhở(nếu có)"
        />
      </ProDescriptions>
    </Modal>
  );
};
export default ModalResultTopic;

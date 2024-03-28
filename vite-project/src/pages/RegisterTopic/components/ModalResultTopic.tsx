import { Modal } from "antd";
import { useEffect, useState } from "react";
import { TopicGetListApi, getTopicDetail } from "../../../service/api";
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
        // Gọi API để lấy thông tin chi tiết của tin tức dựa trên id
        const response = await getTopicDetail(1);
        setTopicData(response); // Giả sử API trả về dữ liệu trong response.data
        // setLoading(false);
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
      title="KẾT QUẢ ĐĂNG KÝ ĐỀ TÀI KHÓA LUẬN TỐT NGHIỆP"
    >
      <ProDescriptions
        column={2}
        dataSource={topicData}
        // layout="vertical"
        columns={[
          {
            title: "kết quả:  đơn đăng ký của sinh viên đã được phê duyệt",
            // key: "id",
            // dataIndex: ["student", "name"],
            // ellipsis: true,
          },
          {
            title: "Sinh viên",
            key: "id",
            dataIndex: ["student", "name"],
            ellipsis: true,
          },
          {
            title: "Mã sinh viên",
            key: "userCode",
            dataIndex: ["student", "userCode"],
            ellipsis: true,
          },
          {
            title: "Giáo viên hướng dẫn",
            dataIndex: ["teacher", "name"],
            ellipsis: true,
          },
          {
            title: "Mã giáo viên hướng dẫn",
            dataIndex: ["teacher", "userCode"],
            ellipsis: true,
          },
          // {
          //   title: "Đề tài khóa luận tốt nghiệp",
          //   dataIndex: "nameTopic",
          //   ellipsis: true,
          // },
          {
            title: "Tên cơ sở thực tập",
            dataIndex: "nameInternshipFacility",
            ellipsis: true,
          },
          {
            title: "Cán bộ hướng dẫn tại cơ sở thực tập",
            dataIndex: "menterInternshipFacility",
            ellipsis: true,
          },
          {
            title: "Số điện thoại cán bộ hướng dẫn tại cơ sở thực tập",
            dataIndex: "phoneInstructorInternshipFacility",
            ellipsis: true,
          },
          {
            title: "Kỳ học",
            dataIndex: "semester",
            ellipsis: true,
          },
          {
            title: "Bộ môn quản lý",
            dataIndex: "departmentManagement",
            ellipsis: true,
          },
        ]}
      ></ProDescriptions>
    </Modal>
  );
};
export default ModalResultTopic;

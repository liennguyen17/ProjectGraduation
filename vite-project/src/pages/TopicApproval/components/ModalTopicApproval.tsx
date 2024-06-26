import { Button, Divider, Modal } from "antd";
import { TopicType } from "../../../service/types";
import {
  ProDescriptions,
  ProDescriptionsActionType,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { getTopicDetail } from "../../../service/api";
import "../../../index.css";
interface PropsTopic {
  isModalOpen1: boolean;
  setIsModalOpen1: (isOpen: boolean) => void;
  editingId: number;
  selectedRecord: TopicType | null;
}

const ModalTopicApproval: React.FC<PropsTopic> = ({
  isModalOpen1,
  setIsModalOpen1,
  editingId,
  selectedRecord,
  //   actionRef,
}) => {
  const [data, setData] = useState([]);
  const actionRef = useRef<ProDescriptionsActionType>();
  console.log("editingid:: ", editingId);
  const handleOk = () => {
    setIsModalOpen1(false);
  };

  const handleCancel = () => {
    setIsModalOpen1(false);
  };
  useEffect(() => {
    console.log("change");
    const responseData = async () => {
      try {
        const response = await getTopicDetail(editingId);
        setData(response);
      } catch (error) {
        console.error("Error fetching topic detail:", error);
      }
    };
    // if (isModalOpen1) {
    //   responseData();
    // }

    responseData();
  }, [editingId]);
  return (
    <Modal
      // title="Đơn đăng ký đề tài khóa luận tốt nghiệp"
      open={isModalOpen1}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose
      width={900}
      footer={
        <Button type="primary" onClick={handleCancel}>
          Đóng
        </Button>
      }
    >
      <ProDescriptions<TopicType>
        actionRef={actionRef}
        title={false}
        // request={async () => {
        //   // console.log("data", data);
        //   return Promise.resolve({
        //     success: true,
        //     data: data,
        //   });
        // }}
        dataSource={data}
      >
        <ProDescriptions.Item span={3}>
          <Divider>ĐƠN ĐĂNG KÝ ĐỀ TÀI KHÓA LUẬN TỐT NGHIỆP</Divider>
        </ProDescriptions.Item>
        <ProDescriptions.Item
          dataIndex="nameTopic"
          label="Tên đề tài "
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
          dataIndex={["student", "className"]}
          label="Lớp "
        />
        <ProDescriptions.Item
          dataIndex={["student", "phone"]}
          label="Số điện thoại "
        />
        <ProDescriptions.Item dataIndex={["student", "email"]} label="Email" />

        <ProDescriptions.Item dataIndex="semester" label="Học kỳ " />

        <ProDescriptions.Item
          dataIndex={["teacher", "name"]}
          label="Họ tên giảng viên hướng dẫn "
          span={2}
        />
        <ProDescriptions.Item
          dataIndex="departmentManagement"
          label="Bộ môn quản lý "
        />

        <ProDescriptions.Item
          dataIndex="nameInternshipFacility"
          label="Tên cơ sở thực tập "
          span={3}
        />
        <ProDescriptions.Item
          dataIndex="menterInternshipFacility"
          label="Cán bộ hướng dẫn tại cơ sở thực tập "
          span={3}
        />
        <ProDescriptions.Item
          dataIndex="phoneInstructorInternshipFacility"
          label="Số điện thoại cán bộ hướng dẫn tại cơ sở thực tập "
          span={3}
        />
        <ProDescriptions.Item
          dataIndex="createAt"
          label="Ngày gửi đơn "
          span={3}
        />
        <ProDescriptions.Item span={3}>
          <Divider>KẾT QUẢ PHÊ DUYỆT ĐƠN ĐĂNG KÝ</Divider>
        </ProDescriptions.Item>
        <ProDescriptions.Item
          dataIndex="status"
          label="Trạng thái đơn đăng ký đề tài"
          span={3}
        />
        <ProDescriptions.Item
          dataIndex="note"
          label="Chú thích/nhắc nhở(nếu có)"
          span={3}
        />

        {/* <Button type="primary" onClick={handleCancel}>
          Đóng
        </Button> */}
      </ProDescriptions>
    </Modal>
  );
};
export default ModalTopicApproval;

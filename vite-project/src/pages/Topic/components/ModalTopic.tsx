import {
  ProDescriptions,
  ProDescriptionsActionType,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { getTopicDetail } from "../../../service/api";
import { Button, Divider, Modal } from "antd";
import { TopicType } from "../../../service/types";

interface PropsTopic {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  editingId: number;
  selectedRecord: TopicType | null;
}

const ModalTopic: React.FC<PropsTopic> = ({
  isModalOpen,
  setIsModalOpen,
  selectedRecord,
  editingId,
}) => {
  const [data, setData] = useState([]);
  const actionRef = useRef<ProDescriptionsActionType>();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const responseData = async () => {
      // try {
      //   if (selectedRecord) {
      //     const response = await getTopicDetail(selectedRecord.id);
      //     setData(response);
      //   }
      // } catch (error) {
      //   console.error("Error fetching topic detail:", error);
      // }
      try {
        const response = await getTopicDetail(editingId);
        setData(response);
      } catch (error) {
        console.error("Error fetching topic detail:", error);
      }
    };

    responseData();
  }, [editingId]);

  return (
    <Modal
      // title="Điểm đề tài khóa luận tốt nghiệp"
      open={isModalOpen}
      // onOk={handleOk}
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
        dataSource={data}
      >
        <ProDescriptions.Item span={3}>
          <Divider>Điểm đề tài khóa luận tốt nghiệp</Divider>
        </ProDescriptions.Item>
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
          dataIndex={["teacher", "name"]}
          label="Giáo viên hướng dẫn "
        />
        <ProDescriptions.Item
          dataIndex={["teacher", "userCode"]}
          label="Mã Giáo viên hướng dẫn "
        />
        <ProDescriptions.Item
          dataIndex="scoresInternshipFacility"
          label="Điểm cơ sở thực tập"
        />
        <ProDescriptions.Item
          dataIndex="instructor"
          label="Điểm giáo viên hướng dẫn "
        />
        <ProDescriptions.Item
          dataIndex="reviewer"
          label="Điểm giáo viên phản biện"
        />
        <ProDescriptions.Item
          dataIndex="boardMembers1"
          label="Điểm thành viên hội đồng thứ nhất"
        />
        <ProDescriptions.Item
          dataIndex="boardMembers2"
          label="Điểm thành viên hội đồng thứ hai"
        />
        <ProDescriptions.Item
          dataIndex="boardMembers3"
          label="Điểm thành viên hội đồng thứ ba"
        />
        <ProDescriptions.Item dataIndex="result" label="Tổng điểm" />
        <ProDescriptions.Item dataIndex="success" label="Kết quả" />
      </ProDescriptions>
    </Modal>
  );
};
export default ModalTopic;

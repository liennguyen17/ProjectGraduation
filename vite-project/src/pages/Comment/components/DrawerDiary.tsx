import { ProList, idIDIntl } from "@ant-design/pro-components";
import { Avatar, Button, Divider, Drawer, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { ListCommentForTopicId, getListComment } from "../../../service/api";
import { dataComment } from "../../../service/types";
import { DoubleRightOutlined } from "@ant-design/icons";
import CommentForm from "./CommentForm";

interface DrawerProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  selectedRecord: dataComment | null;
}
const { Text } = Typography;

const DrawerDiary: React.FC<DrawerProps> = ({
  open,
  onClose,
  selectedRecord,
}) => {
  const [commentsData, setCommentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("first", selectedRecord);
        if (selectedRecord) {
          const topicId = selectedRecord.topic.id;
          const res = await ListCommentForTopicId(topicId);

          console.log("id topic", topicId);
          console.log("list comments 123:: ", res);
          setCommentData(res);
        }
      } catch (error) {
        console.error("loi lay du lieu:", error);
      }
    };
    getData();
  }, [selectedRecord?.topic.id]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
    selectedRecord;
  };

  return (
    <Drawer
      title="Nhật ký"
      onClose={() => onClose(false)}
      visible={open}
      width={700}
      extra={
        <Button type="primary" onClick={showModal}>
          Tạo nhật ký
        </Button>
      }
    >
      <Divider orientation="left" orientationMargin="0">
        <DoubleRightOutlined style={{ color: "hotpink", fontSize: "18px" }} />{" "}
        Sinh viên: {selectedRecord?.topic.student.name} - MSV:{" "}
        {selectedRecord?.topic.student.userCode}
      </Divider>

      <ProList<dataComment>
        dataSource={commentsData}
        // toolBarRender={() => {
        //   return [
        //     <Button key="3" type="primary">
        //       Tạo nhật ký
        //     </Button>,
        //   ];
        // }}
        headerTitle="Danh sách nhật ký đã gửi"
        metas={{
          title: {
            dataIndex: "message",
          },
          avatar: {
            render: () => {
              return <Avatar src="/images/user.jpg" />;
            },
          },
          actions: {
            dataIndex: "createAt",
            render: (_, row) => {
              return <Text>{row.createAt}</Text>;
            },
          },
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
      ></ProList>
      <Modal
        width={500}
        footer={false}
        destroyOnClose
        title="Tạo nhật ký"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <CommentForm
          handleCancel={handleCancel}
          selectedRecord={selectedRecord}
        ></CommentForm>
      </Modal>
    </Drawer>
  );
};
export default DrawerDiary;

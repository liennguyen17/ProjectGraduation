import {
  ActionType,
  PageContainer,
  ProDescriptions,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { dataTopic } from "./components/ColumTableTopic";
import {
  TopicGetListApi,
  TopicGetListData,
  TopicGetListStatusApi,
} from "../../service/api";
import "./styles.css";
import { TopicType } from "../../service/types";
import ModalTopic from "./components/ModalTopic";
import { Divider, Modal } from "antd";
import TopicForm from "./components/TopicForm";

const Topic: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [topicData, setTopicData] = useState([]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<TopicType | null>(null);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  useEffect(() => {
    const data = async () => {
      try {
        const res = await TopicGetListData();
        setTopicData(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    data();
  }, []);

  const handleViewDetail = (record: TopicType) => {
    setIsModalOpen(true);
    setSelectedRecord(record);
    // setIsDetailVisible(true);
    setEditingId(record.id);
  };

  const handleEdit = (record: TopicType) => {
    console.log("Dữ liệu cũ:", record);
    setSelectedRecord(record);
    setIsModalOpen1(true);
    setEditingId(record.id);
  };

  const handleCancel = () => {
    setIsModalOpen1(false);
    // setEditingId(null);
    setSelectedRecord(null);
  };

  const columns = dataTopic({ handleViewDetail, handleEdit });
  return (
    <PageContainer
      // subTitle="Quản lý đề tài khóa luận tốt nghiệp"
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 4,
      }}
      title={false}
      footer={[]}
    >
      <ProTable
        // dataSource={topicData}
        request={async (params, sort, filter) =>
          await TopicGetListStatusApi(params, sort, filter)
        }
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        cardBordered
        headerTitle="Danh sách chấm điểm đề tài khóa luận tốt nghiệp<đã phê duyệt>"
        tableLayout="auto"
        search={{
          labelWidth: "auto",
          filterType: "query",
          style: {
            paddingBlock: 12,
          },
        }}
        scroll={{ x: "max-content" }}
        options={{
          search: {
            placeholder: "Nhập từ khóa tìm kiếm...",
            style: { width: 400 },
          },
          density: false,
          setting: true,
        }}
        cardProps={{
          bodyStyle: {
            paddingBottom: 0,
            paddingTop: 0,
            paddingInline: 12,
          },
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
        dateFormatter="string"
        // rowSelection={{}}
      ></ProTable>
      <ModalTopic
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingId={editingId}
        selectedRecord={selectedRecord}
      />
      <Modal
        title="Cập nhật thông tin"
        open={isModalOpen1}
        onCancel={handleCancel}
        width="65%"
        footer={false}
      >
        <ProDescriptions
          column={2}
          request={async () => {
            return Promise.resolve({
              success: true,
              data: selectedRecord,
            });
          }}
        >
          <ProDescriptions.Item span={3}>
            <Divider>
              Điểm đề tài khóa luận tốt nghiệp: {selectedRecord?.nameTopic}
            </Divider>
          </ProDescriptions.Item>
          <ProDescriptions.Item>
            Sinh viên thực hiện: {selectedRecord?.student.name} - MSV:
            {selectedRecord?.student.userCode}
          </ProDescriptions.Item>
          <ProDescriptions.Item>
            Giảng viên hướng dẫn: {selectedRecord?.student.name} - MGV:
            {selectedRecord?.student.userCode}
          </ProDescriptions.Item>
        </ProDescriptions>
        <TopicForm
          actionRef={() => actionRef.current?.reload()}
          handleCancel={handleCancel}
          editingId={editingId}
          initialData={selectedRecord}
        ></TopicForm>
      </Modal>
    </PageContainer>
  );
};
export default Topic;

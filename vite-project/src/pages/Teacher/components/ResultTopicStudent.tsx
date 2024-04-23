import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import {
  TopicGetListData,
  getListTopicStudentOfTeacher,
} from "../../../service/api";
import { TopicType } from "../../../service/types";
import { ColumnResultTopicStudent } from "./ColumnResultTopicStudent";
import TopicForm from "../../Topic/components/TopicForm";
import { Modal } from "antd";
import ModalTopic from "../../Topic/components/ModalTopic";

const ResultTopicStudent: React.FC = () => {
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

  //   useEffect(() => {
  //     const data = async () => {
  //       try {
  //         const res = await TopicGetListData();
  //         setTopicData(res);
  //       } catch (error) {
  //         console.error("Loi lay du lieu: ", error);
  //       }
  //     };
  //     data();
  //   }, []);

  const handleViewDetail = (record: TopicType) => {
    setIsModalOpen(true);
    setSelectedRecord(record);
    // setIsDetailVisible(true);
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

  const columns = ColumnResultTopicStudent({ handleViewDetail, handleEdit });
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
          await getListTopicStudentOfTeacher()
        }
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        cardBordered
        headerTitle="Danh sách chấm điểm đề tài khóa luận tốt nghiệp"
        tableLayout="auto"
        // search={{
        //   labelWidth: "auto",
        //   filterType: "query",
        //   style: {
        //     paddingBlock: 12,
        //   },
        // }}
        search={false}
        scroll={{ x: "max-content" }}
        // options={{
        //   search: {
        //     placeholder: "Nhập từ khóa tìm kiếm...",
        //     style: { width: 400 },
        //   },
        //   density: false,
        //   setting: true,
        // }}
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
export default ResultTopicStudent;

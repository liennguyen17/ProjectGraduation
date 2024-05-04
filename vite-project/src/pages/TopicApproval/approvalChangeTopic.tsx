import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useRef, useState } from "react";

import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TopicChangeNameGetListApi } from "../../service/api";
import { ChangeTopicType } from "../../service/types";
import { topicApprovalChangeName } from "./components/changeNameTopic/ColumnChangeTopic";
import ApprovalForm from "./components/changeNameTopic/ApprovalForm";

const ApprovalChangeTopic: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [recordEditName, setRecordEditName] = useState("");
  const [recordEditCode, setRecordEditCode] = useState("");

  const [selectedRecord, setSelectedRecord] = useState<ChangeTopicType | null>(
    null
  );
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const showModal = () => {
    setIsModalOpen(true);
    setEditingId(null);
    setSelectedRecord(null);
  };
  const showModal1 = () => {
    setIsModalOpen1(true);
  };
  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleCancel = () => {
    setIsModalOpen2(false);
    // setEditingId(null);
    setSelectedRecord(null);
  };

  // const handleViewDetail = (record: TopicType) => {
  //   setIsModalOpen1(true);
  //   setSelectedRecord(record);
  //   setIsDetailVisible(true);
  // };

  const handleEditApproval = (record: ChangeTopicType) => {
    setSelectedRecord(record);
    setIsModalOpen2(true);
    setEditingId(record.id);
    setRecordEditName(record.topic.student.name);
    setRecordEditCode(record.topic.student.userCode);
    // if (actionRef && actionRef.current) {
    //   actionRef.current.reload();
    // }
  };

  // const handleEdit = (record: TopicType) => {
  //   console.log("Dữ liệu cũ:", record);
  //   setSelectedRecord(record);
  //   setIsModalOpen(true);
  //   setEditingId(record.id);
  // };

  const columns = topicApprovalChangeName({
    // handleViewDetail,
    // handleEdit,
    handleEditApproval,
  });

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
        request={async (params, sort, filter) =>
          await TopicChangeNameGetListApi(params, sort, filter)
        }
        // dataSource={topicData}
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        cardBordered
        headerTitle="Danh sách đơn đăng ký đổi đề tài khóa luận tốt nghiệp"
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
            style: { width: 300 },
          },
          density: true,
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
        rowSelection={{}}
        // toolBarRender={() => [
        //   <Button type="primary" key="primary" onClick={showModal}>
        //     <PlusOutlined /> Tạo đề tài
        //   </Button>,
        // ]}
      ></ProTable>
      {/* <ModalTopicForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingId={editingId}
        selectedRecord={selectedRecord}
        actionRef={() => actionRef.current?.reload()}
      />
      <ModalTopicApproval
        isModalOpen1={isModalOpen1}
        setIsModalOpen1={setIsModalOpen1}
        editingId={editingId}
        selectedRecord={selectedRecord}
        // actionRef={() => actionRef.current?.reload()}
      /> */}
      <Modal
        title={`Phê duyệt đề tài sinh viên: ${recordEditName} - Msv: ${recordEditCode}`}
        open={isModalOpen2}
        onCancel={handleCancel}
        width={500}
        footer={false}
      >
        <ApprovalForm
          actionRef={() => actionRef.current?.reload()}
          handleCancel={handleCancel}
          editingId={editingId}
          initialData={selectedRecord}
        />
      </Modal>
    </PageContainer>
  );
};
export default ApprovalChangeTopic;

import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";

import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TopicGetListApi } from "../../service/api";
import { dataTopicApproval } from "./components/ColumTableTopicApproval";
import ModalTopicForm from "./components/ModalTopicForm";
import { TopicType, TopicTypeCreate } from "../../service/types";
import ModalTopicApproval from "./components/ModalTopicApproval";
import ApprovalForm from "./components/ApprovalForm";

const TopicApproval: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [recordEditName, setRecordEditName] = useState("");
  const [recordEditCode, setRecordEditCode] = useState("");

  const [selectedRecord, setSelectedRecord] = useState<TopicType | null>(null);
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

  const handleViewDetail = (record: TopicType) => {
    console.log("record:: ", record);
    setIsModalOpen1(true);
    setSelectedRecord(record);
    setIsDetailVisible(true);
    setEditingId(record.id);
  };

  const handleEditApproval = (record: TopicType) => {
    setSelectedRecord(record);
    setIsModalOpen2(true);
    setEditingId(record.id);
    setRecordEditName(record.student.name);
    setRecordEditCode(record.student.userCode);
    // if (actionRef && actionRef.current) {
    //   actionRef.current.reload();
    // }
  };

  const handleEdit = (record: TopicType) => {
    console.log("Dữ liệu cũ:", record);
    setSelectedRecord(record);
    setIsModalOpen(true);
    setEditingId(record.id);
  };

  const columns = dataTopicApproval({
    handleViewDetail,
    handleEdit,
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
          await TopicGetListApi(params, sort, filter)
        }
        // dataSource={topicData}
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        cardBordered
        headerTitle="Danh sách đơn đăng ký đề tài khóa luận tốt nghiệp"
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
        rowSelection={{}}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showModal}>
            <PlusOutlined /> Tạo đề tài
          </Button>,
        ]}
      ></ProTable>
      <ModalTopicForm
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
      />
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
export default TopicApproval;

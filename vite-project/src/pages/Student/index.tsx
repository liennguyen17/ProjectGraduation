import { PageContainer, ProTable } from "@ant-design/pro-components";
import type { ActionType } from "@ant-design/pro-components";
import { useRef, useState } from "react";

import { StudentGetListApi, deleteUser } from "../../service/api";
import { columStudent } from "./components/ColumTableStudent";
import { UserType } from "../../service/types";
import DrawerUser from "../User/components/DrawerUser";
import ModalFormUser from "../User/components/ModalFormUser";
import { Modal, message } from "antd";
// const actionRef = useRef<ActionType>();

const Student: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  // const [showTableAlert, setShowTableAlert] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<UserType | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [recordToDeleteName, setRecordToDeleteName] = useState("");

  const handleViewDetail = (record: UserType) => {
    setSelectedRecord(record);
    setIsDetailVisible(true);
  };

  const handleCloseDetail = () => {
    setSelectedRecord(null);
    setIsDetailVisible(false);
  };

  const handleEdit = (record: UserType) => {
    console.log("Dữ liệu cũ:", record);
    setSelectedRecord(record);
    setIsModalOpen(true);
    setEditingId(record.id);
  };

  const handleDelete = (record: UserType) => {
    console.log("DL xoa::", record);
    setSelectedRecord(record);
    setIsConfirmDeleteOpen(true);
    setRecordToDeleteName(record.name);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteUser([selectedRecord?.id]);
      console.log("delete::", res);
      message.success(res.data);

      setIsConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Lỗi xóa dữ liệu::", error);
    }
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  // const showModal = () => {
  //   setIsModalOpen(true);
  //   setEditingId(null);
  //   setSelectedRecord(null);
  // };

  const columns = columStudent({
    handleViewDetail,
    handleEdit,
    handleDelete,
  });

  // const [studentData, setStudentData] = useState([]);
  // useEffect(() => {
  //   const dataStudent = async () => {
  //     try {
  //       const res = await StudentGetListApi();
  //       setStudentData(res);
  //     } catch (error) {
  //       console.error("Loi lay du lieu: ", error);
  //     }
  //   };
  //   dataStudent();
  // }, []);

  return (
    <PageContainer
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 4,
      }}
      title={false}
      footer={[]}
    >
      {/* <FormStudent /> */}
      <ProTable
        // dataSource={studentData}
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        cardBordered
        headerTitle="Danh sách tất cả sinh viên"
        size="small"
        tableLayout="auto"
        rowKey="id" //truyen id
        request={async (params, sort, filter) =>
          await StudentGetListApi(params, sort, filter)
        }
        search={{
          labelWidth: "auto",
          filterType: "query", //light: tiết kiệm khoảng trống
          style: {
            paddingBlock: 12,
          },
        }}
        scroll={{ x: "max-content", y: "calc(100vh - 260px)" }}
        options={{
          search: {
            placeholder: "Nhập từ khoá để tìm kiếm...",
            style: { width: 300 },
          },
          density: false,
          setting: false,
        }}
        cardProps={{
          bodyStyle: {
            paddingBottom: 0,
            paddingTop: 0,
            paddingInline: 12,
          },
        }}
        // toolBarRender={() => [
        //   <Button type="primary" key="primary" onClick={showModal}>
        //     <PlusOutlined /> Tạo người dùng
        //   </Button>,
        // ]}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
        rowSelection={{}}
        dateFormatter="string"
      ></ProTable>
      <ModalFormUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingId={editingId}
        selectedRecord={selectedRecord}
        actionRef={() => actionRef.current?.reload()}
      />
      <DrawerUser
        open={isDetailVisible}
        onClose={handleCloseDetail}
        selectedRecord={selectedRecord}
      />
      <Modal
        title="Xác nhận xóa"
        visible={isConfirmDeleteOpen}
        onOk={handleConfirmDelete}
        onCancel={handleCloseConfirmDelete}
      >
        <p>
          Bạn có chắc chắn muốn xóa người dùng "{recordToDeleteName}" không?
        </p>
      </Modal>
    </PageContainer>
  );
};

export default Student;

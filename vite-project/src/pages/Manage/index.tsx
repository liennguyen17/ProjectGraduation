import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { ManageGetListApi, deleteUser } from "../../service/api";
import { columManage } from "./components/ColumManager";
import { UserType } from "../../service/types";
import { Modal, message } from "antd";
import ModalFormUser from "../User/components/ModalFormUser";
import DrawerUser from "../User/components/DrawerUser";

const Manage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<UserType | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [recordToDeleteName, setRecordToDeleteName] = useState("");

  // const [manageData, setManageData] = useState([]);
  // useEffect(() => {
  //   const data = async () => {
  //     try {
  //       const res = await ManageGetListApi();
  //       setManageData(res);
  //     } catch (error) {
  //       console.error("Loi lay du lieu: ", error);
  //     }
  //   };
  //   data();
  // }, []);

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
      if (actionRef && actionRef.current) {
        actionRef.current.reload();
      }
      setIsConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Lỗi xóa dữ liệu::", error);
    }
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const columns = columManage({
    handleViewDetail,
    handleEdit,
    handleDelete,
  });
  return (
    <PageContainer
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 4,
      }}
      // breadcrumbRender={false}
      title={false}
      footer={[]}
    >
      <ProTable
        formRef={formRef}
        // dataSource={manageData}
        columns={columns}
        rowSelection={{}}
        actionRef={actionRef}
        cardBordered
        headerTitle="Danh sách giảng viên quản lý"
        size="small"
        tableLayout="auto"
        rowKey="id"
        request={async (params, sort, filter) =>
          await ManageGetListApi(params, sort, filter)
        }
        search={{
          labelWidth: "auto",
          filterType: "query",
          style: {
            // paddingBlock: 12,
          },
        }}
        cardProps={{
          //   bodyStyle: { padding: 4 },
          bodyStyle: {
            paddingBottom: 10,
            paddingTop: 20,
            paddingInline: 12,
          },
        }}
        options={{
          search: {
            placeholder: "Tìm kiếm bài viết...",
            style: { width: 300 },
          },
          setting: true,
          density: false,
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          // total: postsListData?.total,
          showTotal: (total, range) => {
            return `${range[0]}-${range[1]} trên ${total} mục`;
          },
        }}
        scroll={{ x: "max-content", y: "calc(100vh-245px)" }}
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
export default Manage;

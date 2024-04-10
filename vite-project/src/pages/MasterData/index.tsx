import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useRef, useState } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MasterDataApi, deleteMasterData } from "../../service/api";
import { columsMasterData } from "./components/ColumMasterData";
import ModalMasterData from "./components/ModalMasterData";
import { MasterData } from "../../service/types";
import { message } from "antd/lib";

const MasterDatas: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedRecord, setSelectedRecord] = useState<MasterData | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [recordToDeleteName, setRecordToDeleteName] = useState("");
  const showModal = () => {
    setIsModalOpen(true);
    setEditingId(null);
    setSelectedRecord(null);
  };

  const handleEdit = (record: MasterData) => {
    console.log("Dữ liệu cũ:", record);
    setSelectedRecord(record);
    setIsModalOpen(true);
    setEditingId(record.id);
  };

  const handleDelete = (record: MasterData) => {
    console.log("DL xoa::", record);
    setSelectedRecord(record);
    setIsConfirmDeleteOpen(true);
    setRecordToDeleteName(record.name);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteMasterData([selectedRecord?.id]);
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

  const columns = columsMasterData({ handleEdit, handleDelete });

  return (
    <PageContainer
      subTitle="Quản lý master data"
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 4,
      }}
      title={false}
      footer={[]}
    >
      <ProTable
        request={async (params, sort, filter) =>
          await MasterDataApi(params, sort, filter)
        }
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        cardBordered
        headerTitle="Danh sách"
        size="small"
        tableLayout="auto"
        search={false}
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
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showModal}>
            <PlusOutlined /> Tạo
          </Button>,
        ]}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
        dateFormatter="string"
        rowSelection={{}}
      ></ProTable>
      <ModalMasterData
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editingId={editingId}
        selectedRecord={selectedRecord}
        actionRef={() => actionRef.current?.reload()}
      />
      <Modal
        title="Xác nhận xóa"
        visible={isConfirmDeleteOpen}
        onOk={handleConfirmDelete}
        onCancel={handleCloseConfirmDelete}
      >
        <p>Bạn có chắc chắn muốn xóa "{recordToDeleteName}" không?</p>
      </Modal>
    </PageContainer>
  );
};
export default MasterDatas;

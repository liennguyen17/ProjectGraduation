import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { Button, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalNewsForm from "./components/ModalNewsForm";
import { NewGetListApi } from "../../service/newsGetList";
import { columsNews } from "./components/ColumNews";
import DrawerNew from "./components/DrawerNew";
import { NewsType } from "../../service/types";
import { deleteNews } from "../../service/api";

const News: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  // const [openDrawer, setOpenDrawer] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<NewsType | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [recordToDeleteName, setRecordToDeleteName] = useState("");

  const handleViewDetail = (record: NewsType) => {
    setSelectedRecord(record);
    setIsDetailVisible(true);
  };

  const handleCloseDetail = () => {
    setSelectedRecord(null);
    setIsDetailVisible(false);
  };

  const handleCreateSuccess = async () => {
    try {
      const res = await NewGetListApi();
      setNewsData(res);
    } catch (error) {
      console.error("loi lay du lieu:", error);
    }
  };

  const handleEdit = (record: NewsType) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
    setEditingId(record.id);
  };

  const handleDelete = (record: NewsType) => {
    setSelectedRecord(record);
    setIsConfirmDeleteOpen(true);
    setRecordToDeleteName(record.title);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await deleteNews([selectedRecord?.id]);
      console.log("delete::", res);
      message.success(res.data);
      handleCreateSuccess();
      setIsConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Lỗi xóa dữ liệu::", error);
      message.error("loi xoa");
    }
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
  };
  // const showDrawer = () => {
  //   setOpenDrawer(true);
  // };

  // const onClose = () => {
  //   setOpenDrawer(false);
  // };
  const showModal = () => {
    setIsModalOpen(true);
    setEditingId(null);
    setSelectedRecord(null);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await NewGetListApi();
        console.log("list news:: ", res);
        setNewsData(res);
      } catch (error) {
        console.error("loi lay du lieu:", error);
      }
    };
    getData();
  }, []);

  const columns = columsNews({ handleViewDetail, handleEdit, handleDelete });

  return (
    <PageContainer
      subTitle="Quản lý tin tức"
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 4,
      }}
      title={false}
      footer={[]}
    >
      <ProTable
        dataSource={newsData}
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        cardBordered
        headerTitle="Danh sách tin tức"
        size="small"
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
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showModal}>
            <PlusOutlined /> Tạo tin tức
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
      <ModalNewsForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleCreateSuccess={handleCreateSuccess}
        editingId={editingId}
        selectedRecord={selectedRecord}
      />
      <DrawerNew
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
export default News;

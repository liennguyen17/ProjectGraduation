import {
  ActionType,
  PageContainer,
  ProFormUploadButton,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { DataManageApi, ManageGetListApi, deleteUser } from "../../service/api";
import { columManage } from "./components/ColumManager";
import { UserType } from "../../service/types";
import { Button, Modal, Space, message, notification } from "antd";
import ModalFormUser from "../User/components/ModalFormUser";
import DrawerUser from "../User/components/DrawerUser";
import {
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import FormManager from "./components/FormManager";
import { utils, writeFileXLSX } from "xlsx";
import { getJwt } from "../../service/utils";
import "./styles.css";

const Manage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
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

  const showModal1 = () => {
    setIsModalOpen1(true);
    setSelectedRecord(null);
  };

  const handleCancel = () => {
    setIsModalOpen1(false);
  };

  const columns = columManage({
    handleViewDetail,
    handleEdit,
    handleDelete,
  });

  const [userData, setUserData] = useState([]);
  const jwt = getJwt();

  useEffect(() => {
    const dataUser = async () => {
      try {
        const res = await DataManageApi();
        setUserData(res);
        console.log("data user: {}", res);
      } catch (error) {
        console.error("Lỗi lấy dữ liệu: ", error);
      }
    };
    dataUser();
  }, []);

  const renameColumn = userData.map((item) => ({
    "Họ và tên": item.name,
    "Mã giảng viên": item.userCode,
    "Ngày sinh": item.dob,
    "Địa chỉ": item.address,
    "Vai trò": item.role,
    "Số điện thoại": item.phone,
    Email: item.email,
    "Bộ môn": item.subject,
    "Ngày tạo": item.createAt,
    "Ngày cập nhật": item.updateAt,
  }));

  const hanldeExportFile = () => {
    const ws = utils.json_to_sheet(renameColumn);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Người dùng");
    writeFileXLSX(wb, "Danh sách giảng viên quản lý.xlsx");
  };
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
        toolBarRender={() => [
          <div className="button-upload-toolbar">
            <ProFormUploadButton
              icon={<ImportOutlined />}
              title="Nhập danh sách"
              name="file"
              fieldProps={{
                multiple: false,
                showUploadList: false,
                headers: {
                  Authorization: jwt ? `Bearer ${jwt}` : undefined,
                },
                onChange: (file) => {
                  console.log(file);
                  const { response, status } = file.file;
                  if (response?.success) {
                    notification.success({
                      message: `Upload ${file.file.name} thành công`,
                    });
                    // handleGetCustomer();
                    // getCustomer();
                  } else if (response?.success === false) {
                    notification.open({
                      message: "Lỗi khi tải file",
                      description: "Click vào để xem chi tiết lỗi",
                      duration: 0,
                      btn: (
                        <Space>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                              const downloadLink = document.createElement("a");
                              downloadLink.href = `${response?.error?.message}`;
                              downloadLink.click();
                            }}
                          >
                            Xem chi tiết
                          </Button>
                        </Space>
                      ),
                    });
                  }
                },
              }}
              action="http://localhost:8080/excel/import"
            />
          </div>,
          <Button type="primary" key="primary" onClick={showModal1}>
            <PlusOutlined /> Tạo giảng viên
          </Button>,
          <Button type="primary" key="primary" onClick={hanldeExportFile}>
            <ExportOutlined /> Xuất danh sách
          </Button>,
        ]}
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
            placeholder: "Nhập từ khoá để tìm kiếm...",
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
      <Modal
        open={isModalOpen1}
        onCancel={handleCancel}
        onOk={handleCancel}
        destroyOnClose
        width={900}
        title="Tạo giảng viên quản lý"
        footer={false}
      >
        <FormManager
          actionRef={() => actionRef.current?.reload()}
          handleCancel={handleCancel}
          initialData={selectedRecord}
        ></FormManager>
      </Modal>
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

import {
  ActionType,
  PageContainer,
  ProFormUploadButton,
  ProTable,
} from "@ant-design/pro-components";
import { useContext, useEffect, useRef, useState } from "react";
import {
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { DataUserApi, UserGetListApi, deleteUser } from "../../service/api";
import { columUser } from "./components/ColumnTableUsers";
import { Button, Modal, Space, message, notification } from "antd";
import ModalFormUser from "./components/ModalFormUser";
import DrawerUser from "./components/DrawerUser";
import { UserType } from "../../service/types";
import { AppContext } from "../../context/AppProvider";
import { utils, writeFileXLSX } from "xlsx";
import { getJwt } from "../../service/utils";
import "./styles.css";

const User: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<UserType | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [recordToDeleteName, setRecordToDeleteName] = useState("");
  const { state } = useContext(AppContext);
  // const token = Cookies.get("token");
  const jwt = getJwt();
  console.log("jwt: {}", jwt);

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
      // if (res.error.code === 8) {
      //   // Lỗi ràng buộc khóa ngoại
      //   // throw new Error(
      //   //   "Không thể xóa người dùng này vì họ đang được tham chiếu bởi các bản ghi khác."
      //   // );
      //   message.error("Sinh viên đã được thêm đề tài không thể xóa.");
      //   setIsConfirmDeleteOpen(false);
      // }

      setIsConfirmDeleteOpen(false);
    } catch (error) {
      console.error("Lỗi xóa dữ liệu::", error);
    }
  };

  const handleCloseConfirmDelete = () => {
    setIsConfirmDeleteOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
    setEditingId(null);
    setSelectedRecord(null);
  };

  const columns = columUser({
    handleViewDetail,
    handleEdit,
    handleDelete,
    listRole: state.listRole || [],
  });

  useEffect(() => {
    const dataUser = async () => {
      try {
        const res = await DataUserApi();
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
    "Mã người dùng": item.userCode,
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
    writeFileXLSX(wb, "Danh sách người dùng.xlsx");
  };

  return (
    <PageContainer
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 4,
      }}
      title={false}
      footer={[]}
    >
      <ProTable
        columns={columns}
        actionRef={actionRef}
        formRef={formRef}
        cardBordered
        headerTitle="Danh sách tất cả người dùng"
        size="small"
        tableLayout="auto"
        rowKey="id"
        search={{
          labelWidth: "auto",
          filterType: "query",
          style: {
            // paddingBlock: 12,
          },
        }}
        request={async (params, sort, filter) =>
          await UserGetListApi(params, sort, filter)
        }
        scroll={{ x: "max-content", y: "calc(100vh - 260px)" }}
        options={{
          search: {
            placeholder: "Nhập từ khoá để tìm kiếm...",
            style: { width: 300 },
          },
          density: false,
          setting: true,
        }}
        cardProps={{
          bodyStyle: {
            paddingBottom: 30,
            paddingTop: 20,
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
        // rowSelection={{}} // xóa tất cả
        toolBarRender={() => [
          <div className="button-upload-toolbar">
            <ProFormUploadButton
              type="primary"
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
                    actionRef.current?.reload();
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
          <Button type="primary" key="primary" onClick={showModal}>
            <PlusOutlined /> Tạo người dùng
          </Button>,

          <Button type="primary" key="primary" onClick={hanldeExportFile}>
            <ExportOutlined /> Xuất danh sách
          </Button>,
        ]}
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
export default User;

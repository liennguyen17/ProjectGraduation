import {
  PageContainer,
  ProFormUploadButton,
  ProTable,
} from "@ant-design/pro-components";
import type { ActionType } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";

import {
  DataStudentApi,
  StudentGetListApi,
  deleteUser,
} from "../../service/api";
import { columStudent } from "./components/ColumTableStudent";
import { UserType } from "../../service/types";
import DrawerUser from "../User/components/DrawerUser";
import ModalFormUser from "../User/components/ModalFormUser";
import { Button, Modal, Space, message, notification } from "antd";
import {
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import FormStudent from "./components/FormStudent";
import { getJwt } from "../../service/utils";
import { utils, writeFileXLSX } from "xlsx";
import "./styles.css";
// const actionRef = useRef<ActionType>();

const Student: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  // const [showTableAlert, setShowTableAlert] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<UserType | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [recordToDeleteName, setRecordToDeleteName] = useState("");
  const [userData, setUserData] = useState([]);
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

  const showModal1 = () => {
    setIsModalOpen1(true);
    setSelectedRecord(null);
  };
  const handleCancel = () => {
    setIsModalOpen1(false);
  };

  const columns = columStudent({
    handleViewDetail,
    handleEdit,
    handleDelete,
  });

  const jwt = getJwt();

  useEffect(() => {
    const dataUser = async () => {
      try {
        const res = await DataStudentApi();
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
    "Mã sinh viên": item.userCode,
    Lớp: item.className,
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
    writeFileXLSX(wb, "Danh sách sinh viên làm khóa luận.xlsx");
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
            <PlusOutlined /> Tạo sinh viên
          </Button>,
          <Button type="primary" key="primary" onClick={hanldeExportFile}>
            <ExportOutlined /> Xuất danh sách
          </Button>,
        ]}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
        // rowSelection={{}}
        dateFormatter="string"
      ></ProTable>
      <Modal
        open={isModalOpen1}
        onCancel={handleCancel}
        onOk={handleCancel}
        destroyOnClose
        width={900}
        title="Tạo sinh viên"
        footer={false}
      >
        <FormStudent
          actionRef={() => actionRef.current?.reload()}
          handleCancel={handleCancel}
          initialData={selectedRecord}
        ></FormStudent>
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

export default Student;

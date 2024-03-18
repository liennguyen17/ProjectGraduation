import { PageContainer, ProTable } from "@ant-design/pro-components";
import type { ActionType } from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import ModalNewsForm from "../News/components/ModalNewsForm";
import { StudentGetListApi } from "../../service/api";
import { columStudent } from "./components/ColumTableStudent";
// const actionRef = useRef<ActionType>();

const Student: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  // const [showTableAlert, setShowTableAlert] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    console.log(1);
    setIsModalOpen(true);
  };
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    const dataStudent = async () => {
      try {
        const res = await StudentGetListApi();
        setStudentData(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    dataStudent();
  }, []);

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
        dataSource={studentData}
        columns={columStudent()}
        actionRef={actionRef}
        formRef={formRef}
        cardBordered
        headerTitle="Danh sách tất cả sinh viên"
        size="small"
        tableLayout="auto"
        rowKey="id" //truyen id
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
      <ModalNewsForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </PageContainer>
  );
};

export default Student;

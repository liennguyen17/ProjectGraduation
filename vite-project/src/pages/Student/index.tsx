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
        // cardProps={{
        //   bodyStyle: { padding: 4 },
        // }}
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
        // toolbar={{
        //   menu: {
        //     type: "tab",
        //     onChange: (activeKey: any) => {
        //       actionRef.current?.clearSelected?.();
        //       actionRef.current?.reload?.();
        //       // setSelectedRows([]);
        //       setActiveTab(activeKey);
        //     },
        //     items: [
        //       {
        //         label: (
        //           <>
        //             <FontAwesomeIcon icon={faEye} /> Hiển thị
        //           </>
        //         ),
        //         key: "ACTIVE",
        //       },
        //       // {
        //       //   label: <><FontAwesomeIcon icon={faHourglass} /> Chờ duyệt</>,
        //       //   key: 'pending',
        //       // },
        //       {
        //         label: (
        //           <>
        //             <FontAwesomeIcon icon={faEyeSlash} />
        //             {/* <FontAwesomeIcon icon="fa-brands fa-twitter" /> */}
        //             Không hiển thị
        //           </>
        //         ),
        //         key: "DRAFT",
        //       },
        //     ],
        //   },
        // }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={showModal}
            // loading
            // ghost
            // danger
            // onClick={() => {
            //   setModalFormUserVisible(true);
            // }}
            // disabled={!access?.['USER_MANAGEMENT.CREATE_USER']}
          >
            <PlusOutlined /> Tạo người dùng
          </Button>,
        ]}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
        dateFormatter="string"
        // //check list hien thi trống
        // tableViewRender={(props, dom) => {
        //   // if (props.dataSource?.length === 0 && !props.loading)
        //   return <Empty imageStyle={{ height: 50 }} />;
        //   // return <div>123</div>;
        // }}
        // tableRender={(_, dom) => {
        //   return (
        //     <div
        //       style={{
        //         display: 'flex',
        //         width: '100%',
        //       }}
      >
        {/* <ModalStudentForm
          modalProps={{
            // open: modalPostsFormOpen,
            destroyOnClose: true,
            style: { maxWidth: 1440 },
          }}
        ></ModalStudentForm> */}

        {/* <ModalStudentForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        /> */}
      </ProTable>
      <ModalNewsForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </PageContainer>
  );
};

export default Student;

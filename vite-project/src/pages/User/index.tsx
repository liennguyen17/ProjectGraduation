import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { UserGetListApi } from "../../service/api";
import { columUser } from "./components/ColunTableUsers";
import { Button } from "antd";
import ModalFormUser from "./components/ModalFormUser";
// import "./styles.css";

const User: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const dataUser = async () => {
      try {
        const res = await UserGetListApi();
        setUserData(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    dataUser();
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
      <ProTable
        dataSource={userData}
        columns={columUser()}
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
        rowSelection={{}}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showModal}>
            <PlusOutlined /> Tạo người dùng
          </Button>,
        ]}
      ></ProTable>
      <ModalFormUser
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </PageContainer>
  );
};
export default User;

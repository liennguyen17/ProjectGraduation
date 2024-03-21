import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MasterDataApi } from "../../service/api";
import { columsMasterData } from "./components/ColumMasterData";

const MasterData: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await MasterDataApi();
        console.log("list news:: ", res);
        setData(res);
      } catch (error) {
        console.error("loi lay du lieu:", error);
      }
    };
    getData();
  }, []);

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
        dataSource={data}
        columns={columsMasterData()}
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        cardBordered
        headerTitle="Danh sách"
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
          <Button
            type="primary"
            key="primary"
            //   onClick={showModal}
          >
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
      {/* <ModalNewsForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      /> */}
    </PageContainer>
  );
};
export default MasterData;

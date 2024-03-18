import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { dataSource, dataTopic } from "./components/ColumTableTopic";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalTopicForm from "./components/ModalTopicForm";
import { TopicGetListApi } from "../../service/api";
import "./styles.css";

const Topic: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicData, setTopicData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const data = async () => {
      try {
        const res = await TopicGetListApi();
        setTopicData(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    data();
  }, []);
  return (
    <PageContainer
      // subTitle="Quản lý đề tài khóa luận tốt nghiệp"
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 4,
      }}
      title={false}
      footer={[]}
    >
      <ProTable
        dataSource={topicData}
        columns={dataTopic}
        actionRef={actionRef}
        formRef={formRef}
        cardBordered
        headerTitle="Danh sách đề tài khóa luận tốt nghiệp"
        tableLayout="auto"
        search={{
          labelWidth: "auto",
          filterType: "query",
          style: {
            paddingBlock: 12,
          },
        }}
        // scroll={{ x: "max-content", y: "calc(100vh-245px)" }}
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
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
        // rowSelection={
        //   {
        //     // selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        //     // defaultSelectedRowKeys: [1],
        //   }
        // }
        dateFormatter="string"
        rowSelection={{}}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={showModal}>
            <PlusOutlined /> Tạo tin đề tài
          </Button>,
        ]}
      ></ProTable>
      <ModalTopicForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </PageContainer>
  );
};
export default Topic;

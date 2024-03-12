import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useRef } from "react";
import { data, dataSource2 } from "../Student/components/columTableStudent";

const User: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();

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
        dataSource={dataSource2}
        columns={data}
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
            style: { width: 500 },
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
      ></ProTable>
    </PageContainer>
  );
};
export default User;

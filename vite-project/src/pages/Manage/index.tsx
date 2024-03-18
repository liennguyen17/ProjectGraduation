import {
  ActionType,
  PageContainer,
  ProTable,
} from "@ant-design/pro-components";
import { useEffect, useRef, useState } from "react";
import { data, dataSource2 } from "../Student/components/demo";
import { columTeacher } from "./components/ColumTeacher";
import { ManageGetListApi, TeacherGetListApi } from "../../service/api";
import { columManage } from "./components/ColumManager";
// import { data, dataSource2 } from "../Student/components/columTableStudent";

const Manage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<any>();
  const [manageData, setManageData] = useState([]);
  useEffect(() => {
    const data = async () => {
      try {
        const res = await ManageGetListApi();
        setManageData(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    data();
  }, []);
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
        dataSource={manageData}
        columns={columManage()}
        rowSelection={{}}
        actionRef={actionRef}
        cardBordered
        headerTitle="Danh sách giảng viên quản lý"
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
            placeholder: "Tìm kiếm bài viết...",
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
    </PageContainer>
  );
};
export default Manage;

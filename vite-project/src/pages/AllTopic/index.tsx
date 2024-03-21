import { PageContainer, ProList } from "@ant-design/pro-components";
import { useEffect, useState } from "react";

import { TopicGetListApi } from "../../service/api";
import { Button, Space, Typography } from "antd";

type ExpandedRowRender<T> = (
  record: T,
  index: number,
  indent: number,
  expanded: boolean
) => React.ReactNode;

interface dataAllTopic {
  id: number;
  student: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    userCode: string;
    className: string;
  };
  teacher: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    userCode: string;
    className: null;
  };
  nameTopic: string;
  status: string;
  departmentManagement: string;
  nameInternshipFacility: string;
  menterInternshipFacility: string;
  phoneInstructorInternshipFacility: string;
  instructor: number;
  reviewer: number;
  boardMembers1: number;
  boardMembers2: number;
  boardMembers3: number;
  createAt: string;
  updateAt: string;
}

const AllTopic: React.FC = () => {
  const { Title, Paragraph, Text, Link } = Typography;
  const [topicData, setTopicData] = useState([]);

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

  const expandedRowRender: ExpandedRowRender<dataAllTopic> = (
    record: dataAllTopic
  ) => {
    return (
      <Typography>
        <Paragraph>
          <ul>
            <li>
              <span>Đề tài: {record.nameTopic}</span>
            </li>
          </ul>
        </Paragraph>
      </Typography>
      // <Space direction="vertical">
      //   <div>Trạng thái: {record.status}</div>
      //   <div>Điểm giáo viên hướng dẫn: {record.instructor}</div>
      //   <div>Điểm giáo viên phản biện: {record.reviewer}</div>
      //   <div>Điểm thành viên hội đồng thứ nhất: {record.boardMembers1}</div>
      //   <div>Điểm thành viên hội đồng thứ hai: {record.boardMembers2}</div>
      //   <div>Điểm thành viên hội đồng thứ ba: {record.boardMembers3}</div>
      // </Space>
    );
  };

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
      <ProList
        rowKey="id"
        headerTitle="Danh sách chi tiết tất cả đề tài"
        dataSource={topicData}
        metas={{
          title: {
            dataIndex: "nameTopic",
          },
          description: (record: dataAllTopic) => (
            <Typography>
              <Paragraph>
                <ul>
                  <li>
                    <span>Đề tài: {record.nameTopic}</span>
                  </li>
                  <li>
                    <span>Trạng thái: {record.status}</span>
                  </li>
                  {/* Thêm các mục khác tương tự */}
                </ul>
              </Paragraph>
            </Typography>
          ),
        }}
        expandable={{
          expandedRowRender: expandedRowRender,
          rowExpandable: () => true,
          defaultExpandAllRows: false,
        }}
        toolBarRender={() => [
          <Button key="3" type="primary">
            Tạo mới
          </Button>,
        ]}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
      ></ProList>
    </PageContainer>
  );
};
export default AllTopic;

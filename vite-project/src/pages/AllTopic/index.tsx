import {
  PageContainer,
  ProDescriptions,
  ProList,
} from "@ant-design/pro-components";
import { Key, useEffect, useState } from "react";

import { TopicGetListApi, TopicGetListData } from "../../service/api";
import { Divider, Space, Tag } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

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
  note: string;
  departmentManagement: string;
  nameInternshipFacility: string;
  menterInternshipFacility: string;
  phoneInstructorInternshipFacility: string;
  instructor: number;
  reviewer: number;
  semester: string;
  boardMembers1: number;
  boardMembers2: number;
  boardMembers3: number;
  createAt: string;
  updateAt: string;
}

const AllTopic: React.FC = () => {
  const [dataTopic, setTopicData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<readonly Key[]>([]);
  // useEffect(() => {
  //   const data = async () => {
  //     try {
  //       const res = await TopicGetListData();
  //       setTopicData(res);
  //     } catch (error) {
  //       console.error("Loi lay du lieu: ", error);
  //     }
  //   };
  //   data();
  // }, []);

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
      <ProList<dataAllTopic>
        // dataSource={dataTopic}
        request={async (params, sort, filter) =>
          await TopicGetListData(params, sort, filter)
        }
        search={{
          filterType: "query",
        }}
        headerTitle="Danh sách đề tài khóa luận tốt nghiệp"
        expandable={{
          expandedRowKeys,
          onExpandedRowsChange: setExpandedRowKeys,
        }}
        metas={{
          title: {
            dataIndex: "nameTopic",
            title: "Tên đề tài",
          },
          subTitle: {
            dataIndex: "semester",
            title: "kỳ học",
            search: false,
            render: (_, entity: dataAllTopic) => {
              return (
                <Space size={0}>
                  <Tag color="blue">{entity.departmentManagement}</Tag>
                  <Tag color="#5BD8A6">{entity.semester}</Tag>
                </Space>
              );
            },
            valueEnum: {
              all: { text: "全部", status: "Default" },
              open: {
                text: "未解决",
                status: "Error",
              },
              closed: {
                text: "已解决",
                status: "Success",
              },
            },
          },
          description: {
            search: false,
            render(_, entity: dataAllTopic) {
              return (
                <>
                  <ProDescriptions
                    // column={2}
                    // dataSource={entity}
                    // layout="vertical"
                    request={async () => {
                      // console.log("data", data);
                      return Promise.resolve({
                        success: true,
                        data: entity,
                      });
                    }}
                  >
                    <ProDescriptions.Item
                      dataIndex="nameTopic"
                      label="Đề tài khóa luận tốt nghiệp"
                      span={3}
                    />
                    <ProDescriptions.Item
                      dataIndex={["student", "name"]}
                      label="Họ tên sinh viên "
                    />
                    <ProDescriptions.Item
                      dataIndex={["student", "userCode"]}
                      label="Mã sinh viên"
                    />
                    <ProDescriptions.Item
                      dataIndex="semester"
                      label="Học kỳ "
                    />

                    <ProDescriptions.Item
                      dataIndex={["teacher", "name"]}
                      label="Họ tên giảng viên hướng dẫn "
                    />
                    <ProDescriptions.Item
                      dataIndex={["teacher", "userCode"]}
                      label="Mã giảng viên hướng dẫn "
                    />

                    <ProDescriptions.Item
                      dataIndex="departmentManagement"
                      label="Bộ môn quản lý "
                    />
                    <ProDescriptions.Item
                      dataIndex="nameInternshipFacility"
                      label="Tên cơ sở thực tập "
                    />
                    <ProDescriptions.Item
                      dataIndex="menterInternshipFacility"
                      label="Cán bộ hướng dẫn tại cơ sở thực tập "
                    />
                    <ProDescriptions.Item
                      dataIndex="scoresInternshipFacility"
                      label="Điểm đánh giá tại cơ sở thực tập "
                    />
                    <ProDescriptions.Item
                      dataIndex="instructor"
                      label="Điểm giáo viên hướng dẫn"
                    />
                    <ProDescriptions.Item
                      dataIndex="reviewer"
                      label="Điểm giáo viên phản biện"
                    />
                    <ProDescriptions.Item
                      dataIndex="boardMembers1"
                      label="Điểm thành viên hội đồng thứ nhất"
                    />
                    <ProDescriptions.Item
                      dataIndex="boardMembers2"
                      label="Điểm thành viên hội đồng thứ hai"
                    />
                    <ProDescriptions.Item
                      dataIndex="boardMembers3"
                      label="Điểm thành viên hội đồng thứ ba"
                    />
                    <ProDescriptions.Item
                      dataIndex="result"
                      label="Kết quả tổng điểm KLTN"
                    />
                  </ProDescriptions>
                </>
              );
            },
          },
        }}
      ></ProList>
    </PageContainer>
  );
};
export default AllTopic;

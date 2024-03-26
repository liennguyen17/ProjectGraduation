import {
  PageContainer,
  ProDescriptions,
  ProList,
} from "@ant-design/pro-components";
import { Key, useEffect, useState } from "react";

import { TopicGetListApi } from "../../service/api";
import { Space, Tag } from "antd";
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
      <ProList<dataAllTopic>
        dataSource={dataTopic}
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
                    column={2}
                    dataSource={entity}
                    columns={[
                      {
                        title: "Sinh viên",
                        key: "id",
                        dataIndex: ["student", "name"],
                        ellipsis: true,
                      },
                      {
                        title: "Mã sinh viên",
                        key: "userCode",
                        dataIndex: ["student", "userCode"],
                        ellipsis: true,
                      },
                      {
                        title: "Giáo viên hướng dẫn",
                        dataIndex: ["teacher", "name"],
                        ellipsis: true,
                      },
                      {
                        title: "Mã giáo viên hướng dẫn",
                        dataIndex: ["teacher", "userCode"],
                        ellipsis: true,
                      },
                      {
                        title: "Đề tài khóa luận tốt nghiệp",
                        dataIndex: "nameTopic",
                        ellipsis: true,
                      },
                      {
                        title: "Tên cơ sở thực tập",
                        dataIndex: "nameInternshipFacility",
                        ellipsis: true,
                      },
                      {
                        title: "Cán bộ hướng dẫn tại cơ sở thực tập",
                        dataIndex: "menterInternshipFacility",
                        ellipsis: true,
                      },
                      {
                        title:
                          "Số điện thoại cán bộ hướng dẫn tại cơ sở thực tập",
                        dataIndex: "phoneInstructorInternshipFacility",
                        ellipsis: true,
                      },

                      {
                        title: "Kỳ học",
                        dataIndex: "semester",
                        ellipsis: true,
                      },
                      {
                        title: "Bộ môn quản lý",
                        dataIndex: "departmentManagement",
                        ellipsis: true,
                      },
                      {
                        title: "Điểm giáo viên hướng dẫn",
                        dataIndex: "instructor",
                        ellipsis: true,
                      },
                      {
                        title: "Điểm giáo viên phản biện",
                        dataIndex: "reviewer",
                        ellipsis: true,
                      },
                      {
                        title: "Điểm thành viên hội đồng thứ nhất",
                        dataIndex: "boardMembers1",
                        ellipsis: true,
                      },
                      {
                        title: "Điểm thành viên hội đồng thứ hai",
                        dataIndex: "boardMembers2",
                        ellipsis: true,
                      },
                      {
                        title: "Điểm thành viên hội đồng thứ ba",
                        dataIndex: "boardMembers3",
                        ellipsis: true,
                      },
                      {
                        title: "Kết quả tổng điểm KLTN",
                        dataIndex: "boardMembers3",
                        ellipsis: true,
                      },
                    ]}
                  ></ProDescriptions>
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

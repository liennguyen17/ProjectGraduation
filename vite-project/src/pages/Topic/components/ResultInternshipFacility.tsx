import { PageContainer, ProDescriptions } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { getTopicDetail } from "../../../service/api";
import { ArrowRightOutlined } from "@ant-design/icons";

const ResultInternshipFacility: React.FC = () => {
  const [topicData, setTopicData] = useState([]);
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await getTopicDetail(1);
        setTopicData(response);
      } catch (error) {
        console.error("Error fetching topic detail:", error);
      }
    };

    fetchNewsDetail();
  }, [1]);
  return (
    <PageContainer subTitle="Kết quả đơn vị thực tập" title={false}>
      <ProDescriptions
        title="Kết quả"
        column={2}
        dataSource={topicData}
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
            title: "Cơ sở thực tập",
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
          {
            title: "操作",
            valueType: "option",
            render: () => [
              <a target="_blank" rel="noopener noreferrer" key="link">
                Điểm của đơn vị thực tập <ArrowRightOutlined />
              </a>,
            ],
          },
        ]}
      >
        <ProDescriptions.Item></ProDescriptions.Item>
      </ProDescriptions>
    </PageContainer>
  );
};
export default ResultInternshipFacility;

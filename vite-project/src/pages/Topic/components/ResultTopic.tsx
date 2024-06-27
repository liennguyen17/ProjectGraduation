import {
  PageContainer,
  ProDescriptions,
  StatisticCard,
} from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { getTopicDetail, studentViewTopicLogin } from "../../../service/api";
import { Divider } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
const ResultTopic: React.FC = () => {
  const [topicData, setTopicData] = useState([]);
  const { Operation } = StatisticCard;
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        // Gọi API để lấy thông tin chi tiết của tin tức dựa trên id
        const response = await studentViewTopicLogin();
        setTopicData(response); // Giả sử API trả về dữ liệu trong response.data
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching topic detail:", error);
      }
    };

    fetchNewsDetail();
  }, [1]);

  return (
    <>
      <PageContainer
        // subTitle="Kết quả khóa luận tốt nghiệp"
        title={false}
      >
        <ProDescriptions
          // title="Kết quả"
          column={2}
          // dataSource={topicData}
          request={async () => {
            try {
              const res = await studentViewTopicLogin();
              // setTopicData(res);

              return {
                success: true,
                data: res,
              };
            } catch (error) {
              throw new Error("lien lien");
            }
          }}
        >
          <ProDescriptions.Item span={3}>
            <Divider>KẾT QUẢ KHÓA LUẬN TỐT NGHIỆP</Divider>
          </ProDescriptions.Item>
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
          <ProDescriptions.Item dataIndex="semester" label="Học kỳ " />
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
            label="Điểm cơ sở thực tập"
          />
          <ProDescriptions.Item
            dataIndex="instructor"
            label="Điểm giáo viên hướng dẫn "
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
            label="Tổng điểm KLTN"
            // span={3}
          />
          <ProDescriptions.Item
            dataIndex="success"
            label="Kết quả KLTN"
            // span={3}
          />
        </ProDescriptions>
      </PageContainer>
      {/* <div>
        <Divider orientation="left" orientationMargin={25}>
          <p style={{ color: "#484848", fontSize: "15px" }}>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Công thức tính tổng
            điểm KLTN
          </p>
        </Divider>
        <div style={{ marginLeft: "25px", color: "#606060" }}>
          <p>
            Điểm cơ sở thực tập = 1, nếu điểm đánh giá của cơ sở thực tập của SV
            &gt;= 8,5
          </p>
          <p>
            Điểm hội đồng trung bình = (Điểm thành viên hội đồng thứ nhất + Điểm
            thành viên hội đồng thứ hai + Điểm thành viên hội đồng thứ ba)/3
          </p>
          <p>
            Tổng điểm KLTN = Điểm cơ sở thực tập + ( (Điểm hội đồng trung bình x
            3) + Điểm giáo viên hướng dẫn + Điểm giáo viên phản biện)/5
          </p>
        </div>
        
      </div> */}
    </>
  );
};
export default ResultTopic;

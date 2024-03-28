import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Notification } from "../../../service/types";
import { getNotificationsDetail } from "../../../service/api";
import { PageContainer, ProSkeleton } from "@ant-design/pro-components";
import { DownloadOutlined } from "@ant-design/icons";
import { Divider } from "antd";

const NotificationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Notification | null>(null);
  useEffect(() => {
    const apiNotificationDetail = async () => {
      try {
        // Gọi API để lấy thông tin chi tiết của tin tức dựa trên id
        const response = await getNotificationsDetail(Number(id));
        setData(response); // Giả sử API trả về dữ liệu trong response.data
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching news detail:", error);
      }
    };

    apiNotificationDetail();
  }, [id]);
  return (
    <PageContainer
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5%",
        marginLeft: "13%",
        marginRight: "13%",
      }}
    >
      <div>
        {data ? (
          <div>
            <h2 style={{ textAlign: "center", marginTop: "8%" }}>
              {data.title}
            </h2>
            <Divider />
            {/* <h3>{data.description}</h3> */}

            {/* <h2>File đính kèm:{data?.file}</h2> */}

            <div dangerouslySetInnerHTML={{ __html: data.content }} />
            <Divider />
            <a href={data.file} target="_blank" rel="noopener noreferrer">
              <DownloadOutlined /> File đính kèm
            </a>
            <h3>Người tạo:{data.user}</h3>
            <h4>Ngày tạo: {data.createAt}</h4>
            <h4>Ngày cập nhật: {data.updateAt}</h4>
          </div>
        ) : (
          <div
            style={{
              background: "#fafafa",
              padding: 24,
            }}
          >
            <ProSkeleton type="result" />
          </div>
        )}
      </div>
    </PageContainer>
  );
};
export default NotificationDetail;

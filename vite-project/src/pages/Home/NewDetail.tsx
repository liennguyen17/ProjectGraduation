import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNewsDetail } from "../../service/api";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Modal } from "antd";
// import { Image, Spin, Typography } from "antd";

interface News {
  id: number;
  title: string;
  description: string;
  file: string;
  image: string;
  content: string;
  year: number;
  subject: string;
  createAt: string;
  updateAt: string;
}

// interface ParamId {
//   id: string;
// }

// const { Title, Paragraph } = Typography;

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  //   const safeId = id ?? "";
  const [newsDetail, setNewsDetail] = useState<News | null>(null);
  //   const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        // Gọi API để lấy thông tin chi tiết của tin tức dựa trên id
        const response = await getNewsDetail(Number(id));
        setNewsDetail(response); // Giả sử API trả về dữ liệu trong response.data
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching news detail:", error);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const handleDownloadFile = () => {
    // Hiển thị cửa sổ thông báo yêu cầu đăng nhập
    setModalVisible(true);
  };

  const handleCancel = () => {
    // Đóng cửa sổ thông báo
    setModalVisible(false);
  };

  return (
    <PageContainer style={{ margin: "0 100px" }}>
      <div>
        {newsDetail ? (
          <div>
            <h1>{newsDetail.title}</h1>
            {/* <img src={newsDetail.image} alt={newsDetail.title} /> */}
            <h2>Mô tả: {newsDetail.description}</h2>
            <div dangerouslySetInnerHTML={{ __html: newsDetail.content }} />
            {/* <p>{newsDetail.content}</p> */}
            <h4>Sinh viên thuộc bộ môn: {newsDetail.subject}</h4>
            <h4>Năm bảo vệ: {newsDetail.year}</h4>
            <h4>Ngày tạo bài viết: {newsDetail.createAt}</h4>
            <h4>Ngày cập nhật: {newsDetail.updateAt}</h4>
            <h4>
              Tài liệu tham khảo:{" "}
              <Button type="primary" onClick={handleDownloadFile}>
                Tải tài liệu
              </Button>
            </h4>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Modal
        title="Đăng nhập để tải tài liệu"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay lại
          </Button>,
          <Button onClick={handleLoginClick} type="primary">
            Đăng nhập
          </Button>,
        ]}
      >
        Vui lòng đăng nhập để tải tài liệu
      </Modal>
    </PageContainer>
  );
};
export default NewsDetailPage;

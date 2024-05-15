import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNewsDetail } from "../../service/api";
import { PageContainer, ProSkeleton } from "@ant-design/pro-components";
import { Button, Divider, Modal } from "antd";
import { News } from "../../service/types";
import { DownloadOutlined } from "@ant-design/icons";
import { getJwt } from "../../service/utils";
import { AppContext } from "../../context/AppProvider";

const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [newsDetail, setNewsDetail] = useState<News | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  console.log("pathName:: ", pathName);
  const handleLoginClick = () => {
    dispatch({
      payload: {
        homeLogin: pathName,
      },
      type: "setIsHomeLogin",
    });
    navigate("/auth/login");
  };

  const jwt = getJwt();

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
  console.log("newDetails:: ", newsDetail);

  return (
    <PageContainer style={{ margin: "0 100px" }}>
      <div>
        {newsDetail ? (
          <div>
            <h1>{newsDetail.title}</h1>
            <Divider />
            <div dangerouslySetInnerHTML={{ __html: newsDetail.content }} />
            <Divider />

            <h3>
              Tài liệu tham khảo:{" "}
              {jwt ? (
                <a
                  href={newsDetail.file}
                  target="_blank"
                  // onClick={handleDownloadFile}
                >
                  <DownloadOutlined /> Tài liệu
                </a>
              ) : (
                <a onClick={handleDownloadFile}>
                  <DownloadOutlined /> Tài liệu
                </a>
              )}
            </h3>
            <h4>Sinh viên thuộc bộ môn: {newsDetail.subject}</h4>
            <h4>Năm bảo vệ: {newsDetail.year}</h4>
            <h4>Ngày tạo bài viết: {newsDetail.createAt}</h4>
            <h4>Ngày cập nhật: {newsDetail.updateAt}</h4>
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

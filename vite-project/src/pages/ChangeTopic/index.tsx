import { useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Card, Typography } from "antd";
import {
  CheckOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import ModalFormTopic from "./components/ModalFormTopic";
import ModalResultTopic from "./components/ModalResultTopic";
import { generatePdf, generatePdfChangeTopic } from "../../service/api";

const ChangeTopic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const showModal1 = () => {
    setIsModalOpen1(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { Paragraph, Text } = Typography;

  const jwtToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2YW5lMTExMiIsIlhBVVRIT1IiOiJTVFVERU5UIiwiaWF0IjoxNzEyODAxMTAzLCJleHAiOjE3MTI4MzcxMDN9.PQY0HbR9yIBjrlY2jZKJI9XmktXniNRpCi-beqWoe1IGHPGIiA7aKyN86vz4bGcvJ125VANA4zJuSD810gKVJw";

  const handleDownloadPdf = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/topic/generate-pdf",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "don_xin_xac_nhan.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handleTopicPdf = async () => {
    try {
      const res = await generatePdfChangeTopic();

      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "don_xin_doi_de_tai.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  };

  return (
    <PageContainer subTitle="Đổi đề tài" title={false}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Card
          bordered={false}
          title="Đơn xin đổi đề tài"
          style={{
            //   height: "250px",
            width: "30%",
            backgroundColor: "rgb(162, 242, 227)",
          }}
        >
          <Paragraph>
            <Text strong>Chú ý:</Text>
            <ul>
              <li>
                <span>
                  Sinh viên điền đầy đủ thông tin vào đơn đổi đề tài khóa luận
                  tốt nghiệp.
                </span>
              </li>
              <li>
                <span>
                  Trường hợp gửi đơn: khoa không chấp thuận đề tài, đề tài thực
                  tập tại cơ sở không được phát triển tiếp và một số lý do
                  khác...
                </span>
              </li>
              {/* <li></li> */}
            </ul>
          </Paragraph>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "5px",
            }}
          >
            <Button type="primary" onClick={showModal}>
              <PlusOutlined /> Tạo đơn
              {/* <SmileTwoTone twoToneColor="#c41a1a" /> */}
            </Button>
          </div>
        </Card>

        <Card
          bordered={false}
          title="Xem kết quả đổi đề tài"
          style={{ width: "30%", backgroundColor: "rgb(162, 242, 227)" }}
        >
          <Paragraph>
            {/* <Text strong>Chú ý: </Text> */}
            <ul>
              <li>
                <span>
                  Sinh viên đã đăng ký đổi đề tài thì kết quả sẽ hiện thị ở đây.
                </span>
              </li>

              <li>
                <span>
                  Kết quả sẽ được cập nhật sau khi phê duyệt đề tài của sinh
                  viên.
                </span>
              </li>
              <li>
                <span>
                  Nếu 1 tuần mà sinh viên không nhận được kết quả lên văn phòng
                  khoa để được hỗ trợ.
                </span>
              </li>
            </ul>
          </Paragraph>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={showModal1}>
              <CheckOutlined />
              Xem kết quả
              {/* <CheckCircleTwoTone twoToneColor="#52c41a" /> */}
            </Button>
          </div>
        </Card>
        {/* <Card
          bordered={false}
          title="Danh sách các lần đổi đề tài"
          style={{ width: "30%", backgroundColor: "rgb(162, 242, 227)" }}
        >
          <Paragraph>
            <ul>
              <li>
                <span>Danh sách các lần đổi đề tài sẽ hiện thị ở đây.</span>
              </li>

            </ul>
          </Paragraph>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={showModal1}>
              <CheckOutlined />
              Xem kết quả
            </Button>
          </div>
        </Card> */}

        <Card
          bordered={false}
          title="Tải đơn đăng ký"
          style={{ width: "30%", backgroundColor: "rgb(162, 242, 227)" }}
        >
          <Paragraph>
            {/* <Text strong>Chú ý:</Text> */}
            <ul>
              <li>
                <span>
                  Sinh viên có thể tải bản Pdf của bản đăng ký khi đã có kết quả
                  để đóng dấu và nộp lên bộ môn.
                </span>
              </li>
            </ul>
          </Paragraph>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={handleTopicPdf}>
              <DownloadOutlined /> Pdf
            </Button>
          </div>
        </Card>
      </div>

      <ModalFormTopic
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        // handleCancel={handleCancel}
      />
      <ModalResultTopic
        isModalOpen={isModalOpen1}
        setIsModalOpen={setIsModalOpen1}
      />
    </PageContainer>
  );
};

export default ChangeTopic;

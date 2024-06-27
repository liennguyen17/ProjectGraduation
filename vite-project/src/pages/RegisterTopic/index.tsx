import { useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Card, Typography } from "antd";
import ModalFormTopic from "./components/ModalFormTopic";
import {
  CheckOutlined,
  DownloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ModalResultTopic from "./components/ModalResultTopic";
import { generatePdf } from "../../service/api";

const RegistrationTopic = () => {
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
  const handleTopicPdf = async () => {
    try {
      const res = await generatePdf();

      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "don_xin_xac_nhan_co_so_thuc_tap.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  };

  return (
    <PageContainer subTitle="Đăng ký đề tài" title={false}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Card
          bordered={false}
          title="Đơn đăng ký đề tài"
          style={{
            //   height: "250px",
            width: "30%",
            backgroundColor: "rgb(162, 242, 227)",
          }}
        >
          <Paragraph>
            {/* <Text strong>Chú ý:</Text> */}
            <ul>
              <li>
                <span>
                  Sinh viên điền đầy đủ thông tin vào đơn đăng kí đề tài khóa
                  luận tốt nghiệp.
                </span>
              </li>
              <li>
                <span>
                  Đơn đăng ký đề tài chỉ được gửi một lần trong mỗi kỳ.
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
          title="Xem kết quả đăng ký"
          style={{ width: "30%", backgroundColor: "rgb(162, 242, 227)" }}
        >
          <Paragraph>
            {/* <Text strong>Chú ý: </Text> */}
            <ul>
              <li>
                <span>
                  Sinh viên đã đăng ký đề tài thì kết quả sẽ hiện thị ở đây.
                </span>
              </li>

              <li>
                <span>
                  Kết quả sẽ được cập nhật sau khi phê duyệt đề tài của sinh
                  viên.
                </span>
              </li>
            </ul>
          </Paragraph>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={showModal1}>
              <CheckOutlined />
              Xem kết quả
            </Button>
          </div>
        </Card>

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
        // actionRef={() => actionRef.current?.reload()}
      />
    </PageContainer>
  );
};

export default RegistrationTopic;

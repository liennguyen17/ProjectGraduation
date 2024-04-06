import { useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Card, Modal, Typography } from "antd";
import ModalFormTopic from "./components/ModalFormTopic";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
import ModalResultTopic from "./components/ModalResultTopic";
import { filterUser } from "../../service/api";

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
  return (
    <PageContainer
      subTitle="Đăng ký đề tài"
      // title="sljfa;lsajf"
      title={false}
    >
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Card
          bordered={false}
          title="Tạo đơn đăng ký"
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
                  Sinh viên điền đầy đủ thông tin vào đơn đăng kí đề tài khóa
                  luận tốt nghiệp.
                </span>
              </li>
              <li>
                <span>Mỗi đơn đăng ký chỉ được gửi 1 lần.</span>
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
              Tạo đơn <SmileTwoTone twoToneColor="#c41a1a" />
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
              Xem kết quả <CheckCircleTwoTone twoToneColor="#52c41a" />
            </Button>
          </div>
        </Card>

        {/* <Card
          bordered={false}
          title="Đơn kiến nghị"
          style={{ width: "30%", backgroundColor: "rgb(162, 242, 227)" }}
        >
          <Paragraph>
            <Text strong>Chú ý:</Text>
            <ul>
              <li>
                <span>
                  Là đơn mà sinh viên muốn gửi kiến nghị lên bộ phận khoa về các
                  vấn đề trong quá trình làm đề tài.
                </span>
              </li>
              <li>
                <span>
                  Khi gửi đơn sinh viên phải chịu trách nghiệm đến khoa làm
                  việc, không thì đơn sẽ bị thu hồi.
                </span>
              </li>
            </ul>
          </Paragraph>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={showModal}>
              Gửi đơn <HeartTwoTone twoToneColor="#eb2f96" />
            </Button>
          </div>
        </Card> */}
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

export default RegistrationTopic;

import { useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import { Button, Card, Modal, Typography } from "antd";
import ModalFormTopic from "./components/ModalFormTopic";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";

const RegistrationTopic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  // const [visibleModal1, setVisibleModal1] = useState(false);
  // const [visibleModal2, setVisibleModal2] = useState(false);
  // const [visibleModal3, setVisibleModal3] = useState(false);

  // const handleOpenModal1 = () => {
  //   setVisibleModal1(true);
  // };

  // const handleOpenModal2 = () => {
  //   setVisibleModal2(true);
  // };

  // const handleOpenModal3 = () => {
  //   setVisibleModal3(true);
  // };
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
                <span>Xem kết quả đăng ký đề tài khóa luận tốt nghiệp.</span>
              </li>
              {/* <li><span>Mỗi đơn đăng ký chỉ được gửi 1 lần.</span></li> */}
              {/* <li></li> */}
            </ul>
          </Paragraph>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={showModal}>
              Xem kết quả <CheckCircleTwoTone twoToneColor="#52c41a" />
            </Button>
          </div>
        </Card>

        <Card
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
              {/* <li></li> */}
            </ul>
          </Paragraph>
          {/* <Button type="primary" onClick={handleOpenModal3}>
          Gửi đơn <HeartTwoTone twoToneColor="#eb2f96" />
        </Button> */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button type="primary" onClick={showModal}>
              Gửi đơn <HeartTwoTone twoToneColor="#eb2f96" />
            </Button>
          </div>
        </Card>

        {/* <Modal
          title="Modal 1"
          visible={visibleModal1}
          onCancel={() => setVisibleModal1(false)}
          footer={[
            <Button key="cancel" onClick={() => setVisibleModal1(false)}>
              Cancel
            </Button>,
            <Button
              key="ok"
              type="primary"
              onClick={() => setVisibleModal1(false)}
            >
              OK
            </Button>,
          ]}
        >
          Modal content 1
        </Modal>

        <Modal
          title="Modal 2"
          visible={visibleModal2}
          onCancel={() => setVisibleModal2(false)}
          footer={[
            <Button key="cancel" onClick={() => setVisibleModal2(false)}>
              Cancel
            </Button>,
            <Button
              key="ok"
              type="primary"
              onClick={() => setVisibleModal2(false)}
            >
              OK
            </Button>,
          ]}
        >
          Modal content 2
        </Modal>

        <Modal
          title="Modal 3"
          visible={visibleModal3}
          onCancel={() => setVisibleModal3(false)}
          footer={[
            <Button key="cancel" onClick={() => setVisibleModal3(false)}>
              Cancel
            </Button>,
            <Button
              key="ok"
              type="primary"
              onClick={() => setVisibleModal3(false)}
            >
              OK
            </Button>,
          ]}
        >
          Modal content 3
        </Modal> */}
      </div>

      {/* <Button type="primary" key="primary" onClick={showModal}>
        Tạo đơn đăng ký
      </Button> */}

      <ModalFormTopic
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </PageContainer>
  );
};

export default RegistrationTopic;

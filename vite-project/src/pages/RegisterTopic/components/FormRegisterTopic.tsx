import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Col, Row } from "antd";

const FormRegisterTopic: React.FC = () => {
  const handleSubmit = async (values) => {
    console.log("Received values:", values);
    // Gửi thông tin đăng ký đề tài đến backend
  };
  return (
    <ProForm style={{ flex: 1 }} onFinish={handleSubmit} layout="vertical">
      <Row gutter={24}>
        <Col span={12}>
          <ProFormText
            name="topic_name"
            label="Tên đề tài"
            rules={[{ required: true, message: "Vui lòng nhập tên đề tài!" }]}
            // width="lg"
            placeholder="Nhập tên đề tài"
            required
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label="Giảng viên hướng dẫn"
            name="subject"
            placeholder="Vui lòng chọn giảng viên"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giảng viên!",
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="topic_name"
            label="Tên cơ sở thực tập"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên cơ sở thực tập!",
              },
            ]}
            // width="lg"
            placeholder="Nhập tên cơ sở thực tập"
            required
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="topic_name"
            label="Cán bộ hướng dẫn tại cơ sở thực tập"
            rules={[
              {
                required: true,
                message:
                  "Vui lòng nhập tên cán bộ hướng dẫn tại cơ sở thực tập!",
              },
            ]}
            // width="lg"
            placeholder="Nhập tên cán bộ hướng dẫn"
            required
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="topic_name"
            label="Số điện thoại cán bộ hướng dẫn tại cơ sở thực tập"
            rules={[
              {
                required: true,
                message:
                  "Vui lòng nhập số điện thoại cán bộ hướng dẫn tại cơ sở thực tập!",
              },
            ]}
            // width="lg"
            placeholder="Nhập số điện thoại"
            required
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default FormRegisterTopic;

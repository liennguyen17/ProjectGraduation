import {
  ProForm,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-components";
import { Col, Row } from "antd";
import { useRef } from "react";

const MasterDataForm: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  return (
    <ProForm formRef={formRef} grid>
      <Row style={{ flex: 1 }} gutter={16}>
        <Col span={8}>
          <ProFormText
            label="Mã dữ liệu"
            name="code"
            placeholder="Nhập mã..."
            required
            rules={[
              {
                required: true,
                message: "Mã không được bỏ trống",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Loại mã"
            name="type"
            placeholder="Nhập loại mã..."
            required
            rules={[
              {
                required: true,
                message: "Loại mã không được bỏ trống",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Tên mã"
            name="name"
            placeholder="Nhập tên mã..."
            required
            rules={[
              {
                required: true,
                message: "Tên mã không được bỏ trống",
              },
            ]}
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default MasterDataForm;

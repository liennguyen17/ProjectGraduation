import {
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Notification } from "../../../service/types";
import { useRef } from "react";
import { Col, Row } from "antd";
import Editor from "../../Editor";
import { appInfo } from "../../../config/appInfo";

interface FormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  initiateData?: Notification;
}

const NotificationForm: React.FC<FormProps> = ({ initiateData }) => {
  const formRef = useRef<ProFormInstance>();
  return (
    <ProForm formRef={formRef} grid>
      <Row style={{ flex: 1 }} gutter={16}>
        <Col span={12}>
          <ProFormText
            label="Tên thông báo"
            name="title"
            placeholder="Nhập tên thông báo"
            required
            rules={[
              {
                required: true,
                message: "Tên thông báo không được bỏ trống",
              },
              {
                max: 200,
                message: "Tên thông báo không vượt quá 200 ký tự",
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormTextArea
            // colProps={{ span: 18 }}
            name="description"
            placeholder="Nhập mô tả"
            label="Mô tả"
          />
        </Col>
        <Col span={24}>
          <ProForm.Item
            label="Nội dung"
            name="content"
            rules={[
              { required: true, message: "Vui lòng không bỏ trống" },
              {
                max: 50000,
                message: "Nội dung không vượt quá 5000 ký tự",
              },
            ]}
          >
            <Editor
              onChange={(event, editor) => {
                formRef.setFieldsValue({
                  bodyKB: editor.getData(),
                });
              }}
              initiateData={initiateData?.kbBody}
            />
          </ProForm.Item>
        </Col>
        <Col span={8}>
          <ProFormUploadButton
            name="file"
            label="File đính kèm"
            max={2}
            fieldProps={{
              name: "file",
              listType: "picture-card",
            }}
            action={`${appInfo.apiUrl}/file/upload`}
            extra="Upload file lên"
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default NotificationForm;

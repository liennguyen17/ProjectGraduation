import {
  ProForm,
  ProFormDatePicker,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Col, Row } from "antd";
import { useRef } from "react";
import Editor from "../../Editor";
import { appInfo } from "../../../config/appInfo";

interface NewFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  initiateData?: any;
}
const NewsForm: React.FC<NewFormProps> = ({ initiateData }) => {
  const formRef = useRef<ProFormInstance>();
  return (
    <ProForm
      formRef={formRef}
      grid
      // submitter={{
      //   searchConfig: {
      //     submitText: "Xác nhận",
      //   },
      //   resetButtonProps: false,
      // }}
    >
      <Row style={{ flex: 1 }} gutter={16}>
        <Col span={12}>
          <ProFormText
            label="Tiêu đề"
            name="title"
            placeholder="Nhập tiêu đề bài viết"
            required
            rules={[
              {
                required: true,
                message: "Tiêu đề không được bỏ trống",
              },
              {
                max: 200,
                message: "Tiêu đề không vượt quá 200 ký tự",
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label="Bộ môn"
            name="subject"
            placeholder="Vui lòng chọn"
          />
        </Col>
        <Col span={24}>
          <ProForm.Item
            label="Nội dung"
            name="description"
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
        {/* <Col span={12}>
          <ProFormDatePicker label="Ngày tạo" />
          <ProFormDatePicker label="Ngày cập nhật" />
        </Col> */}
        <Col span={8}>
          {/* <ProFormText label="Năm" placeholder="Nhập năm" /> */}
          {/* <DatePicker picker="year" style={{ width: "100%" }} /> */}
          <ProFormDatePicker.Year
            name="dateYear"
            label="Năm làm khóa luận"
            // style={{ width: "100%" }}
            fieldProps={{
              style: { width: "100%" }, // Chỉnh chiều rộng của input
            }}
          />
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
export default NewsForm;

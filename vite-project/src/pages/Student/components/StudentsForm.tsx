import {
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Card, Col, Divider, Row } from "antd";
import Editor from "../../Editor";
import { GlobalOutlined } from "@ant-design/icons";
import { useRef } from "react";

interface PostsFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  initiateData?: any;
}

const StudentsForm: React.FC<PostsFormProps> = ({
  onCancel,
  onSuccess,
  initiateData,
}) => {
  // const [formRef] = ProForm.useForm();
  const formRef = useRef<ProFormInstance>();
  return (
    <ProForm
      formRef={formRef}
      grid
      //   request={{}}
      //   onFinish={}
      submitter={{
        searchConfig: {
          submitText: "Xác nhận",
        },
        resetButtonProps: false,
      }}
    >
      <Row style={{ flex: 1 }} gutter={16}>
        <Col sm={24} lg={18}>
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

          <ProFormTextArea
            label="Mô tả ngắn"
            name="dedescription"
            placeholder="Nhập mô tả ngắn"
            fieldProps={{
              autoSize: {
                maxRows: 5,
                minRows: 3,
              },
            }}
            rules={[
              {
                max: 500,
                message: "Mô tả ngắn không vượt quá 500 ký tự",
              },
            ]}
          />
          <ProForm.Item
            label="Nội dung"
            name="content"
            required
            rules={[
              { required: true, message: "Vui lòng không bỏ trống" },
              {
                max: 50000,
                message: "Mô tả ngắn không vượt quá 50000 ký tự",
              },
            ]}
            style={{ padding: "0 8px" }}
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
        <Col sm={24} lg={6}>
          <Card size="small" style={{ background: "#f4f7fa" }}>
            <Row gutter={16}>
              <ProFormSwitch
                colProps={{ span: 12 }}
                name="state"
                label={
                  <>
                    <GlobalOutlined style={{ marginRight: 2 }} />
                    Trạng thái
                  </>
                }
              />
            </Row>
            <Row gutter={16}>
              <ProFormSelect
                colProps={{ span: 24 }}
                name="categories"
                label="Mã danh mục"
              />
            </Row>
            <Row gutter={16}>
              <ProFormUploadButton
                name="upload"
                label="Upload"
                max={2}
                fieldProps={{
                  name: "file",
                  listType: "picture-card",
                }}
                action="http://localhost:8080/file/upload"
                extra="longgggggggggggggggggggggggggggggggggg"
              />
            </Row>
            <Divider />
          </Card>
        </Col>
      </Row>
    </ProForm>
  );
};
export default StudentsForm;

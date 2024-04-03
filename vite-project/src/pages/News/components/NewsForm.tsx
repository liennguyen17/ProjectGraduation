import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Button, Col, Row } from "antd";
import Editor from "../../Editor";
import { appInfo } from "../../../config/appInfo";
// import "../styles.css";
import "../../../index.css";
import { createNews } from "../../../service/api";
import { News } from "../../../service/types";

interface NewFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  initiateData?: any;
  handleCancel: () => void;
}
const NewsForm: React.FC<NewFormProps> = ({ initiateData, handleCancel }) => {
  const [formRef] = ProForm.useForm();

  const handleFinish = async (value: News) => {
    try {
      console.log("Data from :", value);
      const res = await createNews(value);
      // console.log("create news::", res);
    } catch (error) {
      console.error("Error creating news:", error);
    }
  };
  return (
    <ProForm
      form={formRef}
      grid
      submitter={{
        resetButtonProps: false,
        searchConfig: {
          submitText: "Xác nhận",
        },
        render({ form }, dom) {
          // console.log("dom", dom);
          return (
            <div className="submitFootbar">
              <Button
                // danger
                onClick={() => handleCancel()}
              >
                Đóng
              </Button>
              {dom}
            </div>
          );
        },
      }}
      onFinish={handleFinish}
    >
      <Row style={{ flex: 1 }} gutter={16}>
        <Col span={12}>
          <ProFormText
            label="Tiêu đề"
            name="title"
            placeholder="Nhập tiêu đề tin tức..."
            required
            rules={[
              {
                required: true,
                message: "Tiêu đề không được bỏ trống.",
              },
              {
                max: 200,
                message: "Tiêu đề không vượt quá 200 ký tự.",
              },
              // {
              //   pattern: /^[a-z0-9\-]+$/,
              //   message: "Chỉ cho phép chữ thường, số và dấu gạch ngang",
              // },
            ]}
            // transform={(e: string) => {
            //   const value = e.trim();
            //   return { title: value };
            // }}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label="Bộ môn"
            name="subject"
            placeholder="Vui lòng chọn"
            // required
            // rules={[
            //   {
            //     required: true,
            //     message: "Không được bỏ trống.",
            //   },
            // ]}
          />
        </Col>
        <Col span={16}>
          <ProFormTextArea
            name="description"
            placeholder="Nhập mô tả..."
            label="Mô tả"
            required
            rules={[
              {
                required: true,
                message: "Mô tả không được bỏ trống.",
              },
              {
                max: 200,
                message: "Mô tả không vượt quá 200 ký tự.",
              },
            ]}
            // transform={(e: string) => {
            //   const value = e.trim();
            //   return { description: value };
            // }}
          />
        </Col>
        <Col span={8}>
          <ProFormDatePicker.Year
            name="dateYear"
            label="Năm làm khóa luận"
            fieldProps={{
              style: { width: "100%" }, // Chỉnh chiều rộng của input
            }}
            required
            rules={[
              {
                required: true,
                message: "Không được bỏ trống.",
              },
            ]}
          />
        </Col>
        <Col span={24}>
          <ProForm.Item
            label="Nội dung"
            name="content"
            rules={[
              { required: true, message: "Vui lòng không bỏ trống." },
              // {
              //   max: 50000,
              //   message: "Nội dung không vượt quá 5000 ký tự.",
              // },
            ]}
            // transform={(e: string) => {
            //   const value = e.trim();
            //   return { content: value };
            // }}
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

        <Col span={12}>
          <ProFormUploadButton
            name="image"
            label="Ảnh"
            max={2}
            fieldProps={{
              name: "image",
              listType: "picture-card",
            }}
            action={`${appInfo.apiUrl}/file/upload`}
            extra="Upload ảnh lên"
          />
        </Col>
        <Col span={12}>
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

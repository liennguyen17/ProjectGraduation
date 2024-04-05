import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { NotificationType } from "../../../service/types";
import { Button, Col, FormInstance, Row, message } from "antd";
import Editor from "../../Editor";
import { appInfo } from "../../../config/appInfo";
import { useRef } from "react";
import { createNotification, editNotifications } from "../../../service/api";
import "../../../index.css";

interface FormProps {
  handleCancel: () => void;
  handleCreateSuccess: () => Promise<void>;
  editingId: number | null;
  initialData: NotificationType | null;
  initiateData?: NotificationType;
}

const NotificationForm: React.FC<FormProps> = ({
  initiateData,
  handleCancel,
  handleCreateSuccess,
  editingId,
  initialData,
}) => {
  // const [formRef] = ProForm.useForm();
  const formRef = useRef<FormInstance<NotificationType>>();

  const handleFinish = async (value: NotificationType) => {
    try {
      if (editingId) {
        const dataToUpdate = { ...value, id: editingId };
        const res = await editNotifications(dataToUpdate);
        if (res.success) {
          message.success("Chỉnh sửa thong bao thành công");
          handleCreateSuccess();
          handleCancel();
        } else {
          message.error("Có lỗi xảy ra khi chỉnh sửa MasterData");
        }
      } else {
        const res = await createNotification(value);
        if (res.success) {
          message.success("Tạo thong bao thành công");
          handleCreateSuccess();
          handleCancel();
        } else {
          message.error("Có lỗi xảy ra khi tạo thong bao");
        }
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo/chỉnh sửa thong bao");
    }
  };

  return (
    <ProForm
      formRef={formRef}
      initialValues={initialData ? initialData : undefined}
      grid
      submitter={{
        resetButtonProps: false,
        searchConfig: {
          submitText: "Xác nhận",
        },
        render({ form }, dom) {
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
            // rules={[
            //   { required: true, message: "Vui lòng không bỏ trống" },
            //   {
            //     max: 50000,
            //     message: "Nội dung không vượt quá 5000 ký tự",
            //   },
            // ]}
          >
            <Editor
              onChange={(event, editor) => {
                formRef?.setFieldsValue({
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

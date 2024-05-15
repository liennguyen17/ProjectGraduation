import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { NotificationType } from "../../../service/types";
import { Button, Col, FormInstance, Row, message, notification } from "antd";
import Editor from "../../Editor";
import { appInfo } from "../../../config/appInfo";
import { useRef, useState } from "react";
import {
  createNotification,
  editNotifications,
  uploadFile,
} from "../../../service/api";
import "../../../index.css";

interface FormProps {
  handleCancel: () => void;
  actionRef?: () => void;
  editingId: number | null;
  initialData: NotificationType | null;
  initiateData?: NotificationType;
}

const NotificationForm: React.FC<FormProps> = ({
  initiateData,
  handleCancel,
  actionRef,
  editingId,
  initialData,
}) => {
  const formRef = useRef<FormInstance<NotificationType>>();
  const [listFile, setListFile] = useState([]);

  const [fieldFile, setFieldFile] = useState("");

  const handleFinish = async (value: NotificationType) => {
    try {
      if (editingId) {
        const dataToUpdate = { ...value, id: editingId };
        const res = await editNotifications(dataToUpdate);
        if (res.success) {
          message.success("Chỉnh sửa thong bao thành công");
          handleCancel();
          actionRef?.();
        } else {
          message.error("Có lỗi xảy ra khi chỉnh sửa MasterData");
        }
      } else {
        const res = await createNotification(value);
        if (res.success) {
          message.success("Tạo thong bao thành công");
          handleCancel();
          actionRef?.();
        } else {
          message.error("Có lỗi xảy ra khi tạo thong bao");
        }
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo/chỉnh sửa thong bao");
    }
  };

  const handleUpload = async (file) => {
    try {
      const res = await uploadFile(file.file);
      console.log("res upload ", res);
      console.log("res upload file", res.downloadUrl);

      // Nếu res không rỗng
      if (res) {
        // Set listFile và fieldFile với dữ liệu từ response
        setListFile([{ url: res.downloadUrl }]);
        setFieldFile(res.downloadUrl);
        notification.success({ message: "Tải file lên thành công" });
      } else {
        // Nếu res rỗng
        notification.error({ message: "Tải file lên không thành công!" });
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error uploading file:", error);
      notification.error({ message: "Tải file lên không thành công!" });
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
                formRef.current?.setFieldsValue({
                  content: editor.getData() || "",
                });
              }}
              initiateData={initialData?.content}
            />
          </ProForm.Item>
        </Col>
        <Col span={12}>
          <ProFormUploadButton
            name="file"
            // accept={"image/*, video/*"}
            label="File đính kèm"
            title="Click to upload"
            fileList={listFile}
            transform={(value) => {
              return {
                file: fieldFile || "",
              };
            }}
            fieldProps={{
              name: "image",
              customRequest: handleUpload,
              onRemove: () => setListFile([]),
              listType: "picture-card",
              multiple: true,
              method: "POST",
              openFileDialogOnClick: true,
              onChange: (file) => {
                console.log("file :: ", file);
              },
            }}
            action={`${appInfo.apiUrl}/file/upload`}
            extra="Upload ảnh lên"
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default NotificationForm;

import {
  ProForm,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Button, Col, Row, message, notification } from "antd";
import { useState } from "react";
import { appInfo } from "../../../config/appInfo";
import { CreateComment, dataComment } from "../../../service/types";
import { createCommentTopic, uploadFile } from "../../../service/api";

interface PropsForm {
  handleCancel: () => void;
  handleOk: () => void;
  selectedRecord: dataComment | null;
}

const CommentForm: React.FC<PropsForm> = ({
  handleCancel,
  handleOk,
  selectedRecord,
}) => {
  const [listFile1, setListFile1] = useState([]);
  const [fieldFile11, setFieldFile1] = useState("");

  const handleUploadFile = async (file) => {
    try {
      const res = await uploadFile(file.file);
      console.log("res upload ", res);
      console.log("res upload file", res.downloadUrl);

      // Nếu res không rỗng
      if (res) {
        // Set listFile và fieldFile với dữ liệu từ response
        setListFile1([{ url: res.downloadUrl }]);
        setFieldFile1(res.downloadUrl);
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

  const handleFinish = async (value: CreateComment) => {
    try {
      const topic = selectedRecord?.topic.id;
      console.log("id", topic);
      const data = {
        ...value,
        topic: topic,
      };
      console.log("data abc:: ", data);
      const res = await createCommentTopic(data);
      console.log("first nhat ky", res);
      if (res.success) {
        message.success("Tạo nhật ký thành công.");
        handleOk();
        handleCancel();
      } else {
        message.error("Có lỗi trong quá trình tạo nhật ký.");
      }
    } catch (error) {
      message.error("Có lỗi trong quá trình tạo nhật ký.");
    }
  };

  return (
    <ProForm
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
      layout="vertical"
      onFinish={handleFinish}
    >
      <Row gutter={24}>
        <Col span={24}>
          <ProFormText
            name="message"
            label="Tin nhắn"
            placeholder="Nhập tin nhắn"
          />
        </Col>
        <Col span={12}>
          <ProFormUploadButton
            name="file"
            label="File đính kèm"
            title="Click to upload"
            fileList={listFile1}
            transform={(value) => {
              return {
                file: fieldFile11 || "",
              };
            }}
            fieldProps={{
              name: "file",
              customRequest: handleUploadFile,
              onRemove: () => setListFile1([]),
              listType: "picture-card",
              multiple: true,
              method: "POST",
              openFileDialogOnClick: true,
              onChange: (file) => {
                console.log("file dinh kem:: ", file);
              },
            }}
            action={`${appInfo.apiUrl}/file/upload`}
            extra="Upload file lên"
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default CommentForm;

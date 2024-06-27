import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { CreateComment, dataComment } from "../../../service/types";
import {
  createCommentTopic,
  getListTopicComment,
  uploadFile,
} from "../../../service/api";
import { Button, Col, Row, message, notification } from "antd";
import { useState } from "react";
import { appInfo } from "../../../config/appInfo";
import { handleFilterTeacherComment } from "../../../service/utils";

interface PropsForm {
  handleCancel: () => void;
  handleOk: () => void;
  // selectedRecord: dataComment | null;
  // commentsData: dataComment;
}

const FormFile: React.FC<PropsForm> = ({
  handleCancel,
  handleOk,
  // selectedRecord,
  // commentsData,
}) => {
  const [listFile1, setListFile1] = useState([]);
  const [fieldFile11, setFieldFile1] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<dataComment | null>(
    null
  );

  const handleUploadFile = async (file) => {
    try {
      const res = await uploadFile(file.file);
      console.log("res upload ", res);
      console.log("res upload file", res.downloadUrl);

      if (res) {
        setListFile1([{ url: res.downloadUrl }]);
        setFieldFile1(res.downloadUrl);
        notification.success({ message: "Tải file lên thành công" });
      } else {
        notification.error({ message: "Tải file lên không thành công!" });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      notification.error({ message: "Tải file lên không thành công!" });
    }
  };
  const handleFinish = async (value: CreateComment) => {
    try {
      const topic = selectedRecord?.topic.id;
      console.log("id topic", topic);
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

  const handleFilterTeacherComment = async () => {
    try {
      const data = await getListTopicComment();
      console.log("data comment:: ", data);
      setSelectedRecord(data);
    } catch (error) {
      console.error("Error student data:", error);
      return [];
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
          <ProFormSelect
            label="Gửi đến sinh viên"
            name="topic"
            request={() => handleFilterTeacherComment()}
          />
        </Col>
        <Col span={24}>
          <ProFormText
            name="description_file"
            label="Tên file"
            placeholder="Nhập mô tả file"
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
export default FormFile;

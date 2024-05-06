import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Button, Col, Row, message, notification } from "antd";
import Editor from "../../Editor";
import { appInfo } from "../../../config/appInfo";
import "../../../index.css";
import { createNews, editNews, uploadFile } from "../../../service/api";
import { NewsType } from "../../../service/types";
import { FormInstance } from "antd/lib";
import { useRef, useState } from "react";
import { handleFilterMasterData } from "../../../service/utils";

interface NewFormProps {
  initiateData?: any;
  handleCancel: () => void;
  editingId: number | null;
  initialData: NewsType | null;
  actionRef?: () => void;
}
const NewsForm: React.FC<NewFormProps> = ({
  initiateData,
  handleCancel,
  editingId,
  initialData,
  actionRef,
}) => {
  const formRef = useRef<FormInstance<NewsType>>();
  console.log("initial data:: ", initialData);
  const [listFile, setListFile] = useState([]);

  const [fieldFile, setFieldFile] = useState("");

  const [listFile1, setListFile1] = useState([]);

  const [fieldFile11, setFieldFile1] = useState("");

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

  const handleFinish = async (value: NewsType) => {
    // const file = value?.file[0]?.response.data.downloadUrl;
    // const image = value?.image[0]?.response.data.downloadUrl;

    try {
      if (editingId) {
        const dataToUpdate = { ...value, id: editingId };
        const res = await editNews(dataToUpdate);
        if (res.success) {
          message.success("Chỉnh sửa tin tức thành công");
          handleCancel();
          actionRef?.();
        } else {
          message.error("Có lỗi xảy ra khi chỉnh sửa tin tức");
        }
      } else {
        const res = await createNews(value);
        if (res.success) {
          message.success("Tạo tin tức thành công");
          handleCancel();
          actionRef?.();
        } else {
          message.error("Có lỗi xảy ra khi tạo tin tức");
        }
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo/chỉnh sửa tin tức");
    }
  };

  return (
    <ProForm
      initialValues={initialData ? initialData : undefined}
      formRef={formRef}
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
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label="Bộ môn"
            name="subject"
            placeholder="Vui lòng chọn"
            request={() => handleFilterMasterData("subject")}
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
          />
        </Col>
        <Col span={8}>
          <ProFormDatePicker.Year
            name="year"
            label="Năm làm khóa luận"
            fieldProps={{
              style: { width: "100%" },
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
                formRef.current?.setFieldsValue({
                  content: editor.getData() || "",
                });
              }}
              initiateData={initiateData?.kbBody}
            />
          </ProForm.Item>
        </Col>

        <Col span={12}>
          <ProFormUploadButton
            name="image"
            accept={"image/*, video/*"}
            label="Ảnh"
            title="Click to upload"
            fileList={listFile}
            transform={(value) => {
              return {
                image: fieldFile || "",
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
                console.log("file image:: ", file);
              },
            }}
            action={`${appInfo.apiUrl}/file/upload`}
            extra="Upload ảnh lên"
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
export default NewsForm;

import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import React, { useRef, useState } from "react";
import type { ProFormInstance } from "@ant-design/pro-components";
import { Button, Col, Row } from "antd";
import Editor from "../../Editor";

// import Editor from "@/pages/Editor";

export type ModalFormStudentProps = {
  initiateData?: any;
};

const ModalFormNews: React.FC<ModalFormStudentProps> = (props) => {
  const { initiateData } = props;
  const restFormRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <ModalForm
      open={modalVisible}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Tạo tin tức
        </Button>
      }
      onOpenChange={setModalVisible}
      modalProps={{
        destroyOnClose: true,
        okText: "Xác nhận",
      }}
      className="modal-form-news"
      formRef={restFormRef}
      title="Tạo tin tức"
      // onFinish={}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <ProFormText
            label="Tiêu đề"
            name="title"
            required
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống",
              },
              {
                max: 1000,
                message: "Vui lòng không nhập quá 1000 từ",
              },
              {
                whitespace: true,
                message: "Bắt buộc nhập trường Tiêu đề",
              },
            ]}
          />
        </Col>
        <Col span={24}>
          <ProForm.Item name="description" label="Nội dung" required>
            {/* <CKEditor
              editor={ClassicEditor}
              data="<p>Hello from CKEditor&nbsp;5!</p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event) => {
                console.log(event);
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            /> */}
            <Editor
              onChange={(event, editor) => {
                restFormRef.current?.setFieldsValue({
                  bodyKB: editor.getData(),
                });
              }}
              initiateData={initiateData?.kbBody}
            />
          </ProForm.Item>
        </Col>
      </Row>
    </ModalForm>
  );
};
export default ModalFormNews;

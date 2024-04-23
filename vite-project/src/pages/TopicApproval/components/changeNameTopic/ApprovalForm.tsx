import { Button, Col, FormInstance, Row, message } from "antd";
import { useEffect, useRef } from "react";
import {
  ProForm,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-components";
import {
  ChangeTopicType,
  TopicEditChangeName,
} from "../../../../service/types";
import { editTopicChangeName } from "../../../../service/api";
import { handleFilterMasterData } from "../../../../service/utils";
interface FormProps {
  handleCancel: () => void;
  editingId: number | null;
  actionRef?: () => void;
  initialData: ChangeTopicType;
}
const ApprovalForm: React.FC<FormProps> = ({
  handleCancel,
  editingId,
  actionRef,
  initialData,
}) => {
  const formRef = useRef<FormInstance<ChangeTopicType>>();

  useEffect(() => {
    // Đặt lại giá trị của form khi initialData thay đổi
    if (initialData) {
      formRef.current?.setFieldsValue(initialData);
    }
  }, [initialData]);

  const handleFinish = async (value: TopicEditChangeName) => {
    try {
      console.log("initialData:: ", initialData);
      // console.log("value:: ", value);
      if (editingId) {
        const topic = initialData.topic.id;
        const dataToUpdate = {
          ...initialData,
          ...value,
          id: editingId,
          topic: topic,
        };
        const res = await editTopicChangeName(dataToUpdate);
        // console.log("data gui di:: ", res);
        if (res.success) {
          message.success("Phê duyệt đề tài thành công.");
          handleCancel();
          actionRef?.();
        } else {
          message.error("Có lỗi xảy ra khi phê duyệt đề tài");
        }
      } else {
        return [];
      }
    } catch (error) {
      message.error("Lỗi phê duyệt đề tài vui lòng thử lại sau.");
    }
  };
  return (
    <ProForm
      // initialValues={initialData ? initialData : undefined}
      initialValues={initialData}
      formRef={formRef}
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
      <Row>
        <Col span={24}>
          <ProFormSelect
            label="Trạng thái"
            name="status"
            placeholder="Vui lòng chọn"
            request={() => handleFilterMasterData("changeTopicName")}
          />
        </Col>
        <Col span={24}>
          <ProFormTextArea
            label="Chú thích/nhắc nhở(nếu có)"
            name="note"
            placeholder="Nhập chú thích..."
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default ApprovalForm;

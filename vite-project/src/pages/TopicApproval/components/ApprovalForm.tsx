import { Button, Col, FormInstance, Row, message } from "antd";
import { TopicEdit, TopicType } from "../../../service/types";
import { useEffect, useRef } from "react";
import {
  ProForm,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { handleFilterMasterData } from "../../../service/utils";
import { editTopic } from "../../../service/api";
interface FormProps {
  handleCancel: () => void;
  editingId: number | null;
  actionRef?: () => void;
  initialData: TopicType | null;
}
const ApprovalForm: React.FC<FormProps> = ({
  handleCancel,
  editingId,
  actionRef,
  initialData,
}) => {
  const formRef = useRef<FormInstance<TopicType>>();

  useEffect(() => {
    // Đặt lại giá trị của form khi initialData thay đổi
    if (initialData) {
      formRef.current?.setFieldsValue(initialData);
    }
  }, [initialData]);

  const handleFinish = async (value: TopicEdit) => {
    try {
      // console.log("initialData:: ", initialData);
      // console.log("value:: ", value);
      if (editingId) {
        const studentId = initialData?.student.id;
        const teacherId = initialData?.teacher.id;
        const dataToUpdate = {
          ...initialData,
          ...value,
          id: editingId,
          studentId: studentId,
          teacherId: teacherId,
        };
        const res = await editTopic(dataToUpdate);
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
            request={() => handleFilterMasterData("status")}
          />
        </Col>
        <Col span={24}>
          <ProFormTextArea name="note" placeholder="Nhập ghi chú..." />
        </Col>
      </Row>
    </ProForm>
  );
};
export default ApprovalForm;

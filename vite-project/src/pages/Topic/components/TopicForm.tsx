import { Button, Col, FormInstance, Row } from "antd";
import { TopicType } from "../../../service/types";
import { useRef } from "react";
import { ProForm, ProFormDigit, ProFormText } from "@ant-design/pro-components";

interface FormProps {
  handleCancel: () => void;
  editingId: number | null;
  actionRef?: () => void;
  initialData: TopicType | null;
}
const TopicForm: React.FC<FormProps> = ({
  handleCancel,
  editingId,
  actionRef,
  initialData,
}) => {
  const formRef = useRef<FormInstance<TopicType>>();
  return (
    <ProForm
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
    >
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormText
            name="nameTopic"
            label="Tên đề tài"
            placeholder="Nhập tên đề tài"
            rules={[
              {
                message: "Vui lòng không để trống",
                required: true,
              },
            ]}
            disabled
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="student"
            label="Sinh viên"
            // value={initialData ? initialData.student.id : undefined}
            // request={() => handleFilterStudent()}
            // placeholder="Vui lòng chọn sinh viên"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng chọn sinh viên!",
            //   },
            // ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="teacher"
            label="Giảng viên hướng dẫn"
            // request={() => handleFilterTeacher()}
            // placeholder="Vui lòng chọn giảng viên"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng chọn giảng viên!",
            //   },
            // ]}
          />
        </Col>
        <Col span={8}>
          <ProFormDigit
            name="instructor"
            label="Điểm giáo viên hướng dẫn"
            placeholder="Nhập điểm"
            // rules={[
            //   {
            //     message: "Vui lòng không để trống",
            //     required: true,
            //   },
            // ]}
            min={1}
            max={10}
          />
        </Col>
        <Col span={8}>
          <ProFormDigit
            name="reviewer"
            label="Điểm giáo viên phản biện"
            placeholder="Nhập điểm"
            min={1}
            max={10}
          />
        </Col>
        <Col span={8}>
          <ProFormDigit
            name="boardMembers1"
            label="Điểm thành viên hội đồng thứ nhất"
            placeholder="Nhập điểm"
            min={1}
            max={10}
          />
        </Col>
        <Col span={8}>
          <ProFormDigit
            name="boardMembers2"
            label="Điểm thành viên hội đồng thứ hai"
            placeholder="Nhập điểm"
            min={1}
            max={10}
          />
        </Col>
        <Col span={8}>
          <ProFormDigit
            name="boardMembers3"
            label="Điểm thành viên hội đồng thứ ba"
            placeholder="Nhập điểm"
            min={1}
            max={10}
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default TopicForm;

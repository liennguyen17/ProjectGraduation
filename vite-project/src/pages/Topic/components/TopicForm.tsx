import {
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Badge, Col, Row } from "antd";
import { useRef } from "react";

interface TopicFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
  initiateData?: any;
}
const TopicForm: React.FC<TopicFormProps> = ({
  onCancel,
  onSuccess,
  initiateData,
}) => {
  const formRef = useRef<ProFormInstance>();
  return (
    <ProForm formRef={formRef} grid>
      <Row gutter={[16, 24]}>
        <Col span={12}>
          <ProFormText
            name="name"
            label="Tên đề tài"
            placeholder="Nhập tên đề tài"
            rules={[
              {
                message: "Vui lòng không để trống",
                required: true,
              },
            ]}
          />
        </Col>
        <Col span={6}>
          <ProFormText
            name="student_id"
            label="Sinh viên thực hiện"
            placeholder="Nhập tên sinh viên"
            rules={[
              {
                message: "Vui lòng không để trống",
                required: true,
              },
            ]}
          />
        </Col>
        <Col span={6}>
          <ProFormSelect
            name="teacher_id"
            label="Giáo viên hướng dẫn"
            placeholder="Vui lòng chọn"
            required
          />
        </Col>

        <Col span={8}>
          <ProFormSelect
            label="Trạng thái"
            name="status"
            required
            allowClear={false}
            valueEnum={{
              APPROVED: {
                text: <Badge status="success" text="Đã phê duyệt" />,
              },
              APPROVE: {
                text: <Badge status="error" text="Chưa phê duyệt" />,
              },
              ACTIVE: { text: <Badge status="processing" text="Hoạt động" /> },
              INACTIVE: {
                text: <Badge status="default" text="Không hoạt động" />,
              },
              ONACTIVE: {
                text: <Badge status="warning" text="Không hoạt động" />,
              },
            }}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="instructor"
            label="Điểm giáo viên hướng dẫn"
            placeholder="Nhập điểm"
            rules={[
              {
                message: "Vui lòng không để trống",
                required: true,
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="reviewer"
            label="Điểm giáo viên phản biện"
            placeholder="Nhập điểm"
            rules={[
              {
                message: "Vui lòng không để trống",
                required: true,
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="board_members_1"
            label="Điểm thành viên hội đồng thứ nhất"
            placeholder="Nhập điểm"
            rules={[
              {
                message: "Vui lòng không để trống",
                // required: true,
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="board_members_2"
            label="Điểm thành viên hội đồng thứ hai"
            placeholder="Nhập điểm"
            rules={[
              {
                message: "Vui lòng không để trống",
                // required: true,
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="board_members_3"
            label="Điểm thành viên hội đồng thứ ba"
            placeholder="Nhập điểm"
            rules={[
              {
                message: "Vui lòng không để trống",
                // required: true,
              },
            ]}
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default TopicForm;

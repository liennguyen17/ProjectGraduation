import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Col, FormInstance, Row, message } from "antd";
import { useRef } from "react";
import {
  handleFilterMasterData,
  handleFilterStudent,
  handleFilterTeacher,
} from "../../../service/utils";
import { TopicType, TopicTypeCreate } from "../../../service/types";

import "../../../index.css";
import { TopicCreate, editTopic } from "../../../service/api";

interface TopicFormProps {
  onCancel: () => void;
  editingId: number | null;
  initialData: TopicType | null;
  actionRef?: () => void;
}
const TopicForm: React.FC<TopicFormProps> = ({
  onCancel,
  editingId,
  initialData,
  actionRef,
}) => {
  const formRef = useRef<FormInstance<TopicTypeCreate>>();

  const handleFinish = async (value) => {
    try {
      if (editingId) {
        console.log("dlc::", initialData);
        const studentId = initialData?.student.id;
        const teacherId = initialData?.teacher.id;
        const dataUpdate = {
          ...initialData,
          ...value,
          id: editingId,
          studentId: studentId,
          teacherId: teacherId,
        };

        const res = await editTopic(dataUpdate);
        console.log("res:: ", res);
        if (res.success) {
          message.success("Chỉnh sửa đề tài thành công");
          onCancel();
          actionRef?.();
        } else {
          message.error("Có lỗi xảy ra khi chỉnh sửa đề tài");
        }
      } else {
        const res = await TopicCreate(value);
        if (res.success) {
          message.success("Tạo đề tài thành công");
          onCancel();
          actionRef?.();
        } else {
          message.error("Có lỗi xảy ra khi tạo đề tài");
        }
      }
    } catch (error) {
      message.error("Có lỗi trong quá trình tạo đề tài.");
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
                onClick={() => onCancel()}
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
      <Row gutter={[16, 24]}>
        <Col span={12}>
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
          />
        </Col>
        <Col span={6}>
          <ProFormSelect
            label="Học kỳ"
            name="semester"
            placeholder="Vui lòng chọn"
            request={() => handleFilterMasterData("semester")}
          />
        </Col>
        <Col span={6}>
          <ProFormSelect
            label="Bộ môn quản lý"
            name="departmentManagement"
            placeholder="Vui lòng chọn"
            request={() => handleFilterMasterData("subject")}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="student"
            label="Họ tên sinh viên"
            // value={initialData ? initialData.student.id : undefined}
            request={() => handleFilterStudent()}
            placeholder="Vui lòng chọn sinh viên"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn sinh viên!",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="teacher"
            label="Họ và tên giảng viên hướng dẫn"
            request={() => handleFilterTeacher()}
            placeholder="Vui lòng chọn giảng viên"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn giảng viên!",
              },
            ]}
          />
        </Col>

        <Col span={8}>
          <ProFormSelect
            label="Trạng thái"
            name="status"
            // required
            // allowClear={false}
            placeholder="Vui lòng chọn"
            request={() => handleFilterMasterData("status")}
          />
        </Col>

        <Col span={12}>
          <ProFormText
            name="nameInternshipFacility"
            label="Tên cơ sở thực tập"
            placeholder="Nhập tên cơ sở thực tập..."
            // rules={[
            //   {
            //     message: "Vui lòng không để trống",
            //     required: true,
            //   },
            // ]}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="menterInternshipFacility"
            label="Cán bộ hướng dẫn tại cơ sở thực tập"
            placeholder="Nhập tên cán bộ hướng dẫn tại cơ sở thực tập..."
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="phoneInstructorInternshipFacility"
            label="Số điện thoại cán bộ hướng dẫn tại cơ sở thực tập"
            placeholder="Nhập số điện thoại cán bộ hướng dẫn tại cơ sở thực tập..."
          />
        </Col>
        {/* <Col span={8}>
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
        </Col> */}
      </Row>
    </ProForm>
  );
};
export default TopicForm;

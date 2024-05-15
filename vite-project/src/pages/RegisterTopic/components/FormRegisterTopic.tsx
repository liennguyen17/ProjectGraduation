import {
  ProForm,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Col, Divider, Row, message } from "antd";
import {
  handleFilterMasterData,
  handleFilterTeacher,
} from "../../../service/utils";
import { RegisterTopicType } from "../../../service/types";
import { createStudentRegisterTopic } from "../../../service/api";

interface PropsForm {
  handleCancel: () => void;
}

const FormRegisterTopic: React.FC<PropsForm> = ({ handleCancel }) => {
  const handleFinish = async (value: RegisterTopicType) => {
    try {
      const res = await createStudentRegisterTopic(value);
      if (res.success) {
        message.success("Gửi đơn đăng ký đề tài thành công.");
        handleCancel();
      } else {
        const errorText = res?.error?.message;
        message.error(`${errorText}` || "Có lỗi xảy ra khi đăng ký đề tài");
      }
    } catch (error) {
      message.error("Có lỗi trong quá trình đăng ký.");
    }
  };

  return (
    <ProForm
      style={{ flex: 1 }}
      onFinish={handleFinish}
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
    >
      <Row gutter={24}>
        <Col span={24}>
          <Divider />
        </Col>
        <Col span={12}>
          <ProFormText
            name="nameTopic"
            label="Tên đề tài"
            rules={[{ required: true, message: "Vui lòng nhập tên đề tài!" }]}
            // width="lg"
            placeholder="Nhập tên đề tài"
            required
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label="Giảng viên hướng dẫn"
            name="teacher"
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
        <Col span={12}>
          <ProFormText
            name="nameInternshipFacility"
            label="Tên cơ sở thực tập"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên cơ sở thực tập!",
              },
            ]}
            // width="lg"
            placeholder="Nhập tên cơ sở thực tập"
            required
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="menterInternshipFacility"
            label="Cán bộ hướng dẫn tại cơ sở thực tập"
            rules={[
              {
                required: true,
                message:
                  "Vui lòng nhập tên cán bộ hướng dẫn tại cơ sở thực tập!",
              },
            ]}
            // width="lg"
            placeholder="Nhập tên cán bộ hướng dẫn"
            required
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="phoneInstructorInternshipFacility"
            label="Số điện thoại cán bộ hướng dẫn tại cơ sở thực tập"
            rules={[
              {
                required: true,
                message:
                  "Vui lòng nhập số điện thoại cán bộ hướng dẫn tại cơ sở thực tập!",
              },
            ]}
            // width="lg"
            placeholder="Nhập số điện thoại"
            required
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label="Kỳ học"
            name="semester"
            placeholder="Vui lòng chọn kỳ học"
            request={() => handleFilterMasterData("semester")}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn kỳ học!",
              },
            ]}
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default FormRegisterTopic;

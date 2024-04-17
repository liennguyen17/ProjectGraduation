import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
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
  // const handleFilterTeacher = async () => {
  //   try {
  //     const dataTeacher = await TeacherGetListApi();
  //     console.log(dataTeacher);
  //     return dataTeacher.map((dataTeacher: any) => ({
  //       lable: dataTeacher.name,
  //       value: dataTeacher.username,
  //     }));
  //   } catch (error) {
  //     console.error("Error fetching teacher data:", error);
  //     return [];
  //   }
  // };

  const handleFinish = async (value: RegisterTopicType) => {
    try {
      const res = await createStudentRegisterTopic(value);
      if (res.success) {
        message.success("Gửi đơn đăng ký đề tài thành công.");
        handleCancel();
      } else {
        message.error("Có lỗi trong quá trình đăng ký.");
      }
    } catch (error) {
      message.error("Có lỗi trong quá trình đăng ký.");
    }
  };

  return (
    <ProForm
      style={{ flex: 1 }}
      // onFinish={handleSubmit}
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
          <ProFormSelect
            label="Bộ môn"
            name="semester"
            request={() => handleFilterMasterData("subject")}
            placeholder="Vui lòng chọn bộ môn"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn bộ môn!",
              },
            ]}
          />
        </Col>

        <Col span={12}>
          <ProFormText
            name="nameTopic"
            label="Tên đề tài đã đăng ký"
            rules={[{ required: true, message: "Vui lòng nhập tên đề tài!" }]}
            // width="lg"
            placeholder="Nhập tên đề tài"
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
        <Col span={12}>
          <ProFormText
            name="nameTopic"
            label="Tên đề tài mới"
            rules={[{ required: true, message: "Vui lòng nhập tên đề tài!" }]}
            // width="lg"
            placeholder="Nhập tên đề tài"
            required
          />
        </Col>
        <Col span={12}>
          <ProFormTextArea
            name="reason"
            placeholder="Nhập lý do..."
            label="Lý do thay đổi đề tài"
            required
            rules={[
              {
                required: true,
                message: "Lý do không được bỏ trống.",
              },
              {
                max: 200,
                message: "Lý do không vượt quá 200 ký tự.",
              },
            ]}
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default FormRegisterTopic;
